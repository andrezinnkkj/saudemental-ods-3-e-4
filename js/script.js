const botaoMenu = document.querySelector('.menu-mobile');
const menu = document.querySelector('nav ul');
const links = menu.querySelectorAll('a');

botaoMenu.addEventListener('click', () => {
    menu.classList.toggle('menu-aberto');
    botaoMenu.classList.toggle('menu-aberto');
});

links.forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.remove('menu-aberto');
        botaoMenu.classList.remove('menu-aberto');
    });
});