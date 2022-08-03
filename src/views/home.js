import React from "react";
import * as usuarioService from "../app/service/usuarioService";
import { useState, useEffect } from "react";
import { useAuth } from "../main/provedorAutenticacao";
import { NavLink } from "react-router-dom"

function Home () {

    const [saldo, setSaldo] = useState(0)
    const auth = useAuth();

    useEffect(() => {
        usuarioService.obterSaldoPorUsuario(auth.usuarioAutenticado.id).then(response => {
            setSaldo(response.data)
        }).catch(error => {
            console.error(error.response)
        })
      }, []);

    return(
        <div className="jumbotron">
            <h1 className="display-3">Bem vindo!</h1>
            <p className="lead">Esse é seu sistema de finanças.</p>
            <p className="lead">Seu saldo para o mês atual é de R$ {saldo}</p>
            <hr className="my-4" />
            <p>E essa é sua área administrativa, utilize um dos menus ou botões abaixo para navegar pelo sistema.</p>
            <p className="lead">
            <NavLink className="btn btn-primary btn-lg" to="/cadastro-usuarios" role="button"><i className="pi pi-users"></i> Cadastrar Usuário</NavLink>
            <NavLink className="btn btn-danger btn-lg" to="/cadastro-lancamentos" role="button"><i className="pi pi-money-bill"></i> Cadastrar Lançamento</NavLink>
            </p>
        </div>
    )

}

export default Home