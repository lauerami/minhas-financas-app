import React from "react";
import Card from '../components/card'
import FormGroup from '../components/form-group'
import ButtonDanger from '../components/buttondanger'
import { useNavigate } from "react-router-dom";
import * as usuarioService from "../app/service/usuarioService";
import { mensagemErro } from "../components/toastr"; 

import { useAuth } from "../main/provedorAutenticacao";

import { useState, useEffect } from "react";

function Login() {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const auth = useAuth()

    const navigate = useNavigate();

    const Entrar = async () => {
        const response = await usuarioService.autenticar(
            {email}.email,
            {senha}.senha
        ).then( response => {            
            auth.iniciarSessao(response.data)
        }).catch(erro => {
            mensagemErro(erro.response.data)
            return false
        })
        navigate("/home")
    }

    useEffect(() => {
        auth.encerrarSessao();
      }, []);

    return(
        <div className="row">
            <div className="col-md-6" style={{position: 'relative', left: '300px'}}>
                <div className="bs-docs-section">
                    <Card title="Login">
                        <div className="row">
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="bs-component">
                                    <fieldset>
                                        <FormGroup label="Email: *" htmlFor="exampleInputEmail1">
                                            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Digite o Email"></input>    
                                        </FormGroup>
                                        <FormGroup label="Senha: *" htmlFor="exampleInputPassword1">
                                            <input type="password" value={senha} onChange={e => setSenha(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder="Password"></input>
                                        </FormGroup>
                                        <button onClick={Entrar} className="btn btn-success">Entrar</button>
                                        <ButtonDanger label="Cadastrar" onClick="/cadastro-usuarios"></ButtonDanger>
                                    </fieldset>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )

}

  export default Login