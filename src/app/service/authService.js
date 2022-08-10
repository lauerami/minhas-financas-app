import * as localstorageService from "./localstorageService";
import jwt from 'jsonwebtoken'
import httpMethods from "../apiservice"

export const USUARIO_LOGADO = "_usuario_logado"
export const TOKEN = "access_token"

export const isUsuarioAtenticado = () => {
    const token = localstorageService.obterItem(TOKEN)
    const decodedToken = jwt.decode(token)
    let expiration = 0
    if(decodedToken !== null){
        expiration = decodedToken.exp
        console.log(expiration)
    }
    const isTokenInvalido = Date.now() > (expiration * 1000)
    return !isTokenInvalido;
}

export const removerUsuarioAutenticado = () => {
    localstorageService.removerItem(USUARIO_LOGADO)
    localstorageService.removerItem(TOKEN)
}

export const logar = (usuario, token) => {
    localstorageService.adicionarItem(USUARIO_LOGADO, usuario)
    localstorageService.adicionarItem(TOKEN, token)
    httpMethods.registrationToken(token)
}

export const obterUsuarioAutenticado = () => {
    return localstorageService.obterItem(USUARIO_LOGADO)
}

export const refreshSession = () => {
    const token = localstorageService.obterItem(TOKEN)
    const usuario = obterUsuarioAutenticado();
    logar(usuario, token)
    return usuario;
}