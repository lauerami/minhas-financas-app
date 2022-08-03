
export const adicionarItem = (chave, valor) => {
    localStorage.setItem(chave, JSON.stringify(valor))
};

export const obterItem = (chave) => {
    const item = localStorage.getItem(chave)
    return JSON.parse(item)
};

export const removerItem = (chave) => {
    localStorage.removeItem(chave)
}