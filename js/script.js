const botaoMenu = document.querySelector('.menu-mobile');
const menu = document.querySelector('#menu-principal');
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