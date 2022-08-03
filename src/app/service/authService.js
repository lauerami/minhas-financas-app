import * as localstorageService from "./localstorageService";

export const USUARIO_LOGADO = "_usuario_logado"

export const isUsuarioAtenticado = () => {
    const usuario = localstorageService.obterItem(USUARIO_LOGADO)
    return usuario && usuario.id
}

export const removerUsuarioAutenticado = () => {
    localstorageService.removerItem(USUARIO_LOGADO)
}

export const logar = (usuario) => {
    const response = localstorageService.adicionarItem(USUARIO_LOGADO, usuario)
    return (response)
}

export const obterUsuarioAutenticado = () => {
    return localstorageService.obterItem(USUARIO_LOGADO)
}