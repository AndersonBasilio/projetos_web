export let catadores = JSON.parse(localStorage.getItem("catadores")) || [];

export function atualizarCatadores(novosDados) {
    catadores = novosDados;
}