/* ============================================
   chat.js — Composer, input pill, separated mic, animated send pill
   ============================================ */

function onType(el) {
  el.style.height = 'auto';
  el.style.height = Math.min(el.scrollHeight, 120) + 'px';
  const val = el.value.trim();
  const container = document.getElementById('composer-container');
  
  if (val.length > 0) {
    container.classList.add('has-text');
    container.classList.add('is-focused');
  } else {
    container.classList.remove('has-text');
  }
}

function onInputFocus() {
  const container = document.getElementById('composer-container');
  if (container) container.classList.add('is-focused');
}

function onInputBlur() {
  const container = document.getElementById('composer-container');
  const input = document.getElementById('input');
  if (container && (!input || input.value.trim().length === 0)) {
    container.classList.remove('is-focused');
  }
}

function onKeyDown(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
}

function startVoiceInput() {
  const container = document.getElementById('composer-container');
  const input = document.getElementById('input');
  if (container) {
    container.classList.add('is-focused');
  }
  if (input) {
    input.focus();
    input.value = "Ouvindo... ";
    onType(input);
    setTimeout(() => {
      input.value = "Como posso organizar meus projetos?";
      onType(input);
    }, 1200);
  }
}

const THINKING_SVG = `<svg class="thinking-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10" stroke-dasharray="4 4" stroke-opacity="0.5"/><path d="M12 6v6l4 2"/></svg>`;

function newChat() {
  const msgsEl = document.getElementById('msgs');
  const hero = document.getElementById('hero');
  const scrollEl = document.getElementById('chat-scroll');
  msgsEl.innerHTML = '';
  if (hero && !hero.parentNode) scrollEl.insertBefore(hero, msgsEl);
  const input = document.getElementById('input');
  if (input) {
    input.value = '';
    input.style.height = '24px';
  }
  const container = document.getElementById('composer-container');
  if (container) {
    container.classList.remove('has-text');
    container.classList.remove('is-focused');
  }
}

const replies = {
  en: ["Understood. Here is the clear outline.", "Got it. I'll take care of this directly.", "Makes total sense. Let's do it."],
  pt: ["Entendido. Aqui está a estrutura clara e direta.", "Perfeito. Já vou organizar isso para você.", "Faz todo sentido. Vamos em frente."],
  es: ["Entendido. Aquí está el esquema claro y directo.", "Perfecto. Me encargo de esto.", "Tiene mucho sentido."],
  fr: ["Compris. Voici les étapes précises et directes.", "Parfait. Je m'en occupe tout de suite.", "Très bien, avançons."]
};

function sendMessage() {
  const input = document.getElementById('input');
  const text = input.value.trim();
  if (!text) return;

  const hero = document.getElementById('hero');
  const msgsEl = document.getElementById('msgs');
  const scrollEl = document.getElementById('chat-scroll');
  const container = document.getElementById('composer-container');

  if (hero?.parentNode) hero.remove();

  const u = document.createElement('div');
  u.className = 'msg user';
  u.innerHTML = '<div class="bubble"></div>';
  u.querySelector('.bubble').textContent = text;
  msgsEl.appendChild(u);

  input.value = '';
  input.style.height = '24px';
  if (container) {
    container.classList.remove('has-text');
    container.classList.remove('is-focused');
  }
  scrollEl.scrollTop = scrollEl.scrollHeight;

  const t = i18n[lang] || i18n.pt || i18n.en;
  const think = document.createElement('div');
  think.className = 'msg agent';
  think.innerHTML = `<div class="avatar"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="12" rx="9" ry="6"/><circle cx="12" cy="12" r="2.5" fill="currentColor"/></svg></div><div class="thinking">${THINKING_SVG}<span>${t.thinking}</span></div>`;
  msgsEl.appendChild(think);
  scrollEl.scrollTop = scrollEl.scrollHeight;

  setTimeout(() => {
    think.remove();
    const a = document.createElement('div');
    a.className = 'msg agent';
    const langReplies = replies[lang] || replies.pt || replies.en;
    let reply = langReplies[Math.floor(Math.random() * langReplies.length)];
    const sp = (userData?.systemPrompt || '').toLowerCase();
    if (sp.includes('direct') || sp.includes('direto')) reply = "Aqui está a resposta direta solicitada.";
    a.innerHTML = '<div class="avatar"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="12" rx="9" ry="6"/><circle cx="12" cy="12" r="2.5" fill="currentColor"/></svg></div><div class="bubble"></div>';
    a.querySelector('.bubble').textContent = reply;
    msgsEl.appendChild(a);
    scrollEl.scrollTop = scrollEl.scrollHeight;
  }, 1100);
}
