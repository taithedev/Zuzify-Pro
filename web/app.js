/* WidSetV2 — self-contained desktop interface, no frontend framework or CDN. */
"use strict";

const ICONS = {
  home: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>',
  monitor: '<rect x="2" y="3" width="20" height="15" rx="2"/><path d="M8 22h8m-4-4v4"/>',
  palette: '<path d="M12 3a9 9 0 1 0 0 18h1.4a2 2 0 0 0 1.5-3.4 1.8 1.8 0 0 1 .4-3l2.8-.8A5.5 5.5 0 0 0 12 3Z"/><circle cx="7.5" cy="11" r="1"/><circle cx="10" cy="7.5" r="1"/><circle cx="15" cy="7.5" r="1"/><circle cx="17.5" cy="11" r="1"/>',
  mouse: '<rect x="5" y="2" width="14" height="20" rx="7"/><path d="M12 2v8"/>',
  wifi: '<path d="M2 8a16 16 0 0 1 20 0M5 12a11 11 0 0 1 14 0M8.5 16a6 6 0 0 1 7 0"/><circle cx="12" cy="20" r="1" fill="currentColor" stroke="none"/>',
  battery: '<rect x="2" y="7" width="18" height="10" rx="2"/><path d="M22 11v2M11 9l-3 4h4l-1 3 5-6h-4"/>',
  boxes: '<rect x="3" y="3" width="8" height="8" rx="1"/><rect x="13" y="3" width="8" height="8" rx="1"/><rect x="3" y="13" width="8" height="8" rx="1"/><rect x="13" y="13" width="8" height="8" rx="1"/>',
  shield: '<path d="m12 2 8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z"/><path d="m9 12 2 2 4-4"/>',
  access: '<circle cx="12" cy="4" r="2"/><path d="m4 8 8 2 8-2M12 10v5m0 0-4 7m4-7 4 7"/>',
  game: '<path d="M7 8h10a5 5 0 0 1 4.8 4l.8 4.4a3 3 0 0 1-4.7 3L15 17H9l-2.9 2.4a3 3 0 0 1-4.7-3L2.2 12A5 5 0 0 1 7 8z"/><path d="M7 11v5m-2.5-2.5h5M16.5 12h.01M19 14.5h.01"/>',
  refresh: '<path d="M20 11a8 8 0 0 0-14.5-4.5L3 9m0-6v6h6M4 13a8 8 0 0 0 14.5 4.5L21 15m0 6v-6h-6"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  info: '<circle cx="12" cy="12" r="10"/><path d="M12 11v5m0-8h.01"/>',
  search: '<circle cx="10.8" cy="10.8" r="7.8"/><path d="m16.5 16.5 5 5"/>',
  chevron: '<path d="m9 18 6-6-6-6"/>',
  down: '<path d="m6 9 6 6 6-6"/>',
  external: '<path d="M13 4h7v7M20 4l-9 9"/><path d="M20 13v7H4V4h7"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  moon: '<path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5Z"/>',
  sliders: '<path d="M4 7h16M4 17h16"/><circle cx="9" cy="7" r="2" fill="#111827"/><circle cx="16" cy="17" r="2" fill="#111827"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  x: '<path d="M5 5 19 19M19 5 5 19"/>',
  minimize: '<path d="M4 12h16"/>',
  maximize: '<rect x="4" y="4" width="16" height="16" rx="2"/>',
  star: '<path d="m12 2 3.1 6.4 7 .9-5.1 5 .9 7-5.9-3.2-6.2 3.2 1.2-7-5-5 6.9-.9z"/>',
  arrow: '<path d="M5 12h14m-7-7 7 7-7 7"/>',
  laptop: '<rect x="5" y="3" width="14" height="13" rx="2"/><path d="M2 20h20l-3-4H5z"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  harddrive: '<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3 13h18"/><circle cx="17" cy="15.5" r="1"/>',
  spark: '<path d="m12 2 1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8zM19 18l.5 1.5L21 20l-1.5.5L19 22l-.5-1.5L17 20l1.5-.5z"/>',
  folder: '<path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v10H3z"/>',
  volume: '<path d="M4 9v6h4l5 4V5L8 9H4zM17 9a5 5 0 0 1 0 6"/>',
  globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a16 16 0 0 1 0 20M12 2a16 16 0 0 0 0 20"/>',
  lock: '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
  bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',
  keyboard: '<rect x="2" y="6" width="20" height="12" rx="2"/><path d="M5 10h1m3 0h1m3 0h1m3 0h1M5 13h1m3 0h1m3 0h1m3 0h1M8 16h8"/>',
  heart: '<path d="M20 5a5 5 0 0 0-7 0l-1 1-1-1a5 5 0 0 0-7 7l8 8 8-8a5 5 0 0 0 0-7Z"/>',
};
function icon(name, size) {
  return '<svg aria-hidden="true" width="' + (size || 18) + '" height="' + (size || 18) + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linejoin="round" stroke-linecap="round">' + (ICONS[name] || ICONS.sliders) + '</svg>';
}
function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, function (c) {
    return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c];
  });
}
function item(title, description, uri, symbol) {
  return { title, description, uri, icon: symbol || "sliders" };
}
const SECTIONS = [
  { id: "system", title: "System", icon: "monitor", eyebrow: "DEVICE & DISPLAY", subtitle: "Everything you need to manage your display, sound and desktop experience.", links: [
    item("Display", "Brightness, resolution, scale and multiple monitors", "ms-settings:display", "monitor"),
    item("Advanced display", "Refresh rate and display properties", "ms-settings:display-advanced", "monitor"),
    item("Sound", "Output, input and volume preferences", "ms-settings:sound", "volume"),
    item("Notifications", "App notifications and alert preferences", "ms-settings:notifications", "bell"),
    item("Focus", "Focus sessions and interruption controls", "ms-settings:quietmomentshome", "clock"),
    item("Storage", "Storage usage and cleanup controls", "ms-settings:storagesense", "harddrive"),
    item("Clipboard", "History and syncing options", "ms-settings:clipboard", "folder"),
    item("Multitasking", "Snap windows and virtual desktops", "ms-settings:multitasking", "boxes"),
    item("Remote desktop", "Remote desktop availability and access", "ms-settings:remotedesktop", "monitor"),
    item("About your PC", "Windows specifications and device info", "ms-settings:about", "info"),
  ]},
  { id: "appearance", title: "Personalization", icon: "palette", eyebrow: "LOOK & FEEL", subtitle: "Give Windows the look you want, with real appearance controls.", links: [
    item("Background", "Wallpaper, slideshow and desktop background", "ms-settings:personalization-background", "palette"),
    item("Colors", "Accent colors, theme and transparency", "ms-settings:personalization-colors", "palette"),
    item("Themes", "Desktop themes, sounds and mouse cursor themes", "ms-settings:themes", "spark"),
    item("Lock screen", "Sign-in background and lock-screen preferences", "ms-settings:lockscreen", "lock"),
    item("Taskbar", "Taskbar behavior and personalization", "ms-settings:taskbar", "monitor"),
    item("Start menu", "Pinned apps and Start recommendations", "ms-settings:personalization-start", "boxes"),
    item("Fonts", "Installed and optional fonts", "ms-settings:fonts", "folder"),
    item("Visual effects", "Animation and accessibility visual effects", "ms-settings:easeofaccess-visualeffects", "spark"),
    item("Dynamic lighting", "Supported RGB lighting settings", "ms-settings:personalization-lighting", "sun"),
  ]},
  { id: "devices", title: "Devices & input", icon: "mouse", eyebrow: "DEVICES & INPUT", subtitle: "Fine-tune the way you interact with your computer.", links: [
    item("Mouse", "Buttons, scrolling and pointer options", "ms-settings:mousetouchpad", "mouse"),
    item("Typing", "Autocorrect and keyboard suggestions", "ms-settings:typing", "keyboard"),
    item("Bluetooth", "Connect and manage Bluetooth devices", "ms-settings:bluetooth", "wifi"),
    item("Printers & scanners", "Installed printers and scanner configuration", "ms-settings:printers", "folder"),
    item("USB", "Connected USB devices and notifications", "ms-settings:usb", "harddrive"),
    item("Cameras", "Camera device settings", "ms-settings:camera", "monitor"),
    item("Touchpad", "Gestures and touchpad sensitivity", "ms-settings:devices-touchpad", "mouse"),
  ]},
  { id: "network", title: "Network & internet", icon: "wifi", eyebrow: "CONNECTIONS", subtitle: "Manage your connections and network preferences in one place.", links: [
    item("Network overview", "Connection status and network settings", "ms-settings:network-status", "globe"),
    item("Wi-Fi", "Available and saved wireless networks", "ms-settings:network-wifi", "wifi"),
    item("Ethernet", "Wired connection preferences", "ms-settings:network-ethernet", "globe"),
    item("VPN", "Virtual private network connections", "ms-settings:network-vpn", "shield"),
    item("Proxy", "Automatic and manual proxy configuration", "ms-settings:network-proxy", "sliders"),
    item("Mobile hotspot", "Share your internet connection", "ms-settings:network-mobilehotspot", "wifi"),
    item("Advanced network", "Network adapters and related settings", "ms-settings:network-advancedsettings", "boxes"),
    item("Airplane mode", "Wireless radios and airplane mode", "ms-settings:network-airplanemode", "wifi"),
  ]},
  { id: "power", title: "Power & performance", icon: "battery", eyebrow: "POWER MANAGEMENT", subtitle: "View and select installed Windows power plans without risky tweaks.", links: [
    item("Power & battery", "Energy mode, sleep and battery settings", "ms-settings:powersleep", "battery"),
    item("Energy recommendations", "Tips for more efficient power usage", "ms-settings:energyrecommendations", "spark"),
    item("Battery usage", "Battery usage details on portable devices", "ms-settings:batterysaver-usagedetails", "battery"),
    item("Graphics", "GPU preference for supported applications", "ms-settings:display-advancedgraphics", "monitor"),
    item("Game Mode", "Windows game optimization settings", "ms-settings:gaming-gamemode", "game"),
  ]},
  { id: "apps", title: "Apps & storage", icon: "boxes", eyebrow: "APPLICATIONS", subtitle: "Manage installed apps, file defaults and what starts with Windows.", links: [
    item("Installed apps", "Manage, modify or uninstall installed software", "ms-settings:appsfeatures", "boxes"),
    item("Startup apps", "Control which programs launch with Windows", "ms-settings:startupapps", "arrow"),
    item("Default apps", "Choose web browser, media and file associations", "ms-settings:defaultapps", "folder"),
    item("Optional features", "Windows optional software features", "ms-settings:optionalfeatures", "sliders"),
    item("Apps for websites", "Website-linked installed applications", "ms-settings:appsforwebsites", "globe"),
    item("Storage cleanup", "Windows Storage Sense settings", "ms-settings:storagesense", "harddrive"),
  ]},
  { id: "privacy", title: "Privacy & security", icon: "shield", eyebrow: "PRIVACY FIRST", subtitle: "Get to Windows permission controls without hiding or weakening protections.", links: [
    item("Privacy overview", "General Windows privacy preferences", "ms-settings:privacy", "shield"),
    item("Location", "Location service and permissions", "ms-settings:privacy-location", "globe"),
    item("Camera access", "Camera permission settings", "ms-settings:privacy-webcam", "monitor"),
    item("Microphone access", "Microphone permission settings", "ms-settings:privacy-microphone", "volume"),
    item("Diagnostics", "Feedback and diagnostic data settings", "ms-settings:privacy-feedback", "info"),
    item("Windows Security", "Built-in security and protection status", "ms-settings:windowsdefender", "shield"),
    item("Device encryption", "Encryption status and device controls", "ms-settings:deviceencryption", "lock"),
    item("File system access", "App access to files and folders", "ms-settings:privacy-broadfilesystemaccess", "folder"),
  ]},
  { id: "accessibility", title: "Accessibility", icon: "access", eyebrow: "ACCESS FOR EVERYONE", subtitle: "Comfort and accessibility tools, linked straight into Windows.", links: [
    item("Text size", "Make text easier to read", "ms-settings:easeofaccess-display", "sun"),
    item("Visual effects", "Animations, transparency and scrollbars", "ms-settings:easeofaccess-visualeffects", "spark"),
    item("Color filters", "Color filtering and display accessibility", "ms-settings:easeofaccess-colorfilter", "palette"),
    item("Contrast themes", "High contrast appearance options", "ms-settings:easeofaccess-highcontrast", "moon"),
    item("Keyboard accessibility", "Sticky keys and keyboard assistance", "ms-settings:easeofaccess-keyboard", "keyboard"),
    item("Mouse pointer", "Pointer size and visibility", "ms-settings:easeofaccess-mousepointer", "mouse"),
    item("Narrator", "Screen reader settings", "ms-settings:easeofaccess-narrator", "volume"),
    item("Captions", "Captions and text accessibility", "ms-settings:easeofaccess-closedcaptioning", "info"),
  ]},
  { id: "gaming", title: "Gaming", icon: "game", eyebrow: "GAMING", subtitle: "Find the official Windows gaming, capture and graphics settings.", links: [
    item("Game Mode", "Windows game optimizations", "ms-settings:gaming-gamemode", "game"),
    item("Game Bar", "Game Bar and gaming overlay preferences", "ms-settings:gaming-gamebar", "game"),
    item("Captures", "Screenshots and recording configuration", "ms-settings:gaming-gamedvr", "monitor"),
    item("Graphics preference", "Per-app graphics performance", "ms-settings:display-advancedgraphics", "spark"),
    item("Display refresh rate", "Advanced monitor properties", "ms-settings:display-advanced", "monitor"),
  ]},
  { id: "updates", title: "Windows Update", icon: "refresh", eyebrow: "MAINTENANCE", subtitle: "Check updates and manage Windows maintenance using the official pages.", links: [
    item("Windows Update", "Check for updates and review status", "ms-settings:windowsupdate", "refresh"),
    item("Update history", "Installed quality and feature updates", "ms-settings:windowsupdate-history", "clock"),
    item("Advanced options", "Windows update advanced preferences", "ms-settings:windowsupdate-options", "sliders"),
    item("Recovery", "Windows recovery options", "ms-settings:recovery", "shield"),
    item("Activation", "Windows activation and licensing", "ms-settings:activation", "check"),
  ]},
  { id: "accounts", title: "Accounts", icon: "user", eyebrow: "YOUR ACCOUNT", subtitle: "Manage your Windows account, sign-in and account preferences.", links: [
    item("Your information", "Account profile and Microsoft account links", "ms-settings:yourinfo", "user"),
    item("Sign-in options", "Password, PIN and supported sign-in methods", "ms-settings:signinoptions", "lock"),
    item("Other users", "Family and local users", "ms-settings:otherusers", "user"),
    item("Email & accounts", "Accounts used by applications", "ms-settings:emailandaccounts", "folder"),
    item("Work or school", "Connected work and school accounts", "ms-settings:workplace", "boxes"),
  ]},
];
const NATIVE = Boolean(window.__TAURI__ && window.__TAURI__.core && window.__TAURI__.core.invoke);
const invoke = NATIVE ? window.__TAURI__.core.invoke : null;
const defaults = {
  deviceName: "YOUR DEVICE", userName: "Windows user", osName: "Windows", osVersion: "", build: "",
  uptimeMinutes: 0, installedMemoryGb: 0, appsDark: true, systemDark: true,
  transparency: true, mouseSpeed: 10, keyboardSpeed: 27, powerPlans: [],
};
function getLocal(key, fallback) {
  try { const value = localStorage.getItem("widset2:" + key); return value === null ? fallback : JSON.parse(value); }
  catch { return fallback; }
}
function saveLocal(key, value) {
  try { localStorage.setItem("widset2:" + key, JSON.stringify(value)); } catch {}
}
let snapshot = Object.assign({}, defaults, NATIVE ? {} : getLocal("demo", {}));
let page = "overview";
let query = "";
let favorites = getLocal("favorites", []);
if (!Array.isArray(favorites)) favorites = [];
let toastTimer = null;
let pendingPlan = null;
let loading = NATIVE;
let uiError = "";
let searchFocused = false;
const root = document.getElementById("root");
function prettyUptime(minutes) {
  if (!minutes) return "—";
  const days = Math.floor(minutes / 1440);
  const hours = Math.floor(minutes % 1440 / 60);
  return days ? days + "d " + hours + "h" : hours + "h " + (minutes % 60) + "m";
}
function activePlan() {
  return (snapshot.powerPlans || []).find(function (p) { return p.active; });
}
function toneValue(key) { return Boolean(snapshot[key]); }
function markTitle(id) { return (SECTIONS.find(function (s) { return s.id === id; }) || {}).title || "Overview"; }
function navButton(id, label, symbol) {
  return '<button class="nav-link ' + (page === id ? "active" : "") + '" data-page="' + id + '" title="' + escapeHtml(label) + '">' +
    '<span class="nav-icon">' + icon(symbol, 18) + '</span><span class="nav-label">' + escapeHtml(label) + '</span>' +
    (page === id ? '<span class="nav-active-dot"></span>' : '') + '</button>';
}
function statusBadge() {
  return NATIVE ? '<span class="status-pill connected"><i></i> Windows connected</span>' :
    '<span class="status-pill demo"><i></i> Browser preview</span>';
}
function renderShell() {
  const nav = SECTIONS.map(function (s) { return navButton(s.id, s.title, s.icon); }).join("");
  return '<div class="app-shell">' +
    '<aside class="sidebar">' +
    '<div class="brand" data-tauri-drag-region><div class="brand-mark"><span></span><span></span><span></span><span></span></div><div class="brand-text"><strong>WidSet<span>V2</span></strong><small>WINDOWS CONTROL CENTER</small></div></div>' +
    '<div class="sidebar-label">WORKSPACE</div>' +
    navButton("overview", "Overview", "home") +
    navButton("favorites", "Favorites", "star") +
    '<div class="sidebar-label section-gap">WINDOWS SETTINGS</div>' +
    '<div class="sidebar-scroll">' + nav + '</div>' +
    '<div class="sidebar-bottom">' +
    '<div class="device-chip"><span class="device-chip-icon">' + icon("laptop", 18) + '</span><span class="device-chip-text"><b>' + escapeHtml(snapshot.deviceName) + '</b><small>' + escapeHtml(snapshot.osName + (snapshot.osVersion ? " · " + snapshot.osVersion : "")) + '</small></span><span class="device-chip-dot"></span></div>' +
    '<button class="nav-link about-link" data-page="about"><span class="nav-icon">' + icon("info", 18) + '</span><span class="nav-label">About WidSetV2</span></button>' +
    '</div></aside>' +
    '<div class="workspace">' +
    '<header class="topbar">' +
    '<div class="crumb" data-tauri-drag-region><span>WidSetV2</span>' + icon("chevron", 14) + '<b>' + escapeHtml(markTitle(page)) + '</b></div>' +
    '<div class="topbar-actions"><label class="search-field">' + icon("search", 17) + '<input id="global-search" type="search" placeholder="Search Windows settings..." autocomplete="off" aria-label="Search Windows settings" value="' + escapeHtml(query) + '"><kbd>Ctrl K</kbd></label>' +
    statusBadge() +
    '<button class="icon-button refresh-button" data-refresh aria-label="Refresh Windows values" title="Refresh">' + icon("refresh", 17) + '</button>' +
    '<div class="window-controls"><button data-window="minimize" aria-label="Minimize">' + icon("minimize", 14) + '</button><button data-window="maximize" aria-label="Maximize">' + icon("maximize", 13) + '</button><button data-window="close" class="win-close" aria-label="Close">' + icon("x", 15) + '</button></div>' +
    '</div></header>' +
    '<main class="content" id="page-content" tabindex="-1">' + renderPage() + '</main>' +
    '</div></div><div class="toast-container" id="toast-container" aria-live="polite"></div><div id="modal-anchor">' + (pendingPlan ? renderPowerConfirmation() : "") + '</div>';
}
function pageHeading(eyebrow, title, subtitle) {
  return '<div class="page-heading"><div class="eyebrow"><span class="eyebrow-bar"></span>' + escapeHtml(eyebrow) + '</div><h1>' + escapeHtml(title) + '</h1><p>' + escapeHtml(subtitle) + '</p></div>';
}
function sectionHeading(title, caption) {
  return '<div class="section-heading"><h2>' + escapeHtml(title) + '</h2>' + (caption ? '<span>' + escapeHtml(caption) + '</span>' : '') + '</div>';
}
function quickCard(title, text, symbol, uri, variant) {
  return '<button class="quick-card ' + (variant || '') + '" data-open="' + escapeHtml(uri) + '">' +
    '<span class="quick-card-symbol">' + icon(symbol, 22) + '</span><span class="quick-card-copy"><b>' + escapeHtml(title) + '</b><small>' + escapeHtml(text) + '</small></span>' +
    '<span class="quick-card-arrow">' + icon("arrow", 17) + '</span></button>';
}
function toggleControl(key, title, description) {
  const enabled = toneValue(key);
  return '<div class="setting-row"><div class="setting-text"><strong>' + escapeHtml(title) + '</strong><p>' + escapeHtml(description) + '</p></div>' +
    '<button class="switch ' + (enabled ? 'on' : '') + '" data-toggle="' + key + '" role="switch" aria-label="' + escapeHtml(title) + '" aria-checked="' + enabled + '"><span></span></button></div>';
}
function rangeControl(key, title, desc, min, max, unit) {
  const val = Number(snapshot[key]);
  const pct = (val - min) / (max - min) * 100;
  return '<div class="setting-row range-setting"><div class="setting-text"><strong>' + escapeHtml(title) + '</strong><p>' + escapeHtml(desc) + '</p></div>' +
    '<div class="range-tools"><span class="range-number" data-range-label="' + key + '">' + val + (unit || '') + '</span>' +
    '<input type="range" min="' + min + '" max="' + max + '" value="' + val + '" data-range="' + key + '" aria-label="' + escapeHtml(title) + '" style="--progress:' + pct + '%"></div></div>';
}
function settingGroup(title, note, inner) {
  return '<section class="setting-panel"><div class="panel-top"><div><h3>' + escapeHtml(title) + '</h3><p>' + escapeHtml(note) + '</p></div><span class="panel-side-mark">' + icon("sliders", 17) + '</span></div>' + inner + '</section>';
}
function overview() {
  const system = escapeHtml(snapshot.osName + (snapshot.osVersion ? " " + snapshot.osVersion : ""));
  const mem = snapshot.installedMemoryGb ? snapshot.installedMemoryGb + " GB" : "Unknown";
  return '<div class="page-enter">' +
    '<div class="hero-panel"><div class="hero-noise"></div><div class="hero-content"><div class="hero-tag">' + icon("spark", 14) + ' YOUR WINDOWS, REIMAGINED</div>' +
    '<h1>Everything in <em>one place.</em></h1><p>A faster, cleaner way to manage the Windows settings that matter.</p>' +
    '<div class="hero-buttons"><button class="btn-primary" data-page="appearance">Customize Windows ' + icon("arrow", 16) + '</button><button class="btn-secondary" data-page="system">Explore system settings</button></div>' +
    '</div><div class="hero-illustration" aria-hidden="true"><div class="hero-orbit orbit-one"></div><div class="hero-orbit orbit-two"></div><div class="hero-windows"><i></i><i></i><i></i><i></i></div></div></div>' +
    '<div class="metrics-grid">' +
    metric("OPERATING SYSTEM", system, "monitor") +
    metric("INSTALLED MEMORY", mem, "harddrive") +
    metric("DEVICE UPTIME", prettyUptime(snapshot.uptimeMinutes), "clock") +
    metric("POWER SCHEME", activePlan() ? activePlan().name : "Windows managed", "battery") +
    '</div>' +
    '<div class="two-columns"><div>' + sectionHeading("Quick access", "Windows settings") +
    '<div class="quick-grid">' +
    quickCard("Display", "Resolution & monitors", "monitor", "ms-settings:display") +
    quickCard("Sound", "Input & output", "volume", "ms-settings:sound") +
    quickCard("Bluetooth", "Connected devices", "wifi", "ms-settings:bluetooth") +
    quickCard("Updates", "Windows Update", "refresh", "ms-settings:windowsupdate") +
    '</div></div><div>' + sectionHeading("Instant controls", "Live when installed") +
    '<section class="setting-panel compact-panel">' +
    toggleControl("appsDark", "Dark mode for apps", "Use the dark theme in supported apps") +
    toggleControl("transparency", "Transparency effects", "Windows glass and transparency") +
    rangeControl("mouseSpeed", "Pointer speed", "Mouse sensitivity", 1, 20) +
    '</section></div></div>' +
    '<div class="info-strip">' + icon(NATIVE ? "shield" : "info", 18) + '<span>' +
    (NATIVE ? 'These controls change Windows settings for your current user. Some Windows changes may require reopening applications.' :
      'Preview mode: controls here are interactive but do not change Windows. Run the native WidSetV2 app for real system settings.') +
    '</span></div></div>';
}
function metric(label, value, symbol) {
  return '<div class="metric"><div class="metric-icon">' + icon(symbol, 18) + '</div><small>' + label + '</small><strong title="' + escapeHtml(value) + '">' + escapeHtml(value) + '</strong></div>';
}
function actionRow(a, category) {
  const saved = favorites.includes(a.uri);
  return '<div class="action-row"><div class="action-icon">' + icon(a.icon, 19) + '</div>' +
    '<div class="action-copy"><strong>' + escapeHtml(a.title) + '</strong><p>' + escapeHtml(a.description) + '</p></div>' +
    '<button class="favorite-button ' + (saved ? "saved" : "") + '" data-favorite="' + escapeHtml(a.uri) + '" aria-label="' + (saved ? "Remove from favorites" : "Add to favorites") + '" title="' + (saved ? "Remove favorite" : "Favorite") + '">' + icon("star", 16) + '</button>' +
    '<button class="open-button" data-open="' + escapeHtml(a.uri) + '" aria-label="Open ' + escapeHtml(a.title) + ' in Windows Settings">Open ' + icon("external", 14) + '</button></div>';
}
function actionGroup(actions) {
  return '<section class="link-panel">' + actions.map(function (a) { return actionRow(a); }).join("") + '</section>';
}
function sectionContent(section) {
  let controls = "";
  if (section.id === "appearance") {
    controls = sectionHeading("Appearance controls", "Changes Windows preferences") +
      settingGroup("Theme & visuals", "Applied to your current Windows profile",
        toggleControl("appsDark", "Dark mode for apps", "Use a dark appearance in supported applications.") +
        toggleControl("systemDark", "Dark Windows interface", "Use dark system surfaces, Start and taskbar where supported.") +
        toggleControl("transparency", "Transparency effects", "Enable translucent Windows surfaces and taskbar effects.")) +
      '<div class="inline-note">' + icon("info", 16) + ' Some apps update their theme only when restarted.</div>';
  }
  if (section.id === "devices") {
    controls = sectionHeading("Input controls", "Applied by Windows") +
      settingGroup("Mouse & keyboard", "System-level input preferences",
        rangeControl("mouseSpeed", "Mouse pointer speed", "Windows pointer speed from 1 to 20", 1, 20) +
        rangeControl("keyboardSpeed", "Keyboard repeat rate", "How quickly held keys repeat, from 0 to 31", 0, 31));
  }
  if (section.id === "power") {
    const plans = (snapshot.powerPlans || []);
    const options = plans.map(function (plan) {
      return '<option value="' + escapeHtml(plan.id) + '" ' + (plan.active ? 'selected' : '') + '>' + escapeHtml(plan.name) + (plan.active ? ' — active' : '') + '</option>';
    }).join("");
    controls = sectionHeading("Installed power plans", "Changes the Windows active scheme") +
      '<section class="setting-panel"><div class="panel-top"><div><h3>Active power scheme</h3><p>Select a plan already available on your device.</p></div>' + icon("battery", 19) + '</div>' +
      '<div class="power-select-row"><div class="setting-text"><strong>Windows power plan</strong><p>This is separate from some Windows 11 power mode choices.</p></div>' +
      '<select class="native-select" data-power-select ' + (!plans.length ? 'disabled' : '') + ' aria-label="Active power plan">' +
      (plans.length ? options : '<option>No power plans available in ' + (NATIVE ? 'Windows' : 'preview') + '</option>') +
      '</select></div></section>';
  }
  return '<div class="page-enter">' + pageHeading(section.eyebrow, section.title, section.subtitle) +
    (controls ? '<div class="controls-block">' + controls + '</div>' : '') +
    sectionHeading("Windows settings", section.links.length + " settings") +
    actionGroup(section.links) +
    '<div class="footer-note">' + icon("shield", 15) + ' Linked options open the official Windows Settings app. Not every page is available on every Windows device.</div></div>';
}
function favoritesPage() {
  const matching = SECTIONS.flatMap(function (s) { return s.links; }).filter(function (a, index, arr) {
    return favorites.includes(a.uri) && arr.findIndex(function (entry) { return entry.uri === a.uri; }) === index;
  });
  return '<div class="page-enter">' + pageHeading("YOUR SHORTCUTS", "Favorites", "Save the settings pages you use the most.") +
    (matching.length ? sectionHeading("Saved settings", matching.length + " shortcuts") + actionGroup(matching) :
      '<div class="empty-state">' + icon("star", 32) + '<h3>Nothing saved yet</h3><p>Use the star beside any Windows setting to add it to this page.</p><button class="btn-primary" data-page="system">Browse settings ' + icon("arrow", 16) + '</button></div>') + '</div>';
}
function searchResults() {
  const term = query.trim().toLowerCase();
  if (!term) return overview();
  const results = [];
  const seen = new Set();
  SECTIONS.forEach(function (section) {
    section.links.forEach(function (link) {
      if ((link.title + " " + link.description + " " + section.title).toLowerCase().includes(term) && !seen.has(link.uri)) {
        results.push(link);
        seen.add(link.uri);
      }
    });
  });
  return '<div class="page-enter">' + pageHeading("GLOBAL SEARCH", "Results for “" + query + "”", "Search across Windows Settings shortcuts.") +
    (results.length ? sectionHeading("Matching settings", results.length + " matches") + actionGroup(results) :
      '<div class="empty-state">' + icon("search", 34) + '<h3>No matching settings</h3><p>Try words like display, startup, Bluetooth, colors or mouse.</p></div>') + '</div>';
}
function aboutPage() {
  return '<div class="page-enter">' + pageHeading("ABOUT THE APP", "Built for Windows.", "WidSetV2 combines directly adjustable preferences with official settings shortcuts.") +
    '<div class="about-card"><div class="about-logo"><div class="brand-mark"><span></span><span></span><span></span><span></span></div></div>' +
    '<div><h2>WidSetV2 <span class="version-tag">2.0</span></h2><p>Native desktop settings control center — Tauri 2 + Rust + WebView2.</p><div class="about-badges"><span>No Electron</span><span>Offline first</span><span>No telemetry</span></div></div></div>' +
    settingGroup("Built for your device", "Information read from Windows when running natively",
      '<div class="detail-row"><span>Computer</span><strong>' + escapeHtml(snapshot.deviceName) + '</strong></div>' +
      '<div class="detail-row"><span>Windows version</span><strong>' + escapeHtml(snapshot.osName + " " + snapshot.osVersion) + '</strong></div>' +
      '<div class="detail-row"><span>Build</span><strong>' + escapeHtml(snapshot.build || "—") + '</strong></div>' +
      '<div class="detail-row"><span>Mode</span><strong>' + (NATIVE ? 'Native / connected' : 'Browser preview only') + '</strong></div>') +
    '<div class="info-strip">' + icon("shield", 18) + '<span>WidSetV2 intentionally does not provide administrator bypasses, disable security services, or run arbitrary system commands.</span></div>' +
    '</div>';
}
function renderPage() {
  if (query.trim()) return searchResults();
  if (page === "overview") return overview();
  if (page === "favorites") return favoritesPage();
  if (page === "about") return aboutPage();
  const section = SECTIONS.find(function (s) { return s.id === page; });
  return section ? sectionContent(section) : overview();
}
function renderPowerConfirmation() {
  return '<div class="modal-backdrop"><div class="confirm-modal" role="dialog" aria-modal="true" aria-labelledby="confirm-title"><div class="confirm-mark">' + icon("battery", 22) + '</div><h2 id="confirm-title">Change power plan?</h2>' +
    '<p>Windows will switch to <strong>' + escapeHtml(pendingPlan.name) + '</strong>. Power consumption and performance can change.</p>' +
    '<div class="modal-actions"><button class="btn-secondary" data-confirm="cancel">Cancel</button><button class="btn-primary" data-confirm="apply">Apply plan</button></div></div></div>';
}
function render() {
  root.innerHTML = renderShell();
}
function toast(message, kind) {
  const container = document.getElementById("toast-container");
  if (!container) return;
  container.innerHTML = '<div class="toast ' + (kind || "success") + '">' + icon(kind === "error" ? "info" : "check", 17) + '<span>' + escapeHtml(message) + '</span><button data-toast-close aria-label="Dismiss">' + icon("x", 14) + '</button></div>';
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () { if (container) container.innerHTML = ""; }, 4800);
  const announce = document.getElementById("announcer");
  if (announce) announce.textContent = message;
}
async function refresh(notify) {
  if (!NATIVE) {
    if (notify) toast("Browser preview: system data is available in the native app.", "info");
    return;
  }
  try {
    const result = await invoke("get_snapshot");
    snapshot = Object.assign({}, defaults, result);
    render();
    if (notify) toast("Windows settings refreshed.");
  } catch (err) {
    toast("Could not read Windows settings: " + String(err), "error");
  }
}
async function changeSetting(key, value) {
  const prior = snapshot[key];
  snapshot[key] = value;
  if (!NATIVE) {
    saveLocal("demo", snapshot);
    render();
    toast("Preview only — Windows was not changed.", "info");
    return;
  }
  try {
    await invoke("set_preference", { key, value: Number(value) });
    await refresh(false);
    toast("Windows setting updated.");
  } catch (err) {
    snapshot[key] = prior;
    render();
    toast(String(err), "error");
  }
}
async function launchSettings(uri) {
  if (!NATIVE) {
    toast("Settings shortcuts work in the installed Windows app.", "info");
    return;
  }
  try {
    await invoke("open_settings", { uri });
    toast("Opened Windows Settings.");
  } catch (err) {
    toast(String(err), "error");
  }
}
async function windowAction(action) {
  if (!NATIVE) {
    if (action === "maximize") toast("Window actions are available in the desktop app.", "info");
    else if (action === "close") toast("Close the browser tab to exit preview.", "info");
    else toast("Minimize the browser to hide this preview.", "info");
    return;
  }
  const win = window.__TAURI__.window.getCurrentWindow();
  try {
    if (action === "minimize") await win.minimize();
    else if (action === "maximize") await win.toggleMaximize();
    else if (action === "close") await win.close();
  } catch (err) { toast(String(err), "error"); }
}
root.addEventListener("click", async function (event) {
  const el = event.target.closest("[data-page],[data-open],[data-toggle],[data-favorite],[data-refresh],[data-window],[data-confirm],[data-toast-close]");
  if (!el) return;
  if (el.hasAttribute("data-page")) {
    page = el.getAttribute("data-page");
    query = "";
    render();
    document.getElementById("page-content").scrollTop = 0;
  } else if (el.hasAttribute("data-open")) {
    await launchSettings(el.getAttribute("data-open"));
  } else if (el.hasAttribute("data-toggle")) {
    const key = el.getAttribute("data-toggle");
    await changeSetting(key, snapshot[key] ? 0 : 1);
  } else if (el.hasAttribute("data-favorite")) {
    const uri = el.getAttribute("data-favorite");
    favorites = favorites.includes(uri) ? favorites.filter(function (value) { return value !== uri; }) : favorites.concat([uri]);
    saveLocal("favorites", favorites);
    render();
    toast(favorites.includes(uri) ? "Added to favorites." : "Removed from favorites.");
  } else if (el.hasAttribute("data-refresh")) {
    await refresh(true);
  } else if (el.hasAttribute("data-window")) {
    await windowAction(el.getAttribute("data-window"));
  } else if (el.hasAttribute("data-toast-close")) {
    document.getElementById("toast-container").innerHTML = "";
  } else if (el.hasAttribute("data-confirm")) {
    const decision = el.getAttribute("data-confirm");
    const chosen = pendingPlan;
    pendingPlan = null;
    render();
    if (decision === "apply" && chosen) {
      if (!NATIVE) {
        snapshot.powerPlans.forEach(function (plan) { plan.active = plan.id === chosen.id; });
        saveLocal("demo", snapshot);
        render();
        toast("Preview only — no power plan was changed.", "info");
      } else {
        try {
          await invoke("set_power_plan", { id: chosen.id });
          await refresh(false);
          toast("Active Windows power scheme updated.");
        } catch (err) { toast(String(err), "error"); }
      }
    }
  }
});
root.addEventListener("input", function (event) {
  const el = event.target;
  if (el.id === "global-search") {
    query = el.value;
    document.getElementById("page-content").innerHTML = renderPage();
    document.getElementById("page-content").scrollTop = 0;
  } else if (el.hasAttribute("data-range")) {
    const key = el.getAttribute("data-range");
    const label = document.querySelector('[data-range-label="' + key + '"]');
    if (label) label.textContent = el.value;
    el.style.setProperty("--progress", (Number(el.value) - Number(el.min)) / (Number(el.max) - Number(el.min)) * 100 + "%");
  }
});
root.addEventListener("change", async function (event) {
  const el = event.target;
  if (el.hasAttribute("data-range")) {
    await changeSetting(el.getAttribute("data-range"), Number(el.value));
  } else if (el.hasAttribute("data-power-select")) {
    const selected = (snapshot.powerPlans || []).find(function (plan) { return plan.id === el.value; });
    if (selected && !selected.active) {
      pendingPlan = selected;
      render();
    }
  }
});
document.addEventListener("keydown", function (event) {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    document.getElementById("global-search")?.focus();
  }
  if (event.key === "Escape") {
    if (pendingPlan) {
      pendingPlan = null;
      render();
      return;
    }
    if (query) {
      query = "";
      render();
      document.getElementById("global-search")?.blur();
    }
  }
});
render();
if (NATIVE) refresh(false);
