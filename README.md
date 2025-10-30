# AluraFlash Extension 🚀 #
** Automação inteligente para cursos da Alura - Conclua cursos automaticamente! **

# 📖 Sobre o Projeto #
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


# 🚀 Instalação #
** Método 1: Extensão Chrome **
1. **Baixar** Baixe o código do repositório
2. **Extenção** Abra o Chrome e vá em chrome://extensions/
3. **Extenção** Ative o "Modo do desenvolvedor" no canto superior direito
4. **Extenção** Clique em "Carregar sem compactação"
5. **Arquivos** Selecione a pasta com os arquivos da extensão
6. **Seja Feliz** Pronto! A extensão estará instalada

# 🎯 Características Técnicas #
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
# ⚠️ Disclaimer #
Este projeto foi desenvolvido para fins educacionais e de aprendizado em automação web. O uso desta ferramenta deve seguir os Termos de Serviço da plataforma Alura. O autor não se responsabiliza pelo uso indevido da extensão.



# 📄 Licença #
Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

⭐ Se este projeto foi útil para você, deixe uma estrela no repositório!

Feliz automação! 🚀🎯

