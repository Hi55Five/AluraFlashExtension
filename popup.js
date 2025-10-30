document.addEventListener('DOMContentLoaded', function() {
  const startBtn = document.getElementById('startBtn');
  const stopBtn = document.getElementById('stopBtn');
  const debugBtn = document.getElementById('debugBtn');
  const statusDiv = document.getElementById('status');

  // Verificar status atual
  function checkStatus() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      if (tabs[0] && tabs[0].url.includes('alura.com.br')) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "getStatus"}, function(response) {
          if (chrome.runtime.lastError) {
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
        statusDiv.textContent = '⚠️ Acesse a Alura primeiro';
        statusDiv.className = 'status inactive';
        startBtn.disabled = true;
        stopBtn.disabled = true;
        debugBtn.disabled = true;
      }
    });
  }

  // Botão iniciar
  startBtn.addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      if (tabs[0] && tabs[0].url.includes('alura.com.br')) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "startAutomation"}, function(response) {
          if (chrome.runtime.lastError) {
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

  // Botão debug
  debugBtn.addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      if (tabs[0] && tabs[0].url.includes('alura.com.br')) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "debugDescriptografia"}, function(response) {
          if (chrome.runtime.lastError) {
            alert('Erro: Execute o debug apenas em páginas de ordenar blocos!');
            return;
          }
          alert('Debug executado! Verifique o console do navegador (F12)');
        });
      } else {
        alert('Por favor, acesse a Alura primeiro!');
      }
    });
  });

  function updateStatus(isActive) {
    if (isActive) {
      statusDiv.textContent = '✅ Automação Ativa';
      statusDiv.className = 'status active';
      startBtn.disabled = true;
      stopBtn.disabled = false;
      debugBtn.disabled = false;
    } else {
      statusDiv.textContent = '⏹️ Automação Parada';
      statusDiv.className = 'status inactive';
      startBtn.disabled = false;
      stopBtn.disabled = true;
      debugBtn.disabled = false;
    }
  }

  // Verificar status quando abrir o popup
  checkStatus();
});