// ========== AUTOMAÇÃO ALURA AUTO-REINICIANTE ==========
(function() {
    'use strict';
    
    // ========== VARIÁVEIS GLOBAIS ==========
    let watermarkInitialized = false;
    let frameCount = 0;
    let lastTime = performance.now();
    let fps = 0;
    let ms = 0;
    let isAutomationActive = false;
    
    // ========== SISTEMA DE ARMAZENAMENTO ==========
    function getStorageKey() {
        return 'aluraAutoRestart_' + window.location.hostname;
    }
    
    // Verificar se já existe uma automação rodando
    if (sessionStorage.getItem(getStorageKey()) === 'true') {
        console.log('🔄 AUTOMAÇÃO REINICIADA - Continuando...');
        isAutomationActive = true;
        setTimeout(executeAutomation, 2000);
    }
    
    // ========== CONFIGURAÇÃO INICIAL ==========
    function startAutomation() {
        sessionStorage.setItem(getStorageKey(), 'true');
        isAutomationActive = true;
        console.log('🚀 AUTOMAÇÃO INICIADA - Sobreviverá aos recarregamentos!');
        
        if (!watermarkInitialized) {
            initializeWatermark();
        }
        
        executeAutomation();
    }
    
    function stopAutomation() {
        sessionStorage.setItem(getStorageKey(), 'false');
        isAutomationActive = false;
        console.log('🛑 AUTOMAÇÃO PARADA - Não reiniciará mais');
        
        // Remover marca d'água
        const watermark = document.getElementById('alura-auto-watermark');
        if (watermark) {
            watermark.remove();
            watermarkInitialized = false;
        }
    }
    
    // ========== SISTEMA DE MARCA D'ÁGUA ==========
    function initializeWatermark() {
        if (watermarkInitialized) return;
        
        const watermark = document.createElement('div');
        watermark.id = 'alura-auto-watermark';
        watermark.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 10px 15px;
            border-radius: 8px;
            font-family: 'Arial', sans-serif;
            font-size: 12px;
            z-index: 999999;
            backdrop-filter: blur(5px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            pointer-events: none;
            user-select: none;
            text-align: center;
            min-width: 150px;
        `;
        
        const fpsElement = document.createElement('div');
        fpsElement.id = 'watermark-fps';
        fpsElement.style.cssText = 'margin-bottom: 5px; font-weight: bold;';
        fpsElement.textContent = 'FPS: 0';
        
        const msElement = document.createElement('div');
        msElement.id = 'watermark-ms';
        msElement.style.cssText = 'margin-bottom: 5px;';
        msElement.textContent = 'MS: 0';
        
        const statusElement = document.createElement('div');
        statusElement.id = 'watermark-status';
        statusElement.style.cssText = 'color: #28a745; font-size: 11px; font-weight: bold;';
        statusElement.textContent = '✅ AUTOMAÇÃO ATIVA';
        
        watermark.appendChild(fpsElement);
        watermark.appendChild(msElement);
        watermark.appendChild(statusElement);
        document.body.appendChild(watermark);
        
        watermarkInitialized = true;
        console.log('💧 Marca d\'água inicializada');
        
        // Iniciar loop de atualização
        updateWatermarkStats();
    }
    
    function updateWatermarkStats() {
        if (!watermarkInitialized) return;
        
        frameCount++;
        const currentTime = performance.now();
        const deltaTime = currentTime - lastTime;
        
        if (deltaTime >= 1000) {
            fps = Math.round((frameCount * 1000) / deltaTime);
            ms = deltaTime / frameCount;
            
            const fpsElement = document.getElementById('watermark-fps');
            const msElement = document.getElementById('watermark-ms');
            
            if (fpsElement) fpsElement.textContent = `FPS: ${fps}`;
            if (msElement) msElement.textContent = `MS: ${Math.round(ms)}`;
            
            frameCount = 0;
            lastTime = currentTime;
        }
        
        requestAnimationFrame(updateWatermarkStats);
    }
    
    // ========== DETECÇÃO DE ATIVIDADE ==========
    function detectActivityType() {
        if (document.querySelector('.vjs-big-play-button, .vjs-play-control, video')) return 'video';
        if (document.querySelector('button.task-actions-button-showOpinion')) return 'texto-opiniao';
        if (document.querySelector('.alternativeList-item-input')) return 'multipla-escolha';
        if (document.querySelector('.blocks') && document.getElementById('sortBlocksOrigin')) return 'ordenar-blocos';
        if (document.getElementById('project-link')) return 'link-projeto';
        if (document.querySelector('a.task-actions-button-next')) return 'texto-imagem';
        return 'desconhecida';
    }
    
    // ========== FUNÇÕES DE AUTOMAÇÃO ==========
    function autoClickVideo() {
        console.log('🎬 Processando VÍDEO...');
        
        const playButton = document.querySelector('.vjs-big-play-button, .vjs-play-control');
        if (playButton) {
            playButton.click();
            console.log('✅ Play clicado');
        }
        
        // Aguardar e ir para próxima
        setTimeout(() => {
            goToNextActivity();
        }, 4000);
    }
    
    function autoClickTextoImagem() {
        console.log('📷 Processando TEXTO COM IMAGEM...');
        goToNextActivity();
    }
    
    function autoClickTextoOpiniao() {
        console.log('💬 Processando TEXTO COM OPINIÃO...');
        
        const opinionButton = document.querySelector('button.task-actions-button-showOpinion') ||
                            Array.from(document.querySelectorAll('button')).find(btn => 
                                btn.textContent.includes('Ver opinião do instrutor'));
        
        if (opinionButton) {
            opinionButton.click();
            console.log('✅ Opinião clicada');
        }
        
        setTimeout(() => {
            goToNextActivity();
        }, 2000);
    }
    
    async function autoClickMultiplaEscolha() {
        console.log('🔘 Processando MÚLTIPLA ESCOLHA...');
        
        const alternatives = document.querySelectorAll('.alternativeList-item-input');
        if (alternatives.length > 0) {
            for (let i = 0; i < alternatives.length; i++) {
                alternatives[i].click();
                await new Promise(resolve => setTimeout(resolve, 300));
            }
            console.log(`✅ ${alternatives.length} alternativas clicadas`);
        }
        
        setTimeout(() => {
            goToNextActivity();
        }, 2000);
    }
    
    function autoClickOrdenarBlocos() {
        console.log('🧩 Processando ORDENAR BLOCOS...');
        
        try {
            const blocksContainer = document.querySelector('.blocks');
            if (blocksContainer) {
                const correctOrderBase64 = blocksContainer.getAttribute('data-correct-order');
                const firstDecode = atob(correctOrderBase64);
                const finalDecode = atob(firstDecode);
                
                const correctedSequence = finalDecode.split(',').map(text => {
                    return text
                        .replace(/â\x80\x9C/g, '“')
                        .replace(/â\x80\x9D/g, '”')
                        .replace(/â\x80/g, '“')
                        .replace(/â\x80/g, '')
                        .trim();
                });
                
                console.log('🎯 Ordem correta decodificada');
                
                // Resetar se necessário
                const destination = document.getElementById('sortBlocksDestination');
                if (destination && destination.children.length > 0) {
                    const resetButton = document.getElementById('tryAgain');
                    if (resetButton) resetButton.click();
                }
                
                // Clicar na sequência correta
                setTimeout(() => {
                    correctedSequence.forEach((blockText, index) => {
                        setTimeout(() => {
                            const blocks = document.querySelectorAll('#sortBlocksOrigin .block');
                            const targetBlock = Array.from(blocks).find(block => 
                                block.getAttribute('data-text') === blockText
                            );
                            if (targetBlock) targetBlock.click();
                        }, index * 1000);
                    });
                    
                    // Submeter
                    setTimeout(() => {
                        const submitButton = document.getElementById('submitBlocks');
                        if (submitButton) {
                            submitButton.click();
                            setTimeout(goToNextActivity, 3000);
                        }
                    }, correctedSequence.length * 1000 + 1000);
                }, 1000);
            }
        } catch (error) {
            console.log('❌ Erro em ordenar blocos, indo para próxima...');
            setTimeout(goToNextActivity, 3000);
        }
    }
    
    function autoClickLinkProjeto() {
        console.log('🔗 Processando LINK DE PROJETO...');
        
        const projectLinkInput = document.getElementById('project-link');
        if (projectLinkInput) {
            projectLinkInput.value = 'https://cursos.alura.com.br/course/introducao-python-desafios-programacao/task/198807';
            
            ['input', 'change', 'blur'].forEach(eventType => {
                projectLinkInput.dispatchEvent(new Event(eventType, { bubbles: true }));
            });
            
            console.log('✅ Link preenchido');
        }
        
        setTimeout(() => {
            const submitButton = document.getElementById('linkSubmit');
            if (submitButton) {
                if (submitButton.disabled) {
                    submitButton.disabled = false;
                }
                submitButton.click();
                console.log('✅ Link enviado');
            }
            
            setTimeout(goToNextActivity, 3000);
        }, 2000);
    }
    
    // ========== FUNÇÃO PARA PRÓXIMA ATIVIDADE ==========
    function goToNextActivity() {
        if (!isAutomationActive) return;
        
        console.log('🔄 Procurando próxima atividade...');
        
        const nextButton = document.querySelector('a.task-actions-button-next, a[href*="/next"]') ||
                          Array.from(document.querySelectorAll('a, button')).find(el => 
                              el.textContent.includes('Próxima Atividade'));
        
        if (nextButton) {
            console.log('✅ Indo para próxima atividade...');
            // Manter a flag ativa antes de clicar
            sessionStorage.setItem(getStorageKey(), 'true');
            nextButton.click();
        } else {
            console.log('❌ Botão próximo não encontrado, tentando novamente em 5s...');
            setTimeout(executeAutomation, 5000);
        }
    }
    
    // ========== EXECUÇÃO PRINCIPAL ==========
    function executeAutomation() {
        if (!isAutomationActive) return;
        
        // Inicializar marca d'água se ainda não foi
        if (!watermarkInitialized) {
            initializeWatermark();
        }
        
        const activityType = detectActivityType();
        console.log(`📊 Atividade detectada: ${activityType.toUpperCase()}`);
        
        switch(activityType) {
            case 'video': autoClickVideo(); break;
            case 'texto-imagem': autoClickTextoImagem(); break;
            case 'texto-opiniao': autoClickTextoOpiniao(); break;
            case 'multipla-escolha': autoClickMultiplaEscolha(); break;
            case 'ordenar-blocos': autoClickOrdenarBlocos(); break;
            case 'link-projeto': autoClickLinkProjeto(); break;
            default:
                console.log('⏳ Nenhuma atividade detectada, tentando novamente em 3s...');
                setTimeout(executeAutomation, 3000);
        }
    }
    
// ========== COMUNICAÇÃO COM POPUP ==========
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log('📩 Mensagem recebida:', request.action);
    
    switch(request.action) {
        case "startAutomation":
            startAutomation();
            sendResponse({success: true, status: "started"});
            break;
            
        case "stopAutomation":
            stopAutomation();
            sendResponse({success: true, status: "stopped"});
            break;
            
        case "getStatus":
            sendResponse({
                isActive: isAutomationActive,
                hasWatermark: watermarkInitialized
            });
            break;
            
        default:
            sendResponse({success: false, error: "Ação desconhecida"});
    }
    
    return true; // Mantém o canal aberto para resposta assíncrona
});    
    // ========== CONTROLES GLOBAIS (para debug) ==========
    window.startAluraAutomation = startAutomation;
    window.stopAluraAutomation = stopAutomation;
    
    // ========== INICIAR AUTOMATICAMENTE SE CONFIGURADO ==========
    console.log(`
🎮 EXTENSÃO ALURA AUTOMAÇÃO CARREGADA!

Comandos no console:
• startAluraAutomation() - Iniciar
• stopAluraAutomation() - Parar

Ou use o popup da extensão!
    `);
    
    // Iniciar automaticamente se estava ativo antes do recarregamento
    if (sessionStorage.getItem(getStorageKey()) === 'true') {
        isAutomationActive = true;
        setTimeout(() => {
            executeAutomation();
        }, 2000);
    }
    
})();