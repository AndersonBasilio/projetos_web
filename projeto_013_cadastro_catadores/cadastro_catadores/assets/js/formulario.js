import {
    catadores,
    atualizarCatadores
} from "./dados.js";

import { salvarLocalStorage } from "./storage.js";

import {
    validarCPF,
    formatarCPF
} from "./validacoes.js";

import { mostrarCatadores } from "./navegacao.js";

import { carregar } from "./tabela.js";

export function salvar() {

    const id = document.getElementById("id").value;

    const catador = {
        id: id ? id : Date.now(),

        nome: document.getElementById("nome").value,

        cpf: formatarCPF(document.getElementById("cpf").value),

        data: document.getElementById("data").value,

        telefone: document.getElementById("telefone").value,

        endereco: document.getElementById("endereco").value,

        status: document.getElementById("status").value
    };

    if (!catador.nome || !catador.cpf) {
        alert("Nome e CPF obrigatórios");
        return;
    }

    if (!validarCPF(catador.cpf)) {
        alert("CPF inválido");
        return;
    }

    const cpfLimpo = catador.cpf.replace(/\D/g, '');

    const cpfExistente = catadores.find(c =>

        c.cpf.replace(/\D/g, '') === cpfLimpo

        && c.id != id
    );

    if (cpfExistente) {

        alert("CPF já cadastrado!");

        return;
    }

    const nomeExistente = catadores.find(c =>

        c.nome.trim().toLowerCase() ===
        catador.nome.trim().toLowerCase()

        && c.id != id
    );

    if (nomeExistente) {

        alert("Nome já cadastrado!");

        return;
    }

    let novosCatadores;

    if (id) {

        novosCatadores = catadores.map(c =>
            c.id == id ? catador : c
        );

    } else {

        novosCatadores = [
            ...catadores,
            catador
        ];
    }

    atualizarCatadores(novosCatadores);

    salvarLocalStorage();

    limparFormulario();

    carregar();

    mostrarCatadores();
}

export function limparFormulario() {

    document.getElementById("id").value = "";

    document.getElementById("nome").value = "";

    document.getElementById("cpf").value = "";

    document.getElementById("data").value = "";

    document.getElementById("telefone").value = "";

    document.getElementById("endereco").value = "";

    document.getElementById("status").value = "Ativo";
}