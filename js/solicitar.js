/*=========================================================
    HELP MED CWB
    Página Solicitar Medicamentos
=========================================================*/

/*=========================================================
    ARMAZENAMENTO DAS SOLICITAÇÕES
=========================================================*/

const CHAVE_SOLICITACOES_PUBLICAS =
    "helpmed_solicitacoes_publicas";

/*=========================================================
    Elementos da Interface
=========================================================*/

const listaMedicamentos =
    document.getElementById("medicamentos");

const campoPesquisa =
    document.getElementById("pesquisa");

const botaoPesquisar =
    document.getElementById("btnPesquisar");

const filtroCategoria =
    document.getElementById("categoria");

const filtroReceita =
    document.getElementById("receita");

const filtroEstoque =
    document.getElementById("estoque");

const modalMedicamento =
    document.getElementById("modalMedicamento");

const conteudoModal =
    document.getElementById("conteudoModal");

const botaoFecharModal =
    document.querySelector(".fechar-modal");

const botaoFinalizar =
    document.getElementById("btnFinalizar");

    /*=========================================================
    Elementos da Finalização
=========================================================*/

const modalFinalizacao =
    document.getElementById("modalFinalizacao");

const nomeSolicitante =
    document.getElementById("nomeSolicitante");

const telefoneSolicitante =
    document.getElementById("telefoneSolicitante");

const emailSolicitante =
    document.getElementById("emailSolicitante");

const fecharFinalizacao =
    document.getElementById("fecharFinalizacao");

const cancelarFinalizacao =
    document.getElementById("cancelarFinalizacao");

const confirmarSolicitacao =
    document.getElementById("confirmarSolicitacao");

const resumoFinalizacao =
    document.getElementById("resumoFinalizacao");

const totalFinalizacao =
    document.getElementById("totalFinalizacao");

const secaoReceita =
    document.getElementById("secaoReceita");

const arquivoReceita =
    document.getElementById("arquivoReceita");

const nomeArquivoReceita =
    document.getElementById("nomeArquivoReceita");

const secaoEndereco =
    document.getElementById("secaoEndereco");

const novoEndereco =
    document.getElementById("novoEndereco");

const confirmarInformacoes =
    document.getElementById("confirmarInformacoes");

const mensagemFinalizacao =
    document.getElementById("mensagemFinalizacao");


/*=========================================================
    Inicialização
=========================================================*/

document.addEventListener(
    "DOMContentLoaded",
    inicializarPagina
);

function inicializarPagina(){

    mostrarMedicamentos(medicamentos);

    configurarEventos();

}


/*=========================================================
    Configuração dos Eventos
=========================================================*/

function configurarEventos(){

    if(campoPesquisa){

        campoPesquisa.addEventListener(
            "input",
            filtrarMedicamentos
        );

        campoPesquisa.addEventListener(
            "keydown",
            (event) => {

                if(event.key === "Enter"){

                    event.preventDefault();

                    filtrarMedicamentos();

                }

            }
        );

    if(telefoneSolicitante){

    telefoneSolicitante.addEventListener(
        "input",
        aplicarMascaraTelefoneSolicitante
    );

}
    
    }

    if(botaoPesquisar){

        botaoPesquisar.addEventListener(
            "click",
            filtrarMedicamentos
        );

    }

    if(filtroCategoria){

        filtroCategoria.addEventListener(
            "change",
            filtrarMedicamentos
        );

    }

    if(filtroReceita){

        filtroReceita.addEventListener(
            "change",
            filtrarMedicamentos
        );

    }

    if(filtroEstoque){

        filtroEstoque.addEventListener(
            "change",
            filtrarMedicamentos
        );

    }

    if(botaoFecharModal){

        botaoFecharModal.addEventListener(
            "click",
            fecharModal
        );

    }

    if(modalMedicamento){

        modalMedicamento.addEventListener(
            "click",
            (event) => {

                if(event.target === modalMedicamento){

                    fecharModal();

                }

            }
        );

    }

    document.addEventListener(
        "keydown",
        (event) => {

            if(
                event.key === "Escape" &&
                modalMedicamento &&
                modalMedicamento.classList.contains("ativo")
            ){

                fecharModal();

            }

        }
    );

    if(botaoFinalizar){

        botaoFinalizar.addEventListener(
            "click",
            finalizarSolicitacao
        );

    }

        if(fecharFinalizacao){

        fecharFinalizacao.addEventListener(
            "click",
            fecharModalFinalizacao
        );

    }

    if(cancelarFinalizacao){

        cancelarFinalizacao.addEventListener(
            "click",
            fecharModalFinalizacao
        );

    }

    if(confirmarSolicitacao){

        confirmarSolicitacao.addEventListener(
            "click",
            confirmarPedido
        );

    }

    if(modalFinalizacao){

        modalFinalizacao.addEventListener(
            "click",
            (event) => {

                if(event.target === modalFinalizacao){

                    fecharModalFinalizacao();

                }

            }
        );

    }

    if(arquivoReceita){

        arquivoReceita.addEventListener(
            "change",
            exibirNomeArquivoReceita
        );

    }

    document
        .querySelectorAll(
            'input[name="formaRecebimento"]'
        )
        .forEach((opcao) => {

            opcao.addEventListener(
                "change",
                atualizarFormaRecebimento
            );

        });

    document
        .querySelectorAll(
            'input[name="tipoEndereco"]'
        )
        .forEach((opcao) => {

            opcao.addEventListener(
                "change",
                atualizarTipoEndereco
            );

        });

    document.addEventListener(
        "keydown",
        (event) => {

            if(
                event.key === "Escape" &&
                modalFinalizacao &&
                modalFinalizacao.classList.contains("ativo")
            ){

                fecharModalFinalizacao();

            }

        }
    );

}




/*=========================================================
    Renderização dos Medicamentos
=========================================================*/

function mostrarMedicamentos(lista){

    if(!listaMedicamentos){

        console.error(
            "Área de medicamentos não encontrada no HTML."
        );

        return;

    }

    listaMedicamentos.innerHTML = "";

    if(!Array.isArray(lista) || lista.length === 0){

        listaMedicamentos.innerHTML = `
            <div class="mensagem-vazia">

                <p>
                    Nenhum medicamento encontrado.
                </p>

            </div>
        `;

        return;

    }

    lista.forEach((medicamento) => {

        const card =
            criarCardMedicamento(medicamento);

        listaMedicamentos.appendChild(card);

    });

}


/*=========================================================
    Criação do Card
=========================================================*/

function criarCardMedicamento(medicamento){

    const card =
        document.createElement("article");

    card.classList.add(
        "card-medicamento"
    );

    const seloEstoque =
        criarSeloEstoque(medicamento);

    const seloReceita =
        medicamento.receita
            ? `
                <span class="selo receita">
                    Receita obrigatória
                </span>
              `
            : `
                <span class="selo sem-receita">
                    Sem receita obrigatória
                </span>
              `;

    const vencido =
        medicamentoEstaVencido(
            medicamento
        );

    const semEstoque =
        Number(medicamento.estoque) <= 0;

    const indisponivel =
        semEstoque || vencido;

    const situacaoValidade =
        obterSituacaoValidadeSolicitacao(
            medicamento
        );

    card.innerHTML = `

        <h3>
            ${medicamento.nome}
        </h3>

        <p>
            <strong>Princípio ativo:</strong>
            ${medicamento.principio}
        </p>

        <p>
            <strong>Categoria:</strong>
            ${medicamento.categoria}
        </p>

        <p>
            <strong>Estoque:</strong>
            ${Number(medicamento.estoque)}
            unidade(s)
        </p>

        <div class="selos">

            ${seloEstoque}

            ${seloReceita}

            <span
                class="selo-validade ${situacaoValidade.classe}"
            >
                ${situacaoValidade.texto}
            </span>

        </div>

        <div class="acoes-card">

            <button
                type="button"
                class="btn-adicionar"
                ${indisponivel ? "disabled" : ""}
            >
                ${
                    vencido
                        ? "Medicamento vencido"
                        : semEstoque
                            ? "Indisponível"
                            : "Adicionar à Cesta"
                }
            </button>

            <button
                type="button"
                class="btn-detalhes"
            >
                Ver Detalhes
            </button>

        </div>
    `;

    const botaoAdicionar =
        card.querySelector(
            ".btn-adicionar"
        );

    const botaoDetalhes =
        card.querySelector(
            ".btn-detalhes"
        );

    if(
        !indisponivel &&
        botaoAdicionar
    ){

        botaoAdicionar.addEventListener(
            "click",
            () => {

                adicionarAoCarrinho(
                    medicamento.id
                );

            }
        );

    }

    if(botaoDetalhes){

        botaoDetalhes.addEventListener(
            "click",
            () => {

                abrirModal(
                    medicamento.id
                );

            }
        );

    }

    return card;

}


/*=========================================================
    Selo de Estoque
=========================================================*/

function criarSeloEstoque(medicamento){

    if(medicamento.estoque <= 0){

        return `
            <span class="selo indisponivel">
                Indisponível
            </span>
        `;

    }

    if(medicamento.estoque <= 50){

        return `
            <span class="selo baixo">
                Estoque baixo
            </span>
        `;

    }

    return `
        <span class="selo disponivel">
            Disponível
        </span>
    `;

}


/*=========================================================
    Pesquisa e Filtros
=========================================================*/

function filtrarMedicamentos(){

    const textoPesquisa =
        normalizarTexto(
            campoPesquisa
                ? campoPesquisa.value
                : ""
        );

    const categoriaSelecionada =
        filtroCategoria
            ? filtroCategoria.value
            : "";

    const receitaSelecionada =
        filtroReceita
            ? filtroReceita.value
            : "";

    const estoqueSelecionado =
        filtroEstoque
            ? filtroEstoque.value
            : "";

    const resultado =
        medicamentos.filter(
            (medicamento) => {

                const correspondePesquisa =
                    normalizarTexto(
                        medicamento.nome
                    ).includes(
                        textoPesquisa
                    )
                    ||
                    normalizarTexto(
                        medicamento.principio
                    ).includes(
                        textoPesquisa
                    );

                const correspondeCategoria =
                    categoriaSelecionada === ""
                    ||
                    medicamento.categoria ===
                        categoriaSelecionada;

                const correspondeReceita =
                    receitaSelecionada === ""
                    ||
                    (
                        receitaSelecionada === "sim"
                        &&
                        medicamento.receita === true
                    )
                    ||
                    (
                        receitaSelecionada === "nao"
                        &&
                        medicamento.receita === false
                    );

                const correspondeEstoque =
                    verificarFiltroEstoque(
                        medicamento,
                        estoqueSelecionado
                    );

                return (
                    correspondePesquisa
                    &&
                    correspondeCategoria
                    &&
                    correspondeReceita
                    &&
                    correspondeEstoque
                );

            }
        );

    mostrarMedicamentos(resultado);

}


/*=========================================================
    Filtro de Estoque
=========================================================*/

function verificarFiltroEstoque(
    medicamento,
    filtroSelecionado
){

    if(filtroSelecionado === ""){

        return true;

    }

    if(filtroSelecionado === "disponivel"){

        return medicamento.estoque > 50;

    }

    if(filtroSelecionado === "baixo"){

        return (
            medicamento.estoque > 0
            &&
            medicamento.estoque <= 50
        );

    }

    return true;

}


/*=========================================================
    Normalização de Texto
=========================================================*/

function normalizarTexto(texto){

    return String(texto ?? "")
        .normalize("NFD")
        .replace(
            /[\u0300-\u036f]/g,
            ""
        )
        .trim()
        .toLowerCase();

}


/*=========================================================
    Modal de Detalhes
=========================================================*/

function abrirModal(id){

    const medicamento =
        medicamentos.find(
            (item) => item.id === id
        );

    if(
        !medicamento
        ||
        !modalMedicamento
        ||
        !conteudoModal
    ){

        return;

    }

    conteudoModal.innerHTML = `

        <h2 id="tituloModal">
            ${medicamento.nome}
        </h2>

        <p>
            <strong>Princípio ativo:</strong>
            ${medicamento.principio}
        </p>

        <p>
            <strong>Categoria:</strong>
            ${medicamento.categoria}
        </p>

        <p>
            <strong>Fabricante:</strong>
            ${obterFabricante(
                medicamento.categoria
            )}
        </p>

        <p>
            <strong>Apresentação:</strong>
            ${obterApresentacao(
                medicamento.nome
            )}
        </p>

        <p>
            <strong>Indicação:</strong>
            ${obterIndicacao(
                medicamento.categoria
            )}
        </p>

        <p>
            <strong>Receita:</strong>
            ${
                medicamento.receita
                    ? "Necessária"
                    : "Não necessária"
            }
        </p>

        <p>
            <strong>Armazenamento:</strong>
            ${obterArmazenamento()}
        </p>

        <div class="modal-info">

            <div class="modal-box">

                <strong>
                    Estoque disponível
                </strong>

                <span>
                    ${medicamento.estoque}
                    unidade(s)
                </span>

            </div>

            <div class="modal-box">

                <strong>
                    Observações
                </strong>

                <span>
                    ${obterObservacoes(
                        medicamento.receita
                    )}
                </span>

            </div>

        </div>
    `;

    modalMedicamento.classList.add(
        "ativo"
    );

    modalMedicamento.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "modal-aberto"
    );

    if(botaoFecharModal){

        botaoFecharModal.focus();

    }

}


/*=========================================================
    Fechamento do Modal
=========================================================*/

function fecharModal(){

    if(!modalMedicamento){

        return;

    }

    modalMedicamento.classList.remove(
        "ativo"
    );

    modalMedicamento.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove(
        "modal-aberto"
    );

}


/*=========================================================
    Finalização da Solicitação
=========================================================*/

/*=========================================================
    Abrir finalização da solicitação
=========================================================*/

function finalizarSolicitacao(){

    if(
        typeof carrinho === "undefined" ||
        carrinho.length === 0
    ){

        alert(
            "Adicione pelo menos um medicamento à cesta."
        );

        return;

    }

    renderizarResumoFinalizacao();

    atualizarSecaoReceita();

    atualizarFormaRecebimento();

    atualizarTipoEndereco();

    limparMensagemFinalizacao();

    if(confirmarInformacoes){

        confirmarInformacoes.checked = false;

    }

    modalFinalizacao.classList.add("ativo");

    modalFinalizacao.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add("modal-aberto");

}


/*=========================================================
    Renderizar resumo da cesta
=========================================================*/

function renderizarResumoFinalizacao(){

    if(!resumoFinalizacao || !totalFinalizacao){

        return;

    }

    resumoFinalizacao.innerHTML = "";

    let quantidadeTotal = 0;

    carrinho.forEach((item) => {

        const medicamento =
            buscarMedicamentoPorId(item.id);

        if(!medicamento){

            return;

        }

        quantidadeTotal += item.quantidade;

        const elemento =
            document.createElement("div");

        elemento.classList.add(
            "item-resumo-finalizacao"
        );

        elemento.innerHTML = `

            <div>

                <strong>
                    ${medicamento.nome}
                </strong>

                <span>
                    ${medicamento.principio}
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

            <span class="quantidade-resumo">

                Quantidade:
                ${item.quantidade}

            </span>
        `;

        resumoFinalizacao.appendChild(
            elemento
        );

    });

    totalFinalizacao.textContent =
        `${quantidadeTotal} medicamento(s)`;

}


/*=========================================================
    Exibir ou ocultar receita
=========================================================*/

function atualizarSecaoReceita(){

    if(!secaoReceita){

        return;

    }

    const precisaReceita =
        carrinhoPossuiMedicamentoComReceita();

    secaoReceita.hidden =
        !precisaReceita;

    if(!precisaReceita && arquivoReceita){

        arquivoReceita.value = "";

        nomeArquivoReceita.textContent = "";

    }

}


/*=========================================================
    Exibir nome do arquivo
=========================================================*/

function exibirNomeArquivoReceita(){

    if(
        !arquivoReceita ||
        !nomeArquivoReceita
    ){

        return;

    }

    const arquivo =
        arquivoReceita.files[0];

    if(!arquivo){

        nomeArquivoReceita.textContent = "";

        return;

    }

    nomeArquivoReceita.textContent =
        `Arquivo selecionado: ${arquivo.name}`;

}


/*=========================================================
    Forma de recebimento
=========================================================*/

function atualizarFormaRecebimento(){

    if(!secaoEndereco){

        return;

    }

    const opcaoSelecionada =
        document.querySelector(
            'input[name="formaRecebimento"]:checked'
        );

    const entregaSelecionada =
        opcaoSelecionada &&
        opcaoSelecionada.value === "entrega";

    secaoEndereco.hidden =
        !entregaSelecionada;

}


/*=========================================================
    Tipo de endereço
=========================================================*/

function atualizarTipoEndereco(){

    if(!novoEndereco){

        return;

    }

    const opcaoSelecionada =
        document.querySelector(
            'input[name="tipoEndereco"]:checked'
        );

    const novoSelecionado =
        opcaoSelecionada &&
        opcaoSelecionada.value === "novo";

    novoEndereco.hidden =
        !novoSelecionado;

}


/*=========================================================
    Validar formulário de finalização
=========================================================*/

function validarFinalizacao(){

const nome =
    nomeSolicitante
        ? nomeSolicitante.value.trim()
        : "";

const telefone =
    telefoneSolicitante
        ? telefoneSolicitante.value.trim()
        : "";

const email =
    emailSolicitante
        ? emailSolicitante.value.trim()
        : "";

if(nome.length < 3){

    exibirMensagemFinalizacao(
        "Informe o nome completo do solicitante.",
        "erro"
    );

    nomeSolicitante?.focus();

    return false;

}

if(!validarTelefoneSolicitante(telefone)){

    exibirMensagemFinalizacao(
        "Informe um telefone válido.",
        "erro"
    );

    telefoneSolicitante?.focus();

    return false;

}

if(!validarEmailSolicitante(email)){

    exibirMensagemFinalizacao(
        "Informe um e-mail válido.",
        "erro"
    );

    emailSolicitante?.focus();

    return false;

}

    if(!confirmarInformacoes.checked){

        exibirMensagemFinalizacao(
            "Você precisa confirmar que as informações fornecidas são verdadeiras.",
            "erro"
        );

        return false;

    }

    const formaRecebimento =
        document.querySelector(
            'input[name="formaRecebimento"]:checked'
        );

    if(!formaRecebimento){

        exibirMensagemFinalizacao(
            "Selecione a forma de recebimento.",
            "erro"
        );

        return false;

    }

    if(formaRecebimento.value === "entrega"){

        const tipoEndereco =
            document.querySelector(
                'input[name="tipoEndereco"]:checked'
            );

        if(!tipoEndereco){

            exibirMensagemFinalizacao(
                "Selecione o endereço de entrega.",
                "erro"
            );

            return false;

        }

        if(tipoEndereco.value === "novo"){

            const camposObrigatorios = [

                {
                    id:"cepEntrega",
                    nome:"CEP"
                },

                {
                    id:"logradouroEntrega",
                    nome:"logradouro"
                },

                {
                    id:"numeroEntrega",
                    nome:"número"
                },

                {
                    id:"bairroEntrega",
                    nome:"bairro"
                },

                {
                    id:"cidadeEntrega",
                    nome:"cidade"
                },

                {
                    id:"estadoEntrega",
                    nome:"estado"
                }

            ];

            for(const campo of camposObrigatorios){

                const elemento =
                    document.getElementById(
                        campo.id
                    );

                if(
                    !elemento ||
                    elemento.value.trim() === ""
                ){

                    exibirMensagemFinalizacao(
                        `Preencha o campo ${campo.nome}.`,
                        "erro"
                    );

                    if(elemento){

                        elemento.focus();

                    }

                    return false;

                }

            }

        }

    }

    return true;

}

/*=========================================================
    Confirmar pedido
=========================================================*/

function confirmarPedido(){

    limparMensagemFinalizacao();

    if(!validarFinalizacao()){

        return;

    }

    const formaRecebimento =
        document.querySelector(
            'input[name="formaRecebimento"]:checked'
        ).value;

    const tipoEnderecoSelecionado =
        document.querySelector(
            'input[name="tipoEndereco"]:checked'
        );

    const protocolo =
        gerarProtocoloSolicitacao();

    const pedido = {

        id:
            gerarIdSolicitacao(),

        protocolo:
            protocolo,

        solicitante: {

            nome:
                nomeSolicitante.value.trim(),

            telefone:
                telefoneSolicitante.value.trim(),

            email:
                emailSolicitante.value.trim()

        },

        medicamentos:
            obterResumoCarrinho(),

        quantidadeTotal:
            calcularQuantidadeTotal(),

        possuiReceita:
            carrinhoPossuiMedicamentoComReceita(),

        receitaAnexada:
            Boolean(
                arquivoReceita &&
                arquivoReceita.files.length > 0
            ),

        nomeArquivoReceita:
            arquivoReceita &&
            arquivoReceita.files.length > 0
                ? arquivoReceita.files[0].name
                : null,

        formaRecebimento:
            formaRecebimento,

        tipoEndereco:
            formaRecebimento === "entrega" &&
            tipoEnderecoSelecionado
                ? tipoEnderecoSelecionado.value
                : null,

        endereco:
            obterEnderecoFinalizacao(),

        dataSolicitacao:
            new Date().toISOString(),

        status:
            "Aguardando análise",

        origem:
            "Formulário público"

    };

    const pedidoSalvo =
        salvarSolicitacaoLocalmente(pedido);

    if(!pedidoSalvo){

        exibirMensagemFinalizacao(
            "Não foi possível registrar a solicitação. Tente novamente.",
            "erro"
        );

        return;

    }

    console.log(
        "Solicitação criada:",
        pedido
    );

    console.table(
        pedido.medicamentos
    );

    let mensagemSucesso =
        `Solicitação registrada com sucesso. Protocolo: ${pedido.protocolo}. ` +
        "O pedido será encaminhado para análise da equipe da Help Med CWB.";

    if(
        pedido.possuiReceita &&
        !pedido.receitaAnexada
    ){

        mensagemSucesso +=
            " Como a receita não foi anexada, " +
            "o fornecimento dos medicamentos sujeitos a receita " +
            "ficará condicionado à avaliação da equipe.";

    }

    exibirMensagemFinalizacao(
        mensagemSucesso,
        "sucesso"
    );

    confirmarSolicitacao.disabled = true;

    setTimeout(() => {

        limparCarrinho();

        fecharModalFinalizacao();

        redefinirFormularioFinalizacao();

        confirmarSolicitacao.disabled = false;

    }, 2500);

}

/*=========================================================
    PERSISTÊNCIA DAS SOLICITAÇÕES
=========================================================*/

function obterSolicitacoesSalvas(){

    try{

        const dados =
            localStorage.getItem(
                CHAVE_SOLICITACOES_PUBLICAS
            );

        if(!dados){

            return [];

        }

        const lista =
            JSON.parse(dados);

        return Array.isArray(lista)
            ? lista
            : [];

    }catch(erro){

        console.error(
            "Erro ao carregar solicitações:",
            erro
        );

        return [];

    }

}


function salvarSolicitacaoLocalmente(pedido){

    try{

        const solicitacoes =
            obterSolicitacoesSalvas();

        solicitacoes.push(pedido);

        localStorage.setItem(
            CHAVE_SOLICITACOES_PUBLICAS,
            JSON.stringify(solicitacoes)
        );

        return true;

    }catch(erro){

        console.error(
            "Erro ao salvar solicitação:",
            erro
        );

        return false;

    }

}


/*=========================================================
    IDENTIFICADORES DA SOLICITAÇÃO
=========================================================*/

function gerarIdSolicitacao(){

    const solicitacoes =
        obterSolicitacoesSalvas();

    if(solicitacoes.length === 0){

        return 1;

    }

    const ids =
        solicitacoes.map(
            (solicitacao) =>
                Number(solicitacao.id) || 0
        );

    return Math.max(...ids) + 1;

}


function gerarProtocoloSolicitacao(){

    const agora =
        new Date();

    const ano =
        agora.getFullYear();

    const mes =
        String(
            agora.getMonth() + 1
        ).padStart(2, "0");

    const dia =
        String(
            agora.getDate()
        ).padStart(2, "0");

    const hora =
        String(
            agora.getHours()
        ).padStart(2, "0");

    const minuto =
        String(
            agora.getMinutes()
        ).padStart(2, "0");

    const segundo =
        String(
            agora.getSeconds()
        ).padStart(2, "0");

    return (
        `SOL-${ano}${mes}${dia}-` +
        `${hora}${minuto}${segundo}`
    );

}

/*=========================================================
    Obter endereço
=========================================================*/

function obterEnderecoFinalizacao(){

    const formaRecebimento =
        document.querySelector(
            'input[name="formaRecebimento"]:checked'
        );

    if(
        !formaRecebimento ||
        formaRecebimento.value !== "entrega"
    ){

        return null;

    }

    const tipoEndereco =
        document.querySelector(
            'input[name="tipoEndereco"]:checked'
        );

    if(
        !tipoEndereco ||
        tipoEndereco.value === "cadastro"
    ){

        return {

            tipo:"cadastro"

        };

    }

    return {

        tipo:"novo",

        cep:
            document.getElementById(
                "cepEntrega"
            ).value.trim(),

        logradouro:
            document.getElementById(
                "logradouroEntrega"
            ).value.trim(),

        numero:
            document.getElementById(
                "numeroEntrega"
            ).value.trim(),

        complemento:
            document.getElementById(
                "complementoEntrega"
            ).value.trim(),

        bairro:
            document.getElementById(
                "bairroEntrega"
            ).value.trim(),

        cidade:
            document.getElementById(
                "cidadeEntrega"
            ).value.trim(),

        estado:
            document.getElementById(
                "estadoEntrega"
            ).value

    };

}


/*=========================================================
    Mensagens
=========================================================*/

function exibirMensagemFinalizacao(
    mensagem,
    tipo
){

    if(!mensagemFinalizacao){

        return;

    }

    mensagemFinalizacao.textContent =
        mensagem;

    mensagemFinalizacao.className =
        `mensagem-finalizacao ${tipo}`;

    mensagemFinalizacao.scrollIntoView({

        behavior:"smooth",

        block:"nearest"

    });

}

function limparMensagemFinalizacao(){

    if(!mensagemFinalizacao){

        return;

    }

    mensagemFinalizacao.textContent = "";

    mensagemFinalizacao.className =
        "mensagem-finalizacao";

}


/*=========================================================
    Fechar modal de finalização
=========================================================*/

function fecharModalFinalizacao(){

    if(!modalFinalizacao){

        return;

    }

    modalFinalizacao.classList.remove(
        "ativo"
    );

    modalFinalizacao.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove(
        "modal-aberto"
    );

    limparMensagemFinalizacao();

}


/*=========================================================
    Redefinir formulário
=========================================================*/

function redefinirFormularioFinalizacao(){

    if(nomeSolicitante){

    nomeSolicitante.value = "";

    }

    if(telefoneSolicitante){

    telefoneSolicitante.value = "";

    }

    if(emailSolicitante){

    emailSolicitante.value = "";

    }
    
    if(nomeSolicitante){

    nomeSolicitante.value = "";

    }

    if(telefoneSolicitante){

        telefoneSolicitante.value = "";

    }

    if(emailSolicitante){

        emailSolicitante.value = "";

    }

    if(arquivoReceita){

        arquivoReceita.value = "";

    }

    if(nomeArquivoReceita){

        nomeArquivoReceita.textContent = "";

    }

    if(confirmarInformacoes){

        confirmarInformacoes.checked = false;

    }

    const retirada =
        document.querySelector(
            'input[name="formaRecebimento"][value="retirada"]'
        );

    if(retirada){

        retirada.checked = true;

    }

    const enderecoCadastro =
        document.querySelector(
            'input[name="tipoEndereco"][value="cadastro"]'
        );

    if(enderecoCadastro){

        enderecoCadastro.checked = true;

    }

    document
        .querySelectorAll(
            "#novoEndereco input"
        )
        .forEach((campo) => {

            campo.value = "";

        });

    const cidade =
        document.getElementById(
            "cidadeEntrega"
        );

    if(cidade){

        cidade.value = "Curitiba";

    }

    const estado =
        document.getElementById(
            "estadoEntrega"
        );

    if(estado){

        estado.value = "PR";

    }

    atualizarFormaRecebimento();

    atualizarTipoEndereco();

}

/*=========================================================
    MÁSCARA DO TELEFONE DO SOLICITANTE
=========================================================*/

function aplicarMascaraTelefoneSolicitante(){

    let valor =
        telefoneSolicitante.value.replace(
            /\D/g,
            ""
        );

    valor =
        valor.slice(0, 11);

    if(valor.length <= 10){

        valor = valor.replace(
            /^(\d{2})(\d)/,
            "($1) $2"
        );

        valor = valor.replace(
            /(\d{4})(\d)/,
            "$1-$2"
        );

    }else{

        valor = valor.replace(
            /^(\d{2})(\d)/,
            "($1) $2"
        );

        valor = valor.replace(
            /(\d{5})(\d)/,
            "$1-$2"
        );

    }

    telefoneSolicitante.value =
        valor;

}

/*=========================================================
    VALIDAÇÕES DO SOLICITANTE
=========================================================*/

function validarTelefoneSolicitante(telefone){

    const numeros =
        telefone.replace(/\D/g, "");

    return (
        numeros.length === 10 ||
        numeros.length === 11
    );

}


function validarEmailSolicitante(email){

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(email);

}

/*=========================================================
    CONTROLE DE VALIDADE NA SOLICITAÇÃO
=========================================================*/

function medicamentoEstaVencido(medicamento){

    if(
        !medicamento ||
        !medicamento.validade
    ){

        return false;

    }

    const partes =
        String(medicamento.validade)
            .split("-");

    if(partes.length !== 3){

        return false;

    }

    const dataValidade =
        new Date(
            Number(partes[0]),
            Number(partes[1]) - 1,
            Number(partes[2])
        );

    if(Number.isNaN(dataValidade.getTime())){

        return false;

    }

    const hoje =
        new Date();

    hoje.setHours(0, 0, 0, 0);

    return dataValidade < hoje;

}


function obterSituacaoValidadeSolicitacao(
    medicamento
){

    if(!medicamento.validade){

        return {

            texto:
                "Validade não informada",

            classe:
                "validade-nao-informada"

        };

    }

    if(medicamentoEstaVencido(medicamento)){

        return {

            texto:
                "Medicamento vencido",

            classe:
                "validade-vencida"

        };

    }

    return {

        texto:
            `Validade: ${
                formatarDataValidadeSolicitacao(
                    medicamento.validade
                )
            }`,

        classe:
            "validade-regular"

    };

}


function formatarDataValidadeSolicitacao(data){

    if(!data){

        return "Não informada";

    }

    const partes =
        String(data).split("-");

    if(partes.length !== 3){

        return data;

    }

    return (
        `${partes[2]}/` +
        `${partes[1]}/` +
        `${partes[0]}`
    );

}