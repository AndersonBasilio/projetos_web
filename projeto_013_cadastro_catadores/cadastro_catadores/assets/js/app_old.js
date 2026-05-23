import { salvar } from "./formulario.js";

import {
    mostrarDashboard,
    mostrarCatadores,
    mostrarNovosCatadores
} from "./navegacao.js";

import {
    carregar,
    editar,
    excluir,
    limparBusca
} from "./tabela.js";

// GLOBAIS HTML
window.salvar = salvar;

window.mostrarDashboard = mostrarDashboard;

window.mostrarCatadores = mostrarCatadores;

window.mostrarNovosCatadores = mostrarNovosCatadores;

window.carregar = carregar;

window.editar = editar;

window.excluir = excluir;

window.limparBusca = limparBusca;

// INICIAR
window.onload = () => {

    carregar();

    mostrarDashboard();
};

// SAIR
function logout() {

    localStorage.removeItem("logado");

    localStorage.removeItem(
        "usuarioLogado"
    );

    window.location.href =
        "./login.html";
}

window.logout = logout;