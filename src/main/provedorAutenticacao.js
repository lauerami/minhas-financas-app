import React from 'react'
import { useState, useContext } from "react";
import * as authService from "../app/service/authService";
import jwt from "jsonwebtoken"
import { useEffect } from "react";
import * as localstorageService from "../app/service/localstorageService";
import { useLocation, useNavigate } from 'react-router-dom';

export const AuthContext = React.createContext()
export const AuthConsumer = AuthContext.Consumer;
export const TOKEN = "access_token"

export const useAuth = () => {
    return useContext(AuthContext);
};

function ProvedorAutenticacao ({children}) {

    const [usuarioAutenticado, setUsuarioAutenticado] = useState(null);
    const [isAutenticado, setIsAutenticado] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const iniciarSessao = (tokenDTO) => {
        const token = tokenDTO.token
        const claims = jwt.decode(token)
        const usuario = {
            id: claims.userid,
            nome: claims.nome
        }
        authService.logar(usuario, token);
        setIsAutenticado(true)
        setUsuarioAutenticado(usuario)
    }

    const encerrarSessao = () => {
        authService.removerUsuarioAutenticado();
        setIsAutenticado(false)
        setUsuarioAutenticado(null)
    }

    useEffect(() => {
        const token = localstorageService.obterItem(TOKEN)
        const decodedToken = jwt.decode(token)
        let expiration = 0
        if(decodedToken !== null){
            expiration = decodedToken.exp
        }
        const isTokenInvalido = Date.now() > (expiration * 1000)
        if(!isTokenInvalido){
            const usuario = authService.obterUsuarioAutenticado();
            authService.logar(usuario, token)
            setIsAutenticado(true)
            setUsuarioAutenticado(usuario)
            navigate(location.pathname)
        }
      }, []);

    const contexto = {
        usuarioAutenticado: {usuarioAutenticado}.usuarioAutenticado,
        isAutenticado: {isAutenticado}.isAutenticado,
        iniciarSessao: {iniciarSessao}.iniciarSessao,
        encerrarSessao: {encerrarSessao}.encerrarSessao
    }

    return(
        <AuthContext.Provider value={contexto}>
            {children}
        </AuthContext.Provider>
    )
}

export default ProvedorAutenticacao