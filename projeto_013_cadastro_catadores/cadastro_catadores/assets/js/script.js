// 🔹 LISTA LOCAL
let catadores = JSON.parse(localStorage.getItem("catadores")) || [];
let grafico;

// 🔹 SALVAR (CRIAR OU EDITAR)
function salvar() {
    const id = document.getElementById("id").value;

    const catador = {
        id: id ? id : Date.now(),
        nome: document.getElementById("nome").value,
        cpf: document.getElementById("cpf").value,
        data: document.getElementById("data").value,
        telefone: document.getElementById("telefone").value,
        endereco: document.getElementById("endereco").value,
        status: document.getElementById("status").value
    };

    // 🚨 VALIDAÇÃO BÁSICA
    if (!catador.nome || !catador.cpf) {
        alert("Nome e CPF são obrigatórios!");
        return;
    }

    // 🚨 NÃO PERMITIR CPF DUPLICADO
    const cpfExistente = catadores.find(c => c.cpf === catador.cpf && c.id != id);
    if (cpfExistente) {
        alert("CPF já cadastrado!");
        return;
    }

    if (id) {
        // EDITAR
        catadores = catadores.map(c => c.id == id ? catador : c);
    } else {
        // NOVO
        catadores.push(catador);
    }

    localStorage.setItem("catadores", JSON.stringify(catadores));

    limparFormulario();
    carregar();
    mostrarCatadores();
}

// 🔹 LIMPAR FORMULÁRIO
function limparFormulario() {
    document.getElementById("id").value = "";
    document.getElementById("nome").value = "";
    document.getElementById("cpf").value = "";
    document.getElementById("data").value = "";
    document.getElementById("telefone").value = "";
    document.getElementById("endereco").value = "";
    document.getElementById("status").value = "Ativo";

    document.getElementById("titulo-form").innerText = "Cadastrar Novo Catador";
}

// 🔹 CARREGAR TABELA + FILTRO
function carregar() {
    const tabela = document.getElementById("tabela");
    const busca = document.getElementById("busca").value;

    tabela.innerHTML = "";

    let filtrados = catadores;

    if (busca) {
        filtrados = catadores.filter(c => c.cpf.includes(busca));
    }

    filtrados.forEach(c => {
        tabela.innerHTML += `
            <tr>
                <td>${c.nome}</td>
                <td>${c.cpf}</td>
                <td>${c.status}</td>
                <td>
                    <button class="btn-edit" onclick="editar(${c.id})">Editar</button>
                    <button class="btn-delete" onclick="excluir(${c.id})">Excluir</button>
                </td>
            </tr>
        `;
    });

    atualizarCards();
    atualizarGrafico();
}

// 🔹 EDITAR
function editar(id) {
    const c = catadores.find(c => c.id == id);

    document.getElementById("id").value = c.id;
    document.getElementById("nome").value = c.nome;
    document.getElementById("cpf").value = c.cpf;
    document.getElementById("data").value = c.data;
    document.getElementById("telefone").value = c.telefone;
    document.getElementById("endereco").value = c.endereco;
    document.getElementById("status").value = c.status;

    document.getElementById("titulo-form").innerText = "Editar Catador";

    mostrarNovosCatadores(false);
}

// 🔹 EXCLUIR
function excluir(id) {
    if (!confirm("Deseja excluir este catador?")) return;

    catadores = catadores.filter(c => c.id != id);

    localStorage.setItem("catadores", JSON.stringify(catadores));

    carregar();
}

// 🔹 LIMPAR BUSCA
function limparBusca() {
    document.getElementById("busca").value = "";
    carregar();
}

// 🔹 CARDS (TOTAL / ATIVOS / INATIVOS)
function atualizarCards() {
    const total = catadores.length;
    const ativos = catadores.filter(c => c.status === "Ativo").length;
    const inativos = catadores.filter(c => c.status === "Inativo").length;

    document.getElementById("total").innerText = total;
    document.getElementById("ativos").innerText = ativos;
    document.getElementById("inativos").innerText = inativos;
}

// 🔹 GRÁFICO
function atualizarGrafico() {
    const ativos = catadores.filter(c => c.status === "Ativo").length;
    const inativos = catadores.filter(c => c.status === "Inativo").length;

    const ctx = document.getElementById("graficoPizza").getContext("2d");

    if (grafico) {
        grafico.destroy();
    }

    grafico = new Chart(ctx, {
        type: "pie",
        data: {
            labels: ["Ativos", "Inativos"],
            datasets: [{
                data: [ativos, inativos],
                backgroundColor: ["#22c55e", "#ef4444"]
            }]
        }
    });
}

// 🔹 NAVEGAÇÃO
/*function mostrarDashboard() {
    document.getElementById("dashboard").style.display = "block";
    document.getElementById("cards").style.display = "grid";

    document.getElementById("formulario").style.display = "none";
    document.getElementById("tabela-container").style.display = "none";
}*/



function mostrarCatadores() {
    document.getElementById("dashboard").style.display = "none";
    document.getElementById("cards").style.display = "none";

    document.getElementById("formulario").style.display = "none";
    document.getElementById("tabela-container").style.display = "block";

    carregar();
}

function mostrarDashboard() {
    document.getElementById("dashboard").style.display = "flex";
    document.getElementById("cards").style.display = "grid";

    document.getElementById("formulario").style.display = "none";
    document.getElementById("tabela-container").style.display = "none";

    atualizarCards();
    atualizarGrafico();
}

/*function mostrarNovosCatadores() {
    document.getElementById("dashboard").style.display = "none";
    document.getElementById("cards").style.display = "none";

    document.getElementById("formulario").style.display = "block";
    document.getElementById("tabela-container").style.display = "none";

    limparFormulario();
}*/

function mostrarNovosCatadores(limpar = true) {
    document.getElementById("dashboard").style.display = "none";
    document.getElementById("cards").style.display = "none";

    document.getElementById("formulario").style.display = "block";
    document.getElementById("tabela-container").style.display = "none";

    if (limpar) {
        limparFormulario();
    }
}

// 🔹 INICIAR SISTEMA
function iniciarSistema() {
    carregar();
    mostrarDashboard();
    atualizarGrafico();
}

function salvarEdicao(id) {
    const nome = document.getElementById(`nome-${id}`).value;
    const cpf = document.getElementById(`cpf-${id}`).value;
    const status = document.getElementById(`status-${id}`).value;

    // validação
    if (!nome || !cpf) {
        alert("Preencha Nome e CPF!");
        return;
    }

    // verificar CPF duplicado
    const duplicado = catadores.find(c => c.cpf === cpf && c.id != id);
    if (duplicado) {
        alert("CPF já existe!");
        return;
    }

    catadores = catadores.map(c => {
        if (c.id == id) {
            return { ...c, nome, cpf, status };
        }
        return c;
    });

    localStorage.setItem("catadores", JSON.stringify(catadores));

    carregar();
}

// 🔹 EXECUTA AO CARREGAR A PÁGINA
window.onload = iniciarSistema;