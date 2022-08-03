import httpMethods from "../apiservice";

import ErroValidacao from "../exception/errovalidacao";


export const obterListaMeses = () => {
    return [
        {label: "Selecione...", value: ""},
        {label: "Janeiro", value: 1},
        {label: "Fevereiro", value: 2},
        {label: "Março", value: 3},
        {label: "Abril", value: 4},
        {label: "Maio", value: 5},
        {label: "Junho", value: 6},
        {label: "Julho", value: 7},
        {label: "Agosto", value: 8},
        {label: "Setembro", value: 9},
        {label: "Outubro", value: 10},
        {label: "Novembro", value: 11},
        {label: "Dezembro", value: 12},
    ]
}

export const obterListaTipos = () => {
    return [
        {label: "Selecione...", value: ""},
        {label: "Despesa", value: "DESPESA"},
        {label: "Receita", value: "RECEITA"}
    ]
}

export const consultar = async (lancamentoFiltro) => {

    let params = `/api/lancamentos?ano=${lancamentoFiltro.ano}`

    if(lancamentoFiltro.mes){
        params = `${params}&mes=${lancamentoFiltro.mes}`
    }

    if(lancamentoFiltro.tipo){
        params = `${params}&tipo=${lancamentoFiltro.tipo}`
    }

    if(lancamentoFiltro.status){
        params = `${params}&status=${lancamentoFiltro.status}`
    }

    if(lancamentoFiltro.usuario){
        params = `${params}&usuario=${lancamentoFiltro.usuario}`
    }

    if(lancamentoFiltro.descricao){
        params = `${params}&descricao=${lancamentoFiltro.descricao}`
    }

    const response = await httpMethods.get(params);
    return (response);
};

export const deletar = async (id) => {
    const response = await httpMethods.delete(`/api/lancamentos/${id}`)
    return (response)
}

export const salvar = async (lancamento) => {
    const response = await httpMethods.post("/api/lancamentos", lancamento);
    return (response)
}

export const atualizar = async (lancamento) => {
    const response = await httpMethods.put(`/api/lancamentos/${lancamento.id}`, lancamento);
    return (response)
}

export const alterarStatus = async (id, status) => {
    const response = await httpMethods.put(`/api/lancamentos/${id}/atualiza-status`, {status})
    return (response)
}

export const obterPorId = async (id) => {
    const response = await httpMethods.get(`/api/lancamentos/${id}`)
    return (response)
}

export const validar = (lancamento) => {
    const erros = [];

    if(!lancamento.ano){
        erros.push("Informe o Ano.")
    }

    if(!lancamento.mes){
        erros.push("Informe o Mês.")
    }

    if(!lancamento.descricao){
        erros.push("Informe a Descrição.")
    }

    if(!lancamento.valor){
        erros.push("Informe o Valor.")
    }

    if(!lancamento.tipo){
        erros.push("Informe o Tipo.")
    }

    if(erros && erros.length > 0){
        throw new ErroValidacao(erros);
    }

}