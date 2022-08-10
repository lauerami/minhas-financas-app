import React from "react";
import Navbaritem from "./navbaritem";
import Navbaritemespecial from "./navbaritemespecial";
import { useAuth } from "../main/provedorAutenticacao";
import { NavLink } from "react-router-dom"

function Navbar(){

    const auth = useAuth();

    const sair = () => {
        auth.encerrarSessao();
    }

    return(
        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
            <div className="container">
                <NavLink className="navbar-brand" to="/home">Minhas Finanças</NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav">
                        <Navbaritem render={auth.isAutenticado} href="/home" label="Home" /> 
                        <Navbaritem render={auth.isAutenticado} href="/cadastro-usuarios" label="Usuários" />
                        <Navbaritem render={auth.isAutenticado} href="/consulta-lancamentos" label="Lançamentos" />
                        <Navbaritemespecial render={auth.isAutenticado} href="/login" label="Sair" exitAction={sair}/>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar