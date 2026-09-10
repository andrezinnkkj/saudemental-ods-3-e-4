const botaoLerMais = document.querySelector('.ler-mais');
const conteudoExtra = document.querySelector('.conteudo-extra');

if (botaoLerMais && conteudoExtra) {


botaoLerMais.addEventListener('click', () => {

    const estaAberto = conteudoExtra.classList.toggle('mostrar');

    botaoLerMais.textContent = estaAberto
        ? 'Ler menos'
        : 'Ler mais';

    botaoLerMais.setAttribute(
        'aria-expanded',
        estaAberto
    );

});

}
