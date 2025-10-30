// ========== AUTOMAÇÃO ALURA AUTO-REINICIANTE ==========
(function () {
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

    // ========== SISTEMA DE MARCA D'ÁGUA - CARREGA PRIMEIRO ==========
    function initializeWatermark() {
        if (watermarkInitialized) return;

        const watermark = document.createElement('div');
        watermark.id = 'alura-auto-watermark';
        watermark.style.cssText = 'position: fixed; bottom: 20px; right: 20px; background: rgba(0, 0, 0, 0.8); color: white; padding: 10px 15px; border-radius: 8px; font-family: Arial, sans-serif; font-size: 12px; z-index: 999999; backdrop-filter: blur(5px); border: 1px solid rgba(255, 255, 255, 0.2); pointer-events: none; user-select: none; text-align: center; min-width: 150px;';

        const fpsElement = document.createElement('div');
        fpsElement.id = 'watermark-fps';
        fpsElement.style.cssText = 'margin-bottom: 5px; font-weight: bold;';
        fpsElement.textContent = 'FPS: 0';

        const msElement = document.createElement('div');
        msElement.id = 'watermark-ms';
        msElement.style.cssText = 'margin-bottom: 5px;';
        msElement.textContent = 'MS: 0';

        const instagramElement = document.createElement('div');
        instagramElement.id = 'watermark-insta';
        instagramElement.style.cssText = 'color: #E1306C; font-size: 11px; font-weight: bold;';
        instagramElement.textContent = '@_zx.lipe_';

        const statusElement = document.createElement('div');
        statusElement.id = 'watermark-status';
        statusElement.style.cssText = 'color: #28a745; font-size: 11px; font-weight: bold;';
        statusElement.textContent = '✅ AUTOMAÇÃO ATIVA';

        watermark.appendChild(fpsElement);
        watermark.appendChild(msElement);
        watermark.appendChild(instagramElement);
        watermark.appendChild(statusElement);
        document.body.appendChild(watermark);

        watermarkInitialized = true;
        console.log('💧 Marca d\'água inicializada - FPS, MS e Instagram carregados!');

        // Iniciar loop de atualização IMEDIATAMENTE
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

            if (fpsElement) fpsElement.textContent = 'FPS: ' + fps;
            if (msElement) msElement.textContent = 'MS: ' + Math.round(ms);

            frameCount = 0;
            lastTime = currentTime;
        }

        requestAnimationFrame(updateWatermarkStats);
    }

    // ========== INICIALIZAR MARCA D'ÁGUA IMEDIATAMENTE ==========
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeWatermark);
    } else {
        initializeWatermark();
    }

    // ========== CONFIGURAÇÃO INICIAL ==========
    function startAutomation() {
        sessionStorage.setItem(getStorageKey(), 'true');
        isAutomationActive = true;
        console.log('🚀 AUTOMAÇÃO INICIADA - Sobreviverá aos recarregamentos!');

        // Atualizar status na marca d'água
        const statusElement = document.getElementById('watermark-status');
        if (statusElement) {
            statusElement.textContent = '✅ AUTOMAÇÃO ATIVA';
            statusElement.style.color = '#28a745';
        }

        executeAutomation();
    }

    function stopAutomation() {
        sessionStorage.setItem(getStorageKey(), 'false');
        isAutomationActive = false;
        console.log('🛑 AUTOMAÇÃO PARADA - Não reiniciará mais');

        // Atualizar status na marca d'água
        const statusElement = document.getElementById('watermark-status');
        if (statusElement) {
            statusElement.textContent = '⏹️ AUTOMAÇÃO PARADA';
            statusElement.style.color = '#dc3545';
        }

        // Não remover a marca d'água completamente, só atualizar o status
    }

    // ========== FUNÇÃO DE DEBUG DA DESCRIPTOGRAFIA ==========
    function debugDescriptografiaBlocos() {
        console.log("🔍 DEBUG - DESCRIPTOGRAFIA DE BLOCOS");
        console.log("========================================");

        try {
            const blocksContainer = document.querySelector(".blocks");
            if (!blocksContainer) {
                console.log("❌ Container de blocos não encontrado");
                return;
            }

            const correctOrderBase64 = blocksContainer.getAttribute("data-correct-order");
            console.log("1️⃣ BASE64 ORIGINAL:");
            console.log(correctOrderBase64);
            console.log("");

            const primeiraDecodificacao = atob(correctOrderBase64);
            console.log("2️⃣ PRIMEIRA DECODIFICAÇÃO:");
            console.log(primeiraDecodificacao);
            console.log("");

            const decodificacaoFinal = atob(primeiraDecodificacao);
            console.log("3️⃣ DECODIFICAÇÃO FINAL:");
            console.log(decodificacaoFinal);
            console.log("");

            // ========== FUNÇÃO DE DEBUG AVANÇADO ==========
            window.debugBlockMatching = function () {
                console.log("🔍 DEBUG AVANÇADO - MATCHING DE BLOCOS");
                console.log("========================================");

                const blocksContainer = document.querySelector('.blocks');
                if (!blocksContainer) {
                    console.log("❌ Container de blocos não encontrado");
                    return;
                }

                const correctOrderBase64 = blocksContainer.getAttribute('data-correct-order');
                const primeiraDecodificacao = atob(correctOrderBase64);
                const decodificacaoFinal = atob(primeiraDecodificacao);

                const correctedSequence = decodificacaoFinal.split(',').map(texto => {
                    return texto
                        .replace(/\x98/g, "'")
                        .replace(/\x99/g, "'")
                        .replace(/â\x80\x9C/g, '"')
                        .replace(/â\x80\x9D/g, '"')
                        .replace(/â\x80/g, '"')
                        .replace(/â\x80/g, '')
                        .replace(/Ãº/g, "ú")
                        .replace(/Ã¡/g, "á")
                        .replace(/Ã£/g, "ã")
                        .replace(/Ã§/g, "ç")
                        .replace(/Ã©/g, "é")
                        .replace(/Ã­/g, "í")
                        .replace(/Ã³/g, "ó")
                        .replace(/Ãµ/g, "õ")
                        .replace(/Ãª/g, "ê")
                        .replace(/Ã¢/g, "â")
                        .trim();
                }).filter(texto => texto !== "");

                const availableBlocks = Array.from(document.querySelectorAll('#sortBlocksOrigin .block'));

                console.log("🎯 SEQUÊNCIA CORRETA vs BLOCOS DISPONÍVEIS:");
                correctedSequence.forEach((seqText, index) => {
                    const cleanSeqText = seqText.replace(/[',()]/g, '').replace(/\s+/g, ' ').trim().toLowerCase();

                    const matchingBlocks = availableBlocks.filter(block => {
                        const blockText = block.getAttribute('data-text');
                        const cleanBlockText = blockText.replace(/[',()]/g, '').replace(/\s+/g, ' ').trim().toLowerCase();
                        return cleanBlockText.includes(cleanSeqText) || cleanSeqText.includes(cleanBlockText);
                    });

                    console.log(`   ${index + 1}. "${seqText}" → ${matchingBlocks.length} correspondências:`);
                    matchingBlocks.forEach(block => {
                        console.log(`      - "${block.getAttribute('data-text')}"`);
                    });
                });
            };

            // CORREÇÃO COMPLETA PARA CARACTERES ESPECIAIS
            const sequenciaCorreta = decodificacaoFinal.split(",").map(texto => {
                return texto
                    // Corrigir aspas simples curvas (' ')
                    .replace(/\x98/g, "'")
                    .replace(/\x99/g, "'")
                    .replace(/â\x80\x9C/g, '"')
                    .replace(/â\x80\x9D/g, '"')
                    .replace(/â\x80/g, '"')
                    .replace(/â\x80/g, '')
                    // Corrigir caracteres acentuados
                    .replace(/Ãº/g, "ú")
                    .replace(/Ã¡/g, "á")
                    .replace(/Ã£/g, "ã")
                    .replace(/Ã§/g, "ç")
                    .replace(/Ã©/g, "é")
                    .replace(/Ã­/g, "í")
                    .replace(/Ã³/g, "ó")
                    .replace(/Ãµ/g, "õ")
                    .replace(/Ãª/g, "ê")
                    .replace(/Ã¢/g, "â")
                    .trim();
            }).filter(texto => texto !== ""); // Remover strings vazias

            console.log("4️⃣ SEQUÊNCIA CORRETA (Array):");
            console.log(sequenciaCorreta);
            console.log("");

            console.log("5️⃣ ORDEM NUMERADA:");
            sequenciaCorreta.forEach((bloco, index) => {
                console.log(`   ${index + 1}. ${bloco}`);
            });
            console.log("========================================");

            // MOSTRAR COMPARAÇÃO COM OS BLOCOS REAIS
            console.log("🔍 COMPARAÇÃO COM BLOCOS DISPONÍVEIS:");
            const blocosDisponiveis = document.querySelectorAll("#sortBlocksOrigin .block");
            blocosDisponiveis.forEach((bloco, index) => {
                console.log(`   Bloco ${index + 1}: "${bloco.getAttribute("data-text")}"`);
            });

            console.log("🎯 RESULTADO FINAL CORRIGIDO:");
            sequenciaCorreta.forEach((bloco, index) => {
                console.log(`   ${index + 1}. ${bloco}`);
            });

            // VERIFICAR SE A ORDEM ESTÁ CORRETA
            console.log("🔍 VERIFICAÇÃO DA ORDEM:");
            const blocosReais = Array.from(document.querySelectorAll("#sortBlocksOrigin .block"));
            const ordemCorreta = sequenciaCorreta.map(textoDecodificado => {
                return blocosReais.find(bloco =>
                    bloco.getAttribute("data-text") === textoDecodificado
                );
            }).filter(bloco => bloco !== undefined);

            if (ordemCorreta.length === sequenciaCorreta.length) {
                console.log("✅ ORDEM COMPATÍVEL COM OS BLOCOS!");
            } else {
                console.log("⚠️  POSSÍVEL INCOMPATIBILIDADE NA ORDEM");
            }

            console.log("✅ DESCRIPTOGRAFIA CONCLUÍDA!");

        } catch (error) {
            console.log("❌ ERRO NA DESCRIPTOGRAFIA:", error);
        }
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

        const opinionButton = document.querySelector('button.task-actions-button-showOpinion') || Array.from(document.querySelectorAll('button')).find(btn => btn.textContent.includes('Ver opinião do instrutor'));

        if (opinionButton) {
            opinionButton.click();
            console.log('✅ Opinião clicada');
        }

        setTimeout(() => {
            goToNextActivity();
        }, 2000);
    }

    function autoClickMultiplaEscolha() {
        console.log('🔘 Processando MÚLTIPLA ESCOLHA...');

        const alternatives = document.querySelectorAll('.alternativeList-item-input');
        if (alternatives.length > 0) {
            alternatives.forEach((alt, index) => {
                setTimeout(() => {
                    alt.click();
                    console.log('✅ Alternativa ' + (index + 1) + ' clicada');
                }, index * 300);
            });

            setTimeout(() => {
                goToNextActivity();
            }, alternatives.length * 300 + 2000);
        } else {
            setTimeout(goToNextActivity, 2000);
        }
    } function autoClickMultiplaEscolha() {
        console.log('🔘 Processando MÚLTIPLA ESCOLHA...');

        const alternatives = document.querySelectorAll('.alternativeList-item-input');
        console.log(`📋 Encontradas ${alternatives.length} alternativas`);

        if (alternatives.length > 0) {
            // Clique em TODAS as alternativas sequencialmente
            alternatives.forEach((alt, index) => {
                setTimeout(() => {
                    if (alt && alt.parentElement) { // Verificar se o elemento ainda existe
                        alt.click();
                        console.log(`✅ Alternativa ${index + 1} clicada`);

                        // Verificar se foi marcada como selecionada
                        if (alt.checked || alt.getAttribute('aria-checked') === 'true') {
                            console.log(`☑️ Alternativa ${index + 1} selecionada com sucesso`);
                        }
                    }
                }, index * 500); // 500ms entre cada clique
            });

            // Aguardar um pouco mais antes de ir para a próxima
            setTimeout(() => {
                console.log('🔄 Indo para próxima atividade...');
                goToNextActivity();
            }, alternatives.length * 500 + 2000);

        } else {
            console.log('❌ Nenhuma alternativa encontrada');
            setTimeout(goToNextActivity, 2000);
        }
    }

    function autoClickOrdenarBlocos() {
        console.log('🧩 Processando ORDENAR BLOCOS...');

        try {
            const blocksContainer = document.querySelector('.blocks');
            if (blocksContainer) {
                const correctOrderBase64 = blocksContainer.getAttribute('data-correct-order');
                const primeiraDecodificacao = atob(correctOrderBase64);
                const decodificacaoFinal = atob(primeiraDecodificacao);

                // USANDO A MESMA CORREÇÃO DA FUNÇÃO DEBUG
                const correctedSequence = decodificacaoFinal.split(',').map(texto => {
                    return texto
                        .replace(/\x98/g, "'")
                        .replace(/\x99/g, "'")
                        .replace(/â\x80\x9C/g, '"')
                        .replace(/â\x80\x9D/g, '"')
                        .replace(/â\x80/g, '"')
                        .replace(/â\x80/g, '')
                        .replace(/Ãº/g, "ú")
                        .replace(/Ã¡/g, "á")
                        .replace(/Ã£/g, "ã")
                        .replace(/Ã§/g, "ç")
                        .replace(/Ã©/g, "é")
                        .replace(/Ã­/g, "í")
                        .replace(/Ã³/g, "ó")
                        .replace(/Ãµ/g, "õ")
                        .replace(/Ãª/g, "ê")
                        .replace(/Ã¢/g, "â")
                        .trim();
                }).filter(texto => texto !== "");

                console.log('✅ SEQUÊNCIA CORRETA DECODIFICADA:');
                correctedSequence.forEach((bloco, index) => {
                    console.log(`   ${index + 1}. ${bloco}`);
                });

                // Resetar se necessário
                const destination = document.getElementById('sortBlocksDestination');
                if (destination && destination.children.length > 0) {
                    const resetButton = document.getElementById('tryAgain');
                    if (resetButton) {
                        resetButton.click();
                        console.log('🔄 Blocos resetados');
                        // Aguardar o reset completar
                        setTimeout(() => {
                            executeBlockOrdering(correctedSequence);
                        }, 1000);
                        return;
                    }
                }

                executeBlockOrdering(correctedSequence);

            } else {
                console.log('❌ Container de blocos não encontrado');
                setTimeout(goToNextActivity, 3000);
            }
        } catch (error) {
            console.log('❌ Erro em ordenar blocos:', error);
            setTimeout(goToNextActivity, 3000);
        }

        // FUNÇÃO AUXILIAR PARA ORDENAR BLOCOS
        function executeBlockOrdering(correctedSequence) {
            console.log('🖱️ Iniciando clique nos blocos...');

            // Obter todos os blocos disponíveis
            const availableBlocks = Array.from(document.querySelectorAll('#sortBlocksOrigin .block'));
            console.log(`📦 Blocos disponíveis: ${availableBlocks.length}`);

            // Array para controlar quais blocos já foram clicados
            const clickedBlocks = new Set();

            // Mapear a sequência correta para os blocos reais - COMPARAÇÃO FLEXÍVEL
            const sequenceToClick = correctedSequence.map(blockText => {
                // Limpar o texto para comparação
                const cleanBlockText = blockText
                    .replace(/[',()]/g, '')
                    .replace(/\s+/g, ' ')
                    .trim()
                    .toLowerCase();

                console.log(`🔍 Procurando: "${blockText}" (limpo: "${cleanBlockText}")`);

                // Encontrar o bloco que corresponde ao texto (comparação flexível)
                const matchingBlock = availableBlocks.find(block => {
                    // Pular blocos já clicados
                    if (clickedBlocks.has(block)) {
                        return false;
                    }

                    const blockDataText = block.getAttribute('data-text');
                    const cleanBlockDataText = blockDataText
                        .replace(/[',()]/g, '')
                        .replace(/\s+/g, ' ')
                        .trim()
                        .toLowerCase();

                    console.log(`   Comparando com: "${blockDataText}" (limpo: "${cleanBlockDataText}")`);

                    // Comparação flexível - verifica se um contém o outro
                    const isMatch = cleanBlockDataText.includes(cleanBlockText) ||
                        cleanBlockText.includes(cleanBlockDataText) ||
                        cleanBlockDataText === cleanBlockText;

                    return isMatch;
                });

                if (matchingBlock) {
                    console.log(`✅ Encontrado: "${matchingBlock.getAttribute('data-text')}"`);
                    // Marcar como clicado para evitar duplicação
                    clickedBlocks.add(matchingBlock);
                    return {
                        element: matchingBlock,
                        originalText: blockText,
                        foundText: matchingBlock.getAttribute('data-text')
                    };
                } else {
                    console.log(`❌ Não encontrado: "${blockText}"`);
                    return null;
                }
            }).filter(item => item !== null);

            console.log(`🎯 Sequência para clicar: ${sequenceToClick.length} blocos de ${correctedSequence.length}`);

            if (sequenceToClick.length === 0) {
                console.log('❌ Nenhum bloco compatível encontrado, tentando método alternativo...');
                tryAlternativeMethod();
                return;
            }

            // Verificar se temos blocos duplicados
            const uniqueBlocks = new Set();
            const finalSequence = sequenceToClick.filter(item => {
                const key = item.element.getAttribute('data-text');
                if (uniqueBlocks.has(key)) {
                    console.log(`⚠️ Removendo duplicata: "${key}"`);
                    return false;
                }
                uniqueBlocks.add(key);
                return true;
            });

            console.log(`🎯 Sequência final sem duplicatas: ${finalSequence.length} blocos`);

            // Clique sequencial nos blocos encontrados
            finalSequence.forEach((item, index) => {
                setTimeout(() => {
                    if (item.element && item.element.parentElement) {
                        item.element.click();
                        console.log(`✅ Bloco ${index + 1} clicado: "${item.foundText}" (original: "${item.originalText}")`);

                        // Verificar se o bloco foi movido
                        setTimeout(() => {
                            if (!item.element.parentElement || item.element.parentElement.id !== 'sortBlocksOrigin') {
                                console.log(`📤 Bloco "${item.foundText}" movido com sucesso`);
                            }
                        }, 500);
                    } else {
                        console.log(`⚠️ Bloco ${index + 1} não disponível`);
                    }
                }, index * 1200); // Reduzi para 1.2s entre cliques
            });

            // Submeter após clicar em todos os blocos
            setTimeout(() => {
                const submitButton = document.getElementById('submitBlocks');
                if (submitButton) {
                    console.log('📤 Submetendo resposta...');
                    submitButton.click();

                    // Verificar se foi bem sucedido
                    setTimeout(() => {
                        const errorMessage = document.querySelector('.error-message, .text-danger');
                        if (errorMessage) {
                            console.log('❌ Erro na submissão, tentando novamente...');
                            setTimeout(goToNextActivity, 2000);
                        } else {
                            console.log('✅ Resposta submetida com sucesso!');
                            setTimeout(goToNextActivity, 3000);
                        }
                    }, 2000);
                } else {
                    console.log('❌ Botão de submit não encontrado');
                    setTimeout(goToNextActivity, 3000);
                }
            }, finalSequence.length * 1200 + 1000);
        }

        // MÉTODO ALTERNATIVO SE A COMPARAÇÃO FLEXÍVEL FALHAR
        function tryAlternativeMethod() {
            console.log('🔄 Tentando método alternativo...');

            const availableBlocks = Array.from(document.querySelectorAll('#sortBlocksOrigin .block'));

            // Se temos 4 blocos e 4 na sequência, clica na ordem dos blocos disponíveis
            if (availableBlocks.length === correctedSequence.length) {
                console.log('🎯 Clique sequencial nos blocos disponíveis');

                availableBlocks.forEach((block, index) => {
                    setTimeout(() => {
                        block.click();
                        console.log(`✅ Bloco ${index + 1} clicado: "${block.getAttribute('data-text')}"`);
                    }, index * 1500);
                });

                // Submeter
                setTimeout(() => {
                    const submitButton = document.getElementById('submitBlocks');
                    if (submitButton) {
                        submitButton.click();
                        setTimeout(goToNextActivity, 3000);
                    }
                }, availableBlocks.length * 1500 + 1000);
            } else {
                console.log('❌ Método alternativo não aplicável, indo para próxima...');
                setTimeout(goToNextActivity, 3000);
            }
        }
    }

    function autoClickLinkProjeto() {
        console.log('🔗 Processando LINK DE PROJETO...');

        const projectLinkInput = document.getElementById('project-link');
        if (projectLinkInput) {
            // Preencher o link
            projectLinkInput.value = 'https://cursos.alura.com.br/course/introducao-python-desafios-programacao/task/198807';

            // Disparar eventos para ativar validação
            ['input', 'change', 'blur'].forEach(eventType => {
                projectLinkInput.dispatchEvent(new Event(eventType, { bubbles: true }));
            });

            console.log('✅ Link preenchido');

            // Aguardar um pouco para a validação processar
            setTimeout(() => {
                const submitButton = document.getElementById('linkSubmit');
                if (submitButton) {
                    // Remover disabled se existir
                    if (submitButton.disabled) {
                        submitButton.disabled = false;
                        console.log('🔓 Botão habilitado');
                    }

                    // Clicar no botão de enviar
                    submitButton.click();
                    console.log('✅ Link enviado');

                    // AGUARDAR A PÁGINA PROCESSAR E IR PARA PRÓXIMA ATIVIDADE
                    setTimeout(() => {
                        console.log('🔄 Indo para próxima atividade...');
                        goToNextActivity();
                    }, 3000); // 3 segundos após enviar o link

                } else {
                    console.log('❌ Botão de envio não encontrado, indo para próxima...');
                    setTimeout(goToNextActivity, 2000);
                }
            }, 1500); // 1.5 segundos após preencher o link

        } else {
            console.log('❌ Campo de link não encontrado, indo para próxima...');
            setTimeout(goToNextActivity, 2000);
        }
    }

    // ========== FUNÇÃO PARA PRÓXIMA ATIVIDADE ==========
    function goToNextActivity() {
        if (!isAutomationActive) return;

        console.log('🔄 Procurando próxima atividade...');

        const nextButton = document.querySelector('a.task-actions-button-next, a[href*="/next"]') || Array.from(document.querySelectorAll('a, button')).find(el => el.textContent.includes('Próxima Atividade'));

        if (nextButton) {
            console.log('✅ Indo para próxima atividade...');
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

        const activityType = detectActivityType();
        console.log('📊 Atividade detectada: ' + activityType.toUpperCase());

        switch (activityType) {
            case 'video':
                autoClickVideo();
                break;
            case 'texto-imagem':
                autoClickTextoImagem();
                break;
            case 'texto-opiniao':
                autoClickTextoOpiniao();
                break;
            case 'multipla-escolha':
                autoClickMultiplaEscolha();
                break;
            case 'ordenar-blocos':
                autoClickOrdenarBlocos();
                break;
            case 'link-projeto':
                autoClickLinkProjeto();
                break;
            default:
                console.log('⏳ Nenhuma atividade detectada, tentando novamente em 3s...');
                setTimeout(executeAutomation, 3000);
        }
    }

    // ========== COMUNICAÇÃO COM POPUP ==========
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        console.log('📩 Mensagem recebida:', request.action);

        switch (request.action) {
            case "startAutomation":
                startAutomation();
                sendResponse({ success: true, status: "started" });
                break;

            case "stopAutomation":
                stopAutomation();
                sendResponse({ success: true, status: "stopped" });
                break;

            case "getStatus":
                sendResponse({
                    isActive: isAutomationActive,
                    hasWatermark: watermarkInitialized
                });
                break;

            case "debugDescriptografia":
                debugDescriptografiaBlocos();
                sendResponse({ success: true, status: "debug_executed" });
                break;

            default:
                sendResponse({ success: false, error: "Ação desconhecida" });
        }

        return true;
    });

    // ========== CONTROLES GLOBAIS (para debug) ==========
    window.startAluraAutomation = startAutomation;
    window.stopAluraAutomation = stopAutomation;
    window.debugDescriptografiaBlocos = debugDescriptografiaBlocos;

    // ========== VERIFICAR AUTOMAÇÃO EXISTENTE ==========
    if (sessionStorage.getItem(getStorageKey()) === 'true') {
        console.log('🔄 AUTOMAÇÃO REINICIADA - Continuando...');
        isAutomationActive = true;
        setTimeout(() => {
            executeAutomation();
        }, 2000);
    }

    // ========== INICIAR AUTOMATICAMENTE ==========
    console.log('🎮 EXTENSÃO ALURA AUTOMAÇÃO CARREGADA!\n\nComandos no console:\n• startAluraAutomation() - Iniciar\n• stopAluraAutomation() - Parar\n• debugDescriptografiaBlocos() - Debug da descriptografia\n\nOu use o popup da extensão!');

})();