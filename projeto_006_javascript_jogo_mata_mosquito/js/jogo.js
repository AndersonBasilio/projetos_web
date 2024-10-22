//Dessa forma as variavéis ficam no escopo global podendo ser acessada dentro da função
var altura = 0;
var largura = 0;
var vidas = 1;
var tempo = 15;
var cria_mosquito_tempo = 1500;

var nivel = window.location.search;
nivel = nivel.replace('?', '');

//Logica do Nivel do jogo.
if(nivel === 'normal'){    
    var cria_mosquito_tempo = 1500;

} else if(nivel === 'dificil'){    
    var cria_mosquito_tempo = 1000;

} else if(nivel === 'hard'){    
    var cria_mosquito_tempo = 750;
}

//Criando a função para iniciar jogo.
function iniciar_jogo(){
    var nivel =  document.getElementById('nivel').value;
if(nivel === ''){
    alert('Nível vazio, por favor selecione um nível para iniciar o jogo.');

    //return false para que a lógica seja finalizada neste ponto
    return false;
}

    window.location.href = 'app.html?' + nivel;
}

//Criando função ajusta para ajusta tamanho do palco.
function ajusta_tamanho_palco_jogo(){
    //Para saber a altura da página
    altura = window.innerHeight;
    //Para saber a largura da página
    largura = window.innerWidth;

    console.log(largura, altura);
}

//Chamando a função ajustando tamanho do palco do jogo.
ajusta_tamanho_palco_jogo();

//Criando cronometro
var cronometro = setInterval(function(){
    tempo -= 1;

    //Verificando se o tempo e menor que zero
    if(tempo < 0){
        clearInterval(cronometro);
        clearInterval(cria_mosquito);

        //Inserindo a página de vitória se matar os mosquitos
        window.location.href = 'you_win.html'
    } else {
        
        //Inserindo o cronometro na página do jogo.
        document.getElementById('cronometro').innerHTML = tempo;
        
    }    
}, 1000);

//Criamos essa função pois o HTML tem ordem de precedencia chamamos no final da página.
function posicao_randomica(){

    //Removendo o mosquito anterior caso exista.
    if(document.getElementById('mosquito')){
        document.getElementById('mosquito').remove();

        //Removendo as vidas do jogo
        if(vidas > 3){
            //Irá carregar a página fim do jogo
            window.location.href = 'game_over.html';
            
        } else {
            document.getElementById('v' + vidas).src = "imagens/coracao_vazio.png";
            vidas++;
        }
    }

    //Rondomizando as posições da janela, com Math.floor fazemos o arredondamento para baixo.
    //Diminuimos o tamanho para que não utrapasse a largura e altura da página.
    var posicao_x = Math.floor(Math.random() * largura) - 90;
    var posicao_y = Math.floor(Math.random() * altura) - 90;

    //Se posicão x for menor que 0 recebe ela mesmo
    posicao_x = posicao_x < 0 ? 0 : posicao_x;
    //Se posicão y for menor que 0 recebe ela mesmo
    posicao_y = posicao_y < 0 ? 0 : posicao_y;

    console.log(posicao_x, posicao_y);

    //Criando o elemento HTML de forma programatica.
    var mosquito = document.createElement('img');
    //Adicionando a imagem do mosquito na página.
    mosquito.src = 'imagens/mosquito.png';

    //Dessa foma atribuimos a classe desejada
    //Temos que deixar um espaço para ser interpredado que são de formas diferentes.
    mosquito.className = tamanho_aleatorio_mosquito() + ' ' + lado_aleatorio();

    //Acessando os elementos atributos de estilo.
    //Esquerda.
    mosquito.style.left = posicao_x + 'px';
    //Topo
    mosquito.style.top = posicao_y + 'px';
    //Posição sendo absoluta
    mosquito.style.position = 'absolute';
    //Limpando os mosquitos da tela do navegador.
    mosquito.id = 'mosquito'
    mosquito.onclick = function() {
        this.remove();
        //Iniciando as contagem dos mosquitos mortos.
        mosquito_mortos++
        console.log("Mosquitos mortos = " + mosquito_mortos)
    }

    //Dessa forma adicionamos no body.
    document.body.appendChild(mosquito);


}

//Criando a função tamanho aleatório dos mosquitos
function tamanho_aleatorio_mosquito() {
    var classe = Math.floor(Math.random() * 3);
    if(classe == 0){
        return 'mosquito1';

    } else if(classe == 1){
       return  'mosquito2';

    } else {
        return 'mosquito3';
    }

}

//Função criada para colocar o lado do mosquito aleatório.
function lado_aleatorio(){
    var classe = Math.floor(Math.random() * 2);
    if (classe == 0) {
        return 'lado_a'
    } else {
        return 'lado_b'
    }
}