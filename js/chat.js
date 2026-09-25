/* ============================================
   chat.js — Composer, mensagens, thinking icon
   ============================================ */

function onType(el) {
  el.style.height = 'auto';
  el.style.height = Math.min(el.scrollHeight, 120) + 'px';
  document.getElementById('composer').classList.toggle('has-text', el.value.trim().length > 0);
}

function onKeyDown(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
}

const THINKING_SVG = `<svg class="thinking-icon" width="28" height="28" viewBox="0 0 50 50" fill="none"><circle cx="25" cy="25" r="23" fill="white" stroke="#e5e5ea" stroke-width="1"/><g stroke="#589DFF" stroke-width="2" stroke-linecap="round"><path d="M25 25 L25 10"/><path d="M25 25 L38 18"/><path d="M25 25 L38 32"/><path d="M25 25 L12 32"/><path d="M25 25 L12 18"/><circle cx="25" cy="10" r="3" fill="#589DFF"/><circle cx="38" cy="18" r="2.5" fill="#A4A7FF"/><circle cx="38" cy="32" r="2.5" fill="#366CEC"/><circle cx="12" cy="32" r="2.5" fill="#A4A7FF"/><circle cx="12" cy="18" r="2.5" fill="#366CEC"/><circle cx="25" cy="25" r="4" fill="#366CEC"/></g></svg>`;

function newChat() {
  const msgsEl = document.getElementById('msgs');
  const hero = document.getElementById('hero');
  const scrollEl = document.getElementById('chat-scroll');
  msgsEl.innerHTML = '';
  if (hero && !hero.parentNode) scrollEl.insertBefore(hero, msgsEl);
}

const replies = {
  en: ["Got it. I'll structure this in clear steps.", "Good direction. I see two possible paths.", "Noted. I can start right away.", "Makes sense."],
  pt: ["Entendi. Vou estruturar isso em etapas claras.", "Boa direção. Já vejo dois caminhos.", "Anotado. Posso começar agora mesmo.", "Faz sentido."],
  es: ["Entendido. Voy a estructurarlo en pasos claros.", "Buena dirección.", "Anotado. Puedo empezar ahora mismo.", "Tiene sentido."],
  fr: ["Compris. Je vais structurer cela en étapes claires.", "Bonne direction.", "Noté. Je peux commencer tout de suite.", "Ça a du sens."]
};

function sendMessage() {
  const input = document.getElementById('input');
  const text = input.value.trim();
  if (!text) return;

  const hero = document.getElementById('hero');
  const msgsEl = document.getElementById('msgs');
  const scrollEl = document.getElementById('chat-scroll');
  const composer = document.getElementById('composer');

  if (hero?.parentNode) hero.remove();

  const u = document.createElement('div');
  u.className = 'msg user';
  u.innerHTML = '<div class="bubble"></div>';
  u.querySelector('.bubble').textContent = text;
  msgsEl.appendChild(u);

  input.value = '';
  input.style.height = 'auto';
  composer.classList.remove('has-text');
  scrollEl.scrollTop = scrollEl.scrollHeight;

  const t = i18n[lang] || i18n.en;
  const think = document.createElement('div');
  think.className = 'msg agent';
  think.innerHTML = `<div class="avatar"></div><div class="thinking">${THINKING_SVG}<span>${t.thinking}</span></div>`;
  msgsEl.appendChild(think);
  scrollEl.scrollTop = scrollEl.scrollHeight;

  setTimeout(() => {
    think.remove();
    const a = document.createElement('div');
    a.className = 'msg agent';
    let reply = (replies[lang] || replies.en)[Math.floor(Math.random() * 4)];
    const sp = (userData?.systemPrompt || '').toLowerCase();
    if (sp.includes('direct') || sp.includes('direto')) reply = "Here's the direct answer.";
    a.innerHTML = '<div class="avatar"></div><div class="bubble"></div>';
    a.querySelector('.bubble').textContent = reply;
    msgsEl.appendChild(a);
    scrollEl.scrollTop = scrollEl.scrollHeight;
  }, 1600);
}
