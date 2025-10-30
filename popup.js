document.addEventListener('DOMContentLoaded', function() {
  const startBtn = document.getElementById('startBtn');
  const stopBtn = document.getElementById('stopBtn');
  const statusDiv = document.getElementById('status');

  // Verificar status atual
  function checkStatus() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      if (tabs[0] && tabs[0].url.includes('alura.com.br')) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "getStatus"}, function(response) {
          if (chrome.runtime.lastError) {
            // Content script não respondeu (possivelmente não carregado)
            updateStatus(false);
            return;
          }
          if (response && response.isActive) {
            updateStatus(true);
          } else {
            updateStatus(false);
          }
        });
      } else {
        // Não está na Alura
        statusDiv.textContent = '⚠️ Acesse a Alura primeiro';
        statusDiv.className = 'status inactive';
        startBtn.disabled = true;
        stopBtn.disabled = true;
      }
    });
  }

  // Botão iniciar
  startBtn.addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      if (tabs[0] && tabs[0].url.includes('alura.com.br')) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "startAutomation"}, function(response) {
          if (chrome.runtime.lastError) {
            console.error('Erro ao iniciar automação:', chrome.runtime.lastError);
            alert('Erro: A página da Alura não carregou corretamente. Recarregue a página e tente novamente.');
            return;
          }
          updateStatus(true);
        });
      } else {
        alert('Por favor, acesse a Alura primeiro!');
      }
    });
  });

  // Botão parar
  stopBtn.addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      if (tabs[0] && tabs[0].url.includes('alura.com.br')) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "stopAutomation"}, function(response) {
          if (chrome.runtime.lastError) {
            console.error('Erro ao parar automação:', chrome.runtime.lastError);
            return;
          }
          updateStatus(false);
        });
      }
    });
  });

  function updateStatus(isActive) {
    if (isActive) {
      statusDiv.textContent = '✅ Automação Ativa';
      statusDiv.className = 'status active';
      startBtn.disabled = true;
      stopBtn.disabled = false;
    } else {
      statusDiv.textContent = '⏹️ Automação Parada';
      statusDiv.className = 'status inactive';
      startBtn.disabled = false;
      stopBtn.disabled = true;
    }
    
    // Não fechar o popup automaticamente
    // setTimeout(() => window.close(), 1000);
  }

  // Verificar status quando abrir o popup
  checkStatus();
});