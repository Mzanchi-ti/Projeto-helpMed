// ==========================================
// HELP MED CWB
// Sistema de Solicitação de Medicamentos
// ==========================================

// Lista da cesta
let cesta = [];

// Elementos da página
const listaMedicamentos = document.getElementById("medicamentos");
const listaCesta = document.getElementById("lista-cesta");
const totalItens = document.getElementById("totalItens");

const campoPesquisa = document.getElementById("pesquisa");
const filtroCategoria = document.getElementById("categoria");
const filtroReceita = document.getElementById("receita");
const filtroEstoque = document.getElementById("estoque");

// ==========================================
// Carrega todos os medicamentos
// ==========================================

window.onload = () => {

    mostrarMedicamentos(medicamentos);

};

// ==========================================
// Mostra medicamentos
// ==========================================

function mostrarMedicamentos(lista){

    listaMedicamentos.innerHTML = "";

    if(lista.length === 0){

        listaMedicamentos.innerHTML =

        `
            <p>Nenhum medicamento encontrado.</p>
        `;

        return;

    }

    lista.forEach(med => {

        let seloEstoque = "";

        if(med.estoque > 50){

            seloEstoque = `<span class="selo disponivel">Disponível</span>`;

        }

        else if(med.estoque > 0){

            seloEstoque = `<span class="selo baixo">Estoque Baixo</span>`;

        }

        else{

            seloEstoque = `<span class="selo indisponivel">Indisponível</span>`;

        }

        let seloReceita = "";

        if(med.receita){

            seloReceita = `<span class="selo receita">Receita Obrigatória</span>`;

        }

        listaMedicamentos.innerHTML +=

        `

        <div class="card-medicamento">

            <h3>${med.nome}</h3>

            <p><strong>Princípio ativo:</strong> ${med.principio}</p>

            <p><strong>Categoria:</strong> ${med.categoria}</p>

            <p><strong>Estoque:</strong> ${med.estoque}</p>

            <div class="selos">

                ${seloEstoque}

                ${seloReceita}

            </div>

            <button
                class="btn-adicionar"
                onclick="adicionarCesta(${med.id})">

                Adicionar à Cesta

            </button>

            <button
                class="btn-detalhes"
                onclick="abrirModal(${med.id})">

                Ver Detalhes

            </button>

            <button

                class="btn-detalhes"
                onclick="abrirModal(${med.id})">

                Ver Detalhes

            </button>       

        </div>

        `;

    });

}

// ==========================================
// Adiciona medicamento
// ==========================================

function adicionarCesta(id){

    const medicamento = medicamentos.find(m => m.id === id);

    cesta.push(medicamento);

    atualizarCesta();

    if(medicamento.receita){

        alert(
            "Este medicamento necessita de receita médica.\n\nA receita será solicitada na finalização da solicitação."
        );

    }

}

// ==========================================
// Atualiza cesta
// ==========================================

function atualizarCesta(){

    if(cesta.length === 0){

        listaCesta.innerHTML =

        "<p>Nenhum medicamento selecionado.</p>";

    }

    else{

        listaCesta.innerHTML = "";

        cesta.forEach((med,index)=>{

            listaCesta.innerHTML +=

            `

            <div class="item-cesta">

                <span>${med.nome}</span>

                <button onclick="removerItem(${index})">

                    ❌

                </button>

            </div>

            `;

        });

    }

    totalItens.innerHTML =

        cesta.length + " medicamento(s)";

}

// ==========================================
// Remove item
// ==========================================

function removerItem(indice){

    cesta.splice(indice,1);

    atualizarCesta();

}

// ==========================================
// Pesquisa
// ==========================================

campoPesquisa.addEventListener("keyup",filtrar);

filtroCategoria.addEventListener("change",filtrar);

filtroReceita.addEventListener("change",filtrar);

filtroEstoque.addEventListener("change",filtrar);

// ==========================================
// Filtros
// ==========================================

function filtrar(){

    let texto = campoPesquisa.value.toLowerCase();

    let categoria = filtroCategoria.value;

    let receita = filtroReceita.value;

    let estoque = filtroEstoque.value;

    let resultado = medicamentos.filter(m=>{

        let pesquisa =

            m.nome.toLowerCase().includes(texto)

            ||

            m.principio.toLowerCase().includes(texto);

        let cat =

            categoria=="" ||

            m.categoria===categoria;

        let rec =

            receita=="" ||

            (receita=="sim" && m.receita)

            ||

            (receita=="nao" && !m.receita);

        let est = true;

        if(estoque=="disponivel")

            est = m.estoque>50;

        if(estoque=="baixo")

            est = m.estoque>0 && m.estoque<=50;

        return pesquisa && cat && rec && est;

    });

    mostrarMedicamentos(resultado);

}

// ==========================================
// MODAL
// ==========================================

function abrirModal(id){

    const med = medicamentos.find(m=>m.id===id);

    document.getElementById("conteudoModal").innerHTML =

    `

    <h2>${med.nome}</h2>

    <p><strong>Princípio ativo:</strong> ${med.principio}</p>

    <p><strong>Categoria:</strong> ${med.categoria}</p>

    <p><strong>Fabricante:</strong> ${med.fabricante}</p>

    <p><strong>Apresentação:</strong> ${med.apresentacao}</p>

    <p><strong>Indicação:</strong> ${med.indicacao}</p>

    <p><strong>Receita:</strong>

        ${med.receita ? "Necessária" : "Não Necessária"}

    </p>

    <div class="modal-info">

        <div class="modal-box">

            <strong>Estoque</strong>

            <br>

            ${med.estoque} unidades

        </div>

        <div class="modal-box">

            <strong>Observações</strong>

            <br>

            ${med.observacoes}

        </div>

    </div>

    `;

    document.getElementById("modalMedicamento").style.display="block";

}

function fecharModal(){

    document.getElementById("modalMedicamento").style.display="none";

}

function abrirModal(id){

    const med = medicamentos.find(m => m.id === id);

    document.getElementById("conteudoModal").innerHTML = `

        <h2>${med.nome}</h2>

        <p><strong>Princípio ativo:</strong> ${med.principio}</p>

        <p><strong>Categoria:</strong> ${med.categoria}</p>

        <p><strong>Fabricante:</strong> ${obterFabricante(med.categoria)}</p>

        <p><strong>Apresentação:</strong> ${obterApresentacao(med.nome)}</p>

        <p><strong>Indicação:</strong> ${obterIndicacao(med.categoria)}</p>

        <p><strong>Receita:</strong>
            ${med.receita ? "Necessária" : "Não Necessária"}
        </p>

        <p><strong>Armazenamento:</strong>
            ${obterArmazenamento()}
        </p>

        <div class="modal-info">

            <div class="modal-box">

                <strong>Estoque</strong><br>

                ${med.estoque} unidade(s)

            </div>

            <div class="modal-box">

                <strong>Observações</strong><br>

                ${obterObservacoes(med.receita)}

            </div>

        </div>

    `;

    document.getElementById("modalMedicamento").style.display = "block";

}

function fecharModal(){

    document.getElementById("modalMedicamento").style.display = "none";

}

window.onclick = function(event){

    const modal = document.getElementById("modalMedicamento");

    if(event.target === modal){

        modal.style.display = "none";

    }

}

window.onclick=function(e){

    let modal=document.getElementById("modalMedicamento");

    if(e.target==modal)

        modal.style.display="none";

}