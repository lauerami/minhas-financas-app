import React from 'react'
import { useState, useContext, useMemo } from "react";
import * as authService from "../app/service/authService";

export const AuthContext = React.createContext()
export const AuthConsumer = AuthContext.Consumer;

export const useAuth = () => {
    return useContext(AuthContext);
};

function ProvedorAutenticacao ({children}) {

    const [usuarioAutenticado, setUsuarioAutenticado] = useState(null);
    const [isAutenticado, setIsAutenticado] = useState(false);

    const iniciarSessao = (usuario) => {
        authService.logar(usuario);
        setIsAutenticado(true)
        setUsuarioAutenticado(usuario)
    }

    const encerrarSessao = () => {
        authService.removerUsuarioAutenticado();
        setIsAutenticado(false)
        setUsuarioAutenticado(null)
    }

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