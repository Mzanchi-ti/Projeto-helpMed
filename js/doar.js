/*=========================================================
    HELP MED CWB
    Página Pública de Doação
=========================================================*/

"use strict";


/*=========================================================
    CHAVES DO LOCALSTORAGE
=========================================================*/

const CHAVE_DOACOES_PUBLICAS =
    "helpmed_doacoes_publicas";

const CHAVE_MEDICAMENTOS =
    "helpmed_medicamentos_admin";


/*=========================================================
    ESTADO DA PÁGINA
=========================================================*/

let itensDoacao = [];


/*=========================================================
    ELEMENTOS DO FORMULÁRIO
=========================================================*/

const formularioDoacaoPublica =
    document.getElementById("formDoacaoPublica");

const nomeDoador =
    document.getElementById("nomeDoador");

const telefoneDoador =
    document.getElementById("telefoneDoador");

const emailDoador =
    document.getElementById("emailDoador");

const medicamentoDoacao =
    document.getElementById("medicamentoDoacao");

const campoOutroMedicamento =
    document.getElementById("campoOutroMedicamento");

const outroMedicamento =
    document.getElementById("outroMedicamento");

const quantidadeDoacao =
    document.getElementById("quantidadeDoacao");

const validadeDoacao =
    document.getElementById("validadeDoacao");

const loteDoacao =
    document.getElementById("loteDoacao");

const estadoEmbalagem =
    document.getElementById("estadoEmbalagem");

const observacoesDoacao =
    document.getElementById("observacoesDoacao");

const botaoAdicionarItem =
    document.getElementById("btnAdicionarItemDoacao");

const cepDoador =
    document.getElementById("cepDoador");

const logradouroDoador =
    document.getElementById("logradouroDoador");

const numeroDoador =
    document.getElementById("numeroDoador");

const complementoDoador =
    document.getElementById("complementoDoador");

const bairroDoador =
    document.getElementById("bairroDoador");

const cidadeDoador =
    document.getElementById("cidadeDoador");

const estadoDoador =
    document.getElementById("estadoDoador");

const referenciaDoador =
    document.getElementById("referenciaDoador");


/*=========================================================
    ELEMENTOS DO RESUMO
=========================================================*/

const listaItensDoacao =
    document.getElementById("listaItensDoacao");

const totalUnidadesDoacao =
    document.getElementById("totalUnidadesDoacao");

const confirmacaoDoacao =
    document.getElementById("confirmacaoDoacao");

const mensagemDoacao =
    document.getElementById("mensagemDoacao");

const botaoEnviarDoacao =
    document.getElementById("btnEnviarDoacao");


/*=========================================================
    ELEMENTOS DO MODAL
=========================================================*/

const modalConfirmacaoDoacao =
    document.getElementById("modalConfirmacaoDoacao");

const protocoloDoacaoGerado =
    document.getElementById("protocoloDoacaoGerado");

const botaoFecharConfirmacao =
    document.getElementById("btnFecharConfirmacaoDoacao");


/*=========================================================
    INICIALIZAÇÃO
=========================================================*/

document.addEventListener(
    "DOMContentLoaded",
    inicializarPaginaDoacao
);

function inicializarPaginaDoacao(){

    carregarMedicamentosLocais();

    preencherListaMedicamentos();

    configurarEventosDoacao();

    definirDataMinimaValidade();

    renderizarItensDoacao();

}


/*=========================================================
    CONFIGURAÇÃO DOS EVENTOS
=========================================================*/

function configurarEventosDoacao(){

    if(medicamentoDoacao){

        medicamentoDoacao.addEventListener(
            "change",
            alternarCampoOutroMedicamento
        );

    }

    if(botaoAdicionarItem){

        botaoAdicionarItem.addEventListener(
            "click",
            adicionarItemDoacao
        );

    }

    if(listaItensDoacao){

        listaItensDoacao.addEventListener(
            "click",
            tratarCliqueListaDoacao
        );

    }

    if(confirmacaoDoacao){

        confirmacaoDoacao.addEventListener(
            "change",
            atualizarBotaoEnvio
        );

    }

    if(botaoEnviarDoacao){

        botaoEnviarDoacao.addEventListener(
            "click",
            enviarDoacao
        );

    }

    if(cepDoador){

    cepDoador.addEventListener(
        "input",
        aplicarMascaraCep
    );

}
    if(botaoFecharConfirmacao){

        botaoFecharConfirmacao.addEventListener(
            "click",
            concluirDoacao
        );

    }

    if(modalConfirmacaoDoacao){

        modalConfirmacaoDoacao.addEventListener(
            "click",
            (event) => {

                if(event.target === modalConfirmacaoDoacao){

                    concluirDoacao();

                }

            }
        );

    }

    if(telefoneDoador){

        telefoneDoador.addEventListener(
            "input",
            aplicarMascaraTelefone
        );

    }

    document.addEventListener(
        "keydown",
        (event) => {

            if(
                event.key === "Escape" &&
                modalConfirmacaoDoacao &&
                modalConfirmacaoDoacao.classList.contains("ativo")
            ){

                concluirDoacao();

            }

        }
    );

}


/*=========================================================
    CARREGAMENTO DOS MEDICAMENTOS
=========================================================*/

function carregarMedicamentosLocais(){

    try{

        const dadosSalvos =
            localStorage.getItem(CHAVE_MEDICAMENTOS);

        if(!dadosSalvos){

            return;

        }

        const listaSalva =
            JSON.parse(dadosSalvos);

        if(
            typeof medicamentos !== "undefined" &&
            Array.isArray(medicamentos) &&
            Array.isArray(listaSalva)
        ){

            medicamentos.splice(
                0,
                medicamentos.length,
                ...listaSalva
            );

        }

    }catch(erro){

        console.error(
            "Erro ao carregar medicamentos locais:",
            erro
        );

    }

}


/*=========================================================
    PREENCHER SELECT DE MEDICAMENTOS
=========================================================*/

function preencherListaMedicamentos(){

    if(
        !medicamentoDoacao ||
        typeof medicamentos === "undefined" ||
        !Array.isArray(medicamentos)
    ){

        return;

    }

    medicamentoDoacao.innerHTML = `

        <option value="">
            Selecione um medicamento
        </option>
    `;

    const listaOrdenada =
        [...medicamentos].sort((a, b) => {

            return String(a.nome).localeCompare(
                String(b.nome),
                "pt-BR"
            );

        });

    listaOrdenada.forEach((medicamento) => {

        const opcao =
            document.createElement("option");

        opcao.value =
            medicamento.id;

        opcao.textContent =
            `${medicamento.nome} — ${medicamento.principio}`;

        medicamentoDoacao.appendChild(opcao);

    });

    const opcaoOutro =
        document.createElement("option");

    opcaoOutro.value =
        "outro";

    opcaoOutro.textContent =
        "Outro medicamento";

    medicamentoDoacao.appendChild(opcaoOutro);

}


/*=========================================================
    CAMPO DE OUTRO MEDICAMENTO
=========================================================*/

function alternarCampoOutroMedicamento(){

    if(
        !campoOutroMedicamento ||
        !outroMedicamento
    ){

        return;

    }

    const selecionouOutro =
        medicamentoDoacao.value === "outro";

    campoOutroMedicamento.hidden =
        !selecionouOutro;

    outroMedicamento.required =
        selecionouOutro;

    if(!selecionouOutro){

        outroMedicamento.value = "";

    }

}


/*=========================================================
    ADICIONAR ITEM À DOAÇÃO
=========================================================*/

function adicionarItemDoacao(){

    limparMensagemDoacao();

    const dadosItem =
        obterDadosItemDoacao();

    if(!dadosItem){

        return;

    }

    const itemExistente =
        itensDoacao.find((item) => {

            return (
                normalizarTexto(item.medicamento) ===
                normalizarTexto(dadosItem.medicamento) &&
                item.validade === dadosItem.validade &&
                normalizarTexto(item.lote) ===
                normalizarTexto(dadosItem.lote)
            );

        });

    if(itemExistente){

        itemExistente.quantidade +=
            dadosItem.quantidade;

    }else{

        itensDoacao.push({

            id: gerarIdItemDoacao(),

            ...dadosItem

        });

    }

    renderizarItensDoacao();

    limparCamposMedicamento();

    exibirMensagemDoacao(
        "Medicamento adicionado à lista.",
        "sucesso"
    );

}


/*=========================================================
    OBTER E VALIDAR DADOS DO ITEM
=========================================================*/

function obterDadosItemDoacao(){

    const valorMedicamento =
        medicamentoDoacao.value;

    let nomeMedicamento = "";

    let idMedicamento = null;

    if(valorMedicamento === ""){

        exibirMensagemDoacao(
            "Selecione um medicamento.",
            "erro"
        );

        medicamentoDoacao.focus();

        return null;

    }

    if(valorMedicamento === "outro"){

        nomeMedicamento =
            outroMedicamento.value.trim();

        if(nomeMedicamento === ""){

            exibirMensagemDoacao(
                "Informe o nome do medicamento.",
                "erro"
            );

            outroMedicamento.focus();

            return null;

        }

    }else{

        const medicamentoSelecionado =
            medicamentos.find((medicamento) => {

                return Number(medicamento.id) ===
                    Number(valorMedicamento);

            });

        if(!medicamentoSelecionado){

            exibirMensagemDoacao(
                "Medicamento selecionado não foi encontrado.",
                "erro"
            );

            return null;

        }

        idMedicamento =
            medicamentoSelecionado.id;

        nomeMedicamento =
            medicamentoSelecionado.nome;

    }

    const quantidade =
        Number(quantidadeDoacao.value);

    const validade =
        validadeDoacao.value;

    const lote =
        loteDoacao.value.trim();

    const embalagem =
        estadoEmbalagem.value;

    const observacoes =
        observacoesDoacao.value.trim();

    if(
        !Number.isInteger(quantidade) ||
        quantidade <= 0
    ){

        exibirMensagemDoacao(
            "Informe uma quantidade válida.",
            "erro"
        );

        quantidadeDoacao.focus();

        return null;

    }

    if(validade === ""){

        exibirMensagemDoacao(
            "Informe a data de validade.",
            "erro"
        );

        validadeDoacao.focus();

        return null;

    }

    if(dataEstaVencida(validade)){

        exibirMensagemDoacao(
            "Não é possível adicionar medicamento vencido.",
            "erro"
        );

        validadeDoacao.focus();

        return null;

    }

    if(embalagem === "Danificada"){

        exibirMensagemDoacao(
            "Medicamentos com embalagem danificada não podem ser enviados para doação.",
            "erro"
        );

        estadoEmbalagem.focus();

        return null;

    }

    return {

        idMedicamento: idMedicamento,

        medicamento: nomeMedicamento,

        quantidade: quantidade,

        validade: validade,

        lote: lote,

        estadoEmbalagem: embalagem,

        observacoes: observacoes

    };

}


/*=========================================================
    RENDERIZAR LISTA DE ITENS
=========================================================*/

function renderizarItensDoacao(){

    if(
        !listaItensDoacao ||
        !totalUnidadesDoacao
    ){

        return;

    }

    listaItensDoacao.innerHTML = "";

    if(itensDoacao.length === 0){

        listaItensDoacao.innerHTML = `

            <p class="lista-vazia">

                Nenhum medicamento adicionado.

            </p>
        `;

        totalUnidadesDoacao.textContent =
            "0";

        atualizarBotaoEnvio();

        return;

    }

    itensDoacao.forEach((item) => {

        const elemento =
            document.createElement("article");

        elemento.classList.add("item-doacao");

        elemento.innerHTML = `

            <div class="item-doacao-cabecalho">

                <div>

                    <h3>
                        ${escaparHtml(item.medicamento)}
                    </h3>

                    <p>
                        ${
                            item.estadoEmbalagem
                                ? escaparHtml(item.estadoEmbalagem)
                                : "Embalagem não informada"
                        }
                    </p>

                </div>

                <button
                    type="button"
                    class="btn-remover-doacao"
                    data-remover-item="${item.id}"
                    aria-label="Remover ${escaparHtml(item.medicamento)}"
                >
                    Remover
                </button>

            </div>

            <div class="item-doacao-dados">

                <span>
                    Quantidade:
                    <strong>${item.quantidade}</strong>
                </span>

                <span>
                    Validade:
                    <strong>${formatarData(item.validade)}</strong>
                </span>

                <span>
                    Lote:
                    <strong>${escaparHtml(item.lote || "Não informado")}</strong>
                </span>

                <span>
                    Situação:
                    <strong>Aguardando envio</strong>
                </span>

            </div>
        `;

        listaItensDoacao.appendChild(
            elemento
        );

    });

    totalUnidadesDoacao.textContent =
        calcularTotalUnidades();

    atualizarBotaoEnvio();

}


/*=========================================================
    REMOVER ITEM
=========================================================*/

function tratarCliqueListaDoacao(event){

    const botao =
        event.target.closest(
            "[data-remover-item]"
        );

    if(!botao){

        return;

    }

    const id =
        Number(botao.dataset.removerItem);

    itensDoacao =
        itensDoacao.filter((item) => {

            return item.id !== id;

        });

    renderizarItensDoacao();

    limparMensagemDoacao();

}


/*=========================================================
    TOTAL DE UNIDADES
=========================================================*/

function calcularTotalUnidades(){

    return itensDoacao.reduce(
        (total, item) => {

            return total + item.quantidade;

        },
        0
    );

}


/*=========================================================
    BOTÃO DE ENVIO
=========================================================*/

function atualizarBotaoEnvio(){

    if(!botaoEnviarDoacao){

        return;

    }

    botaoEnviarDoacao.disabled =
        itensDoacao.length === 0 ||
        !confirmacaoDoacao.checked;

}


/*=========================================================
    ENVIAR DOAÇÃO
=========================================================*/

function enviarDoacao(){

    limparMensagemDoacao();

    const dadosDoador =
        validarDadosDoador();

    if(!dadosDoador){

        return;

    }

    if(itensDoacao.length === 0){

        exibirMensagemDoacao(
            "Adicione pelo menos um medicamento.",
            "erro"
        );

        return;

    }

    if(!confirmacaoDoacao.checked){

        exibirMensagemDoacao(
            "Confirme as condições dos medicamentos.",
            "erro"
        );

        return;

    }

    const protocolo =
        gerarProtocoloDoacao();

    const doacao = {

        id: gerarIdDoacao(),

        protocolo: protocolo,

        doador: {

    nome: dadosDoador.nome,

    telefone: dadosDoador.telefone,

    email: dadosDoador.email,

    endereco: {

        cep:
            dadosDoador.endereco.cep,

        logradouro:
            dadosDoador.endereco.logradouro,

        numero:
            dadosDoador.endereco.numero,

        complemento:
            dadosDoador.endereco.complemento,

        bairro:
            dadosDoador.endereco.bairro,

        cidade:
            dadosDoador.endereco.cidade,

        estado:
            dadosDoador.endereco.estado,

        referencia:
            dadosDoador.endereco.referencia

    }

},

        itens: itensDoacao.map((item) => {

            return {

                ...item

            };

        }),

        quantidadeTotal:
            calcularTotalUnidades(),

        dataEnvio:
            new Date().toISOString(),

        status:
            "Aguardando triagem",

        origem:
            "Formulário público"

    };

    if(!salvarDoacaoLocalmente(doacao)){

        exibirMensagemDoacao(
            "Não foi possível registrar a doação. Tente novamente.",
            "erro"
        );

        return;

    }

    protocoloDoacaoGerado.textContent =
        protocolo;

    abrirModalConfirmacao();

}


/*=========================================================
    VALIDAR DADOS DO DOADOR
=========================================================*/

function validarDadosDoador(){

    const nome =
        nomeDoador.value.trim();

    const telefone =
        telefoneDoador.value.trim();

    const email =
        emailDoador.value.trim();

    const cep =
        cepDoador.value.trim();

    const logradouro =
        logradouroDoador.value.trim();

    const numero =
        numeroDoador.value.trim();

    const complemento =
        complementoDoador.value.trim();

    const bairro =
        bairroDoador.value.trim();

    const cidade =
        cidadeDoador.value.trim();

    const estado =
        estadoDoador.value;

    const referencia =
        referenciaDoador.value.trim();

    if(nome.length < 3){

        exibirMensagemDoacao(
            "Informe o nome completo do doador.",
            "erro"
        );

        nomeDoador.focus();

        return null;

    }

    if(!validarTelefone(telefone)){

        exibirMensagemDoacao(
            "Informe um telefone válido.",
            "erro"
        );

        telefoneDoador.focus();

        return null;

    }

    if(!validarEmail(email)){

        exibirMensagemDoacao(
            "Informe um e-mail válido.",
            "erro"
        );

        emailDoador.focus();

        return null;

    }

    if(
        cep === "" ||
        logradouro === "" ||
        numero === "" ||
        bairro === "" ||
        cidade === "" ||
        estado === ""
    ){

        exibirMensagemDoacao(
            "Preencha todos os campos obrigatórios do endereço.",
            "erro"
        );

        return null;

    }

    return {

        nome: nome,

        telefone: telefone,

        email: email,

        endereco: {

            cep: cep,

            logradouro: logradouro,

            numero: numero,

            complemento: complemento,

            bairro: bairro,

            cidade: cidade,

            estado: estado,

            referencia: referencia

        }

    };

}


/*=========================================================
    PERSISTÊNCIA DAS DOAÇÕES
=========================================================*/

function obterDoacoesSalvas(){

    try{

        const dados =
            localStorage.getItem(
                CHAVE_DOACOES_PUBLICAS
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
            "Erro ao carregar doações:",
            erro
        );

        return [];

    }

}


function salvarDoacaoLocalmente(doacao){

    try{

        const doacoes =
            obterDoacoesSalvas();

        doacoes.push(doacao);

        localStorage.setItem(
            CHAVE_DOACOES_PUBLICAS,
            JSON.stringify(doacoes)
        );

        return true;

    }catch(erro){

        console.error(
            "Erro ao salvar doação:",
            erro
        );

        return false;

    }

}


/*=========================================================
    PROTOCOLO E IDENTIFICADORES
=========================================================*/

function gerarIdItemDoacao(){

    if(itensDoacao.length === 0){

        return 1;

    }

    return Math.max(
        ...itensDoacao.map(
            (item) => item.id
        )
    ) + 1;

}


function gerarIdDoacao(){

    const doacoes =
        obterDoacoesSalvas();

    if(doacoes.length === 0){

        return 1;

    }

    return Math.max(
        ...doacoes.map(
            (doacao) =>
                Number(doacao.id) || 0
        )
    ) + 1;

}


function gerarProtocoloDoacao(){

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
        `DOA-${ano}${mes}${dia}-` +
        `${hora}${minuto}${segundo}`
    );

}


/*=========================================================
    MODAL DE CONFIRMAÇÃO
=========================================================*/

function abrirModalConfirmacao(){

    if(!modalConfirmacaoDoacao){

        return;

    }

    modalConfirmacaoDoacao.classList.add(
        "ativo"
    );

    modalConfirmacaoDoacao.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.style.overflow =
        "hidden";

}


function concluirDoacao(){

    if(!modalConfirmacaoDoacao){

        return;

    }

    modalConfirmacaoDoacao.classList.remove(
        "ativo"
    );

    modalConfirmacaoDoacao.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow = "";

    redefinirFormularioCompleto();

}


/*=========================================================
    LIMPEZA DOS CAMPOS
=========================================================*/

function limparCamposMedicamento(){

    medicamentoDoacao.value = "";

    quantidadeDoacao.value = "1";

    validadeDoacao.value = "";

    loteDoacao.value = "";

    estadoEmbalagem.value = "Lacrada";

    observacoesDoacao.value = "";

    outroMedicamento.value = "";

    campoOutroMedicamento.hidden = true;

    outroMedicamento.required = false;

}


function redefinirFormularioCompleto(){

    if(formularioDoacaoPublica){

        formularioDoacaoPublica.reset();

    }

    itensDoacao = [];

    confirmacaoDoacao.checked = false;

    campoOutroMedicamento.hidden = true;

    limparMensagemDoacao();

    renderizarItensDoacao();

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/*=========================================================
    MENSAGENS
=========================================================*/

function exibirMensagemDoacao(
    mensagem,
    tipo
){

    if(!mensagemDoacao){

        return;

    }

    mensagemDoacao.textContent =
        mensagem;

    mensagemDoacao.className =
        `mensagem-doacao ${tipo}`;

}


function limparMensagemDoacao(){

    if(!mensagemDoacao){

        return;

    }

    mensagemDoacao.textContent = "";

    mensagemDoacao.className =
        "mensagem-doacao";

}


/*=========================================================
    VALIDAÇÕES
=========================================================*/

function validarEmail(email){

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(email);

}


function validarTelefone(telefone){

    const numeros =
        telefone.replace(/\D/g, "");

    return numeros.length === 10 ||
           numeros.length === 11;

}


function dataEstaVencida(data){

    const hoje =
        new Date();

    hoje.setHours(0, 0, 0, 0);

    const dataValidade =
        new Date(`${data}T00:00:00`);

    return dataValidade < hoje;

}


function definirDataMinimaValidade(){

    if(!validadeDoacao){

        return;

    }

    const hoje =
        new Date();

    const ano =
        hoje.getFullYear();

    const mes =
        String(
            hoje.getMonth() + 1
        ).padStart(2, "0");

    const dia =
        String(
            hoje.getDate()
        ).padStart(2, "0");

    validadeDoacao.min =
        `${ano}-${mes}-${dia}`;

}


/*=========================================================
    MÁSCARA DE TELEFONE
=========================================================*/

function aplicarMascaraTelefone(){

    let valor =
        telefoneDoador.value.replace(
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

    telefoneDoador.value =
        valor;

}


/*=========================================================
    FORMATAÇÃO
=========================================================*/

function formatarData(data){

    if(!data){

        return "-";

    }

    const partes =
        data.split("-");

    if(partes.length !== 3){

        return data;

    }

    return (
        `${partes[2]}/` +
        `${partes[1]}/` +
        `${partes[0]}`
    );

}


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


function escaparHtml(valor){

    const elemento =
        document.createElement("div");

    elemento.textContent =
        String(valor ?? "");

    return elemento.innerHTML;

}

function aplicarMascaraCep(){

    let valor =
        cepDoador.value.replace(
            /\D/g,
            ""
        );

    valor =
        valor.slice(0, 8);

    valor =
        valor.replace(
            /^(\d{5})(\d)/,
            "$1-$2"
        );

    cepDoador.value =
        valor;

}