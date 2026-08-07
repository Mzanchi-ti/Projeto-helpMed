/*=========================================================
    HELP MED CWB
    Dashboard Gerencial
=========================================================*/

"use strict";


/*=========================================================
    CHAVES DO LOCALSTORAGE
=========================================================*/

const CHAVE_DASHBOARD_DOACOES_PUBLICAS =
    "helpmed_doacoes_publicas";

const CHAVE_DASHBOARD_DOACOES_ADMIN =
    "helpmed_doacoes_admin";

const CHAVE_DASHBOARD_SOLICITACOES_PUBLICAS =
    "helpmed_solicitacoes_publicas";

const CHAVE_DASHBOARD_SOLICITACOES_ADMIN =
    "helpmed_solicitacoes_admin";

const CHAVE_DASHBOARD_MEDICAMENTOS =
    "helpmed_medicamentos_admin";


/*=========================================================
    ELEMENTOS DO DASHBOARD
=========================================================*/

const indicadorMedicamentosDashboard =
    document.getElementById("indicadorMedicamentos");

const indicadorEstoqueDashboard =
    document.getElementById("indicadorEstoque");

const indicadorPendentesDashboard =
    document.getElementById("indicadorPendentes");

const indicadorEstoqueBaixoDashboard =
    document.getElementById("indicadorEstoqueBaixo");

const indicadorDoacoesDashboard =
    document.getElementById("indicadorDoacoesDashboard");

const indicadorEntreguesDashboard =
    document.getElementById("indicadorEntreguesDashboard");

const alertasDashboard =
    document.getElementById("alertasDashboard");

const graficoStatusSolicitacoes =
    document.getElementById("graficoStatusSolicitacoes");

const graficoStatusDoacoes =
    document.getElementById("graficoStatusDoacoes");

const dashboardSolicitacoesGerencial =
    document.getElementById("dashboardSolicitacoes");

const dashboardEstoqueBaixoGerencial =
    document.getElementById("dashboardEstoqueBaixo");

const dashboardDoacoesRecentes =
    document.getElementById("dashboardDoacoesRecentes");

const resumoSituacaoEstoque =
    document.getElementById("resumoSituacaoEstoque");

const dataAtualizacaoDashboard =
    document.getElementById("dataAtualizacaoDashboard");

const botaoAtualizarDashboard =
    document.getElementById("btnAtualizarDashboard");


/*=========================================================
    INICIALIZAÇÃO
=========================================================*/

document.addEventListener(
    "DOMContentLoaded",
    inicializarDashboardGerencial
);

function inicializarDashboardGerencial(){

    configurarEventosDashboard();

    atualizarDashboardGerencial();

}


/*=========================================================
    EVENTOS
=========================================================*/

function configurarEventosDashboard(){

    if(botaoAtualizarDashboard){

        botaoAtualizarDashboard.addEventListener(
            "click",
            atualizarDashboardGerencial
        );

    }

}


/*=========================================================
    ATUALIZAÇÃO GERAL
=========================================================*/

function atualizarDashboardGerencial(){

    const dados =
        obterDadosDashboard();

    atualizarIndicadoresGerenciais(dados);

    renderizarAlertasDashboard(dados);

    renderizarGraficoSolicitacoes(dados.solicitacoes);

    renderizarGraficoDoacoes(dados.doacoes);

    renderizarSolicitacoesRecentesDashboard(
        dados.solicitacoes
    );

    renderizarEstoqueCriticoDashboard(
        dados.medicamentos
    );

    renderizarDoacoesRecentesDashboard(
        dados.doacoes
    );

    renderizarResumoEstoqueDashboard(
        dados.medicamentos
    );

    atualizarDataDashboard();

}


/*=========================================================
    OBTENÇÃO DOS DADOS
=========================================================*/

function obterDadosDashboard(){

    const medicamentos =
        obterMedicamentosDashboard();

    const solicitacoes =
        obterSolicitacoesDashboard();

    const doacoes =
        obterDoacoesDashboard();

    return {

        medicamentos:
            medicamentos,

        solicitacoes:
            solicitacoes,

        doacoes:
            doacoes

    };

}


/*=========================================================
    MEDICAMENTOS
=========================================================*/

function obterMedicamentosDashboard(){

    try{

        const dadosSalvos =
            localStorage.getItem(
                CHAVE_DASHBOARD_MEDICAMENTOS
            );

        if(dadosSalvos){

            const lista =
                JSON.parse(dadosSalvos);

            if(Array.isArray(lista)){

                return lista;

            }

        }

    }catch(erro){

        console.error(
            "Erro ao carregar medicamentos do Dashboard:",
            erro
        );

    }

    if(
        typeof medicamentos !== "undefined" &&
        Array.isArray(medicamentos)
    ){

        return medicamentos;

    }

    return [];

}


/*=========================================================
    SOLICITAÇÕES
=========================================================*/

function obterSolicitacoesDashboard(){

    const solicitacoesPublicas =
        lerListaLocalStorage(
            CHAVE_DASHBOARD_SOLICITACOES_PUBLICAS
        );

    const estadosAdmin =
        lerListaLocalStorage(
            CHAVE_DASHBOARD_SOLICITACOES_ADMIN
        );

    const mapaEstados =
        new Map(
            estadosAdmin.map((estado) => [

                estado.protocolo,

                estado

            ])
        );

    return solicitacoesPublicas.map(
        (solicitacao) => {

            const estado =
                mapaEstados.get(
                    solicitacao.protocolo
                );

            return {

                ...solicitacao,

                status:
                    estado?.status ||
                    solicitacao.status ||
                    "Aguardando análise",

                observacoesAdmin:
                    estado?.observacoesAdmin ||
                    "",

                dataAtualizacao:
                    estado?.dataAtualizacao ||
                    solicitacao.dataSolicitacao ||
                    null

            };

        }
    );

}


/*=========================================================
    DOAÇÕES
=========================================================*/

function obterDoacoesDashboard(){

    const doacoesPublicas =
        lerListaLocalStorage(
            CHAVE_DASHBOARD_DOACOES_PUBLICAS
        );

    const estadosAdmin =
        lerListaLocalStorage(
            CHAVE_DASHBOARD_DOACOES_ADMIN
        );

    const mapaEstados =
        new Map(
            estadosAdmin.map((estado) => [

                estado.chave,

                estado

            ])
        );

    const resultado = [];

    doacoesPublicas.forEach((doacao) => {

        const itens =
            Array.isArray(doacao.itens)
                ? doacao.itens
                : [];

        itens.forEach((item, indice) => {

            const chave = [

                doacao.protocolo || "",

                item.id || indice + 1,

                item.medicamento || ""

            ].join("|");

            const estado =
                mapaEstados.get(chave);

            resultado.push({

                protocolo:
                    doacao.protocolo ||
                    "Sem protocolo",

                doador:
                    doacao.doador?.nome ||
                    "Doador não informado",

                medicamento:
                    item.medicamento ||
                    "Medicamento não informado",

                quantidade:
                    Number(item.quantidade) || 0,

                dataEnvio:
                    doacao.dataEnvio || null,

                status:
                    estado?.status ||
                    doacao.status ||
                    "Aguardando triagem"

            });

        });

    });

    return resultado;

}


/*=========================================================
    LEITURA GENÉRICA
=========================================================*/

function lerListaLocalStorage(chave){

    try{

        const dados =
            localStorage.getItem(chave);

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
            `Erro ao carregar ${chave}:`,
            erro
        );

        return [];

    }

}


/*=========================================================
    INDICADORES
=========================================================*/

function atualizarIndicadoresGerenciais(dados){

    const quantidadeMedicamentos =
        dados.medicamentos.length;

    const unidadesEstoque =
        dados.medicamentos.reduce(
            (total, medicamento) => {

                return total +
                    Number(
                        medicamento.estoque || 0
                    );

            },
            0
        );

    const solicitacoesPendentes =
        dados.solicitacoes.filter(
            (solicitacao) => {

                return solicitacao.status ===
                    "Aguardando análise";

            }
        ).length;

    const estoqueBaixo =
        dados.medicamentos.filter(
            (medicamento) => {

                const estoque =
                    Number(medicamento.estoque);

                return estoque > 0 &&
                       estoque <= 50;

            }
        ).length;

    const doacoesPendentes =
        dados.doacoes.filter(
            (doacao) => {

                return doacao.status ===
                    "Aguardando triagem";

            }
        ).length;

    const solicitacoesEntregues =
        dados.solicitacoes.filter(
            (solicitacao) => {

                return solicitacao.status ===
                    "Entregue";

            }
        ).length;

    atualizarTextoElemento(
        indicadorMedicamentosDashboard,
        quantidadeMedicamentos
    );

    atualizarTextoElemento(
        indicadorEstoqueDashboard,
        unidadesEstoque
    );

    atualizarTextoElemento(
        indicadorPendentesDashboard,
        solicitacoesPendentes
    );

    atualizarTextoElemento(
        indicadorEstoqueBaixoDashboard,
        estoqueBaixo
    );

    atualizarTextoElemento(
        indicadorDoacoesDashboard,
        doacoesPendentes
    );

    atualizarTextoElemento(
        indicadorEntreguesDashboard,
        solicitacoesEntregues
    );

}


/*=========================================================
    ALERTAS
=========================================================*/

function renderizarAlertasDashboard(dados){

    if(!alertasDashboard){

        return;

    }

    alertasDashboard.innerHTML = "";

    const solicitacoesPendentes =
        dados.solicitacoes.filter(
            (solicitacao) =>
                solicitacao.status ===
                "Aguardando análise"
        ).length;

    const doacoesPendentes =
        dados.doacoes.filter(
            (doacao) =>
                doacao.status ===
                "Aguardando triagem"
        ).length;

    const estoqueCritico =
        dados.medicamentos.filter(
            (medicamento) => {

                const estoque =
                    Number(medicamento.estoque);

                return estoque > 0 &&
                       estoque <= 10;

            }
        ).length;

    const indisponiveis =
        dados.medicamentos.filter(
            (medicamento) =>
                Number(medicamento.estoque) <= 0
        ).length;

    const alertas = [];

    if(solicitacoesPendentes > 0){

        alertas.push({

            tipo:
                "aviso",

            icone:
                "📋",

            titulo:
                `${solicitacoesPendentes} solicitação(ões) aguardando análise`,

            texto:
                "Existem pedidos que precisam de avaliação administrativa."

        });

    }

    if(doacoesPendentes > 0){

        alertas.push({

            tipo:
                "informacao",

            icone:
                "🤝",

            titulo:
                `${doacoesPendentes} doação(ões) aguardando triagem`,

            texto:
                "Analise as condições dos medicamentos e organize a coleta."

        });

    }

    if(estoqueCritico > 0){

        alertas.push({

            tipo:
                "erro",

            icone:
                "⚠️",

            titulo:
                `${estoqueCritico} medicamento(s) em nível crítico`,

            texto:
                "Esses medicamentos possuem até 10 unidades disponíveis."

        });

    }

    if(indisponiveis > 0){

        alertas.push({

            tipo:
                "erro",

            icone:
                "⛔",

            titulo:
                `${indisponiveis} medicamento(s) indisponível(is)`,

            texto:
                "Há itens cadastrados sem unidades disponíveis em estoque."

        });

    }

    if(alertas.length === 0){

        alertas.push({

            tipo:
                "sucesso",

            icone:
                "✅",

            titulo:
                "Nenhum alerta operacional no momento",

            texto:
                "As principais rotinas estão dentro das condições esperadas."

        });

    }

    alertas.forEach((alerta) => {

        const elemento =
            document.createElement("article");

        elemento.className =
            `alerta-dashboard ${alerta.tipo}`;

        elemento.innerHTML = `

            <div class="alerta-dashboard-icone">
                ${alerta.icone}
            </div>

            <div class="alerta-dashboard-conteudo">

                <strong>
                    ${escaparTextoDashboard(
                        alerta.titulo
                    )}
                </strong>

                <p>
                    ${escaparTextoDashboard(
                        alerta.texto
                    )}
                </p>

            </div>
        `;

        alertasDashboard.appendChild(
            elemento
        );

    });

}


/*=========================================================
    GRÁFICO DE SOLICITAÇÕES
=========================================================*/

function renderizarGraficoSolicitacoes(lista){

    const status = [

        "Aguardando análise",

        "Aprovada",

        "Em separação",

        "Recusada",

        "Entregue"

    ];

    const classes = {

        "Aguardando análise":
            "amarela",

        "Aprovada":
            "",

        "Em separação":
            "roxa",

        "Recusada":
            "vermelha",

        "Entregue":
            "azul"

    };

    renderizarGraficoBarras(

        graficoStatusSolicitacoes,

        status.map((nome) => ({

            nome:
                nome,

            valor:
                lista.filter(
                    (item) =>
                        item.status === nome
                ).length,

            classe:
                classes[nome]

        }))

    );

}


/*=========================================================
    GRÁFICO DE DOAÇÕES
=========================================================*/

function renderizarGraficoDoacoes(lista){

    const status = [

        "Aguardando triagem",

        "Aprovada",

        "Coleta agendada",

        "Recusada",

        "Recebida"

    ];

    const classes = {

        "Aguardando triagem":
            "amarela",

        "Aprovada":
            "",

        "Coleta agendada":
            "roxa",

        "Recusada":
            "vermelha",

        "Recebida":
            "azul"

    };

    renderizarGraficoBarras(

        graficoStatusDoacoes,

        status.map((nome) => ({

            nome:
                nome,

            valor:
                lista.filter(
                    (item) =>
                        item.status === nome
                ).length,

            classe:
                classes[nome]

        }))

    );

}


/*=========================================================
    GRÁFICO GENÉRICO
=========================================================*/

function renderizarGraficoBarras(
    elemento,
    dados
){

    if(!elemento){

        return;

    }

    elemento.innerHTML = "";

    const maiorValor =
        Math.max(
            1,
            ...dados.map(
                (item) => item.valor
            )
        );

    dados.forEach((item) => {

        const percentual =
            item.valor > 0
                ? Math.max(
                    7,
                    Math.round(
                        item.valor /
                        maiorValor *
                        100
                    )
                )
                : 0;

        const linha =
            document.createElement("div");

        linha.classList.add(
            "linha-grafico-dashboard"
        );

        linha.innerHTML = `

            <span class="rotulo-grafico-dashboard">

                ${escaparTextoDashboard(
                    item.nome
                )}

            </span>

            <div class="trilha-grafico-dashboard">

                <div
                    class="
                        barra-grafico-dashboard
                        ${item.classe || ""}
                    "
                    style="width:${percentual}%"
                >
                </div>

            </div>

            <strong class="valor-grafico-dashboard">

                ${item.valor}

            </strong>
        `;

        elemento.appendChild(linha);

    });

}


/*=========================================================
    SOLICITAÇÕES RECENTES
=========================================================*/

function renderizarSolicitacoesRecentesDashboard(
    lista
){

    if(!dashboardSolicitacoesGerencial){

        return;

    }

    dashboardSolicitacoesGerencial.innerHTML =
        "";

    const recentes =
        [...lista]
            .sort((a, b) => {

                return obterTimestampDashboard(
                    b.dataSolicitacao
                ) -
                obterTimestampDashboard(
                    a.dataSolicitacao
                );

            })
            .slice(0, 5);

    if(recentes.length === 0){

        dashboardSolicitacoesGerencial.innerHTML = `

            <tr>

                <td colspan="4">

                    <div class="dashboard-vazio">

                        Nenhuma solicitação registrada.

                    </div>

                </td>

            </tr>
        `;

        return;

    }

    recentes.forEach((solicitacao) => {

        const linha =
            document.createElement("tr");

        linha.innerHTML = `

            <td>

                <strong>
                    ${escaparTextoDashboard(
                        solicitacao.protocolo
                    )}
                </strong>

            </td>

            <td>
                ${escaparTextoDashboard(
                    solicitacao.solicitante?.nome ||
                    "Não informado"
                )}
            </td>

            <td>
                ${formatarDataHoraDashboard(
                    solicitacao.dataSolicitacao
                )}
            </td>

            <td>
                ${criarStatusDashboard(
                    solicitacao.status
                )}
            </td>
        `;

        dashboardSolicitacoesGerencial.appendChild(
            linha
        );

    });

}


/*=========================================================
    ESTOQUE CRÍTICO
=========================================================*/

function renderizarEstoqueCriticoDashboard(
    lista
){

    if(!dashboardEstoqueBaixoGerencial){

        return;

    }

    dashboardEstoqueBaixoGerencial.innerHTML =
        "";

    const criticos =
        lista
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

    if(criticos.length === 0){

        dashboardEstoqueBaixoGerencial.innerHTML = `

            <div class="dashboard-vazio">

                Nenhum medicamento com estoque baixo.

            </div>
        `;

        return;

    }

    criticos.forEach((medicamento) => {

        const item =
            document.createElement("div");

        item.classList.add("item-alerta");

        item.innerHTML = `

            <div>

                <strong>
                    ${escaparTextoDashboard(
                        medicamento.nome
                    )}
                </strong>

                <span>
                    ${escaparTextoDashboard(
                        medicamento.categoria ||
                        "Sem categoria"
                    )}
                </span>

            </div>

            <span class="quantidade-alerta">

                ${Number(medicamento.estoque)}
                unidade(s)

            </span>
        `;

        dashboardEstoqueBaixoGerencial.appendChild(
            item
        );

    });

}


/*=========================================================
    DOAÇÕES RECENTES
=========================================================*/

function renderizarDoacoesRecentesDashboard(
    lista
){

    if(!dashboardDoacoesRecentes){

        return;

    }

    dashboardDoacoesRecentes.innerHTML =
        "";

    const recentes =
        [...lista]
            .sort((a, b) => {

                return obterTimestampDashboard(
                    b.dataEnvio
                ) -
                obterTimestampDashboard(
                    a.dataEnvio
                );

            })
            .slice(0, 5);

    if(recentes.length === 0){

        dashboardDoacoesRecentes.innerHTML = `

            <div class="dashboard-vazio">

                Nenhuma doação registrada.

            </div>
        `;

        return;

    }

    recentes.forEach((doacao) => {

        const item =
            document.createElement("div");

        item.classList.add(
            "item-atividade-dashboard"
        );

        item.innerHTML = `

            <div class="atividade-dashboard-principal">

                <strong>
                    ${escaparTextoDashboard(
                        doacao.doador
                    )}
                </strong>

                <span>
                    ${escaparTextoDashboard(
                        doacao.medicamento
                    )}
                    •
                    ${Number(doacao.quantidade)}
                    unidade(s)
                </span>

                <span>
                    ${formatarDataHoraDashboard(
                        doacao.dataEnvio
                    )}
                </span>

            </div>

            <div class="atividade-dashboard-status">

                ${criarStatusDashboard(
                    doacao.status
                )}

            </div>
        `;

        dashboardDoacoesRecentes.appendChild(
            item
        );

    });

}


/*=========================================================
    RESUMO DO ESTOQUE
=========================================================*/

function renderizarResumoEstoqueDashboard(
    lista
){

    if(!resumoSituacaoEstoque){

        return;

    }

    const disponiveis =
        lista.filter(
            (medicamento) =>
                Number(medicamento.estoque) > 50
        ).length;

    const baixos =
        lista.filter(
            (medicamento) => {

                const estoque =
                    Number(medicamento.estoque);

                return estoque > 0 &&
                       estoque <= 50;

            }
        ).length;

    const indisponiveis =
        lista.filter(
            (medicamento) =>
                Number(medicamento.estoque) <= 0
        ).length;

    resumoSituacaoEstoque.innerHTML = `

        <div class="item-resumo-estoque disponivel">

            <span>
                Disponíveis
            </span>

            <strong>
                ${disponiveis}
            </strong>

            <small>
                Acima de 50 unidades
            </small>

        </div>

        <div class="item-resumo-estoque baixo">

            <span>
                Estoque baixo
            </span>

            <strong>
                ${baixos}
            </strong>

            <small>
                De 1 a 50 unidades
            </small>

        </div>

        <div class="item-resumo-estoque indisponivel">

            <span>
                Indisponíveis
            </span>

            <strong>
                ${indisponiveis}
            </strong>

            <small>
                Sem unidades disponíveis
            </small>

        </div>
    `;

}


/*=========================================================
    DATA DE ATUALIZAÇÃO
=========================================================*/

function atualizarDataDashboard(){

    if(!dataAtualizacaoDashboard){

        return;

    }

    dataAtualizacaoDashboard.textContent =
        new Intl.DateTimeFormat(
            "pt-BR",
            {

                dateStyle:
                    "short",

                timeStyle:
                    "medium"

            }
        ).format(
            new Date()
        );

}


/*=========================================================
    STATUS
=========================================================*/

function criarStatusDashboard(status){

    const classes = {

        "Aguardando análise":
            "status-pendente",

        "Aguardando triagem":
            "status-triagem",

        "Aprovada":
            "status-aprovada",

        "Em separação":
            "status-coleta",

        "Coleta agendada":
            "status-coleta",

        "Recusada":
            "status-recusada",

        "Entregue":
            "status-entregue",

        "Recebida":
            "status-recebida"

    };

    const classe =
        classes[status] ||
        "status-pendente";

    return `

        <span class="status ${classe}">

            ${escaparTextoDashboard(
                status || "Não informado"
            )}

        </span>
    `;

}


/*=========================================================
    FORMATAÇÕES
=========================================================*/

function formatarDataHoraDashboard(data){

    if(!data){

        return "Não informado";

    }

    const objetoData =
        new Date(data);

    if(
        Number.isNaN(
            objetoData.getTime()
        )
    ){

        return "Não informado";

    }

    return new Intl.DateTimeFormat(
        "pt-BR",
        {

            dateStyle:
                "short",

            timeStyle:
                "short"

        }
    ).format(
        objetoData
    );

}


function obterTimestampDashboard(data){

    if(!data){

        return 0;

    }

    const timestamp =
        new Date(data).getTime();

    return Number.isNaN(timestamp)
        ? 0
        : timestamp;

}


function atualizarTextoElemento(
    elemento,
    valor
){

    if(elemento){

        elemento.textContent =
            String(valor);

    }

}


function escaparTextoDashboard(valor){

    const elemento =
        document.createElement("div");

    elemento.textContent =
        String(valor ?? "");

    return elemento.innerHTML;

}