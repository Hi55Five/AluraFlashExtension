// ========== AUTOMAÇÃO ALURA - PERSISTENTE EM RECARREGAMENTOS ==========
(function() {
    'use strict';
    
    // ========== VERIFICAÇÃO DE EXECUÇÃO ==========
    // Usar sessionStorage para persistir entre recarregamentos
    const isRunning = sessionStorage.getItem('aluraAutoRunning') === 'true';
    
    if (isRunning) {
        console.log('🔄 AUTOMAÇÃO REINICIADA - Continuando de onde parou...');
    } else {
        sessionStorage.setItem('aluraAutoRunning', 'true');
        console.log('🚀 AUTOMAÇÃO INICIADA - Sobrevive a recarregamentos!');
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
            // Manter a flag ativa ANTES de clicar (importante!)
            sessionStorage.setItem('aluraAutoRunning', 'true');
            nextButton.click();
        } else {
            console.log('❌ Botão próximo não encontrado, tentando novamente em 5s...');
            setTimeout(executeAutomation, 5000);
        }
    }
    
    // ========== EXECUÇÃO PRINCIPAL ==========
    function executeAutomation() {
        // Verificar se a automação ainda está ativa
        if (sessionStorage.getItem('aluraAutoRunning') !== 'true') {
            console.log('🛑 AUTOMAÇÃO PARADA - Não continuando');
            return;
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
    
    // ========== CONTROLES ==========
    window.startAlurexAutomation = function() {
        sessionStorage.setItem('aluraAutoRunning', 'true');
        console.log('🚀 INICIANDO AUTOMAÇÃO');
        executeAutomation();
    }
    
    window.stopAlurexAutomation = function() {
        sessionStorage.setItem('aluraAutoRunning', 'false');
        console.log('🛑 AUTOMAÇÃO PARADA - Não reiniciará mais');
        alert('Alurex parado! Recarregue a página para reiniciar.');
    }
    
    // ========== INICIAR AUTOMATICAMENTE ==========
    console.log(`
🎮 ALUREX AUTOMATION CARREGADO!

Comandos:
• startAlurexAutomation() - Iniciar/Continuar
• stopAlurexAutomation() - Parar completamente

Status: ${isRunning ? 'CONTINUANDO' : 'INICIANDO'}
    `);
    
    // Iniciar automaticamente se ainda estiver ativo
    if (sessionStorage.getItem('aluraAutoRunning') === 'true') {
        console.log('🔄 Continuando automação após recarregamento...');
        setTimeout(executeAutomation, 2000);
    }
    
})();
