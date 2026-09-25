/* ============================================
   app.js — Navegação, telas, sidebar, login, i18n
   ============================================ */

const i18n = {
  en: { chats:'Chats', recursos:'Resources', code:'Code', artifacts:'Artifacts', skills:'Skills', connectors:'Connectors', permissoes:'Permissions', settings:'Settings', heroTitle:'What are we looking at today?', heroSub:"I'm Kairo, your agent.", placeholder:'Talk to Kairo', thinking:'Kairo is thinking', loginTitle:'Welcome back', loginSub:'Sign in to continue with Kairo', guest:'Continue as guest', loading:'Loading language' },
  pt: { chats:'Conversas', recursos:'Recursos', code:'Código', artifacts:'Artefatos', skills:'Skills', connectors:'Conectores', permissoes:'Permissões', settings:'Configurações', heroTitle:'No que estamos de olho hoje?', heroSub:'Sou o Kairo, seu agente.', placeholder:'Fale com o Kairo', thinking:'Kairo está pensando', loginTitle:'Bem-vindo de volta', loginSub:'Entre para continuar com o Kairo', guest:'Continuar como convidado', loading:'Carregando idioma' },
  es: { chats:'Chats', recursos:'Recursos', code:'Código', artifacts:'Artefactos', skills:'Skills', connectors:'Conectores', permissoes:'Permisos', settings:'Ajustes', heroTitle:'¿En qué estamos enfocados hoy?', heroSub:'Soy Kairo, tu agente.', placeholder:'Habla con Kairo', thinking:'Kairo está pensando', loginTitle:'Bienvenido de nuevo', loginSub:'Inicia sesión para continuar', guest:'Continuar como invitado', loading:'Cargando idioma' },
  fr: { chats:'Discussions', recursos:'Ressources', code:'Code', artifacts:'Artefacts', skills:'Skills', connectors:'Connecteurs', permissoes:'Autorisations', settings:'Paramètres', heroTitle:"Sur quoi travaillons-nous aujourd'hui ?", heroSub:'Je suis Kairo, votre agent.', placeholder:'Parlez à Kairo', thinking:'Kairo réfléchit', loginTitle:'Bon retour', loginSub:'Connectez-vous pour continuer', guest:"Continuer en tant qu'invité", loading:'Chargement de la langue' }
};

let lang = localStorage.getItem('kairo-lang') || 'pt';
let currentUser = 'murilosilvadacosta5ano@gmail.com';

function applyI18n() {
  const t = i18n[lang] || i18n.pt || i18n.en;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const k = el.getAttribute('data-i18n');
    if (t[k]) el.textContent = t[k];
  });
  const set = (id, v) => { const e = document.getElementById(id); if (e) e.textContent = v; };
  set('hero-title', t.heroTitle);
  set('hero-sub', t.heroSub);
  set('login-title', t.loginTitle);
  set('login-sub', t.loginSub);
  set('guest-link', t.guest);
  set('loading-text', t.loading);
  const input = document.getElementById('input');
  if (input) input.placeholder = t.placeholder;
}

function goTo(name) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('screen-' + name)?.classList.add('active');
}

function selectLang(code) {
  lang = code;
  localStorage.setItem('kairo-lang', code);
  goTo('loading');
  setTimeout(() => { applyI18n(); goTo('login'); }, 1400);
}

function doLogin(guest = false) {
  const email = guest ? 'guest' : (document.getElementById('email')?.value.trim() || 'murilosilvadacosta5ano@gmail.com');
  currentUser = email;
  if (typeof loadUserData === 'function') loadUserData();
  const name = (typeof userData !== 'undefined' && userData.name) ? userData.name : (email === 'guest' ? 'Convidado' : 'Murilo');
  
  const sbUser = document.getElementById('sidebar-user');
  if (sbUser) sbUser.textContent = name;
  const sbAvatar = document.getElementById('sidebar-avatar');
  if (sbAvatar) sbAvatar.textContent = name[0].toUpperCase();
  
  const sheetEmail = document.getElementById('sheet-user-email');
  if (sheetEmail) sheetEmail.textContent = email;
  const sheetAvatar = document.getElementById('sheet-user-avatar');
  if (sheetAvatar) sheetAvatar.textContent = name[0].toUpperCase();
  
  goTo('app');
}

function logout() {
  currentUser = null;
  if (typeof userData !== 'undefined') userData = {};
  if (typeof closeFullscreenSettings === 'function') closeFullscreenSettings();
  goTo('intro');
}

function toggleSidebar(force) {
  const sidebar = document.getElementById('sidebar');
  const main = document.getElementById('main');
  const scrim = document.getElementById('scrim');
  const open = force === undefined ? !sidebar.classList.contains('open') : force;
  sidebar.classList.toggle('open', open);
  main.classList.toggle('pushed', open);
  scrim.classList.toggle('show', open);
}

function cycleModel() {
  const models = [['Kairo','Fast'],['Kairo','Medium'],['Kairo','Deep']];
  window._mi = ((window._mi || 0) + 1) % models.length;
  document.getElementById('model-name').textContent = models[window._mi][0];
  document.getElementById('model-tier').textContent = models[window._mi][1];
}
