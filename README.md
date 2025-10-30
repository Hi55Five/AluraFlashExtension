# AluraFlash Extension 🚀 #
Automação inteligente para cursos da Alura - Conclua cursos automaticamente!

https://img.shields.io/github/license/_zx.lipe_/aluraflash
https://img.shields.io/chrome-web-store/v/none
https://img.shields.io/github/stars/_zx.lipe_/aluraflash?style=social

📖 Sobre o Projeto
A AluraFlash é uma extensão para Chrome que automatiza a conclusão de cursos na plataforma Alura. Desenvolvida com JavaScript puro, ela identifica e completa automaticamente diferentes tipos de atividades enquanto você foca no que realmente importa.

⚠️ Aviso Legal: Esta extensão é para fins educacionais. Use por sua própria conta e risco.

✨ Funcionalidades
🎯 Tipos de Atividades Suportadas
📹 Vídeos - Reproduz automaticamente e avança

🔘 Múltipla Escolha - Seleciona todas as alternativas

🧩 Ordenar Blocos - Decodifica e ordena corretamente

💬 Texto com Opinião - Visualiza opinião do instrutor

🔗 Link de Projeto - Preenche e envia automaticamente

📷 Texto com Imagem - Avança diretamente

🛠️ Recursos Avançados
🔄 Sistema Auto-Reiniciante - Sobrevive a recarregamentos de página

📊 Marca d'Água em Tempo Real - Mostra FPS, MS e status

🔍 Debug Integrado - Ferramentas para desenvolvimento

🎨 Interface Amigável - Popup com controles intuitivos

🚀 Instalação
Método 1: Extensão Chrome (Recomendado)
Baixe o código do repositório

Abra o Chrome e vá em chrome://extensions/

Ative o "Modo do desenvolvedor" no canto superior direito

Clique em "Carregar sem compactação"

Selecione a pasta com os arquivos da extensão

Pronto! A extensão estará instalada

Método 2: Console do Navegador
javascript
// Cole este código no console da Alura
javascript:(function(){
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/gh/_zx.lipe_/aluraflash@main/content.js?' + Date.now();
    document.head.appendChild(script);
})();
🎮 Como Usar
Usando a Extensão
Acesse a plataforma Alura e entre em um curso

Clique no ícone da extensão AluraFlash

Clique em "🚀 Iniciar Automação"

Relaxe e acompanhe o progresso pela marca d'água

Comandos no Console
javascript
// Iniciar automação
startAluraAutomation()

// Parar automação
stopAluraAutomation()

// Debug da descriptografia
debugDescriptografiaBlocos()

// Debug avançado de blocos
debugBlockMatching()
📁 Estrutura do Projeto
text
aluraflash/
├── manifest.json          # Configuração da extensão
├── content.js            # Script principal de automação
├── popup.html            # Interface do popup
├── popup.js              # Lógica do popup
├── background.js         # Script de background
└── README.md             # Este arquivo
🔧 Tecnologias Utilizadas
JavaScript ES6+ - Lógica principal da automação

Chrome Extensions API - Integração com navegador

Base64 Decoding - Descriptografia de atividades

DOM Manipulation - Interação com elementos da página

Session Storage - Persistência entre recarregamentos

🎯 Características Técnicas
Sistema de Detecção Inteligente
javascript
function detectActivityType() {
    if (document.querySelector('.vjs-big-play-button, video')) return 'video';
    if (document.querySelector('.alternativeList-item-input')) return 'multipla-escolha';
    if (document.querySelector('.blocks')) return 'ordenar-blocos';
    // ... mais detecções
}
Descriptografia de Blocos
javascript
// Decodifica Base64 duplo dos blocos
const firstDecode = atob(correctOrderBase64);
const finalDecode = atob(firstDecode);
⚠️ Disclaimer
Este projeto foi desenvolvido para fins educacionais e de aprendizado em automação web. O uso desta ferramenta deve seguir os Termos de Serviço da plataforma Alura. O autor não se responsabiliza pelo uso indevido da extensão.

🤝 Contribuindo
Contribuições são bem-vindas! Sinta-se à vontade para:

Fazer um Fork do projeto

Criar uma branch para sua feature (git checkout -b feature/AmazingFeature)

Commit suas mudanças (git commit -m 'Add some AmazingFeature')

Push para a branch (git push origin feature/AmazingFeature)

Abrir um Pull Request

📄 Licença
Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

👨‍💻 Autor
@zx.lipe - GitHub

Desenvolvido com 💻 e ☕

🎉 Agradecimentos
À comunidade de desenvolvimento de extensões Chrome

Aos contribuidores de código aberto

Aos testadores e reportadores de bugs

⭐ Se este projeto foi útil para você, deixe uma estrela no repositório!

Feliz automação! 🚀🎯
