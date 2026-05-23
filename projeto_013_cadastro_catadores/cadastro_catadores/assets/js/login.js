function login() {

    const usuario =
        document.getElementById("usuario")
            .value
            .trim();

    const senha =
        document.getElementById("senha")
            .value
            .trim();

    const usuarios =
        JSON.parse(
            localStorage.getItem("usuarios")
        ) || [];

    const usuarioEncontrado =
        usuarios.find(u =>

            u.usuario === usuario
            &&
            u.senha === senha
        );

    if (usuarioEncontrado) {

        localStorage.setItem(
            "logado",
            "true"
        );

        localStorage.setItem(
            "usuarioLogado",
            usuario
        );

        window.location.href =
            "./index.html";

    } else {

        document.getElementById("erro")
            .innerText =
            "Usuário ou senha inválidos";
    }
}

window.login = login;