# ZuzifyPro

**Native Windows desktop application** with a screenshot-inspired compact, dark interface. Built with **Tauri 2, Rust, and the Windows WebView2 engine** — **no Electron** and no remote web server.

The application starts at 660 × 441 and supports resizing. Features include an expandable sidebar, Targets/Response/Limits pages, switches, sliders, selects, key-binding capture, multiple appearance presets, reset, minimize and close. UI preferences are persisted locally in the WebView storage. Every game-themed setting is an inert interface demonstration; the app does **not** connect to games, external processes, or the internet.

## Install / run

1. In this repository, choose **Actions → Build ZuzifyPro Windows**.
2. Open the successful workflow run; under **Artifacts**, choose `ZuzifyPro-Installer-Windows-x64` for the `.exe` installer, or `ZuzifyPro-Portable-Windows-x64` for the portable executable.
3. The installer is unsigned; Windows SmartScreen might display an unverified-publisher warning.

**Requirements:** Windows 10/11 64-bit with WebView2 runtime (built into current Windows 11).

## Build locally

Install stable Rust with the MSVC toolchain, Microsoft C++ Build Tools, WebView2, and Tauri CLI 2. Then:

```powershell
cargo install tauri-cli --version '^2' --locked
cd src-tauri
cargo tauri build
```

The built executable is at `src-tauri/target/release/zuzifypro.exe`, and the NSIS installer is in `src-tauri/target/release/bundle/nsis/`.

## Preview

Open `web/index.html` in a browser for a live UI preview. For the closest comparison, use a 660 × 441 viewport.

## Project structure

- `web/index.html`, `web/styles.css`, `web/app.js`: complete frontend; no frontend dependencies
- `web/assets/`: background/brand assets
- `src-tauri/`: native Rust application, window settings, capabilities, icons
- `.github/workflows/windows-installer.yml`: Windows CI build and downloadable executables

## Security and scope

The frontend is bundled and runs offline. No telemetry, account system, driver, DLL injection, game integration, or process manipulation is implemented. The local settings are UI preferences only. No Electron runtime is used.
