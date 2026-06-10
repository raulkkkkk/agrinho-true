const themeToggle = document.getElementById('theme-toggle');


if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
}

themeToggle.addEventListener('click', () => {
    let currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
});


const modal = document.getElementById('accessibility-modal');
const openModalBtn = document.getElementById('access-modal-btn');
const closeModalBtn = document.getElementById('close-modal-btn');

openModalBtn.addEventListener('click', () => {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
});

closeModalBtn.addEventListener('click', () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
});

// Fecha o modal ao clicar fora dele
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('open');
    }
});


let currentFontSize = 16; 
const bodyElement = document.body;

document.getElementById('font-increase').addEventListener('click', () => {
    if (currentFontSize < 24) { 
        currentFontSize += 2;
        bodyElement.style.setProperty('--font-size-base', `${currentFontSize}px`);
    }
});

document.getElementById('font-decrease').addEventListener('click', () => {
    if (currentFontSize > 12) { 
        currentFontSize -= 2;
        bodyElement.style.setProperty('--font-size-base', `${currentFontSize}px`);
    }
});


const audioBtn = document.getElementById('audio-narration-btn');
let narrating = false;
let speech = new SpeechSynthesisUtterance();

audioBtn.addEventListener('click', () => {
    if (!narrating) {
        
        const textToRead = document.querySelector('main').innerText;
        speech.text = textToRead;
        speech.lang = 'pt-BR';
        speech.rate = 1.1; 

        window.speechSynthesis.speak(speech);
        audioBtn.innerText = "🛑 Parar Narração";
        audioBtn.style.backgroundColor = "#d90429";
        narrating = true;
    } else {
        window.speechSynthesis.cancel();
        audioBtn.innerText = "🔊 Ativar Narração da Página";
        audioBtn.style.backgroundColor = "var(--accent-green)";
        narrating = false;
    }
});


speech.onend = () => {
    audioBtn.innerText = "🔊 Ativar Narração da Página";
    audioBtn.style.backgroundColor = "var(--accent-green)";
    narrating = false;
};


const calcBtn = document.getElementById('calc-btn');
const sacasInput = document.getElementById('sacas-input');
const resultSection = document.getElementById('calc-result');
const precoNormalOutput = document.getElementById('preco-normal');
const precoSustentavelOutput = document.getElementById('preco-sustentavel');
const economiaPesticidaOutput = document.getElementById('economia-pesticida');


const PRECO_SACA_NORMAL = 280.00;
const PRECO_SACA_MODIFICADA = 390.00; 


const ECONOMIA_MANEJO_POR_SACA = 160.00; 

calcBtn.addEventListener('click', () => {
    const quantidade = parseInt(sacasInput.value);

    if (isNaN(quantidade) || quantidade <= 0) {
        alert("Por favor, digite uma quantidade válida de sacas.");
        return;
    }

    const totalNormal = quantidade * PRECO_SACA_NORMAL;
    const totalSustentavel = quantidade * PRECO_SACA_MODIFICADA;
    const economiaReal = quantidade * ECONOMIA_MANEJO_POR_SACA;

    precoNormalOutput.innerText = totalNormal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    precoSustentavelOutput.innerText = totalSustentavel.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    economiaPesticidaOutput.innerText = economiaReal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    resultSection.classList.remove('hidden');
});


const animatedElements = document.querySelectorAll('.scroll-anim');

const checkScroll = () => {
    const triggerBottom = (window.innerHeight / 5) * 4; 

    animatedElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < triggerBottom) {
            element.classList.add('active');
        }
    });
};


window.addEventListener('scroll', checkScroll);
checkScroll();


/* ==========================================================================
   FUNÇÃO DO CARROSSEL HORIZONTAL (ADICIONADA)
   ========================================================================== */
function scrollCarousel(direction) {
  const carousel = document.getElementById('carousel');
  if (!carousel) return;

  const card = carousel.querySelector('.card');
  if (card) {
    const cardWidth = card.offsetWidth;
    // Captura dinamicamente o espaçamento (gap) configurado no CSS
    const gap = parseFloat(window.getComputedStyle(carousel).gap) || 0;
    const scrollAmount = cardWidth + gap;

    // Executa o deslocamento lateral suave
    carousel.scrollBy({
      left: direction * scrollAmount,
      behavior: 'smooth'
    });
  }
}
