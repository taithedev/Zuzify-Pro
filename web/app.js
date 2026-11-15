/* ZuzifyPro — all controls are local UI demonstrations. No game/process integration. */
'use strict';

const icons = {
  logo: '<path d="m12 2 2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2L12 2Z"/><path d="M12 8.2v7.6M8.2 12h7.6"/>',
  target: '<circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="2"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>',
  dot: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="2"/>',
  cursor: '<path d="M5 3.5 19 13l-7 1.2-3 6-4-16.7Z"/><path d="m12 14 3 5"/>',
  monitor: '<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4"/>',
  settings: '<path d="M9.7 3.2 10.3 2h3.4l.6 1.2 1.9.8 1.3-.4 2.4 2.4-.5 1.3.8 1.9 1.3.6v3.4l-1.3.6-.8 1.9.5 1.3-2.4 2.4-1.3-.5-1.9.8-.6 1.3h-3.4l-.6-1.3-1.9-.8-1.3.5-2.4-2.4.5-1.3-.8-1.9L2 13.7v-3.4l1.3-.6.8-1.9-.5-1.3L6 4.1l1.3.5 2.4-.8Z"/><circle cx="12" cy="12" r="3"/>',
  shield: '<path d="M12 2.5 20 5v6c0 5-3.4 8.3-8 10.5C7.4 19.3 4 16 4 11V5l8-2.5Z"/><path d="m9.6 12 1.6 1.6 3.4-3.7"/>',
  user: '<circle cx="12" cy="8" r="3"/><path d="M5 20c.6-4.2 3.1-6 7-6s6.4 1.8 7 6"/>',
  down: '<path d="m6 9 6 6 6-6"/>',
  right: '<path d="m9 6 6 6-6 6"/>',
  out: '<path d="M7 17 17 7M9 7h8v8"/>',
  filter: '<path d="M3 5h18l-7 8v6l-4 2v-8L3 5Z"/>',
  check: '<path d="m5 12 4.4 4.3L19 7"/>',
  minus: '<path d="M6 12h12"/>',
  plus: '<path d="M12 6v12M6 12h12"/>',
  keyboard: '<rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="M6 9h.01M10 9h.01M14 9h.01M18 9h.01M6 12h.01M10 12h.01M14 12h.01M18 12h.01M7 15h10"/>',
  response: '<path d="M6 2 18 13l-6.5-.5L9 20 6 2Z"/>',
  sliders: '<path d="M4 7h16M4 17h16"/><circle cx="9" cy="7" r="2"/><circle cx="15" cy="17" r="2"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 7.5h.01"/>',
  chevronUp: '<path d="m6 15 6-6 6 6"/>',
};
const svg = (name, size=12, extra='') => `<svg aria-hidden="true" class="ico ${extra}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${icons[name] || icons.dot}</svg>`;

const nav = [
  {id:'Combat',icon:'target',items:[['Aimbot','dot'],['Triggerbot','cursor'],['Targeting','target']]},
  {id:'Visuals',icon:'monitor',items:[['Indicators','dot'],['Appearance','sliders'],['Environment','monitor']]},
  {id:'Misc',icon:'settings',items:[['Interface','sliders'],['Preferences','settings'],['About','info']]},
  {id:'Exploits',icon:'shield',items:[['Demo Tools','shield'],['Safety','info']]},
];
const defaults = {
  tab:'Targets', section:'Combat', page:'Aimbot',
  expanded:{Combat:true,Visuals:false,Misc:false,Exploits:false},
  toggles:{
    targetSelection:true,visibleTargets:true,skipTeammates:true,preferNearest:true,
    aimbotBehavior:true,adaptiveGuidance:false,pauseManual:false,keepCurrent:false,
    aimbotProfile:true,targetHighlight:false,showGuidance:false,keepHistory:false,showHint:false,
    rememberGuidance:false,secondaryProfile:false,
    demoOverlay:true,softMotion:true,quietMode:false,compactMode:true,notifications:false,
    enableResponse:true,enableLimit:true,showPreview:false,
  },
  selects:{targetPriority:'Automatic',responsePolicy:'Balanced',profileMode:'Default',activationKey:'None',indicatorDetail:'Minimal',overrideKey:'None',profilePreset:'Default',appearance:'Charcoal',animationStyle:'Subtle',limitPreset:'Standard'},
  sliders:{detectionRadius:12,transitionDelay:10,profileStrength:46,indicatorFade:25,responseSpeed:36,responseSmooth:54,maxIndicators:35,uiOpacity:88,glowStrength:20,animationSpeed:42},
};
const clone = obj => JSON.parse(JSON.stringify(obj));
const load = () => {
  try {
    const old = JSON.parse(localStorage.getItem('zuzifypro-ui-v1')) || {};
    return { ...clone(defaults),...old,expanded:{...defaults.expanded,...old.expanded},toggles:{...defaults.toggles,...old.toggles},selects:{...defaults.selects,...old.selects},sliders:{...defaults.sliders,...old.sliders} };
  } catch { return clone(defaults); }
};
let state = load();
let awaitingBind = null;
const save = () => { try { localStorage.setItem('zuzifypro-ui-v1',JSON.stringify(state)); } catch { /* Allow file:// previews without storage permission. */ } };
const escapeHTML = (str) => String(str).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const pill = (id,label,icon) => `<button class="tab-pill ${state.tab===id?'selected':''}" data-tab="${id}" aria-pressed="${state.tab===id}">${svg(icon,11)}<span>${label}</span></button>`;
const toggle = (key,label,subClass='') => `<div class="setting-row ${subClass}"><span class="setting-name">${label}</span><button type="button" class="switch ${state.toggles[key]?'on':''}" data-toggle="${key}" role="switch" aria-label="${escapeHTML(label)}" aria-checked="${!!state.toggles[key]}"><span class="switch-knob">${state.toggles[key]?svg('check',9):svg('minus',8)}</span></button></div>`;
const select = (key,label,opts,extra='') => `<label class="setting-row select-row ${extra}"><span class="setting-name">${label}</span><span class="select-wrap"><select data-select="${key}" aria-label="${escapeHTML(label)}">${opts.map(o=>`<option value="${escapeHTML(o)}" ${state.selects[key]===o?'selected':''}>${escapeHTML(o)}</option>`).join('')}</select>${svg('down',9,'select-chevron')}</span></label>`;
const slider = (key,label,extra='') => `<div class="slider-group ${extra}"><div class="setting-name">${label}</div><div class="slider-line"><button type="button" aria-label="Decrease ${escapeHTML(label)}" class="step-btn" data-step="${key}" data-change="-5">${svg('minus',8)}</button><input aria-label="${escapeHTML(label)}" type="range" min="0" max="100" step="1" data-slider="${key}" value="${state.sliders[key]}" style="--percent:${state.sliders[key]}%"><button type="button" aria-label="Increase ${escapeHTML(label)}" class="step-btn" data-step="${key}" data-change="5">${svg('plus',8)}</button></div></div>`;
const keybind = (key,label) => `<div class="setting-row"><span class="setting-name">${label}</span><button type="button" class="key-button" data-bind="${key}" title="Click to change the demo shortcut"><span>${escapeHTML(state.selects[key])}</span>${svg('keyboard',9)}</button></div>`;
const card = (title,description,toggleKey,body,className='') => `<section class="settings-card ${className}" aria-label="${escapeHTML(title)}"><header class="card-head"><div class="head-title">${title}</div>${toggleKey?`<button class="switch ${state.toggles[toggleKey]?'on':''} head-toggle" data-toggle="${toggleKey}" role="switch" aria-label="Enable ${escapeHTML(title)}" aria-checked="${!!state.toggles[toggleKey]}"><span class="switch-knob">${state.toggles[toggleKey]?svg('check',9):svg('minus',8)}</span></button>`:''}${description?`<div class="card-description">${description}</div>`:''}</header><div class="card-body">${body}</div></section>`;

function aimbotPage(){
  const first = card('Target Selection','Choose which targets assistance follows','targetSelection',[
    toggle('visibleTargets','Visible Targets'),toggle('skipTeammates','Skip Teammates'),toggle('preferNearest','Prefer Nearest'),slider('detectionRadius','Detection Radius'),select('targetPriority','Target Priority',['Automatic','Nearest','Centered','Manual']),
  ].join(''),'card-first');
  const second = card('Aimbot Behavior','Balance responsiveness and control','aimbotBehavior',[
    toggle('adaptiveGuidance','Adaptive Guidance'),toggle('pauseManual','Pause On Manual Input'),toggle('keepCurrent','Keep Current Target'),select('responsePolicy','Response Policy',['Balanced','Smooth','Responsive','Custom']),slider('transitionDelay','Transition Delay')
  ].join(''),'card-second');
  const right = card('Aimbot Profile','Activation and target preferences','aimbotProfile',[
    select('profileMode','Profile Mode',['Default','Custom','Low Motion','Presentation']),keybind('activationKey','Activation Key'),
    toggle('targetHighlight','Target Highlight'),toggle('showGuidance','Show Guidance Radius'),toggle('keepHistory','Keep Target History'),toggle('showHint','Show Response Hint'),toggle('rememberGuidance','Remember Guidance Mode'),
    slider('profileStrength','Profile Strength'),select('indicatorDetail','Indicator Detail',['Minimal','Standard','Detailed']),toggle('secondaryProfile','Use Secondary Profile'),keybind('overrideKey','Override Key'),slider('indicatorFade','Indicator Fade')
  ].join(''),'card-right');
  return `<div class="left-column">${first}${second}</div><div class="right-column">${right}</div>`;
}
function alternatePage() {
  const data = {
    Triggerbot:['Triggerbot Preview','Interface behavior only — demo controls', ['Demo Overlay','Show Preview','Quiet Mode']],
    Targeting:['Targeting Preview','Local placeholder target visualization',['Visible Targets','Target Highlight','Keep Target History']],
    Indicators:['Indicator Display','Choose visual preview details',['Show Guidance Radius','Target Highlight','Show Response Hint']],
    Appearance:['Appearance','Fine-tune the interface styling',['Soft Motion','Compact Mode','Demo Overlay']],
    Environment:['Environment','Atmosphere and background options',['Demo Overlay','Soft Motion','Quiet Mode']],
    Interface:['Interface Settings','Adjust the appearance of this window',['Compact Mode','Soft Motion','Notifications']],
    Preferences:['Preferences','Saved locally on this computer',['Quiet Mode','Notifications','Show Preview']],
    About:['About ZuzifyPro','Premium interface demonstration',['Demo Overlay','Soft Motion','Compact Mode']],
    'Demo Tools':['Demo Tools','All actions are intentionally non-operational',['Demo Overlay','Show Preview','Quiet Mode']],
    Safety:['Safe Demo Mode','No game or external process is accessed',['Quiet Mode','Compact Mode','Notifications']],
  };
  const [title,desc,labels]=data[state.page]||data.Targeting;
  const keys = ['demoOverlay','showPreview','quietMode','softMotion','compactMode','notifications','visibleTargets','targetHighlight','keepHistory','showGuidance','showHint'];
  const keyFrom = l => ({'Demo Overlay':'demoOverlay','Show Preview':'showPreview','Quiet Mode':'quietMode','Soft Motion':'softMotion','Compact Mode':'compactMode','Notifications':'notifications','Visible Targets':'visibleTargets','Target Highlight':'targetHighlight','Keep Target History':'keepHistory','Show Guidance Radius':'showGuidance','Show Response Hint':'showHint'})[l]||keys[0];
  return `<div class="left-column">${card(title,desc,'demoOverlay',labels.map(l=>toggle(keyFrom(l),l)).join('')+slider('uiOpacity','Interface Opacity')+select('appearance','Color Theme',['Charcoal','Midnight','Slate']),'card-first')}${card('Display Behavior','Preview settings and interactions','softMotion',toggle('softMotion','Smooth Transitions')+toggle('compactMode','Compact Spacing')+select('animationStyle','Animation Style',['Subtle','Reduced','None'])+slider('animationSpeed','Animation Speed'),'card-second')}</div><div class="right-column">${card('Preview Configuration','Locally stored visual preferences','demoOverlay',select('profilePreset','Profile',['Default','Custom','Presentation'])+toggle('showPreview','Show Interface Preview')+toggle('notifications','Local Notifications')+slider('glowStrength','Edge Highlight')+slider('indicatorFade','Overlay Fade')+'<div class="demo-note">This interface does not connect to games or other applications. All controls demonstrate appearance and interaction only.</div>','card-right')}</div>`;
}
function tabPage() {
  if (state.tab==='Targets') return state.section==='Combat'&&state.page==='Aimbot' ? aimbotPage() : alternatePage();
  if (state.tab==='Response') return `<div class="left-column">${card('Response Settings','Tune local interface transitions','enableResponse',toggle('adaptiveGuidance','Adaptive Guidance')+toggle('pauseManual','Pause On Manual Input')+slider('responseSpeed','Response Speed')+select('responsePolicy','Response Policy',['Balanced','Smooth','Responsive','Custom']),'card-first')}${card('Input Behavior','Adjust demo input feedback','softMotion',toggle('softMotion','Smooth Motion')+toggle('keepCurrent','Keep Current Selection')+slider('responseSmooth','Transition Smoothing'),'card-second')}</div><div class="right-column">${card('Response Profile','Preview options and visual feedback','demoOverlay',select('profileMode','Profile Mode',['Default','Custom','Low Motion','Presentation'])+toggle('showHint','Show Response Hint')+toggle('rememberGuidance','Remember Guidance Mode')+slider('profileStrength','Profile Strength')+select('animationStyle','Animation Style',['Subtle','Reduced','None'])+toggle('quietMode','Quiet Mode')+slider('indicatorFade','Indicator Fade'),'card-right')}</div>`;
  return `<div class="left-column">${card('Display Limits','Local preview controls only','enableLimit',toggle('showGuidance','Show Guidance Radius')+toggle('showPreview','Show Preview')+slider('maxIndicators','Max Indicators')+select('limitPreset','Limit Preset',['Standard','Minimal','Custom']),'card-first')}${card('Animation Limits','Reduce optional visual effects','softMotion',toggle('softMotion','Smooth Transitions')+toggle('quietMode','Quiet Mode')+slider('animationSpeed','Animation Speed'),'card-second')}</div><div class="right-column">${card('Limit Profile','Appearance and interface preferences','demoOverlay',select('profileMode','Profile Mode',['Default','Custom','Low Motion','Presentation'])+toggle('compactMode','Compact Mode')+slider('uiOpacity','Interface Opacity')+slider('glowStrength','Edge Highlight')+toggle('notifications','Local Notifications')+'<div class="demo-note">These settings are stored locally. Nothing is sent to, read from, or modified in external software.</div>','card-right')}</div>`;
}

function sidebar() {
  return `<aside class="sidebar"><button class="brand-box" data-action="home" aria-label="ZuzifyPro home"><span class="brand-symbol">${svg('logo',19)}</span><span class="brand-copy"><strong>ZUZIFYPRO</strong><small>DESKTOP PREVIEW</small></span><span class="brand-light"></span></button><nav class="sidebar-nav" aria-label="Primary navigation">${nav.map(group=>{
    const active=state.section===group.id,expanded=state.expanded[group.id];
    return `<div class="nav-group ${active?'is-active':''} ${expanded?'is-expanded':''}"><button class="group-header" data-group="${group.id}" aria-expanded="${expanded}">${svg(group.icon,13)}<span>${group.id}</span>${svg(expanded?'down':'right',9,'group-chevron')}</button>${expanded?`<div class="group-children">${group.items.map(([label,icon])=>`<button class="nav-item ${active&&state.page===label?'current':''}" data-page="${escapeHTML(label)}" data-section="${group.id}">${svg(icon,12)}<span>${escapeHTML(label)}</span>${active&&state.page===label?'<i class="selection-dot"></i>':''}</button>`).join('')}</div>`:''}</div>`;}).join('')}</nav><button class="account-box" data-action="account" aria-label="Demo profile information"><span class="account-avatar">${svg('user',12)}</span><span class="account-copy"><strong>Demo User</strong><small>Local preview</small></span><span class="account-action">${svg('out',11)}</span></button></aside>`;
}
function atmosphere() {
  return `<div class="atmosphere" aria-hidden="true"><svg viewBox="0 0 660 440" preserveAspectRatio="xMidYMax slice"><defs><linearGradient id="mist" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#4c5157" stop-opacity="0"/><stop offset="1" stop-color="#070b0e" stop-opacity=".8"/></linearGradient><filter id="blur"><feGaussianBlur stdDeviation="9"/></filter></defs><path d="M0 275q70-40 133-10 50-30 105-5 90-24 139-3 99-30 148-6 60-26 135 18v171H0Z" fill="url(#mist)" opacity=".37" filter="url(#blur)"/><g stroke="#0b1012" fill="none" opacity=".52"><path stroke-width="3" d="M20 440 24 344 14 312m10 63 26-65m-26 48L4 330M79 440 67 369l-26-22m27 40 23-24M114 440l6-91 23-27m-25 44-25-15M602 440l8-130-25-49m24 91 27-39M640 440l-11-94 22-30"/><path stroke-width="1.4" d="M25 383 7 354m18 18 14-25M49 438l-8-71m9 30 24-26M109 398l-25-28m38-8 25-20m459 23-24-29m28 8 22-20"/></g><rect x="0" y="260" width="660" height="180" fill="url(#mist)" opacity=".33"/></svg></div>`;
}
function render(){
  document.body.dataset.theme = (state.selects.appearance || 'Charcoal').toLowerCase();
  document.body.dataset.motion = (state.selects.animationStyle || 'Subtle').toLowerCase();
  document.documentElement.style.setProperty('--edge-glow', (Number(state.sliders.glowStrength || 0) / 100).toFixed(2));
  document.title = `ZuzifyPro · ${state.tab}`;
  document.getElementById('root').innerHTML = `<div class="outer-frame"><div class="app-window">${atmosphere()}${sidebar()}<main class="workspace"><header class="topbar"><div class="drag-target" data-tauri-drag-region="true"></div><div class="tabs" role="tablist" aria-label="Settings pages">${pill('Targets','Targets','dot')}${pill('Response','Response','cursor')}${pill('Limits','Limits','filter')}</div><button class="settings-shortcut" data-action="settings" title="Settings" aria-label="Settings">${svg('settings',13)}</button></header><div class="content-grid">${tabPage()}</div></main><div id="modal-layer"></div></div></div>`;
}
function notify(message){
  let el = document.querySelector('.toast'); if(el)el.remove();
  el=document.createElement('div');el.className='toast';el.textContent=message;document.querySelector('.app-window').appendChild(el);setTimeout(()=>el.remove(),2200);
}
function showSettings() {
  const layer=document.getElementById('modal-layer');
  layer.innerHTML=`<div class="modal-backdrop" data-action="dismiss"><section class="modal" role="dialog" aria-modal="true" aria-label="ZuzifyPro Settings"><div class="modal-header">${svg('settings',14)}<strong>Application Settings</strong><button class="modal-close" data-action="dismiss" aria-label="Close">×</button></div><div class="modal-content"><p>ZuzifyPro UI preview</p><p>All interactive controls store their values locally. The application has no integrations with games, processes, or other software.</p><button type="button" class="reset-button" data-action="reset">Reset interface settings</button><div class="window-actions"><button type="button" class="reset-button" data-action="minimize">Minimize window</button><button type="button" class="reset-button" data-action="closeapp">Close ZuzifyPro</button></div></div></section></div>`;
}
function showAccount(){
  document.getElementById('modal-layer').innerHTML=`<div class="modal-backdrop" data-action="dismiss"><section class="modal" role="dialog" aria-modal="true" aria-label="Demo Account"><div class="modal-header">${svg('user',14)}<strong>Demo User</strong><button class="modal-close" data-action="dismiss" aria-label="Close">×</button></div><div class="modal-content"><p>Local preview profile. No account, subscription, sign-in, or external service is required.</p><p>Settings are saved only in this app's local storage.</p></div></section></div>`;
}
render();

document.addEventListener('click',event=>{
  const target=event.target.closest('button,[data-action]'); if(!target) return;
  if(target.dataset.tab){state.tab=target.dataset.tab;save();render();return;}
  if(target.dataset.group){const group=target.dataset.group;state.expanded[group]=!state.expanded[group];state.section=group;if(state.expanded[group]&&state.page!==nav.find(n=>n.id===group).items[0][0]) state.page=nav.find(n=>n.id===group).items[0][0];save();render();return;}
  if(target.dataset.page){state.page=target.dataset.page;state.section=target.dataset.section;state.tab='Targets';save();render();return;}
  if(target.dataset.toggle){let key=target.dataset.toggle;state.toggles[key]=!state.toggles[key];save();const on=state.toggles[key];target.classList.toggle('on',on);target.setAttribute('aria-checked',String(on));document.querySelectorAll(`[data-toggle="${key}"]`).forEach(button=>{button.classList.toggle('on',on);button.setAttribute('aria-checked',String(on));button.querySelector('.switch-knob').innerHTML=on?svg('check',9):svg('minus',8);});return;}
  if(target.dataset.step){const key=target.dataset.step;const change=Number(target.dataset.change);state.sliders[key]=Math.max(0,Math.min(100,Number(state.sliders[key])+change));save();const input=document.querySelector(`[data-slider="${key}"]`);if(input){input.value=state.sliders[key];input.style.setProperty('--percent',`${state.sliders[key]}%`);}return;}
  if(target.dataset.bind){awaitingBind=target.dataset.bind;target.querySelector('span').textContent='Press key';target.classList.add('listening');notify('Press a key · Backspace clears · Esc cancels');return;}
  switch(target.dataset.action){
    case 'home':state.tab='Targets';state.section='Combat';state.page='Aimbot';state.expanded.Combat=true;save();render();break;
    case 'settings':showSettings();break;
    case 'account':showAccount();break;
    case 'dismiss':if(target.classList.contains('modal-backdrop')||target.classList.contains('modal-close'))document.getElementById('modal-layer').innerHTML='';break;
    case 'reset':state=clone(defaults);save();render();notify('Interface settings restored');break;
    case 'minimize':if(window.__TAURI__?.window?.getCurrentWindow){window.__TAURI__.window.getCurrentWindow().minimize().catch(()=>notify('Could not minimize window'));}else notify('Window controls available in desktop build');break;
    case 'closeapp':if(window.__TAURI__?.window?.getCurrentWindow){window.__TAURI__.window.getCurrentWindow().close().catch(()=>notify('Could not close window'));}else notify('Close this browser tab to exit preview');break;
  }
});
document.addEventListener('change',event=>{const select=event.target.closest('[data-select]');if(select){state.selects[select.dataset.select]=select.value;save();render();}});
document.addEventListener('input',event=>{const el=event.target.closest('[data-slider]');if(!el)return;state.sliders[el.dataset.slider]=Number(el.value);el.style.setProperty('--percent',`${el.value}%`);save();});
document.addEventListener('keydown',event=>{
  if(awaitingBind){
    event.preventDefault();const key=awaitingBind;awaitingBind=null;
    if(event.key!=='Escape'){state.selects[key]=event.key==='Backspace'?'None':(event.key.length===1?event.key.toUpperCase():event.key);save();render();notify('Demo shortcut saved');}else render();
    return;
  }
  if(event.key==='Escape'&&document.getElementById('modal-layer').children.length)document.getElementById('modal-layer').innerHTML='';
});
