// Background script para melhor compatibilidade
chrome.runtime.onInstalled.addListener(() => {
  console.log('Extensão Alura Automação instalada');
});