// =====================================================
//  script.js — TechNova Solutions
//  Agenda 16 — Desenvolvimento de Sistemas I
//  Funcionalidades:
//    1. Navegação entre seções (menu sidebar)
//    2. Slideshow manual (botões prev/next e dots)
//    3. Slideshow automático (play/pause)
// =====================================================

// ── 1. NAVEGAÇÃO ENTRE SEÇÕES ────────────────────────

/**
 * Exibe a seção correspondente ao ID informado
 * e atualiza o link ativo no sidebar.
 * @param {string} id - ID da seção a exibir
 */
function mostrarSecao(id) {
  // Oculta todas as seções
  var secoes = document.querySelectorAll('.secao');
  secoes.forEach(function(s) {
    s.classList.remove('ativa');
  });

  // Remove a classe 'ativo' de todos os links do menu
  var links = document.querySelectorAll('.sidebar a');
  links.forEach(function(a) {
    a.classList.remove('ativo');
  });

  // Exibe a seção escolhida
  var alvo = document.getElementById(id);
  if (alvo) alvo.classList.add('ativa');

  // Marca o link correspondente como ativo
  var linkAtivo = document.getElementById('menu-' + id);
  if (linkAtivo) linkAtivo.classList.add('ativo');

  // Mostra ou oculta o rodapé do site
  var rodape = document.getElementById('rodape-site');
  if (rodape) {
    rodape.style.display = (id !== 'home') ? 'block' : 'none';
  }

  // Impede navegação pelo hash
  return false;
}


// ── 2. SLIDESHOW ─────────────────────────────────────

var indiceAtual = 0;   // índice do slide visível
var totalSlides = 0;   // total de slides encontrados
var timerAuto   = null; // referência ao setInterval
var modoAuto    = false; // estado do modo automático

/**
 * Inicializa o slideshow:
 * conta os slides e exibe o primeiro.
 */
function iniciarSlideshow() {
  var slides = document.querySelectorAll('.slide');
  totalSlides = slides.length;
  exibirSlide(0);
}

/**
 * Exibe o slide no índice indicado.
 * Atualiza os dots indicadores.
 * @param {number} n - índice do slide
 */
function exibirSlide(n) {
  var slides = document.querySelectorAll('.slide');
  var dots   = document.querySelectorAll('.dot');

  // Garante que o índice fique no intervalo válido
  if (n >= totalSlides) n = 0;
  if (n < 0) n = totalSlides - 1;
  indiceAtual = n;

  // Oculta todos os slides
  slides.forEach(function(s) {
    s.style.display = 'none';
  });

  // Remove destaque de todos os dots
  dots.forEach(function(d) {
    d.classList.remove('ativo');
  });

  // Exibe o slide atual
  slides[indiceAtual].style.display = 'block';

  // Ativa o dot correspondente
  if (dots[indiceAtual]) {
    dots[indiceAtual].classList.add('ativo');
  }
}

/**
 * Avança (+1) ou recua (-1) um slide.
 * @param {number} delta - direção (+1 próximo, -1 anterior)
 */
function mudarSlide(delta) {
  exibirSlide(indiceAtual + delta);
}

/**
 * Vai diretamente para um slide pelo índice.
 * Chamado ao clicar nos dots.
 * @param {number} indice
 */
function irParaSlide(indice) {
  exibirSlide(indice);
}

/**
 * Liga ou desliga o modo automático do slideshow.
 * Alterna entre play e pause no botão.
 */
function alternarAuto() {
  modoAuto = !modoAuto;

  var iconeBotao = document.getElementById('icone-auto');
  var textoBotao = document.getElementById('texto-auto');
  var btnAuto    = document.getElementById('btn-auto');

  if (modoAuto) {
    // Inicia o avanço automático a cada 3,5 segundos
    timerAuto = setInterval(function() {
      mudarSlide(1);
    }, 3500);

    if (iconeBotao) iconeBotao.className = 'fa-solid fa-pause';
    if (textoBotao) textoBotao.textContent = 'Pausar';
    if (btnAuto)    btnAuto.classList.add('ligado');

  } else {
    // Para o slideshow automático e limpa o intervalo
    clearInterval(timerAuto);
    timerAuto = null;

    if (iconeBotao) iconeBotao.className = 'fa-solid fa-play';
    if (textoBotao) textoBotao.textContent = 'Automático';
    if (btnAuto)    btnAuto.classList.remove('ligado');
  }
}


// ── 3. INICIALIZAÇÃO ─────────────────────────────────

// Executa quando a página termina de carregar
window.addEventListener('DOMContentLoaded', function() {
  mostrarSecao('home');  // exibe a seção inicial
  iniciarSlideshow();    // prepara o slideshow
});
