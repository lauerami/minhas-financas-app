import httpMethods from "../apiservice";
import ErroValidacao from "../exception/errovalidacao";

export const autenticar = async (email, senha) => {
    const response = await httpMethods.post("/api/usuarios/autenticar", {'email': email, 'senha': senha });
    return (response);
};

export const obterSaldoPorUsuario = async (id) => {
    const response = await httpMethods.get(`/api/usuarios/${id}/saldo`);
    return (response);
};

export const salvar = async (usuario) => {
    const response = await httpMethods.post("/api/usuarios", usuario);
    return (response)
}

export const validar = (usuario) => {
    const erros = []

    if(!usuario.nome){
        erros.push("O campo Nome é obrigatório.")
    }

    if(!usuario.email){
        erros.push("O campo Email é obrigatório.")
    }else if( !usuario.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)){
        erros.push("Informe um email válido.")
    }

    if(!usuario.senha || !usuario.senhaRepeticao){
        erros.push("Digite a senha 2x.")
    }else if(usuario.senha !== usuario.senhaRepeticao){
        erros.push("As senhas não batem.")
    }

    if(erros && erros.length > 0){
        throw new ErroValidacao(erros);
    }
}