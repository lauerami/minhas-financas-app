import React from 'react';
import Card from '../../components/card'
import FormGroup from '../../components/form-group';
import SelectMenu from '../../components/selectMenu';
import * as lancamentoService from "../../app/service/lancamentoService";
import * as messages from "../../components/toastr"

import * as localstorageService from "../../app/service/localstorageService";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';


function CadastroLancamentos() {

    const [Fullname, setFullname] = useState({
        id: null,
        mes: "",
        tipo: "",
        descricao: "",
        ano: "",
        valor: "",
        status: "",
        usuario: null,
        atualizando: false
    });

    let params = useParams();

    let navigate = useNavigate();

    const tipos = lancamentoService.obterListaTipos();
    const meses = lancamentoService.obterListaMeses();

    const handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        setFullname((prevalue) => {
            return {
                ...prevalue,
                [name]: value
            }
        })
    }

    useEffect(() => {
        if(params.id){
            lancamentoService.obterPorId(params.id)
            .then( response => {
                setFullname({...response.data, atualizando: true})
            }).catch( error => {
                messages.mensagemErro(error.response.data)
            })
        }
      }, [params.id]);

    const cancelarLancamento = () => {
        navigate("/consulta-lancamentos")
    }

    const submit = () => {

        const usuarioLogado = localstorageService.obterItem('_usuario_logado')

        const { descricao, valor, mes, ano, tipo } = Fullname

        const lancamento = { descricao, valor, mes, ano, tipo, usuario: usuarioLogado.id };

        try{
            lancamentoService.validar(lancamento);
        }catch(erro){
            const mensagens = erro.mensagens
            mensagens.forEach(element => { messages.mensagemErro(element)});
            return false
        }

        lancamentoService.salvar(lancamento)
        .then(response => {
            messages.mensagemSuccesso("Lançamento cadastrado com sucesso!")
            navigate("/consulta-lancamentos")
        }).catch( error => {
            messages.mensagemErro(error.response.data)
        })
    }

    const atualizar = () => {

        const { descricao, valor, mes, ano, tipo, status, id, usuario } = Fullname

        const lancamento = { descricao, valor, mes, ano, tipo, id, usuario, status };

        lancamentoService.atualizar(lancamento)
        .then(response => {
            messages.mensagemSuccesso("Lançamento atualizado com sucesso!")
            navigate("/consulta-lancamentos")
        }).catch( error => {
            messages.mensagemErro(error.response.data)
        })
    }

    return(
        <Card title={Fullname.atualizando ? "Atualização de Lançamento" : "Cadastro de Lançamento"}>
            <div className='row'>
                <div className="col-md-12">
                    <FormGroup id="inputDescricao" label="Descricao: *">
                        <input id="inputDescricao" type="text" className="form-control" name="descricao" value={Fullname.descricao} onChange={handleChange}/>
                    </FormGroup>   
                </div>
            </div>
            <div className='row'>
                <div className="col-md-6">
                    <FormGroup id="inputAno" label="Ano: *">
                        <input id="inputAno" type="text" className="form-control" name="ano" value={Fullname.ano} onChange={handleChange}/>
                    </FormGroup>
                </div>
                <div className="col-md-6">
                    <FormGroup id="inputMes" label="Mês: *">
                        <SelectMenu id="inputMes" className="form-control" lista={meses} name="mes" value={Fullname.mes} onChange={handleChange} />
                    </FormGroup>
                </div>
            </div>
            <div className='row'>
                <div className="col-md-4">
                    <FormGroup id="inputValor" label="Valor: *">
                        <input id="inputValor" type="text" className="form-control" name="valor" value={Fullname.valor} onChange={handleChange} />
                    </FormGroup> 
                </div>
                <div className="col-md-4">
                    <FormGroup id="inputTipo" label="Tipo: *">
                        <SelectMenu id="inputTipo" className="form-control" lista={tipos} name="tipo" value={Fullname.tipo} onChange={handleChange} />
                    </FormGroup> 
                </div>
                <div className="col-md-4">
                    <FormGroup id="inputStatus" label="Status: ">
                        <input id="inputStatus" type="text" className="form-control" disabled name="status" value={Fullname.status} />
                    </FormGroup> 
                </div>
            </div>
            <br></br>
            <div className='row'>
                <div className="col-md-6">
                    { Fullname.atualizando ? 
                        (<button className='btn btn-primary' onClick={atualizar}><i className="pi pi-refresh"></i> Atualizar</button>) :
                        (<button className='btn btn-success' onClick={submit}><i className="pi pi-save"></i> Salvar</button>)}
                    <button className='btn btn-danger' onClick={cancelarLancamento}> <i className="pi pi-ban"></i> Cancelar</button>
                </div>
            </div>
        </Card>
    )

}

export default CadastroLancamentos