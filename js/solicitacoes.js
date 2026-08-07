/*=========================================================
    HELP MED CWB
    Módulo Administrativo de Solicitações
=========================================================*/

"use strict";


/*=========================================================
    CONFIGURAÇÕES
=========================================================*/

const CHAVE_SOLICITACOES_PUBLICAS =
    "helpmed_solicitacoes_publicas";

const CHAVE_SOLICITACOES_ADMIN =
    "helpmed_solicitacoes_admin";


/*=========================================================
    ESTADO DO MÓDULO
=========================================================*/

let solicitacoesPublicasAdmin = [];


/*=========================================================
    INICIALIZAÇÃO
=========================================================*/

document.addEventListener(
    "DOMContentLoaded",
    inicializarModuloSolicitacoes
);

function inicializarModuloSolicitacoes(){

    solicitacoesPublicasAdmin =
        carregarSolicitacoesPublicas();

    aplicarEstadosAdministrativos();

    configurarEventosSolicitacoesAdmin();

    renderizarSolicitacoesImportadas();

}


/*=========================================================
    CARREGAR SOLICITAÇÕES PÚBLICAS
=========================================================*/

function carregarSolicitacoesPublicas(){

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
            "Erro ao carregar solicitações públicas:",
            erro
        );

        return [];

    }

}


/*=========================================================
    PERSISTÊNCIA DOS STATUS ADMINISTRATIVOS
=========================================================*/

function carregarEstadosAdministrativos(){

    try{

        const dados =
            localStorage.getItem(
                CHAVE_SOLICITACOES_ADMIN
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
            "Erro ao carregar estados das solicitações:",
            erro
        );

        return [];

    }

}


function salvarEstadosAdministrativos(){

    try{

        const estados =
            solicitacoesPublicasAdmin.map(
                (solicitacao) => ({

                    protocolo:
                        solicitacao.protocolo,

                    status:
                        solicitacao.status,

                    observacoesAdmin:
                        solicitacao.observacoesAdmin || "",

                    dataAtualizacao:
                        solicitacao.dataAtualizacao || null

                })
            );

        localStorage.setItem(
            CHAVE_SOLICITACOES_ADMIN,
            JSON.stringify(estados)
        );

    }catch(erro){

        console.error(
            "Erro ao salvar estados das solicitações:",
            erro
        );

    }

}


function aplicarEstadosAdministrativos(){

    const estados =
        carregarEstadosAdministrativos();

    const mapaEstados =
        new Map(
            estados.map((estado) => [

                estado.protocolo,

                estado

            ])
        );

    solicitacoesPublicasAdmin.forEach(
        (solicitacao) => {

            const estado =
                mapaEstados.get(
                    solicitacao.protocolo
                );

            if(!estado){

                return;

            }

            solicitacao.status =
                estado.status ||
                solicitacao.status;

            solicitacao.observacoesAdmin =
                estado.observacoesAdmin || "";

            solicitacao.dataAtualizacao =
                estado.dataAtualizacao || null;

        }
    );

}


/*=========================================================
    ELEMENTOS
=========================================================*/

const tabelaSolicitacoesAdmin =
    document.getElementById("tabelaSolicitacoes");

const pesquisaSolicitacoesAdmin =
    document.getElementById("pesquisaSolicitacoes");

const filtroStatusSolicitacoesAdmin =
    document.getElementById("filtroStatusSolicitacoes");


/*=========================================================
    EVENTOS
=========================================================*/

function configurarEventosSolicitacoesAdmin(){

    if(pesquisaSolicitacoesAdmin){

        pesquisaSolicitacoesAdmin.addEventListener(
            "input",
            aplicarFiltrosSolicitacoesAdmin
        );

    }

    if(filtroStatusSolicitacoesAdmin){

        filtroStatusSolicitacoesAdmin.addEventListener(
            "change",
            aplicarFiltrosSolicitacoesAdmin
        );

    }

    if(tabelaSolicitacoesAdmin){

        tabelaSolicitacoesAdmin.addEventListener(
            "click",
            tratarAcaoSolicitacaoAdmin
        );

    }

}


/*=========================================================
    RENDERIZAÇÃO
=========================================================*/

function renderizarSolicitacoesImportadas(
    lista = solicitacoesPublicasAdmin
){

    if(!tabelaSolicitacoesAdmin){

        return;

    }

    tabelaSolicitacoesAdmin.innerHTML = "";

    if(!Array.isArray(lista) || lista.length === 0){

        tabelaSolicitacoesAdmin.innerHTML = `

            <tr>

                <td colspan="7">

                    <div class="mensagem-vazia">

                        Nenhuma solicitação registrada.

                    </div>

                </td>

            </tr>
        `;

        return;

    }

    lista.forEach((solicitacao) => {

        const linha =
            document.createElement("tr");

        linha.innerHTML = `

            <td>
                <strong>
                    ${escaparTextoSolicitacao(
                        solicitacao.protocolo
                    )}
                </strong>
            </td>

            <td>
                ${escaparTextoSolicitacao(
                    solicitacao.solicitante?.nome ||
                    "Não informado"
                )}
            </td>

            <td>
                ${
                    Array.isArray(
                        solicitacao.medicamentos
                    )
                        ? solicitacao.medicamentos.length
                        : 0
                }
            </td>

            <td>
                ${
                    solicitacao.receitaAnexada
                        ? "Anexada"
                        : solicitacao.possuiReceita
                            ? "Não anexada"
                            : "Não necessária"
                }
            </td>

            <td>
                ${formatarFormaRecebimento(
                    solicitacao.formaRecebimento
                )}
            </td>

            <td>
                ${criarStatusSolicitacaoAdmin(
                    solicitacao.status
                )}
            </td>

            <td>

                <div class="acoes-tabela">

                    <button
                        type="button"
                        class="btn-acao btn-visualizar"
                        data-acao-solicitacao="visualizar"
                        data-protocolo="${
                            solicitacao.protocolo
                        }"
                    >
                        Visualizar
                    </button>

                    ${
                        solicitacao.status ===
                        "Aguardando análise"
                            ? `
                                <button
                                    type="button"
                                    class="btn-acao btn-aprovar"
                                    data-acao-solicitacao="aprovar"
                                    data-protocolo="${
                                        solicitacao.protocolo
                                    }"
                                >
                                    Aprovar
                                </button>

                                <button
                                    type="button"
                                    class="btn-acao btn-recusar"
                                    data-acao-solicitacao="recusar"
                                    data-protocolo="${
                                        solicitacao.protocolo
                                    }"
                                >
                                    Recusar
                                </button>
                              `
                            : ""
                    }

                    ${
                        solicitacao.status === "Aprovada"
                            ? `
                                <button
                                    type="button"
                                    class="btn-acao btn-receber"
                                    data-acao-solicitacao="separar"
                                    data-protocolo="${
                                        solicitacao.protocolo
                                    }"
                                >
                                    Separar
                                </button>
                              `
                            : ""
                    }

                    ${
                        solicitacao.status === "Em separação"
                            ? `
                                <button
                                    type="button"
                                    class="btn-acao btn-receber"
                                    data-acao-solicitacao="entregar"
                                    data-protocolo="${
                                        solicitacao.protocolo
                                    }"
                                >
                                    Registrar entrega
                                </button>
                              `
                            : ""
                    }

                </div>

            </td>
        `;

        tabelaSolicitacoesAdmin.appendChild(
            linha
        );

    });

}


/*=========================================================
    FILTROS
=========================================================*/

function aplicarFiltrosSolicitacoesAdmin(){

    const pesquisa =
        normalizarTextoSolicitacao(
            pesquisaSolicitacoesAdmin
                ? pesquisaSolicitacoesAdmin.value
                : ""
        );

    const status =
        filtroStatusSolicitacoesAdmin
            ? filtroStatusSolicitacoesAdmin.value
            : "";

    const resultado =
        solicitacoesPublicasAdmin.filter(
            (solicitacao) => {

                const protocolo =
                    normalizarTextoSolicitacao(
                        solicitacao.protocolo
                    );

                const nome =
                    normalizarTextoSolicitacao(
                        solicitacao.solicitante?.nome
                    );

                const correspondePesquisa =
                    protocolo.includes(pesquisa) ||
                    nome.includes(pesquisa);

                const correspondeStatus =
                    status === "" ||
                    solicitacao.status === status;

                return (
                    correspondePesquisa &&
                    correspondeStatus
                );

            }
        );

    renderizarSolicitacoesImportadas(
        resultado
    );

}


/*=========================================================
    AÇÕES
=========================================================*/

function tratarAcaoSolicitacaoAdmin(event){

    const botao =
        event.target.closest(
            "[data-acao-solicitacao]"
        );

    if(!botao){

        return;

    }

    const protocolo =
        botao.dataset.protocolo;

    const acao =
        botao.dataset.acaoSolicitacao;

    const solicitacao =
        localizarSolicitacaoPorProtocolo(
            protocolo
        );

    if(!solicitacao){

        return;

    }

    if(acao === "visualizar"){

        visualizarSolicitacaoAdmin(
            solicitacao
        );

    }

    if(acao === "aprovar"){

        alterarStatusSolicitacao(
            solicitacao,
            "Aprovada"
        );

    }

    if(acao === "recusar"){

        recusarSolicitacao(
            solicitacao
        );

    }

    if(acao === "separar"){

        iniciarSeparacaoSolicitacao(
            solicitacao
        );

    }

    if(acao === "entregar"){

        registrarEntregaSolicitacao(
            solicitacao
        );

    }

}


/*=========================================================
    LOCALIZAÇÃO
=========================================================*/

function localizarSolicitacaoPorProtocolo(
    protocolo
){

    return solicitacoesPublicasAdmin.find(
        (solicitacao) =>
            solicitacao.protocolo === protocolo
    );

}


/*=========================================================
    VISUALIZAÇÃO
=========================================================*/

function visualizarSolicitacaoAdmin(
    solicitacao
){

    const medicamentos =
        Array.isArray(
            solicitacao.medicamentos
        )
            ? solicitacao.medicamentos
                .map((item) => {

                    return (
                        `${item.nome} — ` +
                        `${item.quantidade} unidade(s)`
                    );

                })
                .join("\n")
            : "Nenhum medicamento informado";

    const endereco =
        formatarEnderecoSolicitacao(
            solicitacao.endereco
        );

    window.alert(

        `Protocolo: ${solicitacao.protocolo}\n\n` +

        `Solicitante: ${
            solicitacao.solicitante?.nome ||
            "Não informado"
        }\n` +

        `Telefone: ${
            solicitacao.solicitante?.telefone ||
            "Não informado"
        }\n` +

        `E-mail: ${
            solicitacao.solicitante?.email ||
            "Não informado"
        }\n\n` +

        `Medicamentos:\n${medicamentos}\n\n` +

        `Receita necessária: ${
            solicitacao.possuiReceita
                ? "Sim"
                : "Não"
        }\n` +

        `Receita anexada: ${
            solicitacao.receitaAnexada
                ? "Sim"
                : "Não"
        }\n` +

        `Arquivo: ${
            solicitacao.nomeArquivoReceita ||
            "Não informado"
        }\n\n` +

        `Recebimento: ${
            formatarFormaRecebimento(
                solicitacao.formaRecebimento
            )
        }\n` +

        `Endereço: ${endereco}\n\n` +

        `Status: ${solicitacao.status}`

    );

}


/*=========================================================
    APROVAÇÃO E RECUSA
=========================================================*/

function alterarStatusSolicitacao(
    solicitacao,
    novoStatus
){

    const confirmar =
        window.confirm(
            `Deseja alterar a solicitação ` +
            `${solicitacao.protocolo} para ` +
            `"${novoStatus}"?`
        );

    if(!confirmar){

        return;

    }

    solicitacao.status =
        novoStatus;

    solicitacao.dataAtualizacao =
        new Date().toISOString();

    salvarEstadosAdministrativos();

    atualizarTabelaSolicitacoesAdmin();

}


function recusarSolicitacao(
    solicitacao
){

    const motivo =
        window.prompt(
            "Informe o motivo da recusa:"
        );

    if(motivo === null){

        return;

    }

    if(motivo.trim() === ""){

        window.alert(
            "Informe o motivo da recusa."
        );

        return;

    }

    solicitacao.status =
        "Recusada";

    solicitacao.observacoesAdmin =
        `Motivo da recusa: ${motivo.trim()}`;

    solicitacao.dataAtualizacao =
        new Date().toISOString();

    salvarEstadosAdministrativos();

    atualizarTabelaSolicitacoesAdmin();

}


/*=========================================================
    SEPARAÇÃO
=========================================================*/

function iniciarSeparacaoSolicitacao(
    solicitacao
){

    const estoqueValido =
        validarEstoqueSolicitacao(
            solicitacao
        );

    if(!estoqueValido){

        return;

    }

    const confirmar =
        window.confirm(
            `Deseja iniciar a separação da solicitação ` +
            `${solicitacao.protocolo}?`
        );

    if(!confirmar){

        return;

    }

    solicitacao.status =
        "Em separação";

    solicitacao.dataAtualizacao =
        new Date().toISOString();

    salvarEstadosAdministrativos();

    atualizarTabelaSolicitacoesAdmin();

}


/*=========================================================
    ENTREGA E BAIXA NO ESTOQUE
=========================================================*/

function registrarEntregaSolicitacao(
    solicitacao
){

    const confirmar =
        window.confirm(
            `Confirma a entrega da solicitação ` +
            `${solicitacao.protocolo}?`
        );

    if(!confirmar){

        return;

    }

    const sucesso =
        baixarEstoqueSolicitacao(
            solicitacao
        );

    if(!sucesso){

        return;

    }

    solicitacao.status =
        "Entregue";

    solicitacao.dataAtualizacao =
        new Date().toISOString();

    salvarMedicamentosLocalmente();

    salvarEstadosAdministrativos();

    if(
        typeof preencherFiltroCategorias ===
        "function"
    ){

        preencherFiltroCategorias();

    }

    if(
        typeof atualizarPainel ===
        "function"
    ){

        atualizarPainel();

    }

    atualizarTabelaSolicitacoesAdmin();

    window.alert(
        "Entrega registrada e estoque atualizado."
    );

}


/*=========================================================
    VALIDAÇÃO DO ESTOQUE
=========================================================*/

function validarEstoqueSolicitacao(
    solicitacao
){

    const itens =
        Array.isArray(
            solicitacao.medicamentos
        )
            ? solicitacao.medicamentos
            : [];

    for(const item of itens){

        const medicamento =
            medicamentos.find(
                (med) =>
                    Number(med.id) ===
                    Number(item.idMedicamento)
            );

        if(!medicamento){

            window.alert(
                `Medicamento não encontrado: ` +
                `${item.nome}`
            );

            return false;

        }

        if(
            Number(medicamento.estoque) <
            Number(item.quantidade)
        ){

            window.alert(
                `Estoque insuficiente para ` +
                `${medicamento.nome}.\n\n` +
                `Disponível: ${medicamento.estoque}\n` +
                `Solicitado: ${item.quantidade}`
            );

            return false;

        }

    }

    return true;

}


/*=========================================================
    BAIXA DO ESTOQUE
=========================================================*/

function baixarEstoqueSolicitacao(
    solicitacao
){

    if(
        !validarEstoqueSolicitacao(
            solicitacao
        )
    ){

        return false;

    }

    solicitacao.medicamentos.forEach(
        (item) => {

            const medicamento =
                medicamentos.find(
                    (med) =>
                        Number(med.id) ===
                        Number(item.idMedicamento)
                );

            medicamento.estoque =
                Number(medicamento.estoque) -
                Number(item.quantidade);

        }
    );

    return true;

}


/*=========================================================
    ATUALIZAÇÃO
=========================================================*/

function atualizarTabelaSolicitacoesAdmin(){

    aplicarFiltrosSolicitacoesAdmin();

}


/*=========================================================
    STATUS
=========================================================*/

function criarStatusSolicitacaoAdmin(
    status
){

    const classes = {

        "Aguardando análise":
            "status-pendente",

        "Aprovada":
            "status-aprovada",

        "Recusada":
            "status-recusada",

        "Em separação":
            "status-coleta",

        "Entregue":
            "status-entregue"

    };

    const classe =
        classes[status] ||
        "status-pendente";

    return `

        <span class="status ${classe}">

            ${escaparTextoSolicitacao(status)}

        </span>
    `;

}


/*=========================================================
    FORMATAÇÕES
=========================================================*/

function formatarFormaRecebimento(
    forma
){

    if(forma === "entrega"){

        return "Entrega";

    }

    if(forma === "retirada"){

        return "Retirada";

    }

    return "Não informado";

}


function formatarEnderecoSolicitacao(
    endereco
){

    if(!endereco){

        return "Não se aplica";

    }

    if(endereco.tipo === "cadastro"){

        return "Endereço do cadastro";

    }

    return [

        endereco.logradouro,
        endereco.numero,
        endereco.complemento,
        endereco.bairro,
        `${endereco.cidade}/${endereco.estado}`,
        `CEP ${endereco.cep}`

    ]
        .filter(Boolean)
        .join(", ");

}


function normalizarTextoSolicitacao(
    texto
){

    return String(texto ?? "")
        .normalize("NFD")
        .replace(
            /[\u0300-\u036f]/g,
            ""
        )
        .trim()
        .toLowerCase();

}


function escaparTextoSolicitacao(
    valor
){

    const elemento =
        document.createElement("div");

    elemento.textContent =
        String(valor ?? "");

    return elemento.innerHTML;

}