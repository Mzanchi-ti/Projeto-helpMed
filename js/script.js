/*=====================================================
    HELP MED CWB
    Script Principal
======================================================*/

document.addEventListener("DOMContentLoaded", () => {

    // Seleciona todos os elementos que possuem animação
    const elementos = document.querySelectorAll(
        ".reveal, .reveal-left, .reveal-right, .reveal-zoom"
    );

    // Verifica se o elemento entrou na área visível da tela
    function revelarElementos() {

        const alturaJanela = window.innerHeight;

        elementos.forEach((elemento) => {

            const posicao = elemento.getBoundingClientRect().top;

            const pontoDeAtivacao = 120;

            if (posicao < alturaJanela - pontoDeAtivacao) {

                elemento.classList.add("active");

            }

        });

    }

    // Executa ao carregar
    revelarElementos();

    // Executa durante a rolagem
    window.addEventListener("scroll", revelarElementos);

});