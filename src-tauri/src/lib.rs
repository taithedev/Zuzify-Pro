use serde::Serialize;
use std::ffi::c_void;
use std::ffi::OsStr;
use std::os::windows::ffi::OsStrExt;
use std::process::Command;
use winreg::{enums::HKEY_CURRENT_USER, enums::HKEY_LOCAL_MACHINE, RegKey};

const PERSONALIZE: &str = r"Software\Microsoft\Windows\CurrentVersion\Themes\Personalize";
const CURRENT_VERSION: &str = r"SOFTWARE\Microsoft\Windows NT\CurrentVersion";
const SPIF_PERSIST_BROADCAST: u32 = 0x0001 | 0x0002;
const SPI_GET_MOUSE_SPEED: u32 = 0x0070;
const SPI_SET_MOUSE_SPEED: u32 = 0x0071;
const SPI_GET_KEYBOARD_SPEED: u32 = 0x000A;
const SPI_SET_KEYBOARD_SPEED: u32 = 0x000B;

#[link(name = "user32")]
extern "system" {
    fn SystemParametersInfoW(
        action: u32,
        param: u32,
        value: *mut c_void,
        flags: u32,
    ) -> i32;
    fn SendMessageTimeoutW(
        hwnd: *mut c_void,
        message: u32,
        wparam: usize,
        lparam: isize,
        flags: u32,
        timeout: u32,
        result: *mut usize,
    ) -> isize;
}
#[link(name = "shell32")]
extern "system" {
    fn ShellExecuteW(
        hwnd: *mut c_void,
        operation: *const u16,
        file: *const u16,
        parameters: *const u16,
        directory: *const u16,
        show: i32,
    ) -> isize;
}
#[link(name = "kernel32")]
extern "system" {
    fn GetTickCount64() -> u64;
    fn GlobalMemoryStatusEx(buffer: *mut MemoryStatus) -> i32;
}
#[repr(C)]
#[derive(Default)]
struct MemoryStatus {
    length: u32,
    load_percent: u32,
    total_physical: u64,
    available_physical: u64,
    total_page_file: u64,
    available_page_file: u64,
    total_virtual: u64,
    available_virtual: u64,
    extended_virtual: u64,
}

#[derive(Serialize, Clone)]
#[serde(rename_all = "camelCase")]
struct PowerPlan {
    id: String,
    name: String,
    active: bool,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct Snapshot {
    device_name: String,
    user_name: String,
    os_name: String,
    os_version: String,
    build: String,
    uptime_minutes: u64,
    installed_memory_gb: u64,
    apps_dark: bool,
    system_dark: bool,
    transparency: bool,
    mouse_speed: u32,
    keyboard_speed: u32,
    power_plans: Vec<PowerPlan>,
}

fn dword(name: &str, fallback: u32) -> u32 {
    RegKey::predef(HKEY_CURRENT_USER)
        .open_subkey(PERSONALIZE)
        .ok()
        .and_then(|key| key.get_value::<u32, _>(name).ok())
        .unwrap_or(fallback)
}

fn write_dword(name: &str, value: u32) -> Result<(), String> {
    let (key, _) = RegKey::predef(HKEY_CURRENT_USER)
        .create_subkey(PERSONALIZE)
        .map_err(|e| e.to_string())?;
    key.set_value(name, &value).map_err(|e| e.to_string())?;
    let wide: Vec<u16> = OsStr::new("ImmersiveColorSet")
        .encode_wide()
        .chain(Some(0))
        .collect();
    let mut result: usize = 0;
    unsafe {
        // Notify Windows without waiting indefinitely on an unresponsive shell.
        SendMessageTimeoutW(
            0xffffusize as *mut c_void,
            0x001A,
            0,
            wide.as_ptr() as isize,
            0x0002,
            200,
            &mut result,
        );
    }
    Ok(())
}

fn get_system_parameter(action: u32, fallback: u32) -> u32 {
    let mut value = fallback;
    let ok = unsafe {
        SystemParametersInfoW(action, 0, &mut value as *mut u32 as *mut c_void, 0)
    };
    if ok == 0 { fallback } else { value }
}

fn set_system_parameter(action: u32, setting: u32, via_pointer: bool) -> Result<(), String> {
    let ptr = if via_pointer {
        setting as usize as *mut c_void
    } else {
        std::ptr::null_mut()
    };
    let parameter = if via_pointer { 0 } else { setting };
    let ok = unsafe { SystemParametersInfoW(action, parameter, ptr, SPIF_PERSIST_BROADCAST) };
    if ok == 0 {
        Err(format!("Windows could not apply this setting (OS error {}).", std::io::Error::last_os_error()))
    } else {
        Ok(())
    }
}

fn power_plans() -> Vec<PowerPlan> {
    let output = match Command::new("powercfg.exe").arg("/list").output() {
        Ok(output) if output.status.success() => output,
        _ => return vec![],
    };
    String::from_utf8_lossy(&output.stdout)
        .lines()
        .filter_map(|line| {
            let id = line.split_whitespace().find(|word| {
                word.len() == 36 &&
                word.chars().enumerate().all(|(i, c)| {
                    if [8, 13, 18, 23].contains(&i) { c == '-' }
                    else { c.is_ascii_hexdigit() }
                })
            })?;
            let name = line.split_once('(')
                .and_then(|(_, right)| right.split_once(')').map(|(name, _)| name.trim()))
                .filter(|name| !name.is_empty())
                .unwrap_or("Power scheme");
            Some(PowerPlan {
                id: id.to_ascii_lowercase(),
                name: name.to_string(),
                active: line.trim_end().ends_with('*'),
            })
        }).collect()
}

fn os_info() -> (String, String, String) {
    let version = RegKey::predef(HKEY_LOCAL_MACHINE).open_subkey(CURRENT_VERSION);
    if let Ok(key) = version {
        let build: String = key.get_value("CurrentBuildNumber").unwrap_or_default();
        let display: String = key.get_value("DisplayVersion").unwrap_or_default();
        let product: String = key.get_value("ProductName").unwrap_or_else(|_| "Windows".to_string());
        let is_win11 = build.parse::<u32>().unwrap_or(0) >= 22000;
        let name = if is_win11 { "Windows 11".to_string() } else { product };
        return (name, display, build);
    }
    ("Windows".to_string(), String::new(), String::new())
}

#[tauri::command]
fn get_snapshot() -> Snapshot {
    let (os_name, os_version, build) = os_info();
    let mut memory = MemoryStatus { length: std::mem::size_of::<MemoryStatus>() as u32, ..Default::default() };
    let installed_memory_gb = if unsafe { GlobalMemoryStatusEx(&mut memory) } != 0 {
        (memory.total_physical + (1024_u64.pow(3) / 2)) / 1024_u64.pow(3)
    } else { 0 };
    Snapshot {
        device_name: std::env::var("COMPUTERNAME").unwrap_or_else(|_| "Windows PC".to_string()),
        user_name: std::env::var("USERNAME").unwrap_or_else(|_| "Local user".to_string()),
        os_name,
        os_version,
        build,
        uptime_minutes: unsafe { GetTickCount64() / 60000 },
        installed_memory_gb,
        apps_dark: dword("AppsUseLightTheme", 0) == 0,
        system_dark: dword("SystemUsesLightTheme", 0) == 0,
        transparency: dword("EnableTransparency", 1) != 0,
        mouse_speed: get_system_parameter(SPI_GET_MOUSE_SPEED, 10),
        keyboard_speed: get_system_parameter(SPI_GET_KEYBOARD_SPEED, 31),
        power_plans: power_plans(),
    }
}

#[tauri::command]
fn set_preference(key: String, value: i32) -> Result<(), String> {
    match key.as_str() {
        "appsDark" if value == 0 || value == 1 =>
            write_dword("AppsUseLightTheme", if value == 1 { 0 } else { 1 }),
        "systemDark" if value == 0 || value == 1 =>
            write_dword("SystemUsesLightTheme", if value == 1 { 0 } else { 1 }),
        "transparency" if value == 0 || value == 1 =>
            write_dword("EnableTransparency", value as u32),
        "mouseSpeed" if (1..=20).contains(&value) =>
            set_system_parameter(SPI_SET_MOUSE_SPEED, value as u32, true),
        "keyboardSpeed" if (0..=31).contains(&value) =>
            set_system_parameter(SPI_SET_KEYBOARD_SPEED, value as u32, false),
        _ => Err("Unsupported or invalid setting. No changes were made.".to_string()),
    }
}

#[tauri::command]
fn set_power_plan(id: String) -> Result<(), String> {
    // Never run an unvalidated command or allow arbitrary arguments.
    let candidate = power_plans().into_iter().find(|plan| plan.id == id)
        .ok_or("This power plan is not currently installed.".to_string())?;
    let status = Command::new("powercfg.exe")
        .args(["/setactive", &candidate.id])
        .status().map_err(|e| e.to_string())?;
    if status.success() { Ok(()) }
    else { Err("Windows denied the power-plan change. Check your device policy or permissions.".to_string()) }
}

#[tauri::command]
fn open_settings(uri: String) -> Result<(), String> {
    let suffix = uri.strip_prefix("ms-settings:")
        .ok_or("Only Windows Settings pages can be opened.".to_string())?;
    if suffix.is_empty() || suffix.len() > 90 ||
        !suffix.chars().all(|c| c.is_ascii_lowercase() || c.is_ascii_digit() || c == '-') {
        return Err("Invalid Windows Settings page.".to_string());
    }
    let wide: Vec<u16> = OsStr::new(&uri).encode_wide().chain(Some(0)).collect();
    let code = unsafe {
        ShellExecuteW(
            std::ptr::null_mut(),
            std::ptr::null(),
            wide.as_ptr(),
            std::ptr::null(),
            std::ptr::null(),
            1,
        )
    };
    if code as usize > 32 { Ok(()) }
    else { Err(format!("Windows could not open this settings page (code {}).", code)) }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            get_snapshot,
            set_preference,
            set_power_plan,
            open_settings
        ])
        .run(tauri::generate_context!())
        .expect("failed to start WidSetV2");
}
