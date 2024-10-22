/*
OBJETIVO - Quando clicar no pokedev da listagem temos que esconder o cartão do pokeved aberto e mostrar o cartão correspondente ao que foi selecionado na listagem.
    PASSO 1 - Precisamos criar uma variavel no JS pra trabalhar com a listagem de pokedeves
    PASSO 2 - Identificar o evento de clique no elemento da listagem
    PASSO 3 - Remover a classe aberto so do cartão que esta aberto
    PASSO 4 - Ao clicar em um pokedev da lista pegamos o id desse pokedev para saber qual cartao abrir.
    PASSO 5 - Remover a classe ativa que marca o pokedev selecionado na listagem
    PASSO 6 - adicionar a classe ativo no pokedev selecionado na listagem.
*/

//Função main
function main(){
    const listaSelecaoPokedevs = criarPokedevs();
    identificarclick(listaSelecaoPokedevs); 
}


/*PASSO 1 - Precisamos criar uma variavel no JS pra trabalhar com a listagem de pokedeves*/

function criarPokedevs(){
    let listaSelecaoPokedevs = document.querySelectorAll('.pokedev');
    console.log(listaSelecaoPokedevs);
    return listaSelecaoPokedevs;
}

//PASSO 2 - Identificar o evento de clique no elemento da listagem
function identificarclick(lista){
    for (let contador = 0; contador < lista.length; contador++) {
        lista[contador].addEventListener("click", (event) => {
            // PASSO 3 - Remover a classe 'aberto' só do cartão que está aberto.
            let cartaoPokedevAberto = document.querySelector('.aberto');
            if (cartaoPokedevAberto) {
                cartaoPokedevAberto.classList.remove('aberto');
            }

            // Passa o elemento clicado para a função que irá abrir o novo cartão
            mostrarNovoPokedev(event.currentTarget);

            // Marcar o pokedev atual como ativo
            ativarPokedev();// Remove a classe 'ativo' do pokedev atual, se houver
            marcarPokedevListagem(event.currentTarget); // Marca o pokedev clicado como ativo
        });
    }
}

function mostrarNovoPokedev(pokedev){
        // PASSO 4 - Ao clicar em um pokedev da lista, pegamos o id desse pokedev para saber qual cartão abrir.
        let idPokedevSelecionado = pokedev.getAttribute('id');
        let idCartaoPokedevParaAbrir = `cartao_${idPokedevSelecionado}`;
        let cartaoPokedevParaAbrir = document.getElementById(idCartaoPokedevParaAbrir);
    
        // Verifica se o cartão correspondente existe e adiciona a classe 'aberto'
        if (cartaoPokedevParaAbrir) {
            cartaoPokedevParaAbrir.classList.add('aberto');
        } 
}

//PASSO 5 - Remover a classe ativa que marca o pokedev selecionado na listagem
function ativarPokedev(){
    let pokedevAtivoNaListagem = document.querySelector('.ativo');
    if (pokedevAtivoNaListagem) {
        pokedevAtivoNaListagem.classList.remove('ativo');
    }   
}

function marcarPokedevListagem(pokedev) {
    // Adiciona a classe 'ativo' ao pokedev que foi clicado
    pokedev.classList.add('ativo');
}

main();