import React from 'react';

import Card from '../components/card'
import FormGroup from '../components/form-group';
import * as usuarioService from "../app/service/usuarioService";

import {useState} from "react";
import { useNavigate } from "react-router-dom";
import { mensagemErro, mensagemSuccesso } from "../components/toastr"; 
import Navbar from "../components/navbar"

function CadastroUsuario() {

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [senhaRepeticao, setSenhaRepeticao] = useState("");

    const navigate = useNavigate();

    const cadastrar = () => {

        const usuario = {
            nome: {nome}.nome,
            email: {email}.email,
            senha: {senha}.senha,
            senhaRepeticao: {senhaRepeticao}.senhaRepeticao
        }

        try{
            usuarioService.validar(usuario);
        }catch(erro){
            const msgs = erro.mensagens;
            msgs.forEach(element => {
                mensagemErro(element);
            });
            return false;
        }

        usuarioService.salvar(usuario)
        .then( response => {
            mensagemSuccesso("Usuário cadastrado com sucesso! Faça o login para entrar no sistema.")
        }).catch(error => {
            mensagemErro(error.response.data)
        })
    }

    const cancelarCadastroUsuario = () => {
        navigate("/home")
    }

    return(
        <>
            <Navbar />
            <div className="container">
                <Card title="Cadastro de Usuário">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="bs-component">
                                <FormGroup label="Nome: *" htmlFor="inputNome">
                                    <input type="text" className="form-control" id="inputNome" name="nome" onChange={e => setNome(e.target.value)} />
                                </FormGroup>
                                <FormGroup label="Email: *" htmlFor="inputEmail">
                                    <input type="email" className="form-control" id="inputEmail" name="email" onChange={e => setEmail(e.target.value)} />
                                </FormGroup>
                                <FormGroup label="Senha: *" htmlFor="inputSenha">
                                    <input type="password" className="form-control" id="inputSenha" name="senha" onChange={e => setSenha(e.target.value)} />
                                </FormGroup>
                                <FormGroup label="Repita a Senha: *" htmlFor="inputRepitaSenha">
                                    <input type="password" className="form-control" id="inputRepitaSenha" name="senha" onChange={e => setSenhaRepeticao(e.target.value)} />
                                </FormGroup>
                                <button onClick={cadastrar} type="button" className="btn btn-success"> <i className="pi pi-save"></i> Salvar</button>
                                <button className='btn btn-danger' onClick={cancelarCadastroUsuario}> <i className="pi pi-ban"></i> Cancelar</button>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </>
    )

}

export default CadastroUsuario