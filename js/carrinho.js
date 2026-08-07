/*=========================================================
    HELP MED CWB
    Módulo da Cesta de Medicamentos
=========================================================*/

/*
    Estrutura de cada item:

    {
        id: 1,
        quantidade: 2
    }
*/

let carrinho = [];


/*=========================================================
    Localizar medicamento
=========================================================*/

function buscarMedicamentoPorId(id){

    return medicamentos.find(
        (medicamento) => medicamento.id === id
    );

}


/*=========================================================
    Adicionar medicamento à cesta
=========================================================*/

function adicionarAoCarrinho(id){

    const medicamento = buscarMedicamentoPorId(id);

    if(!medicamento){

        alert("Medicamento não encontrado.");

        return;

    }

    if(medicamento.estoque <= 0){

        alert("Este medicamento está indisponível no momento.");

        return;

    }

    const itemExistente = carrinho.find(
        (item) => item.id === id
    );

    if(itemExistente){

        if(itemExistente.quantidade >= medicamento.estoque){

            alert(
                `Não é possível solicitar mais unidades.\n\n` +
                `Estoque disponível: ${medicamento.estoque} unidade(s).`
            );

            return;

        }

        itemExistente.quantidade++;

    }else{

        carrinho.push({

            id: medicamento.id,

            quantidade: 1

        });

        if(medicamento.receita){

            alert(
                "Este medicamento necessita de receita médica.\n\n" +
                "A solicitação poderá ser concluída, mas a receita será " +
                "solicitada ou avaliada durante a finalização do pedido."
            );

        }

    }

    renderizarCarrinho();

}


/*=========================================================
    Aumentar quantidade
=========================================================*/

function aumentarQuantidade(id){

    const item = carrinho.find(
        (produto) => produto.id === id
    );

    const medicamento = buscarMedicamentoPorId(id);

    if(!item || !medicamento){

        return;

    }

    if(item.quantidade >= medicamento.estoque){

        alert(
            `Quantidade máxima disponível atingida.\n\n` +
            `Estoque disponível: ${medicamento.estoque} unidade(s).`
        );

        return;

    }

    item.quantidade++;

    renderizarCarrinho();

}


/*=========================================================
    Diminuir quantidade
=========================================================*/

function diminuirQuantidade(id){

    const item = carrinho.find(
        (produto) => produto.id === id
    );

    if(!item){

        return;

    }

    item.quantidade--;

    if(item.quantidade <= 0){

        removerDoCarrinho(id);

        return;

    }

    renderizarCarrinho();

}


/*=========================================================
    Remover medicamento
=========================================================*/

function removerDoCarrinho(id){

    carrinho = carrinho.filter(
        (item) => item.id !== id
    );

    renderizarCarrinho();

}


/*=========================================================
    Calcular quantidade total
=========================================================*/

function calcularQuantidadeTotal(){

    return carrinho.reduce(
        (total, item) => total + item.quantidade,
        0
    );

}


/*=========================================================
    Verificar se há medicamento com receita
=========================================================*/

function carrinhoPossuiMedicamentoComReceita(){

    return carrinho.some((item) => {

        const medicamento = buscarMedicamentoPorId(item.id);

        return medicamento && medicamento.receita;

    });

}


/*=========================================================
    Renderizar cesta
=========================================================*/

function renderizarCarrinho(){

    const listaCesta = document.getElementById("lista-cesta");

    const totalItens = document.getElementById("totalItens");

    const botaoFinalizar = document.getElementById("btnFinalizar");

    if(!listaCesta || !totalItens){

        console.error(
            "Os elementos da cesta não foram encontrados no HTML."
        );

        return;

    }

    listaCesta.innerHTML = "";

    if(carrinho.length === 0){

        listaCesta.innerHTML = `
            <p class="cesta-vazia">
                Nenhum medicamento selecionado.
            </p>
        `;

        totalItens.textContent = "0 medicamento(s)";

        if(botaoFinalizar){

            botaoFinalizar.disabled = true;

        }

        return;

    }

    carrinho.forEach((item) => {

        const medicamento = buscarMedicamentoPorId(item.id);

        if(!medicamento){

            return;

        }

        const itemCesta = document.createElement("div");

        itemCesta.classList.add("item-cesta");

        itemCesta.innerHTML = `

            <div class="item-cesta-informacoes">

                <strong>${medicamento.nome}</strong>

                <span>
                    Estoque disponível:
                    ${medicamento.estoque} unidade(s)
                </span>

                ${
                    medicamento.receita
                        ? `
                            <span class="aviso-receita-cesta">
                                Receita necessária
                            </span>
                          `
                        : ""
                }

            </div>

            <div class="controle-quantidade">

                <button
                    type="button"
                    class="btn-quantidade"
                    onclick="diminuirQuantidade(${item.id})"
                    aria-label="Diminuir quantidade de ${medicamento.nome}"
                >
                    −
                </button>

                <span class="quantidade-item">
                    ${item.quantidade}
                </span>

                <button
                    type="button"
                    class="btn-quantidade"
                    onclick="aumentarQuantidade(${item.id})"
                    aria-label="Aumentar quantidade de ${medicamento.nome}"
                >
                    +
                </button>

            </div>

            <button
                type="button"
                class="btn-remover-item"
                onclick="removerDoCarrinho(${item.id})"
                aria-label="Remover ${medicamento.nome} da cesta"
            >
                Remover
            </button>
        `;

        listaCesta.appendChild(itemCesta);

    });

    const quantidadeTotal = calcularQuantidadeTotal();

    totalItens.textContent =
        `${quantidadeTotal} medicamento(s)`;

    if(botaoFinalizar){

        botaoFinalizar.disabled = false;

    }

}


/*=========================================================
    Limpar cesta
=========================================================*/

function limparCarrinho(){

    carrinho = [];

    renderizarCarrinho();

}


/*=========================================================
    Obter resumo da cesta
=========================================================*/

function obterResumoCarrinho(){

    return carrinho.map((item) => {

        const medicamento = buscarMedicamentoPorId(item.id);

        return {

            idMedicamento: item.id,

            nome: medicamento
                ? medicamento.nome
                : "Medicamento não encontrado",

            quantidade: item.quantidade,

            necessitaReceita: medicamento
                ? medicamento.receita
                : false

        };

    });

}


/*=========================================================
    Inicialização da cesta
=========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    renderizarCarrinho();

});