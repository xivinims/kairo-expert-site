/* ============================================
   settings.js — Abas de Configurações + salvamento da conta
   ============================================ */

let userData = {};

function userKey() {
  return currentUser ? 'kairo_user_' + currentUser : 'kairo_guest';
}

function loadUserData() {
  try { userData = JSON.parse(localStorage.getItem(userKey()) || '{}'); }
  catch(e) { userData = {}; }

  if (userData.name) {
    document.getElementById('sidebar-user').textContent = userData.name;
    document.getElementById('sidebar-avatar').textContent = userData.name[0].toUpperCase();
    document.getElementById('profile-avatar').textContent = userData.name[0].toUpperCase();
  }
  if (userData.email) document.getElementById('profile-email').textContent = userData.email;
  if (userData.displayName) document.getElementById('prof-name').value = userData.displayName;
  if (userData.email) document.getElementById('prof-email').value = userData.email;
  if (userData.bio) document.getElementById('prof-bio').value = userData.bio;
  if (userData.systemPrompt) document.getElementById('system-prompt').value = userData.systemPrompt;

  document.querySelectorAll('[data-skill]').forEach(el => {
    const on = userData.skills?.[el.dataset.skill] !== false;
    el.querySelector('.toggle')?.classList.toggle('on', on);
  });
  document.querySelectorAll('[data-conn]').forEach(el => {
    const on = !!userData.connectors?.[el.dataset.conn];
    el.querySelector('.toggle')?.classList.toggle('on', on);
  });

  const set = (id, v) => { const e = document.getElementById(id); if (e && v !== undefined) e.classList.toggle('on', !!v); };
  set('haptic-toggle', userData.haptic);
  set('notif-email', userData.notifEmail);
  set('notif-product', userData.notifProduct);
  set('notif-features', userData.notifFeatures);
  set('notif-marketing', userData.notifMarketing);
  set('focus-mode', userData.focusMode);
  set('quiet-hours', userData.quietHours);
  set('privacy-improve', userData.privacyImprove);
  set('privacy-history', userData.privacyHistory);
  set('privacy-memory', userData.privacyMemory);
  set('perm-mic', userData.permMic);
  set('perm-camera', userData.permCamera);
  set('perm-files', userData.permFiles);
  set('perm-location', userData.permLocation);
  set('voice-responses', userData.voiceResponses);
  set('voice-autosend', userData.voiceAutosend);

  if (userData.quietStart) document.getElementById('quiet-start').value = userData.quietStart;
  if (userData.quietEnd) document.getElementById('quiet-end').value = userData.quietEnd;
  if (userData.voiceLang) document.getElementById('voice-lang').value = userData.voiceLang;
  if (userData.theme) {
    document.querySelectorAll('.theme-opt').forEach(o => o.classList.toggle('active', o.dataset.theme === userData.theme));
  }
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
  userData.notifMarketing = on('notif-marketing');
  userData.focusMode = on('focus-mode');
  userData.quietHours = on('quiet-hours');
  userData.quietStart = document.getElementById('quiet-start')?.value;
  userData.quietEnd = document.getElementById('quiet-end')?.value;
  userData.privacyImprove = on('privacy-improve');
  userData.privacyHistory = on('privacy-history');
  userData.privacyMemory = on('privacy-memory');
  userData.permMic = on('perm-mic');
  userData.permCamera = on('perm-camera');
  userData.permFiles = on('perm-files');
  userData.permLocation = on('perm-location');
  userData.voiceLang = document.getElementById('voice-lang')?.value;
  userData.voiceResponses = on('voice-responses');
  userData.voiceAutosend = on('voice-autosend');
  userData.systemPrompt = document.getElementById('system-prompt')?.value || '';

  localStorage.setItem(userKey(), JSON.stringify(userData));
  showToast(lang === 'pt' ? 'Salvo na sua conta' : 'Saved to your account');
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
}

function saveProfile() {
  userData.displayName = document.getElementById('prof-name')?.value.trim() || '';
  userData.email = document.getElementById('prof-email')?.value.trim() || '';
  userData.bio = document.getElementById('prof-bio')?.value.trim() || '';
  userData.name = userData.displayName || userData.email?.split('@')[0] || 'User';
  document.getElementById('sidebar-user').textContent = userData.name;
  document.getElementById('profile-email').textContent = userData.email || currentUser;
  document.getElementById('profile-avatar').textContent = userData.name[0].toUpperCase();
  document.getElementById('sidebar-avatar').textContent = userData.name[0].toUpperCase();
  saveUserData();
}

function openSettingsView(view) {
  document.querySelectorAll('#panel-settings .sub-view').forEach(v => v.classList.remove('active'));
  document.getElementById('view-' + view)?.classList.add('active');
  document.getElementById('settings-back').style.display = 'block';
  const titles = {
    profile: 'Profile', billing: 'Billing', notifications: 'Notifications',
    timefocus: 'Time & Focus', privacy: 'Privacy', shared: 'Shared links',
    permissions: 'Permissions', voice: 'Voice'
  };
  document.getElementById('settings-title').textContent = titles[view] || 'Settings';
}

function settingsBack() {
  document.querySelectorAll('#panel-settings .sub-view').forEach(v => v.classList.remove('active'));
  document.getElementById('view-main')?.classList.add('active');
  document.getElementById('settings-back').style.display = 'none';
  document.getElementById('settings-title').textContent = (i18n[lang] || i18n.en).settings;
}

function setTheme(theme, el) {
  document.querySelectorAll('.theme-opt').forEach(o => o.classList.remove('active'));
  el.classList.add('active');
  userData.theme = theme;
  saveUserData();
}
