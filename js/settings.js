/* ============================================
   settings.js — Fullscreen Settings Modal, Grouped Views, Account & Appearance
   ============================================ */

let userData = {};

function userKey() {
  return currentUser ? 'kairo_user_' + currentUser : 'kairo_guest';
}

function loadUserData() {
  try { userData = JSON.parse(localStorage.getItem(userKey()) || '{}'); }
  catch(e) { userData = {}; }

  const name = userData.displayName || (currentUser && currentUser !== 'guest' ? currentUser.split('@')[0] : 'Murilo');
  const email = userData.email || (currentUser && currentUser !== 'guest' ? currentUser : 'murilosilvadacosta5ano@gmail.com');

  const sheetUserEmail = document.getElementById('sheet-user-email');
  if (sheetUserEmail) sheetUserEmail.textContent = email;

  const sheetUserAvatar = document.getElementById('sheet-user-avatar');
  if (sheetUserAvatar) sheetUserAvatar.textContent = name[0]?.toUpperCase() || 'M';

  const sidebarUser = document.getElementById('sidebar-user');
  if (sidebarUser) sidebarUser.textContent = name;

  const sidebarAvatar = document.getElementById('sidebar-avatar');
  if (sidebarAvatar) sidebarAvatar.textContent = name[0]?.toUpperCase() || 'M';

  const profName = document.getElementById('prof-name');
  if (profName) profName.value = name;

  const profEmail = document.getElementById('prof-email');
  if (profEmail) profEmail.value = email;

  const profBio = document.getElementById('prof-bio');
  if (profBio && userData.bio) profBio.value = userData.bio;

  const sp = document.getElementById('system-prompt');
  if (sp && userData.systemPrompt) sp.value = userData.systemPrompt;

  document.querySelectorAll('[data-skill]').forEach(el => {
    const on = userData.skills?.[el.dataset.skill] !== false;
    el.querySelector('.toggle')?.classList.toggle('on', on);
  });
  document.querySelectorAll('[data-conn]').forEach(el => {
    const on = !!userData.connectors?.[el.dataset.conn];
    el.querySelector('.toggle')?.classList.toggle('on', on);
  });

  const set = (id, v) => {
    const e = document.getElementById(id);
    if (e && v !== undefined) e.classList.toggle('on', !!v);
  };
  set('haptic-toggle', userData.haptic !== false);
  set('notif-email', userData.notifEmail);
  set('notif-product', userData.notifProduct !== false);
  set('notif-features', userData.notifFeatures !== false);
  set('focus-mode', userData.focusMode);
  set('quiet-hours', userData.quietHours);
  set('privacy-history', userData.privacyHistory !== false);
  set('privacy-memory', userData.privacyMemory !== false);
  set('perm-mic', userData.permMic !== false);
  set('perm-camera', userData.permCamera);
  set('perm-files', userData.permFiles !== false);
  set('voice-responses', userData.voiceResponses);

  if (userData.voiceLang) {
    const vl = document.getElementById('voice-lang');
    if (vl) vl.value = userData.voiceLang;
  }

  const activeTheme = userData.theme || localStorage.getItem('kairo_theme') || 'light';
  applyTheme(activeTheme);
}

function saveUserData() {
  if (!userData.skills) userData.skills = {};
  if (!userData.connectors) userData.connectors = {};

  document.querySelectorAll('[data-skill]').forEach(el => {
    userData.skills[el.dataset.skill] = el.querySelector('.toggle')?.classList.contains('on');
  });
  document.querySelectorAll('[data-conn]').forEach(el => {
    userData.connectors[el.dataset.conn] = el.querySelector('.toggle')?.classList.contains('on');
  });

  const on = id => document.getElementById(id)?.classList.contains('on');
  userData.haptic = on('haptic-toggle');
  userData.notifEmail = on('notif-email');
  userData.notifProduct = on('notif-product');
  userData.notifFeatures = on('notif-features');
  userData.focusMode = on('focus-mode');
  userData.quietHours = on('quiet-hours');
  userData.privacyHistory = on('privacy-history');
  userData.privacyMemory = on('privacy-memory');
  userData.permMic = on('perm-mic');
  userData.permCamera = on('perm-camera');
  userData.permFiles = on('perm-files');
  userData.voiceResponses = on('voice-responses');
  userData.voiceLang = document.getElementById('voice-lang')?.value;
  userData.systemPrompt = document.getElementById('system-prompt')?.value || '';

  localStorage.setItem(userKey(), JSON.stringify(userData));
  showToast(lang === 'pt' ? 'Salvo com sucesso' : 'Saved to your account');
}

function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2000);
}

function toggleSkill(el) { el.classList.toggle('on'); saveUserData(); }
function toggleConn(el) { el.classList.toggle('on'); saveUserData(); }

function saveInstructions() {
  userData.systemPrompt = document.getElementById('system-prompt')?.value.trim() || '';
  saveUserData();
  settingsBack();
}

function saveProfile() {
  userData.displayName = document.getElementById('prof-name')?.value.trim() || '';
  userData.email = document.getElementById('prof-email')?.value.trim() || '';
  userData.bio = document.getElementById('prof-bio')?.value.trim() || '';
  
  const name = userData.displayName || 'Murilo';
  const email = userData.email || 'murilosilvadacosta5ano@gmail.com';

  document.getElementById('sidebar-user').textContent = name;
  document.getElementById('sidebar-avatar').textContent = name[0]?.toUpperCase() || 'M';
  document.getElementById('sheet-user-avatar').textContent = name[0]?.toUpperCase() || 'M';
  document.getElementById('sheet-user-email').textContent = email;

  saveUserData();
  settingsBack();
}

/* Open Fullscreen Settings Sheet */
function openFullscreenSettings(subViewName) {
  toggleSidebar(false);
  const sheet = document.getElementById('fullscreen-settings');
  if (!sheet) return;
  sheet.classList.add('open');
  if (subViewName) {
    openSettingsView(subViewName);
  } else {
    settingsBack();
  }
}

function closeFullscreenSettings() {
  const sheet = document.getElementById('fullscreen-settings');
  if (sheet) sheet.classList.remove('open');
}

/* Navigate between subviews inside Fullscreen Settings */
function openSettingsView(view) {
  document.querySelectorAll('#fullscreen-settings .sheet-sub-view').forEach(v => v.classList.remove('active'));
  const target = document.getElementById('sheet-view-' + view);
  if (target) {
    target.classList.add('active');
  }

  const backBtn = document.getElementById('sheet-back-btn');
  const closeBtn = document.getElementById('sheet-close-btn');
  if (backBtn) backBtn.style.display = 'flex';
  if (closeBtn) closeBtn.style.display = 'none';

  const titles = {
    perfil: 'Perfil',
    cobranca: 'Cobrança',
    notificacoes: 'Notificações',
    'tempo-e-foco': 'Tempo e foco',
    privacidade: 'Privacidade',
    'links-compartilhados': 'Links compartilhados',
    recursos: 'Recursos',
    conectores: 'Conectores',
    permissoes: 'Permissões',
    voz: 'Voz'
  };
  const titleEl = document.getElementById('sheet-header-title');
  if (titleEl) titleEl.textContent = titles[view] || 'Configurações';
}

function settingsBack() {
  document.querySelectorAll('#fullscreen-settings .sheet-sub-view').forEach(v => v.classList.remove('active'));
  const mainView = document.getElementById('sheet-view-main');
  if (mainView) mainView.classList.add('active');

  const backBtn = document.getElementById('sheet-back-btn');
  const closeBtn = document.getElementById('sheet-close-btn');
  if (backBtn) backBtn.style.display = 'none';
  if (closeBtn) closeBtn.style.display = 'flex';

  const titleEl = document.getElementById('sheet-header-title');
  if (titleEl) titleEl.textContent = 'Configurações';
}

/* Appearance Switcher (Light / Dark / System) */
function setTheme(theme, el) {
  document.querySelectorAll('.appearance-card').forEach(c => c.classList.remove('active'));
  if (el) el.classList.add('active');
  applyTheme(theme);
  userData.theme = theme;
  localStorage.setItem('kairo_theme', theme);
  saveUserData();
}

function applyTheme(theme) {
  if (theme === 'system') {
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.setAttribute('data-theme', theme);
  }
  const card = document.querySelector(`.appearance-card[data-theme="${theme}"]`);
  if (card) {
    document.querySelectorAll('.appearance-card').forEach(c => c.classList.remove('active'));
    card.classList.add('active');
  }
}
