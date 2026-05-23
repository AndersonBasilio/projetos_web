import {
    atualizarCards,
    atualizarGrafico
} from "./dashboard.js";

import { carregar } from "./tabela.js";

export function mostrarDashboard() {

    document.getElementById("dashboard").style.display = "flex";

    document.getElementById("cards").style.display = "grid";

    document.getElementById("formulario").style.display = "none";

    document.getElementById("tabela-container").style.display = "none";

    atualizarCards();

    atualizarGrafico();
}

export function mostrarCatadores() {

    document.getElementById("dashboard").style.display = "none";

    document.getElementById("cards").style.display = "none";

    document.getElementById("formulario").style.display = "none";

    document.getElementById("tabela-container").style.display = "block";

    // LIMPA A BUSCA
    document.getElementById("busca").value = "";

    carregar();
}

export function mostrarNovosCatadores() {

    document.getElementById("dashboard").style.display = "none";

    document.getElementById("cards").style.display = "none";

    document.getElementById("formulario").style.display = "block";

    document.getElementById("tabela-container").style.display = "none";
}