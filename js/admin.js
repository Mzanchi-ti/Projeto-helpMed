/*=========================================================
    HELP MED CWB
    Painel Administrativo V2
=========================================================*/

"use strict";

/*=========================================================
    ARMAZENAMENTO DAS DOAÇÕES PÚBLICAS
=========================================================*/

const CHAVE_DOACOES_PUBLICAS =
    "helpmed_doacoes_publicas";


/*=========================================================
    DADOS SIMULADOS DE SOLICITAÇÕES
=========================================================*/

const solicitacoesAdmin = [

    {
        id: 1,
        protocolo: "HMCWB-2026-001",
        solicitante: "Maria da Silva",
        data: "02/08/2026",
        itens: 3,
        possuiReceita: true,
        recebimento: "Entrega",
        status: "Aguardando análise"
    },

    {
        id: 2,
        protocolo: "HMCWB-2026-002",
        solicitante: "João Pereira",
        data: "02/08/2026",
        itens: 2,
        possuiReceita: false,
        recebimento: "Retirada",
        status: "Aprovada"
    },

    {
        id: 3,
        protocolo: "HMCWB-2026-003",
        solicitante: "Ana Souza",
        data: "01/08/2026",
        itens: 4,
        possuiReceita: true,
        recebimento: "Retirada",
        status: "Aguardando análise"
    },

    {
        id: 4,
        protocolo: "HMCWB-2026-004",
        solicitante: "Carlos Oliveira",
        data: "31/07/2026",
        itens: 1,
        possuiReceita: false,
        recebimento: "Entrega",
        status: "Entregue"
    },

    {
        id: 5,
        protocolo: "HMCWB-2026-005",
        solicitante: "Fernanda Lima",
        data: "30/07/2026",
        itens: 2,
        possuiReceita: true,
        recebimento: "Entrega",
        status: "Recusada"
    }

];

/*=========================================================
    DADOS SIMULADOS DE DOAÇÕES
=========================================================*/

const doacoesAdmin = [

    {
        id: 1,
        protocolo: "DOA-2026-001",
        doador: "Mariana Alves",
        medicamento: "Dipirona 500 mg",
        quantidade: 20,
        validade: "2027-04-30",
        lote: "DIP2026A",
        status: "Aguardando triagem",
        observacoes: "Embalagem lacrada e em boas condições."
    },

    {
        id: 2,
        protocolo: "DOA-2026-002",
        doador: "Ricardo Santos",
        medicamento: "Losartana 50 mg",
        quantidade: 15,
        validade: "2027-01-20",
        lote: "LOS5026",
        status: "Aprovada",
        observacoes: "Medicamento conferido pela equipe."
    },

    {
        id: 3,
        protocolo: "DOA-2026-003",
        doador: "Beatriz Lima",
        medicamento: "Amoxicilina 500 mg",
        quantidade: 10,
        validade: "2026-10-15",
        lote: "AMX1026",
        status: "Recusada",
        observacoes: "Embalagem externa danificada."
    },

    {
        id: 4,
        protocolo: "DOA-2026-004",
        doador: "Paulo Oliveira",
        medicamento: "Omeprazol 20 mg",
        quantidade: 25,
        validade: "2027-06-10",
        lote: "OME2027",
        status: "Recebida",
        observacoes: "Doação recebida e incorporada ao estoque."
    }

];

/*=========================================================
    ELEMENTOS DOS DETALHES DA DOAÇÃO
=========================================================*/

const modalDetalhesDoacao =
    document.getElementById("modalDetalhesDoacao");

const botaoFecharDetalhesDoacao =
    document.getElementById("btnFecharDetalhesDoacao");

const protocoloDetalhesDoacao =
    document.getElementById("protocoloDetalhesDoacao");

const statusDetalhesDoacao =
    document.getElementById("statusDetalhesDoacao");

const detalheDoadorNome =
    document.getElementById("detalheDoadorNome");

const detalheDoadorTelefone =
    document.getElementById("detalheDoadorTelefone");

const detalheDoadorEmail =
    document.getElementById("detalheDoadorEmail");

const detalheEnderecoPrincipal =
    document.getElementById("detalheEnderecoPrincipal");

const detalheEnderecoLocalidade =
    document.getElementById("detalheEnderecoLocalidade");

const detalheEnderecoCep =
    document.getElementById("detalheEnderecoCep");

const detalheEnderecoReferencia =
    document.getElementById("detalheEnderecoReferencia");

const detalheDoacaoMedicamento =
    document.getElementById("detalheDoacaoMedicamento");

const detalheDoacaoQuantidade =
    document.getElementById("detalheDoacaoQuantidade");

const detalheDoacaoValidade =
    document.getElementById("detalheDoacaoValidade");

const detalheDoacaoLote =
    document.getElementById("detalheDoacaoLote");

const detalheDoacaoEmbalagem =
    document.getElementById("detalheDoacaoEmbalagem");

const detalheDoacaoObservacoes =
    document.getElementById("detalheDoacaoObservacoes");

const dataColetaDoacao =
    document.getElementById("dataColetaDoacao");

const horarioColetaDoacao =
    document.getElementById("horarioColetaDoacao");

const observacaoColetaDoacao =
    document.getElementById("observacaoColetaDoacao");

const mensagemDetalhesDoacao =
    document.getElementById("mensagemDetalhesDoacao");

const botaoRecusarDetalhesDoacao =
    document.getElementById("btnRecusarDetalhesDoacao");

const botaoAprovarDetalhesDoacao =
    document.getElementById("btnAprovarDetalhesDoacao");

const botaoAgendarColetaDoacao =
    document.getElementById("btnAgendarColetaDoacao");

const botaoConfirmarRecebimentoDoacao =
    document.getElementById("btnConfirmarRecebimentoDoacao");

    let idDoacaoDetalhesAtual = null;


/*=========================================================
    ELEMENTOS PRINCIPAIS
=========================================================*/

const menuLateral =
    document.getElementById("menuLateral");

const navegacaoAdmin =
    document.getElementById("navegacaoAdmin");

const botoesMenu =
    document.querySelectorAll(".item-menu");

const paginasAdmin =
    document.querySelectorAll(".pagina-admin");

const tituloPagina =
    document.getElementById("tituloPagina");

const botaoAbrirMenu =
    document.getElementById("btnAbrirMenu");

const botaoSairAdmin =
    document.getElementById("btnSairAdmin");


/*=========================================================
    ELEMENTOS DO DASHBOARD
=========================================================*/

const indicadorMedicamentos =
    document.getElementById("indicadorMedicamentos");

const indicadorEstoque =
    document.getElementById("indicadorEstoque");

const indicadorPendentes =
    document.getElementById("indicadorPendentes");

const indicadorEstoqueBaixo =
    document.getElementById("indicadorEstoqueBaixo");

const dashboardSolicitacoes =
    document.getElementById("dashboardSolicitacoes");

const dashboardEstoqueBaixo =
    document.getElementById("dashboardEstoqueBaixo");


/*=========================================================
    ELEMENTOS DOS MEDICAMENTOS
=========================================================*/

const botaoCadastrarMedicamento =
    document.getElementById("btnCadastrarMedicamento");

const pesquisaMedicamentos =
    document.getElementById("pesquisaMedicamentos");

const filtroCategoriaMedicamentos =
    document.getElementById("filtroCategoriaMedicamentos");

const filtroEstoqueMedicamentos =
    document.getElementById("filtroEstoqueMedicamentos");

const tabelaMedicamentos =
    document.getElementById("tabelaMedicamentos");


/*=========================================================
    ELEMENTOS DAS SOLICITAÇÕES
=========================================================*/

const pesquisaSolicitacoes =
    document.getElementById("pesquisaSolicitacoes");

const filtroStatusSolicitacoes =
    document.getElementById("filtroStatusSolicitacoes");

const tabelaSolicitacoes =
    document.getElementById("tabelaSolicitacoes");

/*=========================================================
    ELEMENTOS DAS DOAÇÕES
=========================================================*/

const botaoCadastrarDoacao =
    document.getElementById("btnCadastrarDoacao");

const pesquisaDoacoes =
    document.getElementById("pesquisaDoacoes");

const filtroStatusDoacoes =
    document.getElementById("filtroStatusDoacoes");

const tabelaDoacoes =
    document.getElementById("tabelaDoacoes");

const indicadorTotalDoacoes =
    document.getElementById("indicadorTotalDoacoes");

const indicadorDoacoesPendentes =
    document.getElementById("indicadorDoacoesPendentes");

const indicadorDoacoesAprovadas =
    document.getElementById("indicadorDoacoesAprovadas");

const indicadorDoacoesRecusadas =
    document.getElementById("indicadorDoacoesRecusadas");


/* Modal da doação */

const modalDoacaoAdmin =
    document.getElementById("modalDoacaoAdmin");

const botaoFecharModalDoacao =
    document.getElementById("btnFecharModalDoacao");

const botaoCancelarDoacao =
    document.getElementById("btnCancelarDoacao");

const tituloModalDoacao =
    document.getElementById("tituloModalDoacao");

const formularioDoacao =
    document.getElementById("formDoacao");

const doacaoId =
    document.getElementById("doacaoId");

const doacaoDoador =
    document.getElementById("doacaoDoador");

const doacaoMedicamento =
    document.getElementById("doacaoMedicamento");

const doacaoQuantidade =
    document.getElementById("doacaoQuantidade");

const doacaoValidade =
    document.getElementById("doacaoValidade");

const doacaoLote =
    document.getElementById("doacaoLote");

const doacaoStatus =
    document.getElementById("doacaoStatus");

const doacaoObservacoes =
    document.getElementById("doacaoObservacoes");

const mensagemFormularioDoacao =
    document.getElementById("mensagemFormularioDoacao");

/*=========================================================
    ELEMENTOS DO MODAL
=========================================================*/

const modalMedicamentoAdmin =
    document.getElementById("modalMedicamentoAdmin");

const botaoFecharModalMedicamento =
    document.getElementById("btnFecharModalMedicamento");

const botaoCancelarMedicamento =
    document.getElementById("btnCancelarMedicamento");

const tituloModalMedicamento =
    document.getElementById("tituloModalMedicamento");

const formularioMedicamento =
    document.getElementById("formMedicamento");

const medicamentoId =
    document.getElementById("medicamentoId");

const medicamentoNome =
    document.getElementById("medicamentoNome");

const medicamentoPrincipio =
    document.getElementById("medicamentoPrincipio");

const medicamentoCategoria =
    document.getElementById("medicamentoCategoria");

const medicamentoEstoque =
    document.getElementById("medicamentoEstoque");

const medicamentoFabricante =
    document.getElementById("medicamentoFabricante");

const medicamentoLote =
    document.getElementById("medicamentoLote");

const medicamentoValidade =
    document.getElementById("medicamentoValidade");

const medicamentoDataEntrada =
    document.getElementById("medicamentoDataEntrada");

const medicamentoReceita =
    document.getElementById("medicamentoReceita");

const mensagemFormulario =
    document.getElementById("mensagemFormulario");


/*=========================================================
    INICIALIZAÇÃO
=========================================================*/

document.addEventListener(
    "DOMContentLoaded",
    inicializarPainel
);

function inicializarPainel(){

    if(
        typeof medicamentos === "undefined" ||
        !Array.isArray(medicamentos)
    ){

        console.error(
            "A lista de medicamentos não foi carregada. " +
            "Confirme se medicamentos.js está antes de admin.js."
        );

        return;

    }

    // Carrega os dados antes de montar tabelas e indicadores.
    carregarMedicamentosLocais();

    importarDoacoesPublicas();

    configurarEventos();

    preencherFiltroCategorias();

    atualizarPainel();

    abrirPagina("dashboard");

}

/*=========================================================
    CONFIGURAÇÃO DOS EVENTOS
=========================================================*/

function configurarEventos(){

    if(navegacaoAdmin){

        navegacaoAdmin.addEventListener(
            "click",
            tratarCliqueMenu
        );

    }

    document
        .querySelectorAll("[data-abrir-pagina]")
        .forEach((botao) => {

            botao.addEventListener("click", () => {

                abrirPagina(
                    botao.dataset.abrirPagina
                );

            });

        });

    if(botaoAbrirMenu){

        botaoAbrirMenu.addEventListener(
            "click",
            alternarMenuMobile
        );

    }

    if(botaoSairAdmin){

        botaoSairAdmin.addEventListener(
            "click",
            sairDoPainel
        );

    }

    if(botaoCadastrarMedicamento){

        botaoCadastrarMedicamento.addEventListener(
            "click",
            abrirCadastroMedicamento
        );

    }

    if(botaoFecharModalMedicamento){

        botaoFecharModalMedicamento.addEventListener(
            "click",
            fecharModalMedicamento
        );

    }

    if(botaoCancelarMedicamento){

        botaoCancelarMedicamento.addEventListener(
            "click",
            fecharModalMedicamento
        );

    }

    if(modalMedicamentoAdmin){

        modalMedicamentoAdmin.addEventListener(
            "click",
            (event) => {

                if(event.target === modalMedicamentoAdmin){

                    fecharModalMedicamento();

                }

            }
        );

    }

    if(formularioMedicamento){

        formularioMedicamento.addEventListener(
            "submit",
            salvarMedicamento
        );

    }

    if(pesquisaMedicamentos){

        pesquisaMedicamentos.addEventListener(
            "input",
            aplicarFiltrosMedicamentos
        );

    }

    if(filtroCategoriaMedicamentos){

        filtroCategoriaMedicamentos.addEventListener(
            "change",
            aplicarFiltrosMedicamentos
        );

    }

    if(filtroEstoqueMedicamentos){

        filtroEstoqueMedicamentos.addEventListener(
            "change",
            aplicarFiltrosMedicamentos
        );

    }

    if(pesquisaSolicitacoes){

        pesquisaSolicitacoes.addEventListener(
            "input",
            aplicarFiltrosSolicitacoes
        );

    }

    if(filtroStatusSolicitacoes){

        filtroStatusSolicitacoes.addEventListener(
            "change",
            aplicarFiltrosSolicitacoes
        );

    }

    if(tabelaMedicamentos){

        tabelaMedicamentos.addEventListener(
            "click",
            tratarAcaoMedicamento
        );

    }

    if(tabelaSolicitacoes){

        tabelaSolicitacoes.addEventListener(
            "click",
            tratarAcaoSolicitacao
        );

    }

    document.addEventListener(
        "keydown",
        tratarTeclaEscape
    );

        /* Eventos das doações */

    if(botaoCadastrarDoacao){

        botaoCadastrarDoacao.addEventListener(
            "click",
            abrirCadastroDoacao
        );

    }

    if(botaoFecharModalDoacao){

        botaoFecharModalDoacao.addEventListener(
            "click",
            fecharModalDoacao
        );

    }

    if(botaoCancelarDoacao){

        botaoCancelarDoacao.addEventListener(
            "click",
            fecharModalDoacao
        );

    }

    if(modalDoacaoAdmin){

        modalDoacaoAdmin.addEventListener(
            "click",
            (event) => {

                if(event.target === modalDoacaoAdmin){

                    fecharModalDoacao();

                }

            }
        );

    }

    if(formularioDoacao){

        formularioDoacao.addEventListener(
            "submit",
            salvarDoacao
        );

    }

    if(pesquisaDoacoes){

        pesquisaDoacoes.addEventListener(
            "input",
            aplicarFiltrosDoacoes
        );

    }

    if(filtroStatusDoacoes){

        filtroStatusDoacoes.addEventListener(
            "change",
            aplicarFiltrosDoacoes
        );

    }

    if(tabelaDoacoes){

        tabelaDoacoes.addEventListener(
            "click",
            tratarAcaoDoacao
        );

    }

    if(botaoFecharDetalhesDoacao){

        botaoFecharDetalhesDoacao.addEventListener(
            "click",
            fecharDetalhesDoacao
        );

    }

    if(modalDetalhesDoacao){

        modalDetalhesDoacao.addEventListener(
            "click",
            (event) => {

                if(event.target === modalDetalhesDoacao){

                    fecharDetalhesDoacao();

                }

            }
        );

    }

    if(botaoAprovarDetalhesDoacao){

        botaoAprovarDetalhesDoacao.addEventListener(
            "click",
            () => {

                if(idDoacaoDetalhesAtual !== null){

                    aprovarDoacao(idDoacaoDetalhesAtual);

                    atualizarDetalhesDoacaoAberta();

                }

            }
        );

    }

    if(botaoRecusarDetalhesDoacao){

        botaoRecusarDetalhesDoacao.addEventListener(
            "click",
            () => {

                if(idDoacaoDetalhesAtual !== null){

                    recusarDoacao(idDoacaoDetalhesAtual);

                    atualizarDetalhesDoacaoAberta();

                }

            }
        );

    }

    if(botaoAgendarColetaDoacao){

        botaoAgendarColetaDoacao.addEventListener(
            "click",
            agendarColetaDoacao
        );

    }

    if(botaoConfirmarRecebimentoDoacao){

        botaoConfirmarRecebimentoDoacao.addEventListener(
            "click",
            () => {

                if(idDoacaoDetalhesAtual !== null){

                    registrarRecebimentoDoacao(
                        idDoacaoDetalhesAtual
                    );

                    atualizarDetalhesDoacaoAberta();

                }

            }
        );

    }

}


/*=========================================================
    NAVEGAÇÃO
=========================================================*/

function tratarCliqueMenu(event){

    const botao =
        event.target.closest(".item-menu");

    if(!botao){

        return;

    }

    const pagina =
        botao.dataset.pagina;

    abrirPagina(pagina);

}


function abrirPagina(nomePagina){

    const paginaSelecionada =
        document.getElementById(
            `pagina-${nomePagina}`
        );

    if(!paginaSelecionada){

        console.error(
            `Página administrativa não encontrada: ${nomePagina}`
        );

        return;

    }

    paginasAdmin.forEach((pagina) => {

        pagina.classList.remove("ativa");

    });

    paginaSelecionada.classList.add("ativa");

    botoesMenu.forEach((botao) => {

        botao.classList.toggle(
            "ativo",
            botao.dataset.pagina === nomePagina
        );

    });

    const titulos = {

        dashboard: "Dashboard",

        medicamentos: "Medicamentos",

        solicitacoes: "Solicitações",

        doacoes: "Doações",

        usuarios: "Usuários",

        relatorios: "Relatórios"

    };

    if(tituloPagina){

        tituloPagina.textContent =
            titulos[nomePagina] ||
            "Painel Administrativo";

    }

    if(menuLateral){

        menuLateral.classList.remove("aberto");

    }

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/*=========================================================
    MENU RESPONSIVO
=========================================================*/

function alternarMenuMobile(){

    if(!menuLateral){

        return;

    }

    menuLateral.classList.toggle("aberto");

}


/*=========================================================
    SAIR
=========================================================*/

function sairDoPainel(){

    const desejaSair =
        window.confirm(
            "Deseja sair do painel administrativo?"
        );

    if(desejaSair){

        window.location.href = "index.html";

    }

}


/*=========================================================
    ATUALIZAÇÃO GERAL
=========================================================*/

function atualizarPainel(){

    atualizarIndicadores();

    renderizarDashboardSolicitacoes();

    renderizarDashboardEstoqueBaixo();

    renderizarMedicamentos(medicamentos);

    renderizarSolicitacoes(solicitacoesAdmin);

    atualizarIndicadoresDoacoes();

    renderizarDoacoes(doacoesAdmin);

}


/*=========================================================
    INDICADORES
=========================================================*/

function atualizarIndicadores(){

    const quantidadeMedicamentos =
        medicamentos.length;

    const unidadesEstoque =
        medicamentos.reduce(
            (total, medicamento) => {

                return total +
                    Number(medicamento.estoque || 0);

            },
            0
        );

    const solicitacoesPendentes =
        solicitacoesAdmin.filter(
            (solicitacao) => {

                return solicitacao.status ===
                    "Aguardando análise";

            }
        ).length;

    const medicamentosEstoqueBaixo =
        medicamentos.filter(
            (medicamento) => {

                return (
                    Number(medicamento.estoque) > 0 &&
                    Number(medicamento.estoque) <= 50
                );

            }
        ).length;

    if(indicadorMedicamentos){

        indicadorMedicamentos.textContent =
            quantidadeMedicamentos;

    }

    if(indicadorEstoque){

        indicadorEstoque.textContent =
            unidadesEstoque;

    }

    if(indicadorPendentes){

        indicadorPendentes.textContent =
            solicitacoesPendentes;

    }

    if(indicadorEstoqueBaixo){

        indicadorEstoqueBaixo.textContent =
            medicamentosEstoqueBaixo;

    }

}


/*=========================================================
    DASHBOARD — SOLICITAÇÕES
=========================================================*/

function renderizarDashboardSolicitacoes(){

    if(!dashboardSolicitacoes){

        return;

    }

    dashboardSolicitacoes.innerHTML = "";

    const recentes =
        solicitacoesAdmin.slice(0, 4);

    recentes.forEach((solicitacao) => {

        const linha =
            document.createElement("tr");

        linha.innerHTML = `

            <td>
                <strong>
                    ${escaparHtml(solicitacao.protocolo)}
                </strong>
            </td>

            <td>
                ${escaparHtml(solicitacao.solicitante)}
            </td>

            <td>
                ${escaparHtml(solicitacao.data)}
            </td>

            <td>
                ${criarStatusSolicitacao(
                    solicitacao.status
                )}
            </td>
        `;

        dashboardSolicitacoes.appendChild(linha);

    });

}


/*=========================================================
    DASHBOARD — ESTOQUE BAIXO
=========================================================*/

function renderizarDashboardEstoqueBaixo(){

    if(!dashboardEstoqueBaixo){

        return;

    }

    dashboardEstoqueBaixo.innerHTML = "";

    const listaBaixa =
        medicamentos
            .filter((medicamento) => {

                const estoque =
                    Number(medicamento.estoque);

                return estoque > 0 &&
                       estoque <= 50;

            })
            .sort((a, b) => {

                return Number(a.estoque) -
                       Number(b.estoque);

            })
            .slice(0, 6);

    if(listaBaixa.length === 0){

        dashboardEstoqueBaixo.innerHTML = `

            <div class="mensagem-vazia">

                Nenhum medicamento com estoque baixo.

            </div>
        `;

        return;

    }

    listaBaixa.forEach((medicamento) => {

        const item =
            document.createElement("div");

        item.classList.add("item-alerta");

        item.innerHTML = `

            <div>

                <strong>
                    ${escaparHtml(medicamento.nome)}
                </strong>

                <span>
                    ${escaparHtml(medicamento.categoria)}
                </span>

            </div>

            <span class="quantidade-alerta">

                ${Number(medicamento.estoque)}
                unidade(s)

            </span>
        `;

        dashboardEstoqueBaixo.appendChild(item);

    });

}


/*=========================================================
    FILTRO DE CATEGORIAS
=========================================================*/

function preencherFiltroCategorias(){

    if(!filtroCategoriaMedicamentos){

        return;

    }

    const categoriaAtual =
        filtroCategoriaMedicamentos.value;

    filtroCategoriaMedicamentos.innerHTML = `

        <option value="">
            Todas as categorias
        </option>
    `;

    const categorias =
        [...new Set(

            medicamentos
                .map((medicamento) => {

                    return medicamento.categoria;

                })
                .filter(Boolean)

        )].sort((a, b) => {

            return a.localeCompare(
                b,
                "pt-BR"
            );

        });

    categorias.forEach((categoria) => {

        const opcao =
            document.createElement("option");

        opcao.value = categoria;

        opcao.textContent = categoria;

        filtroCategoriaMedicamentos.appendChild(
            opcao
        );

    });

    if(categorias.includes(categoriaAtual)){

        filtroCategoriaMedicamentos.value =
            categoriaAtual;

    }

}


/*=========================================================
    RENDERIZAÇÃO DOS MEDICAMENTOS
=========================================================*/

function renderizarMedicamentos(lista){

    if(!tabelaMedicamentos){

        return;

    }

    tabelaMedicamentos.innerHTML = "";

    if(!Array.isArray(lista) || lista.length === 0){

        tabelaMedicamentos.innerHTML = `

            <tr>

                <td colspan="9">

                    <div class="mensagem-vazia">

                        Nenhum medicamento encontrado.

                    </div>

                </td>

            </tr>
        `;

        return;

    }

    lista.forEach((medicamento) => {

        const linha =
            document.createElement("tr");

        linha.innerHTML = `

            <td>

                <strong>
                    ${escaparHtml(medicamento.nome)}
                </strong>

                <br>

                <small>
                    ${escaparHtml(medicamento.principio)}
                </small>

            </td>

            <td>
                ${escaparHtml(
                    medicamento.categoria ||
                    "Não informada"
                )}
            </td>

            <td>
                ${escaparHtml(
                    medicamento.fabricante ||
                    "Não informado"
                )}
            </td>

            <td>
                ${escaparHtml(
                    medicamento.lote ||
                    "Não informado"
                )}
            </td>

            <td>
                ${criarSituacaoValidadeMedicamento(
                    medicamento
                )}
            </td>

            <td>
                ${Number(medicamento.estoque || 0)}
                unidade(s)
            </td>

            <td>
                ${medicamento.receita ? "Sim" : "Não"}
            </td>

            <td>
                ${criarStatusEstoque(medicamento)}
            </td>

            <td>

                <div class="acoes-tabela">

                    <button
                        type="button"
                        class="btn-acao btn-editar"
                        data-acao="editar"
                        data-id="${medicamento.id}"
                    >
                        Editar
                    </button>

                    <button
                        type="button"
                        class="btn-acao btn-excluir"
                        data-acao="excluir"
                        data-id="${medicamento.id}"
                    >
                        Excluir
                    </button>

                </div>

            </td>
        `;

        tabelaMedicamentos.appendChild(linha);

    });

}


/*=========================================================
    FILTRAGEM DOS MEDICAMENTOS
=========================================================*/

function aplicarFiltrosMedicamentos(){

    const pesquisa =
        normalizarTexto(
            pesquisaMedicamentos
                ? pesquisaMedicamentos.value
                : ""
        );

    const categoria =
        filtroCategoriaMedicamentos
            ? filtroCategoriaMedicamentos.value
            : "";

    const estoqueSelecionado =
        filtroEstoqueMedicamentos
            ? filtroEstoqueMedicamentos.value
            : "";

    const resultado =
        medicamentos.filter((medicamento) => {

            const correspondePesquisa =

                normalizarTexto(
                    medicamento.nome
                ).includes(pesquisa)

                ||

                normalizarTexto(
                    medicamento.principio
                ).includes(pesquisa);

            const correspondeCategoria =

                categoria === ""

                ||

                medicamento.categoria === categoria;

            const estoque =
                Number(medicamento.estoque);

            let correspondeEstoque = true;

            if(estoqueSelecionado === "disponivel"){

                correspondeEstoque =
                    estoque > 50;

            }

            if(estoqueSelecionado === "baixo"){

                correspondeEstoque =
                    estoque > 0 &&
                    estoque <= 50;

            }

            if(estoqueSelecionado === "indisponivel"){

                correspondeEstoque =
                    estoque <= 0;

            }

            return (
                correspondePesquisa &&
                correspondeCategoria &&
                correspondeEstoque
            );

        });

    renderizarMedicamentos(resultado);

}


/*=========================================================
    AÇÕES DOS MEDICAMENTOS
=========================================================*/

function tratarAcaoMedicamento(event){

    const botao =
        event.target.closest("[data-acao]");

    if(!botao){

        return;

    }

    const id =
        Number(botao.dataset.id);

    const acao =
        botao.dataset.acao;

    if(acao === "editar"){

        abrirEdicaoMedicamento(id);

    }

    if(acao === "excluir"){

        excluirMedicamento(id);

    }

}


/*=========================================================
    CADASTRO
=========================================================*/

function abrirCadastroMedicamento(){

    limparFormularioMedicamento();

    if(tituloModalMedicamento){

        tituloModalMedicamento.textContent =
            "Cadastrar medicamento";

    }

    if(medicamentoDataEntrada){

    medicamentoDataEntrada.value =
        obterDataAtualFormulario();

    }

    abrirModalMedicamento();

}


/*=========================================================
    EDIÇÃO
=========================================================*/

function abrirEdicaoMedicamento(id){

    const medicamento =
        medicamentos.find(
            (item) => Number(item.id) === id
        );

    if(!medicamento){

        window.alert(
            "Medicamento não encontrado."
        );

        return;

    }

    limparMensagemFormulario();

    medicamentoId.value =
        medicamento.id;

    medicamentoNome.value =
        medicamento.nome;

    medicamentoPrincipio.value =
        medicamento.principio;

    medicamentoCategoria.value =
        medicamento.categoria;

    medicamentoEstoque.value =
        Number(medicamento.estoque);

    medicamentoFabricante.value =
        medicamento.fabricante || "";

    medicamentoLote.value =
        medicamento.lote || "";

    medicamentoValidade.value =
        medicamento.validade || "";

    medicamentoDataEntrada.value =
        medicamento.dataEntrada || "";

    medicamentoReceita.value =
        String(Boolean(medicamento.receita));

    tituloModalMedicamento.textContent =
        "Editar medicamento";

    abrirModalMedicamento();

}


/*=========================================================
    SALVAR MEDICAMENTO
=========================================================*/

function salvarMedicamento(event){

    event.preventDefault();

    limparMensagemFormulario();

    const nome =
        medicamentoNome.value.trim();

    const principio =
        medicamentoPrincipio.value.trim();

    const categoria =
        medicamentoCategoria.value.trim();

    const estoque =
        Number(medicamentoEstoque.value);

    const fabricante =
    medicamentoFabricante.value.trim();

    const lote =
        medicamentoLote.value.trim();

    const validade =
        medicamentoValidade.value;

    const dataEntrada =
        medicamentoDataEntrada.value;

    const receita =
        medicamentoReceita.value === "true";

    if(
        nome === "" ||
        principio === "" ||
        categoria === "" ||
        fabricante === "" ||
        lote === "" ||
        validade === "" ||
        dataEntrada === ""
    ){

        exibirMensagemFormulario(
            "Preencha todos os campos obrigatórios.",
            "erro"
        );

        return;

    }

    if(
        !Number.isInteger(estoque) ||
        estoque < 0
    ){

        exibirMensagemFormulario(
            "Informe uma quantidade de estoque válida.",
            "erro"
        );

        return;

    }

    const idAtual =
        Number(medicamentoId.value);

    if(idAtual){

        const medicamento =
            medicamentos.find(
                (item) =>
                    Number(item.id) === idAtual
            );

        if(!medicamento){

            exibirMensagemFormulario(
                "Medicamento não encontrado.",
                "erro"
            );

            return;

        }

        medicamento.nome = nome;

        medicamento.principio = principio;

        medicamento.categoria = categoria;

        medicamento.estoque = estoque;

        medicamento.fabricante = fabricante;

        medicamento.lote = lote;

        medicamento.validade = validade;

        medicamento.dataEntrada = dataEntrada;

        medicamento.receita = receita;

        exibirMensagemFormulario(
            "Medicamento atualizado com sucesso.",
            "sucesso"
        );

    }else{

        const novoId =
            gerarNovoIdMedicamento();

        medicamentos.push({

            id:
                novoId,

            nome:
                nome,

            principio:
                principio,

            categoria:
                categoria,

            estoque:
                estoque,

            fabricante:
                fabricante,

            lote:
                lote,

            validade:
                validade,

            dataEntrada:
                dataEntrada,

            receita:
                receita

        });

        exibirMensagemFormulario(
            "Medicamento cadastrado com sucesso.",
            "sucesso"
        );

    }

    salvarMedicamentosLocalmente();

preencherFiltroCategorias();

atualizarPainel();

setTimeout(() => {

        fecharModalMedicamento();

    }, 800);

}


/*=========================================================
    GERAR NOVO ID
=========================================================*/

function gerarNovoIdMedicamento(){

    if(medicamentos.length === 0){

        return 1;

    }

    const ids =
        medicamentos.map((medicamento) => {

            return Number(medicamento.id) || 0;

        });

    return Math.max(...ids) + 1;

}


/*=========================================================
    EXCLUSÃO
=========================================================*/

function excluirMedicamento(id){

    const medicamento =
        medicamentos.find(
            (item) =>
                Number(item.id) === id
        );

    if(!medicamento){

        return;

    }

    const confirmar =
        window.confirm(
            `Deseja excluir o medicamento "${medicamento.nome}"?`
        );

    if(!confirmar){

        return;

    }

    const indice =
        medicamentos.findIndex(
            (item) =>
                Number(item.id) === id
        );

    if(indice >= 0){

    medicamentos.splice(indice, 1);

}

salvarMedicamentosLocalmente();

preencherFiltroCategorias();

atualizarPainel();

}


/*=========================================================
    MODAL
=========================================================*/

function abrirModalMedicamento(){

    if(!modalMedicamentoAdmin){

        return;

    }

    modalMedicamentoAdmin.classList.add(
        "ativo"
    );

    modalMedicamentoAdmin.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.style.overflow =
        "hidden";

    setTimeout(() => {

        if(medicamentoNome){

            medicamentoNome.focus();

        }

    }, 100);

}


function fecharModalMedicamento(){

    if(!modalMedicamentoAdmin){

        return;

    }

    modalMedicamentoAdmin.classList.remove(
        "ativo"
    );

    modalMedicamentoAdmin.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow = "";

    limparFormularioMedicamento();

}


/*=========================================================
    FORMULÁRIO
=========================================================*/

function limparFormularioMedicamento(){

    if(formularioMedicamento){

        formularioMedicamento.reset();

    }

    if(medicamentoId){

        medicamentoId.value = "";

    }

    if(medicamentoReceita){

        medicamentoReceita.value =
            "false";

    }

    limparMensagemFormulario();

}


/*=========================================================
    MENSAGENS
=========================================================*/

function exibirMensagemFormulario(
    mensagem,
    tipo
){

    if(!mensagemFormulario){

        return;

    }

    mensagemFormulario.textContent =
        mensagem;

    mensagemFormulario.className =
        `mensagem-formulario ${tipo}`;

}


function limparMensagemFormulario(){

    if(!mensagemFormulario){

        return;

    }

    mensagemFormulario.textContent = "";

    mensagemFormulario.className =
        "mensagem-formulario";

}


/*=========================================================
    STATUS DO ESTOQUE
=========================================================*/

function criarStatusEstoque(medicamento){

    const estoque =
        Number(medicamento.estoque);

    if(estoque <= 0){

        return `

            <span class="status status-indisponivel">

                Indisponível

            </span>
        `;

    }

    if(estoque <= 50){

        return `

            <span class="status status-baixo">

                Estoque baixo

            </span>
        `;

    }

    return `

        <span class="status status-disponivel">

            Disponível

        </span>
    `;

}


/*=========================================================
    SOLICITAÇÕES
=========================================================*/

function renderizarSolicitacoes(lista){

    if(!tabelaSolicitacoes){

        return;

    }

    tabelaSolicitacoes.innerHTML = "";

    if(!Array.isArray(lista) || lista.length === 0){

        tabelaSolicitacoes.innerHTML = `

            <tr>

                <td colspan="7">

                    <div class="mensagem-vazia">

                        Nenhuma solicitação encontrada.

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
                    ${escaparHtml(solicitacao.protocolo)}
                </strong>
            </td>

            <td>
                ${escaparHtml(solicitacao.solicitante)}
            </td>

            <td>
                ${Number(solicitacao.itens)}
            </td>

            <td>
                ${solicitacao.possuiReceita
                    ? "Sim"
                    : "Não"}
            </td>

            <td>
                ${escaparHtml(solicitacao.recebimento)}
            </td>

            <td>
                ${criarStatusSolicitacao(
                    solicitacao.status
                )}
            </td>

            <td>

                <button
                    type="button"
                    class="btn-acao btn-visualizar"
                    data-visualizar-solicitacao="${solicitacao.id}"
                >
                    Visualizar
                </button>

            </td>
        `;

        tabelaSolicitacoes.appendChild(linha);

    });

}


/*=========================================================
    FILTRO DAS SOLICITAÇÕES
=========================================================*/

function aplicarFiltrosSolicitacoes(){

    const pesquisa =
        normalizarTexto(
            pesquisaSolicitacoes
                ? pesquisaSolicitacoes.value
                : ""
        );

    const status =
        filtroStatusSolicitacoes
            ? filtroStatusSolicitacoes.value
            : "";

    const resultado =
        solicitacoesAdmin.filter(
            (solicitacao) => {

                const correspondePesquisa =

                    normalizarTexto(
                        solicitacao.protocolo
                    ).includes(pesquisa)

                    ||

                    normalizarTexto(
                        solicitacao.solicitante
                    ).includes(pesquisa);

                const correspondeStatus =

                    status === ""

                    ||

                    solicitacao.status === status;

                return (
                    correspondePesquisa &&
                    correspondeStatus
                );

            }
        );

    renderizarSolicitacoes(resultado);

}


/*=========================================================
    VISUALIZAR SOLICITAÇÃO
=========================================================*/

function tratarAcaoSolicitacao(event){

    const botao =
        event.target.closest(
            "[data-visualizar-solicitacao]"
        );

    if(!botao){

        return;

    }

    const id =
        Number(
            botao.dataset.visualizarSolicitacao
        );

    const solicitacao =
        solicitacoesAdmin.find(
            (item) => item.id === id
        );

    if(!solicitacao){

        return;

    }

    window.alert(

        `Protocolo: ${solicitacao.protocolo}\n\n` +

        `Solicitante: ${solicitacao.solicitante}\n` +

        `Data: ${solicitacao.data}\n` +

        `Quantidade de itens: ${solicitacao.itens}\n` +

        `Possui receita: ${
            solicitacao.possuiReceita
                ? "Sim"
                : "Não"
        }\n` +

        `Recebimento: ${solicitacao.recebimento}\n` +

        `Status: ${solicitacao.status}`

    );

}


/*=========================================================
    STATUS DAS SOLICITAÇÕES
=========================================================*/

function criarStatusSolicitacao(status){

    const classes = {

        "Aguardando análise":
            "status-pendente",

        "Aprovada":
            "status-aprovada",

        "Recusada":
            "status-recusada",

        "Entregue":
            "status-entregue"

    };

    const classe =
        classes[status] ||
        "status-pendente";

    return `

        <span class="status ${classe}">

            ${escaparHtml(status)}

        </span>
    `;

}


/*=========================================================
    TECLA ESCAPE
=========================================================*/

function tratarTeclaEscape(event){

    if(event.key !== "Escape"){

        return;

    }

    if(
        modalDetalhesDoacao &&
        modalDetalhesDoacao.classList.contains("ativo")
    ){

        fecharDetalhesDoacao();

        return;

    }

    if(
        modalDoacaoAdmin &&
        modalDoacaoAdmin.classList.contains("ativo")
    ){

        fecharModalDoacao();

        return;

    }

    if(
        modalMedicamentoAdmin &&
        modalMedicamentoAdmin.classList.contains("ativo")
    ){

        fecharModalMedicamento();

        return;

    }

    if(
        menuLateral &&
        menuLateral.classList.contains("aberto")
    ){

        menuLateral.classList.remove("aberto");

    }

}


/*=========================================================
    NORMALIZAÇÃO DE TEXTO
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
    PROTEÇÃO DE TEXTO NO HTML
=========================================================*/

function escaparHtml(valor){

    const elemento =
        document.createElement("div");

    elemento.textContent =
        String(valor ?? "");

    return elemento.innerHTML;

}

/*=========================================================
    PERSISTÊNCIA LOCAL DOS MEDICAMENTOS
=========================================================*/

const CHAVE_MEDICAMENTOS =
    "helpmed_medicamentos_admin";


function salvarMedicamentosLocalmente(){

    try{

        localStorage.setItem(
            CHAVE_MEDICAMENTOS,
            JSON.stringify(medicamentos)
        );

    }catch(erro){

        console.error(
            "Não foi possível salvar os medicamentos:",
            erro
        );

    }

}


function carregarMedicamentosLocais(){

    try{

        const dadosSalvos =
            localStorage.getItem(
                CHAVE_MEDICAMENTOS
            );

        if(!dadosSalvos){

            return;

        }

        const medicamentosSalvos =
            JSON.parse(dadosSalvos);

        if(!Array.isArray(medicamentosSalvos)){

            return;

        }

        medicamentos.splice(
            0,
            medicamentos.length,
            ...medicamentosSalvos
        );

    }catch(erro){

        console.error(
            "Não foi possível carregar os medicamentos salvos:",
            erro
        );

    }

}


function restaurarMedicamentosOriginais(){

    const confirmar =
        window.confirm(
            "Deseja apagar as alterações locais e restaurar os medicamentos originais?"
        );

    if(!confirmar){

        return;

    }

    localStorage.removeItem(
        CHAVE_MEDICAMENTOS
    );

    window.location.reload();

}

function obterDataAtualFormulario(){

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

    return `${ano}-${mes}-${dia}`;

}

/*=========================================================
    CONTROLE DE VALIDADE DOS MEDICAMENTOS
=========================================================*/

function criarSituacaoValidadeMedicamento(
    medicamento
){

    const situacao =
        obterSituacaoValidadeMedicamento(
            medicamento.validade
        );

    return `

        <div class="validade-medicamento">

            <span>
                ${formatarDataMedicamento(
                    medicamento.validade
                )}
            </span>

            <span class="status-validade ${situacao.classe}">

                ${escaparHtml(
                    situacao.texto
                )}

            </span>

        </div>
    `;

}


function obterSituacaoValidadeMedicamento(
    validade
){

    if(!validade){

        return {

            texto:
                "Não informada",

            classe:
                "validade-nao-informada",

            dias:
                null

        };

    }

    const dataValidade =
        criarDataLocalMedicamento(
            validade
        );

    if(!dataValidade){

        return {

            texto:
                "Data inválida",

            classe:
                "validade-nao-informada",

            dias:
                null

        };

    }

    const hoje =
        new Date();

    hoje.setHours(0, 0, 0, 0);

    const diferenca =
        dataValidade.getTime() -
        hoje.getTime();

    const dias =
        Math.ceil(
            diferenca /
            (1000 * 60 * 60 * 24)
        );

    if(dias < 0){

        return {

            texto:
                "Vencido",

            classe:
                "validade-vencida",

            dias:
                dias

        };

    }

    if(dias === 0){

        return {

            texto:
                "Vence hoje",

            classe:
                "validade-proxima",

            dias:
                dias

        };

    }

    if(dias <= 30){

        return {

            texto:
                `Vence em ${dias} dia(s)`,

            classe:
                "validade-proxima",

            dias:
                dias

        };

    }

    return {

        texto:
            "Dentro da validade",

        classe:
            "validade-regular",

        dias:
            dias

    };

}


function criarDataLocalMedicamento(data){

    const partes =
        String(data).split("-");

    if(partes.length !== 3){

        return null;

    }

    const ano =
        Number(partes[0]);

    const mes =
        Number(partes[1]);

    const dia =
        Number(partes[2]);

    const resultado =
        new Date(
            ano,
            mes - 1,
            dia
        );

    if(
        Number.isNaN(
            resultado.getTime()
        )
    ){

        return null;

    }

    return resultado;

}


function formatarDataMedicamento(data){

    if(!data){

        return "—";

    }

    const partes =
        String(data).split("-");

    if(partes.length !== 3){

        return escaparHtml(data);

    }

    return (
        `${partes[2]}/` +
        `${partes[1]}/` +
        `${partes[0]}`
    );

}