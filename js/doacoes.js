/*=========================================================
    MÓDULO DE DOAÇÕES — VERSÃO CONSOLIDADA
=========================================================*/

const CHAVE_DOACOES_ADMIN =
    "helpmed_doacoes_admin";


/*=========================================================
    PERSISTÊNCIA ADMINISTRATIVA DAS DOAÇÕES
=========================================================*/

function obterEstadosDoacoesAdmin(){

    try{

        const dados =
            localStorage.getItem(
                CHAVE_DOACOES_ADMIN
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
            "Erro ao carregar estados das doações:",
            erro
        );

        return [];

    }

}


function salvarEstadosDoacoesAdmin(){

    try{

        const estados =
            doacoesAdmin.map((doacao) => ({

                chave:
                    gerarChavePersistenciaDoacao(doacao),

                status:
                    doacao.status,

                observacoes:
                    doacao.observacoes || "",

                coleta:
                    doacao.coleta || null

            }));

        localStorage.setItem(
            CHAVE_DOACOES_ADMIN,
            JSON.stringify(estados)
        );

    }catch(erro){

        console.error(
            "Erro ao salvar estados das doações:",
            erro
        );

    }

}


function gerarChavePersistenciaDoacao(doacao){

    return [

        doacao.protocolo || "",

        doacao.idItemPublico || doacao.id || "",

        doacao.medicamento || ""

    ].join("|");

}


function aplicarEstadosPersistidosDoacoes(){

    const estados =
        obterEstadosDoacoesAdmin();

    if(estados.length === 0){

        return;

    }

    const mapa =
        new Map(
            estados.map((estado) => [
                estado.chave,
                estado
            ])
        );

    doacoesAdmin.forEach((doacao) => {

        const estado =
            mapa.get(
                gerarChavePersistenciaDoacao(doacao)
            );

        if(!estado){

            return;

        }

        doacao.status =
            estado.status || doacao.status;

        doacao.observacoes =
            estado.observacoes ??
            doacao.observacoes;

        doacao.coleta =
            estado.coleta || null;

    });

}


/*=========================================================
    IMPORTAÇÃO DAS DOAÇÕES PÚBLICAS
=========================================================*/

function obterDoacoesPublicasSalvas(){

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
            "Erro ao carregar as doações públicas:",
            erro
        );

        return [];

    }

}


function importarDoacoesPublicas(){

    const doacoesPublicas =
        obterDoacoesPublicasSalvas();

    for(
        let indice = doacoesAdmin.length - 1;
        indice >= 0;
        indice--
    ){

        if(
            doacoesAdmin[indice].origem ===
            "Formulário público"
        ){

            doacoesAdmin.splice(indice, 1);

        }

    }

    let proximoId =
        obterProximoIdImportacaoDoacao();

    doacoesPublicas.forEach((doacaoPublica) => {

        const itens =
            Array.isArray(doacaoPublica.itens)
                ? doacaoPublica.itens
                : [];

        const dadosDoador =
            doacaoPublica.doador || {};

        itens.forEach((item, indiceItem) => {

            doacoesAdmin.push({

                id:
                    proximoId,

                protocolo:
                    doacaoPublica.protocolo ||
                    `DOA-PUBLICA-${proximoId}`,

                doador:
                    dadosDoador.nome ||
                    "Doador não informado",

                telefone:
                    dadosDoador.telefone ||
                    "Não informado",

                email:
                    dadosDoador.email ||
                    "Não informado",

                endereco:
                    dadosDoador.endereco ||
                    null,

                medicamento:
                    item.medicamento ||
                    "Medicamento não informado",

                idMedicamento:
                    item.idMedicamento || null,

                quantidade:
                    Number(item.quantidade) || 0,

                validade:
                    item.validade || "",

                lote:
                    item.lote ||
                    "Não informado",

                estadoEmbalagem:
                    item.estadoEmbalagem ||
                    "Não informado",

                status:
                    doacaoPublica.status ||
                    "Aguardando triagem",

                observacoes:
                    item.observacoes || "",

                origem:
                    "Formulário público",

                idDoacaoPublica:
                    doacaoPublica.id || null,

                idItemPublico:
                    item.id || indiceItem + 1,

                dataEnvio:
                    doacaoPublica.dataEnvio || null,

                coleta:
                    null

            });

            proximoId++;

        });

    });

    aplicarEstadosPersistidosDoacoes();

}


function obterProximoIdImportacaoDoacao(){

    if(doacoesAdmin.length === 0){

        return 1;

    }

    return Math.max(
        ...doacoesAdmin.map(
            (doacao) =>
                Number(doacao.id) || 0
        )
    ) + 1;

}


/*=========================================================
    INDICADORES DAS DOAÇÕES
=========================================================*/

function atualizarIndicadoresDoacoes(){

    if(indicadorTotalDoacoes){

        indicadorTotalDoacoes.textContent =
            doacoesAdmin.length;

    }

    if(indicadorDoacoesPendentes){

        indicadorDoacoesPendentes.textContent =
            doacoesAdmin.filter(
                (doacao) =>
                    doacao.status ===
                    "Aguardando triagem"
            ).length;

    }

    if(indicadorDoacoesAprovadas){

        indicadorDoacoesAprovadas.textContent =
            doacoesAdmin.filter(
                (doacao) =>
                    doacao.status === "Aprovada" ||
                    doacao.status === "Coleta agendada" ||
                    doacao.status === "Recebida"
            ).length;

    }

    if(indicadorDoacoesRecusadas){

        indicadorDoacoesRecusadas.textContent =
            doacoesAdmin.filter(
                (doacao) =>
                    doacao.status === "Recusada"
            ).length;

    }

}


/*=========================================================
    RENDERIZAÇÃO DAS DOAÇÕES
=========================================================*/

function renderizarDoacoes(lista){

    if(!tabelaDoacoes){

        return;

    }

    tabelaDoacoes.innerHTML = "";

    if(!Array.isArray(lista) || lista.length === 0){

        tabelaDoacoes.innerHTML = `

            <tr>

                <td colspan="7">

                    <div class="mensagem-vazia">

                        Nenhuma doação encontrada.

                    </div>

                </td>

            </tr>
        `;

        return;

    }

    lista.forEach((doacao) => {

        const linha =
            document.createElement("tr");

        linha.innerHTML = `

            <td>
                <strong>
                    ${escaparHtml(doacao.protocolo)}
                </strong>
            </td>

            <td>
                ${escaparHtml(doacao.doador)}
            </td>

            <td>
                ${escaparHtml(doacao.medicamento)}
            </td>

            <td>
                ${Number(doacao.quantidade)}
            </td>

            <td>
                ${formatarDataDoacao(doacao.validade)}
            </td>

            <td>
                ${criarStatusDoacao(doacao.status)}
            </td>

            <td>

                <div class="acoes-tabela">

                    <button
                        type="button"
                        class="btn-acao btn-visualizar"
                        data-acao-doacao="visualizar"
                        data-id="${doacao.id}"
                    >
                        Visualizar
                    </button>

                    ${
                        doacao.status ===
                        "Aguardando triagem"
                            ? `
                                <button
                                    type="button"
                                    class="btn-acao btn-aprovar"
                                    data-acao-doacao="aprovar"
                                    data-id="${doacao.id}"
                                >
                                    Aprovar
                                </button>

                                <button
                                    type="button"
                                    class="btn-acao btn-recusar"
                                    data-acao-doacao="recusar"
                                    data-id="${doacao.id}"
                                >
                                    Recusar
                                </button>
                              `
                            : ""
                    }

                    ${
                        doacao.status === "Aprovada" ||
                        doacao.status === "Coleta agendada"
                            ? `
                                <button
                                    type="button"
                                    class="btn-acao btn-receber"
                                    data-acao-doacao="receber"
                                    data-id="${doacao.id}"
                                >
                                    Registrar recebimento
                                </button>
                              `
                            : ""
                    }

                    <button
                        type="button"
                        class="btn-acao btn-editar"
                        data-acao-doacao="editar"
                        data-id="${doacao.id}"
                    >
                        Editar
                    </button>

                </div>

            </td>
        `;

        tabelaDoacoes.appendChild(linha);

    });

}


/*=========================================================
    FILTRO DAS DOAÇÕES
=========================================================*/

function aplicarFiltrosDoacoes(){

    const pesquisa =
        normalizarTexto(
            pesquisaDoacoes
                ? pesquisaDoacoes.value
                : ""
        );

    const status =
        filtroStatusDoacoes
            ? filtroStatusDoacoes.value
            : "";

    const resultado =
        doacoesAdmin.filter((doacao) => {

            const correspondePesquisa =

                normalizarTexto(
                    doacao.protocolo
                ).includes(pesquisa)

                ||

                normalizarTexto(
                    doacao.doador
                ).includes(pesquisa)

                ||

                normalizarTexto(
                    doacao.medicamento
                ).includes(pesquisa);

            const correspondeStatus =

                status === ""

                ||

                doacao.status === status;

            return (
                correspondePesquisa &&
                correspondeStatus
            );

        });

    renderizarDoacoes(resultado);

}


/*=========================================================
    AÇÕES DA TABELA
=========================================================*/

function tratarAcaoDoacao(event){

    const botao =
        event.target.closest(
            "[data-acao-doacao]"
        );

    if(!botao){

        return;

    }

    const id =
        Number(botao.dataset.id);

    const acao =
        botao.dataset.acaoDoacao;

    const acoes = {

        visualizar:
            visualizarDoacao,

        editar:
            abrirEdicaoDoacao,

        aprovar:
            aprovarDoacao,

        recusar:
            recusarDoacao,

        receber:
            registrarRecebimentoDoacao

    };

    if(acoes[acao]){

        acoes[acao](id);

    }

}


/*=========================================================
    CADASTRO E EDIÇÃO
=========================================================*/

function abrirCadastroDoacao(){

    limparFormularioDoacao();

    if(tituloModalDoacao){

        tituloModalDoacao.textContent =
            "Registrar doação";

    }

    abrirModalDoacao();

}


function abrirEdicaoDoacao(id){

    const doacao =
        localizarDoacaoPorId(id);

    if(!doacao){

        return;

    }

    limparMensagemFormularioDoacao();

    doacaoId.value =
        doacao.id;

    doacaoDoador.value =
        doacao.doador;

    doacaoMedicamento.value =
        doacao.medicamento;

    doacaoQuantidade.value =
        doacao.quantidade;

    doacaoValidade.value =
        doacao.validade;

    doacaoLote.value =
        doacao.lote;

    doacaoStatus.value =
        doacao.status === "Coleta agendada"
            ? "Aprovada"
            : doacao.status;

    doacaoObservacoes.value =
        doacao.observacoes || "";

    tituloModalDoacao.textContent =
        "Editar doação";

    abrirModalDoacao();

}


function salvarDoacao(event){

    event.preventDefault();

    limparMensagemFormularioDoacao();

    const doador =
        doacaoDoador.value.trim();

    const medicamento =
        doacaoMedicamento.value.trim();

    const quantidade =
        Number(doacaoQuantidade.value);

    const validade =
        doacaoValidade.value;

    const lote =
        doacaoLote.value.trim();

    const status =
        doacaoStatus.value;

    const observacoes =
        doacaoObservacoes.value.trim();

    if(
        doador === "" ||
        medicamento === "" ||
        validade === "" ||
        lote === ""
    ){

        exibirMensagemFormularioDoacao(
            "Preencha todos os campos obrigatórios.",
            "erro"
        );

        return;

    }

    if(
        !Number.isInteger(quantidade) ||
        quantidade <= 0
    ){

        exibirMensagemFormularioDoacao(
            "Informe uma quantidade válida.",
            "erro"
        );

        return;

    }

    const idAtual =
        Number(doacaoId.value);

    if(idAtual){

        const doacao =
            localizarDoacaoPorId(idAtual);

        if(!doacao){

            return;

        }

        doacao.doador =
            doador;

        doacao.medicamento =
            medicamento;

        doacao.quantidade =
            quantidade;

        doacao.validade =
            validade;

        doacao.lote =
            lote;

        doacao.status =
            status;

        doacao.observacoes =
            observacoes;

        exibirMensagemFormularioDoacao(
            "Doação atualizada com sucesso.",
            "sucesso"
        );

    }else{

        const novoId =
            gerarNovoIdDoacao();

        doacoesAdmin.push({

            id:
                novoId,

            protocolo:
                gerarProtocoloDoacao(novoId),

            doador:
                doador,

            telefone:
                "Não informado",

            email:
                "Não informado",

            endereco:
                null,

            medicamento:
                medicamento,

            quantidade:
                quantidade,

            validade:
                validade,

            lote:
                lote,

            estadoEmbalagem:
                "Não informado",

            status:
                status,

            observacoes:
                observacoes,

            origem:
                "Cadastro administrativo",

            coleta:
                null

        });

        exibirMensagemFormularioDoacao(
            "Doação registrada com sucesso.",
            "sucesso"
        );

    }

    salvarEstadosDoacoesAdmin();

    atualizarModuloDoacoes();

    setTimeout(() => {

        fecharModalDoacao();

    }, 800);

}


function gerarNovoIdDoacao(){

    if(doacoesAdmin.length === 0){

        return 1;

    }

    return Math.max(
        ...doacoesAdmin.map(
            (doacao) =>
                Number(doacao.id) || 0
        )
    ) + 1;

}


function gerarProtocoloDoacao(id){

    return (
        `DOA-${new Date().getFullYear()}-` +
        String(id).padStart(3, "0")
    );

}


/*=========================================================
    MODAL DE CADASTRO
=========================================================*/

function abrirModalDoacao(){

    if(!modalDoacaoAdmin){

        return;

    }

    modalDoacaoAdmin.classList.add(
        "ativo"
    );

    modalDoacaoAdmin.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.style.overflow =
        "hidden";

    setTimeout(() => {

        doacaoDoador?.focus();

    }, 100);

}


function fecharModalDoacao(){

    if(!modalDoacaoAdmin){

        return;

    }

    modalDoacaoAdmin.classList.remove(
        "ativo"
    );

    modalDoacaoAdmin.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow = "";

    limparFormularioDoacao();

}


function limparFormularioDoacao(){

    formularioDoacao?.reset();

    if(doacaoId){

        doacaoId.value = "";

    }

    if(doacaoStatus){

        doacaoStatus.value =
            "Aguardando triagem";

    }

    limparMensagemFormularioDoacao();

}


function exibirMensagemFormularioDoacao(
    mensagem,
    tipo
){

    if(!mensagemFormularioDoacao){

        return;

    }

    mensagemFormularioDoacao.textContent =
        mensagem;

    mensagemFormularioDoacao.className =
        `mensagem-formulario ${tipo}`;

}


function limparMensagemFormularioDoacao(){

    if(!mensagemFormularioDoacao){

        return;

    }

    mensagemFormularioDoacao.textContent =
        "";

    mensagemFormularioDoacao.className =
        "mensagem-formulario";

}


/*=========================================================
    DETALHES DA DOAÇÃO
=========================================================*/

function localizarDoacaoPorId(id){

    return doacoesAdmin.find(
        (doacao) =>
            Number(doacao.id) === Number(id)
    );

}


function visualizarDoacao(id){

    const doacao =
        localizarDoacaoPorId(id);

    if(!doacao){

        window.alert(
            "Doação não encontrada."
        );

        return;

    }

    idDoacaoDetalhesAtual =
        Number(doacao.id);

    preencherDetalhesDoacao(doacao);

    abrirDetalhesDoacao();

}


function preencherDetalhesDoacao(doacao){

    if(protocoloDetalhesDoacao){

        protocoloDetalhesDoacao.textContent =
            `Protocolo: ${
                doacao.protocolo ||
                "Não informado"
            }`;

    }

    if(statusDetalhesDoacao){

        statusDetalhesDoacao.innerHTML =
            criarStatusDoacao(
                doacao.status ||
                "Aguardando triagem"
            );

    }

    preencherDadosDoadorDoacao(doacao);

    preencherEnderecoDoacao(doacao);

    preencherMedicamentoDoacao(doacao);

    preencherDadosColetaDoacao(doacao);

    atualizarBotoesDetalhesDoacao(
        doacao.status
    );

    limparMensagemDetalhesDoacao();

}


function preencherDadosDoadorDoacao(doacao){

    if(detalheDoadorNome){

        detalheDoadorNome.textContent =
            doacao.doador ||
            "Doador não informado";

    }

    if(detalheDoadorTelefone){

        detalheDoadorTelefone.textContent =
            doacao.telefone ||
            "Não informado";

    }

    if(detalheDoadorEmail){

        detalheDoadorEmail.textContent =
            doacao.email ||
            "Não informado";

    }

}


function preencherEnderecoDoacao(doacao){

    if(
        !detalheEnderecoPrincipal ||
        !detalheEnderecoLocalidade ||
        !detalheEnderecoCep ||
        !detalheEnderecoReferencia
    ){

        return;

    }

    const endereco =
        doacao.endereco;

    if(!endereco){

        detalheEnderecoPrincipal.textContent =
            "Endereço não informado";

        detalheEnderecoLocalidade.textContent =
            "—";

        detalheEnderecoCep.textContent =
            "—";

        detalheEnderecoReferencia.textContent =
            "";

        return;

    }

    const complemento =
        endereco.complemento
            ? ` - ${endereco.complemento}`
            : "";

    detalheEnderecoPrincipal.textContent =
        `${
            endereco.logradouro ||
            "Logradouro não informado"
        }, ${
            endereco.numero || "s/n"
        }${complemento}`;

    detalheEnderecoLocalidade.textContent =
        `${
            endereco.bairro ||
            "Bairro não informado"
        } - ${
            endereco.cidade ||
            "Cidade não informada"
        }/${endereco.estado || "--"}`;

    detalheEnderecoCep.textContent =
        `CEP: ${
            endereco.cep ||
            "Não informado"
        }`;

    detalheEnderecoReferencia.textContent =
        endereco.referencia
            ? `Referência: ${endereco.referencia}`
            : "";

}


function preencherMedicamentoDoacao(doacao){

    if(detalheDoacaoMedicamento){

        detalheDoacaoMedicamento.textContent =
            doacao.medicamento ||
            "Medicamento não informado";

    }

    if(detalheDoacaoQuantidade){

        detalheDoacaoQuantidade.textContent =
            `${Number(
                doacao.quantidade || 0
            )} unidade(s)`;

    }

    if(detalheDoacaoValidade){

        detalheDoacaoValidade.textContent =
            formatarDataDoacao(
                doacao.validade
            );

    }

    if(detalheDoacaoLote){

        detalheDoacaoLote.textContent =
            doacao.lote ||
            "Não informado";

    }

    if(detalheDoacaoEmbalagem){

        detalheDoacaoEmbalagem.textContent =
            doacao.estadoEmbalagem ||
            "Não informado";

    }

    if(detalheDoacaoObservacoes){

        detalheDoacaoObservacoes.textContent =
            doacao.observacoes ||
            "Nenhuma observação informada.";

    }

}


function preencherDadosColetaDoacao(doacao){

    if(dataColetaDoacao){

        dataColetaDoacao.value =
            doacao.coleta?.data || "";

    }

    if(horarioColetaDoacao){

        horarioColetaDoacao.value =
            doacao.coleta?.horario || "";

    }

    if(observacaoColetaDoacao){

        observacaoColetaDoacao.value =
            doacao.coleta?.observacao || "";

    }

}


function atualizarBotoesDetalhesDoacao(status){

    if(botaoAprovarDetalhesDoacao){

        botaoAprovarDetalhesDoacao.hidden =
            status !== "Aguardando triagem";

    }

    if(botaoRecusarDetalhesDoacao){

        botaoRecusarDetalhesDoacao.hidden =
            status !== "Aguardando triagem";

    }

    if(botaoAgendarColetaDoacao){

        botaoAgendarColetaDoacao.hidden =
            status !== "Aprovada";

    }

    if(botaoConfirmarRecebimentoDoacao){

        botaoConfirmarRecebimentoDoacao.hidden =
            !(
                status === "Aprovada" ||
                status === "Coleta agendada"
            );

    }

}


function abrirDetalhesDoacao(){

    if(!modalDetalhesDoacao){

        return;

    }

    modalDetalhesDoacao.classList.add(
        "ativo"
    );

    modalDetalhesDoacao.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.style.overflow =
        "hidden";

}


function fecharDetalhesDoacao(){

    if(!modalDetalhesDoacao){

        return;

    }

    modalDetalhesDoacao.classList.remove(
        "ativo"
    );

    modalDetalhesDoacao.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow = "";

    idDoacaoDetalhesAtual = null;

    limparMensagemDetalhesDoacao();

}


function atualizarDetalhesDoacaoAberta(){

    if(idDoacaoDetalhesAtual === null){

        return;

    }

    const doacao =
        localizarDoacaoPorId(
            idDoacaoDetalhesAtual
        );

    if(doacao){

        preencherDetalhesDoacao(doacao);

    }

}


function exibirMensagemDetalhesDoacao(
    mensagem,
    tipo
){

    if(!mensagemDetalhesDoacao){

        return;

    }

    mensagemDetalhesDoacao.textContent =
        mensagem;

    mensagemDetalhesDoacao.className =
        `mensagem-formulario ${tipo}`;

}


function limparMensagemDetalhesDoacao(){

    if(!mensagemDetalhesDoacao){

        return;

    }

    mensagemDetalhesDoacao.textContent =
        "";

    mensagemDetalhesDoacao.className =
        "mensagem-formulario";

}


/*=========================================================
    TRIAGEM E COLETA
=========================================================*/

function aprovarDoacao(id){

    const doacao =
        localizarDoacaoPorId(id);

    if(!doacao){

        return;

    }

    const confirmar =
        window.confirm(
            `Deseja aprovar a doação ${
                doacao.protocolo
            }?`
        );

    if(!confirmar){

        return;

    }

    doacao.status =
        "Aprovada";

    salvarEstadosDoacoesAdmin();

    atualizarModuloDoacoes();

}


function recusarDoacao(id){

    const doacao =
        localizarDoacaoPorId(id);

    if(!doacao){

        return;

    }

    const motivo =
        window.prompt(
            "Informe o motivo da recusa:"
        );

    if(motivo === null){

        return;

    }

    if(motivo.trim() === ""){

        window.alert(
            "É necessário informar o motivo da recusa."
        );

        return;

    }

    doacao.status =
        "Recusada";

    doacao.observacoes =
        `${
            doacao.observacoes || ""
        } Motivo da recusa: ${
            motivo.trim()
        }`.trim();

    salvarEstadosDoacoesAdmin();

    atualizarModuloDoacoes();

}


function agendarColetaDoacao(){

    const doacao =
        localizarDoacaoPorId(
            idDoacaoDetalhesAtual
        );

    if(!doacao){

        return;

    }

    const data =
        dataColetaDoacao?.value || "";

    const horario =
        horarioColetaDoacao?.value || "";

    const observacao =
        observacaoColetaDoacao?.value.trim() ||
        "";

    if(data === ""){

        exibirMensagemDetalhesDoacao(
            "Informe a data da coleta.",
            "erro"
        );

        dataColetaDoacao?.focus();

        return;

    }

    if(horario === ""){

        exibirMensagemDetalhesDoacao(
            "Informe o horário aproximado da coleta.",
            "erro"
        );

        horarioColetaDoacao?.focus();

        return;

    }

    doacao.coleta = {

        data:
            data,

        horario:
            horario,

        observacao:
            observacao

    };

    doacao.status =
        "Coleta agendada";

    salvarEstadosDoacoesAdmin();

    atualizarModuloDoacoes();

    preencherDetalhesDoacao(doacao);

    exibirMensagemDetalhesDoacao(
        "Coleta agendada com sucesso.",
        "sucesso"
    );

}


function registrarRecebimentoDoacao(id){

    const doacao =
        localizarDoacaoPorId(id);

    if(!doacao){

        return;

    }

    if(doacao.status === "Recebida"){

        window.alert(
            "Esta doação já foi recebida."
        );

        return;

    }

    const confirmar =
        window.confirm(
            `Confirma o recebimento de ${
                doacao.quantidade
            } unidade(s) de ${
                doacao.medicamento
            }?`
        );

    if(!confirmar){

        return;

    }

    const medicamento =
        localizarMedicamentoDaDoacao(
            doacao
        );

    if(medicamento){

        medicamento.estoque =
            Number(
                medicamento.estoque || 0
            ) +
            Number(
                doacao.quantidade || 0
            );

    }else{

        const cadastrar =
            window.confirm(
                `O medicamento "${
                    doacao.medicamento
                }" não está cadastrado no estoque.\n\n` +
                "Deseja cadastrá-lo automaticamente?"
            );

        if(!cadastrar){

            return;

        }

        medicamentos.push({

            id:
                gerarNovoIdMedicamento(),

            nome:
                doacao.medicamento,

            principio:
                "Não informado",

            categoria:
                "Não definida",

            estoque:
                Number(
                    doacao.quantidade || 0
                ),

            receita:
                false

        });

    }

    doacao.status =
        "Recebida";

    doacao.observacoes =
        `${
            doacao.observacoes || ""
        } Recebimento confirmado e estoque atualizado.`.trim();

    salvarMedicamentosLocalmente();

    salvarEstadosDoacoesAdmin();

    preencherFiltroCategorias();

    atualizarPainel();

    window.alert(
        "Recebimento registrado e estoque atualizado com sucesso."
    );

}


function localizarMedicamentoDaDoacao(doacao){

    if(doacao.idMedicamento){

        const peloId =
            medicamentos.find(
                (medicamento) =>
                    Number(medicamento.id) ===
                    Number(doacao.idMedicamento)
            );

        if(peloId){

            return peloId;

        }

    }

    return medicamentos.find(
        (medicamento) =>
            normalizarTexto(
                medicamento.nome
            ) ===
            normalizarTexto(
                doacao.medicamento
            )
    );

}


function atualizarModuloDoacoes(){

    atualizarIndicadoresDoacoes();

    aplicarFiltrosDoacoes();

}


/*=========================================================
    STATUS E FORMATAÇÃO
=========================================================*/

function criarStatusDoacao(status){

    const classes = {

        "Aguardando triagem":
            "status-triagem",

        "Aprovada":
            "status-aprovada",

        "Coleta agendada":
            "status-coleta",

        "Recusada":
            "status-recusada",

        "Recebida":
            "status-recebida"

    };

    const classe =
        classes[status] ||
        "status-triagem";

    return `

        <span class="status ${classe}">

            ${escaparHtml(status)}

        </span>
    `;

}


function formatarDataDoacao(data){

    if(!data){

        return "-";

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
