import {
    catadores,
    atualizarCatadores
} from "./dados.js";

import { salvarLocalStorage } from "./storage.js";

import { mostrarNovosCatadores } from "./navegacao.js";

export function carregar() {

    const tabela =
        document.getElementById("tabela");

    const busca =
        document.getElementById("busca")
            .value
            .trim();

    tabela.innerHTML = "";

    let filtrados = catadores;

    // FILTRO CPF
    if (busca) {

        if (busca) {

            filtrados = catadores.filter(c =>
                c.cpf
                    .replace(/\D/g, '')
                    .includes(
                        busca.replace(/\D/g, '')
                    )
            );
        }
    }

    filtrados.forEach(c => {

        tabela.innerHTML += `
            <tr>
                <td>${c.nome}</td>

                <td>${c.cpf}</td>

                <td>${c.status}</td>

                <td>
                    <button
                        class="btn-edit"
                        onclick="editar(${c.id})"
                    >
                        Editar
                    </button>

                    <button
                        class="btn-delete"
                        onclick="excluir(${c.id})"
                    >
                        Excluir
                    </button>
                </td>
            </tr>
        `;
    });
}

export function limparBusca() {

    document.getElementById("busca").value = "";

    carregar();
}

export function editar(id) {

    const c =
        catadores.find(c => c.id == id);

    document.getElementById("id").value = c.id;

    document.getElementById("nome").value = c.nome;

    document.getElementById("cpf").value = c.cpf;

    document.getElementById("data").value = c.data;

    document.getElementById("telefone").value = c.telefone;

    document.getElementById("endereco").value = c.endereco;

    document.getElementById("status").value = c.status;

    mostrarNovosCatadores();
}

export function excluir(id) {

    if (!confirm("Deseja excluir?")) return;

    const novos =
        catadores.filter(c => c.id != id);

    atualizarCatadores(novos);

    salvarLocalStorage();

    carregar();
}