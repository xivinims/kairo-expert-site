# Kairo Expert Site

## Estrutura (separada por categorias)

```
├── index.html              → Estrutura HTML (telas + painéis)
├── css/
│   └── styles.css          → Visual completo
├── js/
│   ├── app.js              → Navegação, sidebar, login, idiomas
│   ├── settings.js         → Todas as abas de Configurações + salvamento da conta
│   └── chat.js             → Barra de pesquisa, mensagens, ícone pensando
└── README.md
```

### O que editar onde

| Quer mudar... | Arquivo |
|---------------|--------|
| Sidebar (menu do canto) | `js/app.js` + HTML no `index.html` |
| Abas de Configurações (Profile, Privacy...) | `js/settings.js` + HTML no `index.html` |
| Barra de pesquisa / chat | `js/chat.js` |
| Cores, visual, espaçamentos | `css/styles.css` |
| Textos / estrutura das telas | `index.html` |
