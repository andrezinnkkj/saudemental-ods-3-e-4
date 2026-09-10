const botaoMenu = document.querySelector('.menu-mobile');
const menu = document.querySelector('#menu-principal');

if (botaoMenu && menu) {


const links = menu.querySelectorAll('a');

botaoMenu.addEventListener('click', () => {

    const menuAberto = menu.classList.toggle('menu-aberto');

    botaoMenu.classList.toggle('menu-aberto');

    botaoMenu.setAttribute('aria-expanded', menuAberto);

    botaoMenu.setAttribute(
        'aria-label',
        menuAberto ? 'Fechar menu' : 'Abrir menu'
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
