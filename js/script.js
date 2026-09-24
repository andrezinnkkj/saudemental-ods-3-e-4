/* =========================================================
   MENU MOBILE
========================================================= */
const botaoMenu = document.querySelector('.menu-mobile');
const menu = document.querySelector('#menu-principal');

if (botaoMenu && menu) {
    const links = menu.querySelectorAll('a');

    botaoMenu.addEventListener('click', () => {
        menu.classList.toggle('menu-aberto');
        botaoMenu.classList.toggle('menu-aberto');
        const aberto = botaoMenu.classList.contains('menu-aberto');
        botaoMenu.setAttribute('aria-expanded', aberto);
        botaoMenu.setAttribute(
            'aria-label',
            aberto ? 'Fechar menu' : 'Abrir menu'
        );
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('menu-aberto');
            botaoMenu.classList.remove('menu-aberto');
            botaoMenu.setAttribute('aria-expanded', 'false');
            botaoMenu.setAttribute('aria-label', 'Abrir menu');
        });
    });
}

/* Verifica se a pessoa prefere menos movimento na tela */
const prefereMenosMovimento = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
).matches;

/* =========================================================
   BARRA DE PROGRESSO DE LEITURA
========================================================= */
const barraProgresso = document.querySelector('#barra-progresso');

if (barraProgresso) {
    const atualizarProgresso = () => {
        const alturaTotal = document.documentElement.scrollHeight - window.innerHeight;
        const progresso = alturaTotal > 0
            ? (window.scrollY / alturaTotal) * 100
            : 0;
        barraProgresso.style.width = `${progresso}%`;
    };
    window.addEventListener('scroll', atualizarProgresso, { passive: true });
    atualizarProgresso();
}

/* =========================================================
   BOTÃO VOLTAR AO TOPO
========================================================= */
const botaoTopo = document.querySelector('.voltar-topo');

if (botaoTopo) {
    const alternarBotaoTopo = () => {
        botaoTopo.classList.toggle('mostrar', window.scrollY > 500);
    };
    window.addEventListener('scroll', alternarBotaoTopo, { passive: true });
    alternarBotaoTopo();

    botaoTopo.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: prefereMenosMovimento ? 'auto' : 'smooth'
        });
    });
}

/* =========================================================
   ANIMAÇÃO DE ENTRADA AO ROLAR (fade + slide-up)
========================================================= */
const elementosRevelaveis = document.querySelectorAll(
    '[data-reveal], [data-reveal-group]'
);

if (elementosRevelaveis.length && !prefereMenosMovimento && 'IntersectionObserver' in window) {
    const observador = new IntersectionObserver(
        (entradas, obs) => {
            entradas.forEach(entrada => {
                if (entrada.isIntersecting) {
                    entrada.target.classList.add('is-visivel');
                    obs.unobserve(entrada.target);
                }
            });
        },
        { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    elementosRevelaveis.forEach(elemento => observador.observe(elemento));
} else {
    // Sem suporte a IntersectionObserver ou movimento reduzido:
    // mostra tudo direto, sem animação.
    elementosRevelaveis.forEach(elemento => elemento.classList.add('is-visivel'));
}

/* =========================================================
   AMPLIAR GRÁFICOS NO DESKTOP
========================================================= */
const graficosExpansiveis = document.querySelectorAll('.grafico-resultado');
const telaDesktop = window.matchMedia('(min-width: 801px)');

if (graficosExpansiveis.length) {
    const alternarGrafico = (grafico) => {
        if (!telaDesktop.matches) return;
        const expandido = grafico.classList.toggle('expandido');
        grafico.setAttribute('aria-expanded', expandido);
    };

    graficosExpansiveis.forEach(grafico => {
        grafico.setAttribute('tabindex', '0');
        grafico.setAttribute('role', 'button');
        grafico.setAttribute('aria-label', 'Ampliar gráfico');
        grafico.setAttribute('aria-expanded', 'false');

        grafico.addEventListener('click', () => alternarGrafico(grafico));
        grafico.addEventListener('keydown', (evento) => {
            if (evento.key === 'Enter' || evento.key === ' ') {
                evento.preventDefault();
                alternarGrafico(grafico);
            }
        });
    });

    document.addEventListener('keydown', (evento) => {
        if (evento.key === 'Escape') {
            graficosExpansiveis.forEach(grafico => {
                grafico.classList.remove('expandido');
                grafico.setAttribute('aria-expanded', 'false');
            });
        }
    });
}

/* =========================================================
   CONTADOR ANIMADO NOS DADOS EM DESTAQUE
   Anima qualquer número presente no texto (ex: "48", "88",
   "21–69%"), preservando o restante do texto original.
========================================================= */
const numerosDestaque = document.querySelectorAll('.destaque-dado strong');

if (numerosDestaque.length && !prefereMenosMovimento && 'IntersectionObserver' in window) {
    const animarNumero = (elemento) => {
        const textoOriginal = elemento.textContent;
        const numeros = textoOriginal.match(/\d+/g);
        if (!numeros) return;

        const alvos = numeros.map(n => parseInt(n, 10));
        const duracao = 1200;
        const inicio = performance.now();

        const quadro = (agora) => {
            const progresso = Math.min((agora - inicio) / duracao, 1);
            const suavizado = 1 - Math.pow(1 - progresso, 3);
            let indice = 0;
            const textoAtual = textoOriginal.replace(/\d+/g, () => {
                const valor = Math.round(alvos[indice] * suavizado);
                indice++;
                return valor;
            });
            elemento.textContent = textoAtual;
            if (progresso < 1) requestAnimationFrame(quadro);
        };
        requestAnimationFrame(quadro);
    };

    const observadorNumeros = new IntersectionObserver(
        (entradas, obs) => {
            entradas.forEach(entrada => {
                if (entrada.isIntersecting) {
                    animarNumero(entrada.target);
                    obs.unobserve(entrada.target);
                }
            });
        },
        { threshold: 0.6 }
    );
    numerosDestaque.forEach(elemento => observadorNumeros.observe(elemento));
}
