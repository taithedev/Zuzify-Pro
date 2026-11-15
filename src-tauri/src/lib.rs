// This desktop application deliberately exposes no commands for game or process access.
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .run(tauri::generate_context!())
        .expect("failed to run ZuzifyPro");
}
