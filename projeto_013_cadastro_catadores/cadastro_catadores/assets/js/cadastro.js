function cadastrarUsuario() {

    const usuario =
        document.getElementById("novoUsuario")
            .value
            .trim();

    const senha =
        document.getElementById("novaSenha")
            .value
            .trim();

    const erro =
        document.getElementById("erro");

    erro.innerText = "";

    if (!usuario || !senha) {

        erro.innerText =
            "Preencha todos os campos";

        return;
    }

    const usuarios =
        JSON.parse(
            localStorage.getItem("usuarios")
        ) || [];

    const existe =
        usuarios.find(u =>
            u.usuario.toLowerCase()
            === usuario.toLowerCase()
        );

    if (existe) {

        erro.innerText =
            "Usuário já existe";

        return;
    }

    usuarios.push({
        usuario,
        senha
    });

    localStorage.setItem(
        "usuarios",
        JSON.stringify(usuarios)
    );

    alert("Usuário cadastrado!");

    window.location.href =
        "./login.html";
}

window.cadastrarUsuario =
    cadastrarUsuario;