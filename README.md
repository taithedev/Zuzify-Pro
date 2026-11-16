# WidSetV2

Native Windows settings control center by Zuzify. Built with **Rust + Tauri 2 + Windows WebView2**. **No Electron**, no cloud account, no telemetry, and no arbitrary shell execution.

![Platform](https://img.shields.io/badge/platform-Windows%2010%2F11-879dff)
![UI](https://img.shields.io/badge/runtime-Tauri%202-879dff)

## What works

WidSetV2 reads the computer's Windows version, build, uptime, device name, installed memory, current theme, mouse speed, keyboard repeat, and installed power plans. It can **actually change** current-user app dark theme, system dark theme, transparency effects, mouse pointer speed (1–20), keyboard repeat speed (0–31), and active power scheme. Preferences are applied using Windows registry or Win32 APIs; the application does not ask for blanket administrator access. Your device's policy may restrict certain settings.

It also provides category navigation, quick actions, search, keyboard shortcuts, and links into dozens of real Windows Settings pages via Microsoft's documented \`ms-settings:\` URI scheme. These links **open Windows Settings** rather than pretending WidSetV2 can independently change every protected system option. Pages that need special hardware or Windows editions may not be available.

When \`web/index.html\` is opened in a normal browser, the preview is clearly labeled **Demo mode** and changes are simulated locally. Windows settings are only touched by the installed native application.

## Download a Windows app

Go to **Actions → Build WidSetV2 Windows → latest successful run → Artifacts** and download either **WidSetV2-Portable-x64** or **WidSetV2-Setup-x64**. GitHub Actions artifacts are packaged by GitHub and require a signed-in account to download. The EXE is currently unsigned and may show a Windows SmartScreen warning.

## Local development

Requirements: Windows 10 or 11, Rust stable MSVC toolchain, Visual Studio C++ Build Tools, WebView2 runtime, and Tauri CLI 2.

\`\`\`powershell
cargo install tauri-cli --version '^2' --locked
cd src-tauri
cargo tauri dev
cargo tauri build
\`\`\`

Tauri bundles the \`web/\` directory directly without a Node dependency or web server.

## Safety

Native commands only expose a fixed allowlist of changes. Settings-page launch is restricted to plain \`ms-settings:\` page names. Power plan IDs must match installed power plans before being applied; command execution is argument-based rather than through a shell. No registry-cleanup, security-service disabling, admin bypass, or untrusted command execution features exist. Use Windows Settings directly for administrator-protected or hardware-specific controls.

The executable retains the project repository name \`Zuzify-Pro\` for continuity, but the application and installer are branded **WidSetV2**.
