// ========== AUTOMAÇÃO ALURA AUTO-REINICIANTE ==========
(function() {
    'use strict';
    
    // Verificar se já existe uma automação rodando
    if (sessionStorage.getItem('aluraAutoRestart') === 'true') {
        console.log('🔄 AUTOMAÇÃO REINICIADA - Continuando...');
        setTimeout(executeAutomation, 2000);
        return;
    }
    
    // ========== CONFIGURAÇÃO INICIAL ==========
    sessionStorage.setItem('aluraAutoRestart', 'true');
    console.log('🚀 AUTOMAÇÃO INICIADA - Sobreviverá aos recarregamentos!');
    
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
        console.log('🔄 Procurando próxima atividade...');
        
        const nextButton = document.querySelector('a.task-actions-button-next, a[href*="/next"]') ||
                          Array.from(document.querySelectorAll('a, button')).find(el => 
                              el.textContent.includes('Próxima Atividade'));
        
        if (nextButton) {
            console.log('✅ Indo para próxima atividade...');
            // Manter a flag ativa antes de clicar
            sessionStorage.setItem('aluraAutoRestart', 'true');
            nextButton.click();
        } else {
            console.log('❌ Botão próximo não encontrado, tentando novamente em 5s...');
            setTimeout(executeAutomation, 5000);
        }
    }
    
    // ========== EXECUÇÃO PRINCIPAL ==========
    function executeAutomation() {
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
    
    // ========== CONTROLES ==========
    window.startAluraAutomation = function() {
        sessionStorage.setItem('aluraAutoRestart', 'true');
        console.log('🚀 INICIANDO AUTOMAÇÃO AUTO-REINICIANTE');
        executeAutomation();
    }
    
    window.stopAluraAutomation = function() {
        sessionStorage.setItem('aluraAutoRestart', 'false');
        console.log('🛑 AUTOMAÇÃO PARADA - Não reiniciará mais');
    }
    
    // ========== INICIAR AUTOMATICAMENTE ==========
    console.log(`
🎮 AUTOMAÇÃO ALURA CARREGADA!

Comandos:
• startAluraAutomation() - Iniciar
• stopAluraAutomation() - Parar completamente

A automação sobreviverá aos recarregamentos de página!
    `);
    
    // Iniciar automaticamente se for a primeira vez
    if (sessionStorage.getItem('aluraAutoRestart') === 'true') {
        setTimeout(executeAutomation, 2000);
    }
    
})();