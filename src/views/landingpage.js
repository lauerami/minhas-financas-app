import React from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {

    const navigate = useNavigate();

    const Entrar = () => {
        navigate("/home")
    }

    return(
        <div className="container text-center">
            <h2>Bem vindo ao sistema Minhas Finanças</h2>
            Este é o seu sistema para controle de finanças pessoais,
            clique no botão abaixo para acessar o sistema: <br/><br/>

            <div className="offset-md-4 col-md-4">
                <button style={{ width: "100%" }} className="btn btn-success" onClick={Entrar}>
                    <i className="pi pi-sign-in"></i> Acessar
                </button>
            </div>
        </div>
    )

}

export default LandingPage