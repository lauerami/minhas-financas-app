import React from 'react';
import Card from '../../components/card'
import FormGroup from '../../components/form-group';
import SelectMenu from '../../components/selectMenu';
import LancamentosTable from './lancamentosTable';
import {useState} from "react";
import * as lancamentoService from "../../app/service/lancamentoService";
import * as localstorageService from "../../app/service/localstorageService";
import * as messages from "../../components/toastr"

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

import { useNavigate } from "react-router-dom";


function ConsultaLancamentos() {

    const [ano, setAno] = useState("");
    const [mes, setMes] = useState("");
    const [tipo, setTipo] = useState("");
    const [lancamentos, setLancamentos] = useState([]);
    const [descricao, setDescricao] = useState("");
    const [confirmDialog, setConfirmDialog] = useState(false);
    const [lancamentoDeletar, setLancamentoDeletar] = useState({});

    const meses = lancamentoService.obterListaMeses();

    const tipos = lancamentoService.obterListaTipos();

    let navigate = useNavigate();

    const buscar = () => {

        if(!{ano}.ano){
            messages.mensagemErro('O preenchimento do campo Ano é obrigatório.')
            return false;
        }

        const usuarioLogado = localstorageService.obterItem('_usuario_logado')

        const lancamentoFiltro = {
            ano: {ano}.ano,
            mes: {mes}.mes,
            tipo: {tipo}.tipo,
            descricao: {descricao}.descricao,
            usuario: usuarioLogado.id
        }

        lancamentoService.consultar(lancamentoFiltro)
        .then( response => {
            setLancamentos(response.data)
            if(response.data.length < 1){
                messages.mensagemAlerta("Nenhum resultado encontrado.")
            }
        }).catch( error => {
            console.log(error)
        })
    
    }

    const editar = (id) => {
        navigate(`/cadastro-lancamentos/${id}`)
    }

    const abrirConfirmação = (lancamento) => {
        setConfirmDialog(true)
        setLancamentoDeletar(lancamento)
    }

    const cancelarDelecao = () => {
        setConfirmDialog(false)
        setLancamentoDeletar({})
    }

    const deletar = () => {
        lancamentoService.deletar(lancamentoDeletar.id)
        .then( response => {
            const newLancamentos = [...lancamentos];
            const index = lancamentos.findIndex((lanc) => lanc.id === lancamentoDeletar.id);
            newLancamentos.splice(index, 1);
            setLancamentos(newLancamentos);
            setConfirmDialog(false)
            messages.mensagemSuccesso('Lançamento deletado com sucesso!')
        }).catch( error =>{
            messages.mensagemErro("Ocorreu um erro ao tentar deletar lançamento.")
        })
    }

    const confirmDialogFooter = () => {
        return (
            <div>
                <Button label="Cancelar" icon="pi pi-times" onClick={cancelarDelecao} className="p-button-text" />
                <Button label="Confirmar" icon="pi pi-check" onClick={deletar} autoFocus />
            </div>
        );
    }

    const prepararCadastro = () => {
        navigate("/cadastro-lancamentos")
    }

    const alterarStatus = (lancamento, status) => {
        lancamentoService.alterarStatus(lancamento.id, status)
        .then( response => {
            const updateLancamentos = [...lancamentos];
            const index = updateLancamentos.findIndex((lanc) => lanc.id === lancamento.id);
            if(index !== -1){
                lancamento['status'] = status;
                updateLancamentos[index] = lancamento;
                setLancamentos(updateLancamentos);
            }
            messages.mensagemSuccesso("Status atualizado com sucesso!")
        })
    } 

    return(
        <Card title="Consulta Lançamentos">
            <div className='row'>
                <div className="col-lg-6">
                    <div className="bs-component">
                        <FormGroup label="Ano: *" htmlFor="inputAno">
                            <input type="text" className="form-control" id="inputAno" value={ano} onChange={e => setAno(e.target.value)} placeholder="Digite o Ano" />
                        </FormGroup>
                        <FormGroup label="Mês: " htmlFor="inputMes">
                            <SelectMenu id="inputMes" className="form-control" lista={meses} value={mes} onChange={e => setMes(e.target.value)} />
                        </FormGroup>
                        <FormGroup label="Descrição: " htmlFor="inputDesc">
                            <input type="text" className="form-control" id="inputDesc" value={descricao} onChange={e => setDescricao(e.target.value)} placeholder="Digite a descrição" />
                        </FormGroup>
                        <FormGroup label="Tipo Lançamento: " htmlFor="inputTipo">
                            <SelectMenu id="inputTipo" className="form-control" lista={tipos} value={tipo} onChange={e => setTipo(e.target.value)} />
                        </FormGroup>
                        <button type="button" onClick={buscar} className="btn btn-success"><i className="pi pi-search"></i> Buscar</button>
                        <button type="button" onClick={prepararCadastro} className="btn btn-danger"><i className="pi pi-plus"></i> Cadastrar</button>
                    </div>
                </div>
            </div>
            <br></br>
            <div className='row'>
                <div className="col-md-12">
                    <div className="bs-component">
                        <LancamentosTable lancamentos={lancamentos} deleteAction={abrirConfirmação} editAction={editar} alterarStatus={alterarStatus}></LancamentosTable>
                    </div>
                </div>
            </div>
            <div>
                <Dialog header="Confirmação" visible={confirmDialog} style={{ width: '50vw' }} footer={confirmDialogFooter} onHide={() => setConfirmDialog(false)}>
                    Confirma a exclusão deste Lançamento?
                </Dialog>
            </div>
        </Card>
    )

}

export default ConsultaLancamentos