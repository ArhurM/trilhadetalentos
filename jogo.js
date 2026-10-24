/* ==========================================================================
   CONFIGURAÇÕES GLOBAIS: TEMAS, ACESSIBILIDADE E ELEMENTOS VISUAIS
   ========================================================================== */

// 1. Salva o tema escolhido pelo jogador e aplica imediatamente na página
function salvarTema(nomeTema) {
    localStorage.setItem("temaJogo", nomeTema);
    aplicarTema();
}

// 2. Lê o armazenamento local e injeta a classe correspondente na tag HTML
function aplicarTema() {
    const temaSalvo = localStorage.getItem("temaJogo") || "floresta";
    const rootElement = document.documentElement;

    if (temaSalvo === "praia") {
        rootElement.classList.add("theme-praia");
    } else {
        rootElement.classList.remove("theme-praia");
    }

    const selectTema = document.getElementById("themeSelect");
    if (selectTema) {
        selectTema.value = temaSalvo;
    }
}

// 3. Altera o tamanho da fonte base adicionando ou subtraindo pixels
function alterarTamanhoFonte(delta) {
    let tamanhoAtual = parseInt(localStorage.getItem("fontSizeJogo")) || 16;
    let novoTamanho = tamanhoAtual + delta;

    novoTamanho = Math.max(12, Math.min(novoTamanho, 24));

    localStorage.setItem("fontSizeJogo", novoTamanho);
    aplicarAcessibilidade();
}

// 4. Aplica o tamanho de fonte salvo diretamente na tag raiz do documento
function aplicarAcessibilidade() {
    const tamanhoSalvo = localStorage.getItem("fontSizeJogo") || "16";
    document.documentElement.style.fontSize = tamanhoSalvo + "px";
}

/* ==========================================================================
   EFEITOS SONOROS E TRILHA DE FUNDO CONTÍNUA COM DUAL VOLUME
   ========================================================================== */
const SOM_CLIQUE = new Audio("som_clique.mp3");
const SOM_ACERTOU = new Audio("som_acertou.mp3");
const SOM_ERROU = new Audio("som_errou.mp3");

const SOM_TIQUETAQUE = new Audio("som_tiquetaque.mp3");

// Trilha de Fundo configurada com auto-reinício (Loop)
const MUSICA_FUNDO = new Audio("musica_fundo.mp3");
MUSICA_FUNDO.loop = true; 

// Função auxiliar para tocar som verificando se o jogo não está silenciado
function tocarSom(som) {
    const silenciarCheck = document.getElementById("silenciarCheck");
    const estaSilenciado = (silenciarCheck && silenciarCheck.checked) || localStorage.getItem("silenciado") === "true";
    
    if (!estaSilenciado) {
        if (MUSICA_FUNDO.paused) {
            MUSICA_FUNDO.play().catch(e => console.log("Música de fundo aguardando interação."));
        }

        if (som) {
            som.currentTime = 0;
            som.play().catch(e => console.log("Áudio aguardando clique inicial do usuário."));
        }
    }
}

function aplicarConfiguracoesAudio() {
    const silenciarCheck = document.getElementById("silenciarCheck");
    const volumeSlider = document.getElementById("volumeSlider");
    const volumeLabel = document.getElementById("volumeLabel");
    const volumeMusicaSlider = document.getElementById("volumeMusicaSlider");
    const volumeMusicaLabel = document.getElementById("volumeMusicaLabel");

    const estaSilenciado = localStorage.getItem("silenciado") === "true";
    
    // Carrega os dois volumes salvos individualmente de forma isolada
    const volumeEfeitosSalvo = localStorage.getItem("volumeGeral") !== null ? parseInt(localStorage.getItem("volumeGeral")) : 50;
    const volumeMusicaSalvo = localStorage.getItem("volumeMusica") !== null ? parseInt(localStorage.getItem("volumeMusica")) : 30;

    // Aplica volumes nos objetos em memória
    const volumeCalculado = estaSilenciado ? 0 : (volumeEfeitosSalvo / 100);
    if (typeof SOM_CLIQUE !== 'undefined') SOM_CLIQUE.volume = estaSilenciado ? 0 : (volumeEfeitosSalvo / 100);
    if (typeof SOM_ACERTOU !== 'undefined') SOM_ACERTOU.volume = estaSilenciado ? 0 : (volumeEfeitosSalvo / 100);
    if (typeof SOM_ERROU !== 'undefined') SOM_ERROU.volume = estaSilenciado ? 0 : (volumeEfeitosSalvo / 100);
    if (typeof SOM_TIQUETAQUE !== 'undefined') SOM_TIQUETAQUE.volume = volumeCalculado;
    if (typeof MUSICA_FUNDO !== 'undefined') MUSICA_FUNDO.volume = estaSilenciado ? 0 : (volumeMusicaSalvo / 100); 

    if (!estaSilenciado && typeof MUSICA_FUNDO !== 'undefined' && MUSICA_FUNDO.paused) {
        MUSICA_FUNDO.play().catch(e => console.log("Aguardando clique inicial..."));
    }

    if (silenciarCheck) { silenciarCheck.checked = estaSilenciado; }
    
    if (volumeSlider) { 
        volumeSlider.value = volumeEfeitosSalvo; 
        volumeSlider.disabled = estaSilenciado; 
    }
    if (volumeLabel) { 
        volumeLabel.innerText = "Volume dos Efeitos: " + volumeEfeitosSalvo + "%" + (estaSilenciado ? " (Mudo)" : ""); 
    }

    if (volumeMusicaSlider) {
        volumeMusicaSlider.value = volumeMusicaSalvo;
        volumeMusicaSlider.disabled = estaSilenciado;
    }
    if (volumeMusicaLabel) {
        volumeMusicaLabel.innerText = "Volume da Música: " + volumeMusicaSalvo + "%" + (estaSilenciado ? " (Mudo)" : "");
    }
}

function alternarSilenciar(valor) {
    localStorage.setItem("silenciado", valor);
    aplicarConfiguracoesAudio();
}

function alterarVolume(valor) {
    localStorage.setItem("volumeGeral", valor);
    aplicarConfiguracoesAudio();
}

function alterarVolumeMusica(valor) {
    localStorage.setItem("volumeMusica", valor);
    aplicarConfiguracoesAudio();
}
/* ==========================================================================
   INICIALIZAÇÃO GLOBAL AUTOMÁTICA E OUVINTE DE CLIQUES UNIVERSAL
   ========================================================================== */
function inicializarConfiguracoesGlobais() {
    aplicarTema();
    aplicarAcessibilidade();
    aplicarConfiguracoesAudio();

    const silenciarCheck = document.getElementById("silenciarCheck");
    const volumeSlider = document.getElementById("volumeSlider");
    const volumeMusicaSlider = document.getElementById("volumeMusicaSlider");

    if (silenciarCheck) {
        silenciarCheck.onchange = function() { alternarSilenciar(this.checked); };
    }
    if (volumeSlider) {
        volumeSlider.oninput = function() { alterarVolume(this.value); };
    }
    if (volumeMusicaSlider) {
        volumeMusicaSlider.oninput = function() { alterarVolumeMusica(this.value); };
    }
}

// OUVINTE GLOBAL: Faz qualquer botão ou link emitir som na hora do clique
document.addEventListener("click", function(evento) {
    const alvo = evento.target.closest(".btn, .option-btn, .help-card, a");
    
    if (alvo) {
        if (alvo.classList.contains("used")) return;
        if (alvo.classList.contains("option-btn") && bloqueado) return;

        tocarSom(SOM_CLIQUE);
    }
});

window.addEventListener("DOMContentLoaded", inicializarConfiguracoesGlobais);
inicializarConfiguracoesGlobais();

/* ==========================================================================
   VARIÁVEIS DE CONTROLE DO QUIZ E DO TEMPORIZADOR
   ========================================================================== */
let idxPergunta = 0;
let bloqueado = false;
let pulosRestantes = 3;
let opcoesDaRodadaAtual = [];

// Variáveis de controle do cronômetro de 30 segundos
let tempoRestante = 30;
let idCronometro = null;

const PREMIOS = [
  "PTs 1.000", "PTs 2.000", "PTs 3.000", "PTs 4.000", "PTs 5.000",
  "PTs 10.000", "PTs 20.000", "PTs 30.000", "PTs 40.000", "PTs 50.000",
  "PTs 100.000", "PTs 200.000", "PTs 300.000", "PTs 400.000", "PTs 500.000", "PTs 1 MILHÃO"
];

const REACOES = {
  normal: "mascote_normal.gif",
  acertou: "mascote_acertou.gif",
  errou: "mascote_errou.gif",
  carta1: "mascote_carta1.gif",
  carta2: "mascote_carta2.gif",
  pulo: "mascote_pulo.gif"
};

/* ==========================================================================
   GERENCIAMENTO DE REAÇÃO DO MASCOTE
   ========================================================================== */
function alterarReacao(tipo, textoMensagem) {
  const imgMascote = document.getElementById("mascotelmg") || document.getElementById("mascoteImg");
  const imgMenu = document.getElementById("mascoteMenu");
  const bubble = document.getElementById("speechBubble");

  let arquivoGif = REACOES[tipo] || REACOES.normal;
  let cacheBuster = "?t=" + Date.now();

  if (imgMascote) imgMascote.src = arquivoGif + cacheBuster;
  if (imgMenu) imgMenu.src = REACOES.normal + cacheBuster;

  if (bubble) {
    if (tipo !== "normal") {
      bubble.innerText = textoMensagem || "";
      bubble.style.display = "block";
    } else {
      bubble.style.display = "none";
    }
  }
}

/* ==========================================================================
   SISTEMA DE TEMPORIZADOR DE 30 SEGUNDOS
   ========================================================================== */
function iniciarTemporizador() {
  // Para qualquer contagem anterior por segurança
  pararTemporizador();
  
  // Reseta o tempo conforme a configuração visual (Padrão: 30 segundos)
  tempoRestante = 30;
  atualizarInterfaceCronometro();

  // Inicia a contagem regressiva de segundo em segundo
  idCronometro = setInterval(function() {
    // Se o tempo limite estiver desativado nas opções, ignora a regressão
    const timerCheck = document.getElementById("timerCheck");
    if (timerCheck && !timerCheck.checked) {
      pararTemporizador();
      const numElem = document.getElementById("numPergunta");
      if (numElem) numElem.innerText = "Pergunta " + (idxPergunta + 1);
      return;
    }

    tempoRestante--;
    atualizarInterfaceCronometro();

     // ⏱️ DISPARADOR DE SUSPENSE: Toca o tique-taque a cada segundo nos últimos 10 segundos
    if (tempoRestante <= 10 && tempoRestante > 0) {
      tocarSom(SOM_TIQUETAQUE);
    

  // 🔊 Efeito de Cinema: Derruba o volume da música de fundo para dar suspense
      if (typeof MUSICA_FUNDO !== 'undefined' && localStorage.getItem("silenciado") !== "true") {
        const volumeMusicaSalvo = localStorage.getItem("volumeMusica") !== null ? parseInt(localStorage.getItem("volumeMusica")) : 30;
        // Derruba a trilha sonora para apenas 10% do volume original configurado
        MUSICA_FUNDO.volume = (volumeMusicaSalvo / 100) * 0.1;
      }
    }  

    // Quando o tempo esgota de vez
    if (tempoRestante <= 0) {
      pararTemporizador();
      fINALIZAR_POR_TEMPO_ESGOTADO();
    }
  }, 1000);
}

function pararTemporizador() {
  if (idCronometro) {
    clearInterval(idCronometro);
    idCronometro = null;
  }

   // 🎵 CORTA O TIQUE-TAQUE IMEDIATAMENTE: Impede que ele continue rodando após o tempo zerar ou responder
  if (typeof SOM_TIQUETAQUE !== 'undefined') {
    SOM_TIQUETAQUE.pause();
    SOM_TIQUETAQUE.currentTime = 0;
  }

  // 🔊 RESTAURA A TRILHA: Devolve o volume original da música assim que o suspense acaba
  if (typeof MUSICA_FUNDO !== 'undefined' && localStorage.getItem("silenciado") !== "true") {
    const volumeMusicaSalvo = localStorage.getItem("volumeMusica") !== null ? parseInt(localStorage.getItem("volumeMusica")) : 30;
    MUSICA_FUNDO.volume = volumeMusicaSalvo / 100;
  }
}

function atualizarInterfaceCronometro() {
  const numElem = document.getElementById("numPergunta");
  if (!numElem) return;

  // Se o tempo estiver acabando (abaixo de 10s), destaca visualmente
  if (tempoRestante <= 10) {
    numElem.innerHTML = "Pergunta " + (idxPergunta + 1) + " <span style='color:#ff3333; font-weight:bold; animation: popIn 0.5s infinite;'>⏱️ " + tempoRestante + "s</span>";
  } else {
    numElem.innerHTML = "Pergunta " + (idxPergunta + 1) + " <span style='color:var(--text-yellow);'>⏱️ " + tempoRestante + "s</span>";
  }
}

function fINALIZAR_POR_TEMPO_ESGOTADO() {
  // Se já estiver respondido ou travado, ignora
  if (bloqueado) return;
  
  // Passa os parâmetros vazios simulando que o jogador perdeu a vez
  verificarResposta(false, null, opcoesDaRodadaAtual, true);
}

/* ==========================================================================
   MECÂNICA CORE DO JOGO (ATUALIZADA COM SORTEIO ALEATÓRIO)
   ========================================================================== */
function iniciarJogo() {
  idxPergunta = 0;
  pulosRestantes = 3;
  
  // 🎲 Sorteia 16 perguntas diferentes do banco total toda vez que o jogo inicia
  if (typeof obter16PerguntasAleatorias === 'function') {
    BANCO_PERGUNTAS.geral = obter16PerguntasAleatorias();
  }
  
  const cards = document.querySelectorAll('.help-card');
  cards.forEach(function(el) {
    el.classList.remove('used');
  });
  
  const startScreen = document.getElementById("startScreen");
  const quizScreen = document.getElementById("quizScreen");
  
  if (startScreen) startScreen.classList.add("hidden");
  if (quizScreen) quizScreen.classList.remove("hidden");
  
  carregarPergunta();
}


function carregarPergunta() {
  bloqueado = false;
  alterarReacao("normal");
  
  const actionArea = document.getElementById("actionBtnArea");
  if (actionArea) actionArea.innerHTML = "";

  if (typeof BANCO_PERGUNTAS === 'undefined' || !BANCO_PERGUNTAS.geral || !BANCO_PERGUNTAS.geral[idxPergunta]) {
    pararTemporizador();
    alert("Parabéns! Você concluiu todas as perguntas do jogo!");
    window.location.href = "index.html"; 
    return;
  }

  const q = BANCO_PERGUNTAS.geral[idxPergunta];
  
  const premioElem = document.getElementById("valorPremio");
  const textElem = document.getElementById("questionText");

  if (premioElem) premioElem.innerText = PREMIOS[idxPergunta] || "R$ 1 MILHÃO";
  if (textElem) textElem.innerText = q.pergunta;

  let opcoesComStatus = q.opcoes.map(function(texto, index) {
    return { texto: texto, eCorreta: index === q.correta };
  });

  opcoesComStatus.sort(function() {
    return Math.random() - 0.5;
  });
  opcoesDaRodadaAtual = opcoesComStatus;

  const container = document.getElementById("optionsContainer");
  if (!container) return;
  container.innerHTML = "";

  const letras = ["A", "B", "C", "D"];

  opcoesComStatus.forEach(function(opcao, idx) {
    const btn = document.createElement("div");
    btn.className = "option-btn";
    btn.style.visibility = "visible";
    btn.innerHTML = "<span>" + letras[idx] + " " + opcao.texto + "</span> <span class=\"status-icon\"></span>";
    
    btn.onclick = function() {
      if (bloqueado) return;
      
      setTimeout(function() {
        verificarResposta(opcao.eCorreta, btn, opcoesComStatus, false);
      }, 150);
    };
    container.appendChild(btn);
  });

  // ⏱️ Inicializa o temporizador regressivo na nova pergunta
  iniciarTemporizador();
}

function verificarResposta(eCorreta, btnClicado, opcoesComStatus, porTempoEsgotado) {
  if (bloqueado && !porTempoEsgotado) return;
  bloqueado = true;

  // ⏱️ Trava imediatamente o relógio na hora da resposta
  pararTemporizador();

  // 🎵 TRAVA ANTIECO
  SOM_CLIQUE.pause();
  SOM_CLIQUE.currentTime = 0; 

  const todosBotoes = document.querySelectorAll(".option-btn");

  if (eCorreta && !porTempoEsgotado) {
    if (btnClicado) {
      btnClicado.classList.add("correct");
      const statusIcon = btnClicado.querySelector(".status-icon");
      if (statusIcon) statusIcon.innerText = "✓";
    }
    
    tocarSom(SOM_ACERTOU);
    alterarReacao("acertou", "Acertou! Aloha!");

    setTimeout(function() {
      if (idxPergunta < BANCO_PERGUNTAS.geral.length - 1) {
        const actionArea = document.getElementById("actionBtnArea");
        if (actionArea) {
          actionArea.innerHTML = "<div class=\"btn btn-primary\" onclick=\"proximaPergunta()\" style=\"cursor:pointer; text-align:center;\">PRÓXIMA</div>";
        }
      } else {
        alterarReacao("acertou", "PARABÉNS! VOCÊ É PADRÃO ARA");
      }
    }, 600);

  } else {
    if (btnClicado) {
      btnClicado.classList.add("wrong");
      const statusIcon = btnClicado.querySelector(".status-icon");
      if (statusIcon) statusIcon.innerText = "✗";
    }

    // Mostra qual era a alternativa certa para o jogador aprender
    todosBotoes.forEach(function(btn, idx) {
      if (opcoesComStatus[idx].eCorreta) {
        btn.classList.add("correct");
        const sIcon = btn.querySelector(".status-icon");
        if (sIcon) sIcon.innerText = "✓";
      }
    });

    tocarSom(SOM_ERROU);
    
    if (porTempoEsgotado) {
      alterarReacao("errou", "O tempo acabou! Que pena...");
    } else {
      alterarReacao("errou", "Eita... errou!");
    }

    setTimeout(function() {
      const actionArea = document.getElementById("actionBtnArea");
      if (actionArea) {
        actionArea.innerHTML = "<div class=\"btn btn-light\" onclick=\"iniciarJogo()\" style=\"cursor:pointer; text-align:center;\">TENTAR DE NOVO</div>";
      }
    }, 600);
  }
}

function proximaPergunta() {
  idxPergunta++;
  carregarPergunta();
}

/* ==========================================================================
   SISTEMA DE AJUDAS: PULOS E CARTAS
   ========================================================================== */
function usarPulo(e) {
  if (bloqueado) return;
  if (e.currentTarget.classList.contains('used')) return;

  if (pulosRestantes > 0) {
    pulosRestantes--;
    e.currentTarget.classList.add('used');
    
    // ⏱️ Pausa o relógio enquanto o mascote reage
    pararTemporizador();
    alterarReacao("pulo", "Uhu! Pergunta pulada!");

    setTimeout(function() {
      if (idxPergunta < BANCO_PERGUNTAS.geral.length - 1) {
        idxPergunta++;
        carregarPergunta();
      } else {
        alert("Você não pode pular a última pergunta!");
        carregarPergunta();
      }
    }, 1000);
  }
}

function usarCartas(e) {
  if (bloqueado) return;
  if (e.currentTarget.classList.contains('used')) return;

  e.currentTarget.classList.add('used');

  const btns = document.querySelectorAll('.option-btn');
  let indicesIncorretos = [];

  opcoesDaRodadaAtual.forEach(function(opcao, idx) {
    if (!opcao.eCorreta && btns[idx] && btns[idx].style.visibility !== "hidden") {
      indicesIncorretos.push(idx);
    }
  });

  let qtdParaExcluir = Math.random() < 0.5 ? 1 : 2;
  if (indicesIncorretos.length < qtdParaExcluir) {
    qtdParaExcluir = indicesIncorretos.length;
  }

  indicesIncorretos.sort(function() {
    return Math.random() - 0.5;
  });

  for (let i = 0; i < qtdParaExcluir; i++) {
    if (btns[indicesIncorretos[i]]) {
      btns[indicesIncorretos[i]].style.visibility = "hidden";
    }
  }

  if (qtdParaExcluir === 1) {
    alterarReacao("carta1", "As cartas tiraram 1 errada!");
  } else {
    alterarReacao("carta2", "As cartas tiraram 2 erradas!");
  }
}

/* ==========================================================================
   SISTEMA EXTENSOR INTEGRADO (PARTE 1): CAPTURA E PROCESSAMENTO DE PONTOS
   ========================================================================== */

let pontosTotais = 0;
let cartasUtilizadasNestaPartida = false;
let pulosUtilizadosNestaPartida = false;

// Tabela de pontuação base indexada por pergunta
const VALORES_PREMIOS_REAIS = [
  1000,   // Pergunta 1
  2000,   // Pergunta 2
  3000,   // Pergunta 3
  4000,   // Pergunta 4
  5000,   // Pergunta 5
  10000,  // Pergunta 6
  20000,  // Pergunta 7
  30000,  // Pergunta 8
  40000,  // Pergunta 9
  50000,  // Pergunta 10
  100000, // Pergunta 11
  200000, // Pergunta 12
  300000, // Pergunta 13
  400000, // Pergunta 14
  500000, // Pergunta 15
  1000000 // Pergunta 16 (Bônus de 1 Milhão)
];

// 1. Escuta cliques globais nas ajudas para invalidar o bônus de "Sem Ajuda"
document.addEventListener("click", function(evento) {
  const alvo = evento.target.closest(".help-card");
  if (alvo && !alvo.classList.contains("used")) {
    if (alvo.id === "ajudaCartas") cartasUtilizadasNestaPartida = true;
    if (alvo.id === "ajudaPulo") pulosUtilizadosNestaPartida = true;
  }
});

// 2. Calcula os pontos considerando Prêmio Fixo + Velocidade (Tempo) + Bônus de Ajudas
document.addEventListener("click", function(evento) {
  const alvo = evento.target.closest(".option-btn");
  if (alvo && typeof bloqueado !== 'undefined' && !bloqueado) {
    const tempoGasto = 30 - tempoRestante; 
    setTimeout(function() {
      if (alvo.classList.contains("correct")) {
        const currentIdx = (typeof idxPergunta !== 'undefined') ? idxPergunta : 0;
        
        // 1. Inicia com a pontuação de prêmio fixa estabelecida para a pergunta atual
        let pontuacaoDaRodada = VALORES_PREMIOS_REAIS[currentIdx] || 1000;
        
        // 2. Adiciona o bônus dinâmico de velocidade
        pontuacaoDaRodada += Math.max(10, 100 - (tempoGasto * 3));
        
        // 3. Adiciona bônus por passar limpo sem usar ajudas na rodada corrente
        if (!cartasUtilizadasNestaPartida && !pulosUtilizadosNestaPartida) {
          pontuacaoDaRodada += 50; 
        }
        
        // Acumula matematicamente no montante global da partida
        pontosTotais += Math.round(pontuacaoDaRodada);
        localStorage.setItem("pontuacaoTemporaria", pontosTotais);
      }
      cartasUtilizadasNestaPartida = false;
      pulosUtilizadosNestaPartida = false;
    }, 200);
  }
});

// 3. Captura os gatilhos nativos de fim de jogo para computar o ranking
const originalAlterarReacao = alterarReacao;
alterarReacao = function(tipo, textoMensagem) {
  if (originalAlterarReacao) originalAlterarReacao(tipo, textoMensagem);
  if (textoMensagem && (textoMensagem.includes("PARABÉNS") || textoMensagem.includes("errou") || textoMensagem.includes("acabou"))) {
    salvarPartidaNoRanking();
  }
};

function salvarPartidaNoRanking() {
  const perfilAtivo = JSON.parse(localStorage.getItem("perfilAtivo"));
  if (!perfilAtivo) return;

  const ranking = JSON.parse(localStorage.getItem("rankingValores")) || [];
  const novaPontuacao = parseInt(localStorage.getItem("pontuacaoTemporaria")) || 0;
  if (novaPontuacao === 0) return;

  ranking.push({
    nome: perfilAtivo.nome,
    sobrenome: perfilAtivo.sobrenome,
    pontos: novaPontuacao,
    data: new Date().toLocaleDateString('pt-BR')
  });

  // Ordena do maior score para o menor de forma estrita e mantém apenas o Top 10
  ranking.sort((a, b) => b.pontos - a.pontos);
  localStorage.setItem("rankingValores", JSON.stringify(ranking.slice(0, 10)));
  localStorage.removeItem("pontuacaoTemporaria");
}

function atualizarDadosPerfil() {
  localStorage.setItem("perfilAtivo", JSON.stringify({
    nome: document.getElementById("perfNome").value.trim(),
    sobrenome: document.getElementById("perfSobre").value.trim()
  }));
}
/* ==========================================================================
   SISTEMA EXTENSOR INTEGRADO (PARTE 2): INJEÇÃO VISUAL E LOGICA FLUIDA
   ========================================================================== */

window.addEventListener("DOMContentLoaded", function() {
  // Verifica se o usuário está na Home do jogo buscando elementos estruturais do index.html
  if (document.querySelector(".menu-left-section") && document.querySelector(".menu-buttons")) {
    // Força a limpeza do perfil temporário da sessão para obrigar um novo cadastro no quiosque
    localStorage.removeItem("perfilAtivo");
    localStorage.setItem("pontuacaoTemporaria", 0);
    
    // Injeta os estilos essenciais para as animações e modais cromáticos sem quebrar o style.css
    const estiloAnimacao = document.createElement("style");
    estiloAnimacao.innerHTML = `
      @keyframes goldPulse {
        0% { background-color: rgba(255, 215, 0, 0.15); box-shadow: inset 0 0 5px #ffd700; }
        50% { background-color: rgba(255, 215, 0, 0.4); box-shadow: inset 0 0 15px #ffd700, 0 0 8px #ffd700; }
        100% { background-color: rgba(255, 215, 0, 0.15); box-shadow: inset 0 0 5px #ffd700; }
      }
      .top1-row { animation: goldPulse 2s infinite ease-in-out; border-radius: 6px; }
      .top2-row { background-color: rgba(192, 192, 192, 0.2) !important; box-shadow: inset 0 0 8px rgba(192, 192, 192, 0.6); border-radius: 6px; }
      .top3-row { background-color: rgba(205, 127, 50, 0.15) !important; box-shadow: inset 0 0 8px rgba(205, 127, 50, 0.5); border-radius: 6px; }
      .modal-ranking-bg { position: fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.8); display:flex; justify-content:center; align-items:center; z-index:9999; }
      .modal-ranking-card { background: var(--bg-green-light); border: 3px solid var(--card-brown-border); width:90%; max-width:360px; padding:20px; border-radius:20px; box-shadow: 0 10px 25px rgba(0,0,0,0.6); }
    `;
    document.head.appendChild(estiloAnimacao);

    const containerDireito = document.querySelector(".menu-right-section");
    if (containerDireito) {
      // Montagem do formulário de Perfil do Jogador - SEMPRE INICIA VAZIO
      const perfilBox = document.createElement("div");
      perfilBox.style.width = "100%";
      perfilBox.style.marginBottom = "10px";
      perfilBox.style.background = "rgba(0,0,0,0.3)";
      perfilBox.style.padding = "10px";
      perfilBox.style.borderRadius = "14px";
      perfilBox.style.border = "1px solid rgba(255,255,255,0.08)";

      perfilBox.innerHTML = `
        <div style="color:#ffeb7b; font-weight:bold; margin-bottom:6px; font-size:0.85rem; text-align:center;">👤 PERFIL DO JOGADOR</div>
        <div style="display:flex; gap:6px;">
          <input type="text" id="perfNome" placeholder="Nome" value="" style="width:50%; padding:5px; border-radius:6px; border:none; font-size:0.8rem; background:#fff; color:#333;">
          <input type="text" id="perfSobre" placeholder="Sobrenome" value="" style="width:50%; padding:5px; border-radius:6px; border:none; font-size:0.8rem; background:#fff; color:#333;">
        </div>
      `;
      containerDireito.insertBefore(perfilBox, containerDireito.firstChild);

      document.getElementById("perfNome").addEventListener("input", atualizarDadosPerfil);
      document.getElementById("perfSobre").addEventListener("input", atualizarDadosPerfil);

      // Condicional Flexível: Pergunta se quer seguir de forma anônima
      document.querySelector(".btn-primary")?.addEventListener("click", function(e) {
        const n = document.getElementById("perfNome").value.trim();
        const s = document.getElementById("perfSobre").value.trim();
        
        if (!n || !s) {
          const querContinuarAnonimo = confirm("Você não preencheu o seu Nome e Sobrenome corporativo.\n\nDeseja continuar jogando de forma anônima? (Atenção: Seus pontos não entrarão na tabela de ranking).");
          if (!querContinuarAnonimo) {
            e.preventDefault();
          } else {
            localStorage.removeItem("perfilAtivo");
          }
        }
      });

      // Criação da mini-tabela do Pódium (Top 3)
      const rankingBox = document.createElement("div");
      rankingBox.style.width = "100%";
      rankingBox.style.marginTop = "10px";
      rankingBox.style.background = "rgba(0,0,0,0.4)";
      rankingBox.style.padding = "8px";
      rankingBox.style.borderRadius = "14px";
      rankingBox.style.border = "1px solid rgba(255,255,255,0.08)";
      
      const listaRanking = JSON.parse(localStorage.getItem("rankingValores")) || [];
      let linhasTabela = "";
      
      if (listaRanking.length === 0) {
        linhasTabela = `<tr><td colspan="3" style="text-align:center; padding:4px; font-size:0.75rem; color:#aaa;">Nenhum registro encontrado</td></tr>`;
      } else {
        // Exibe o Top 3 aplicando os estilos de Ouro, Prata e Bronze
        listaRanking.slice(0, 3).forEach((player, i) => {
          let classeCromatica = i === 0 ? 'class="top1-row"' : i === 1 ? 'class="top2-row"' : 'class="top3-row"';
          let medalha = i === 0 ? "🥇" : i === 1 ? "🥈" : "🥉";
          let inicialSobrenome = player.sobrenome ? ` ${player.sobrenome.trim().charAt(0).toUpperCase()}.` : "";
          
          linhasTabela += `
            <tr ${classeCromatica}>
              <td style="padding:5px; font-size:0.75rem; font-weight:bold; text-align:center; width:30px;">${medalha}</td>
              <td style="padding:5px; font-size:0.75rem; max-width:110px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${player.nome}${inicialSobrenome}</td>
              <td style="padding:5px; font-size:0.75rem; text-align:right; font-weight:bold; color:#27ae60;">${player.pontos} pts</td>
            </tr>
          `;
        });
      }

      rankingBox.innerHTML = `
        <div style="color:#ffeb7b; font-weight:bold; margin-bottom:4px; font-size:0.85rem; text-align:center;">🏆 PODIUM DOS TALENTOS</div>
        <table style="width:100%; border-collapse:collapse; color:#fff;">
          <tbody>${linhasTabela}</tbody>
        </table>
        <div id="verRankingCompleto" style="text-align:center; margin-top:6px; font-size:0.75rem; color:#ffeb7b; text-decoration:underline; cursor:pointer; font-weight:bold;">
          Ver Ranking Completo
        </div>
      `;
      containerDireito.appendChild(rankingBox);

      document.getElementById("verRankingCompleto").addEventListener("click", abrirModalRanking);
    }
  }
});

function abrirModalRanking() {
  const listaRanking = JSON.parse(localStorage.getItem("rankingValores")) || [];
  let corpoModalTable = "";

  listaRanking.forEach((player, i) => {
    let classeCromatica = i === 0 ? 'class="top1-row"' : i === 1 ? 'class="top2-row"' : i === 2 ? 'class="top3-row"' : '';
    let posText = i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `${i+1}º`;
    corpoModalTable += `
      <tr ${classeCromatica} style="border-bottom: 1px solid rgba(255,255,255,0.05);">
        <td style="padding:6px; font-size:0.8rem; font-weight:bold; text-align:center; color:#ffeb7b; width:40px;">${posText}</td>
        <td style="padding:6px; font-size:0.8rem; max-width:160px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${player.nome} ${player.sobrenome}</td>
        <td style="padding:6px; font-size:0.8rem; text-align:right; font-weight:bold; color:#27ae60;">${player.pontos} pts</td>
      </tr>
    `;
  });

  if (listaRanking.length === 0) {
    corpoModalTable = `<tr><td colspan="3" style="text-align:center; padding:15px; color:#aaa; font-size:0.8rem;">Nenhuma pontuação salva ainda.</td></tr>`;
  }

  const modalBg = document.createElement("div");
  modalBg.className = "modal-ranking-bg";
  modalBg.id = "rankingModalGlobal";
  modalBg.innerHTML = `
    <div class="modal-ranking-card">
      <div style="color:#ffeb7b; font-weight:bold; margin-bottom:12px; font-size:1rem; text-align:center;">🏆 LEADERBOARD - TOP 10</div>
      <div style="max-height:260px; overflow-y:auto; padding-right:2px; margin-bottom:15px;">
        <table style="width:100%; border-collapse:collapse; color:#fff;">
          <thead>
            <tr style="border-bottom:1px solid rgba(255,255,255,0.2); font-size:0.75rem; color:#aaa; text-align:left;">
              <th style="padding:4px; text-align:center;">Pos</th>
              <th style="padding:4px;">Jogador</th>
              <th style="padding:4px; text-align:right;">Score</th>
            </tr>
          </thead>
          <tbody>${corpoModalTable}</tbody>
        </table>
      </div>
      <div id="fecharModalRank" class="btn btn-secondary" style="padding:8px; font-size:0.85rem; border-radius:10px; width:100%; display:block; cursor:pointer;">Fechar Janela</div>
    </div>
  `;

  document.body.appendChild(modalBg);
  document.getElementById("fecharModalRank").addEventListener("click", function() {
    modalBg.remove();
  });
}
