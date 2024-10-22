//Função principal
function carregar(){
    pular()
    acabarJogo()
    
}

//Função para pular
function pular(){
    const mario = document.querySelector('.mario');
    const jump = () => {
        //Adicionando o evendo pulo no elemento mario
        if(!mario.classList.contains('jump')){
            mario.classList.add('jump');
            setTimeout(() => {
                mario.classList.remove('jump')
            }, 500);
        }
    }
    //Adiciona evento para ver se alguma tecla foi pressionada
    document.addEventListener('keydown', jump);      
     
}

//Função gamer Over
function acabarJogo(){
    const mario = document.querySelector('.mario');
    const pipe = document.querySelector('.pipe');
    const clouds = document.querySelector('.clouds');
    const loop = setInterval(() => {
        const posicaoPipe = parseInt(window.getComputedStyle(pipe).left);
        const posicaoMario = parseInt(window.getComputedStyle(mario).bottom);
        const posicaoClouds = parseInt(window.getComputedStyle(clouds).bottom);
        if(posicaoPipe <= 99 && posicaoPipe > 0 && posicaoMario < 80){
            //Parando o pipe
            pipe.style.animation = 'none';
            pipe.style.left = `${posicaoPipe}px`; 

            //Parando a posção do mario
            mario.style.animation = 'none';
            mario.style.bottom = `${posicaoMario}px`;

            //Mudando a imagem para Game Over
            mario.src = 'img/game-over.png';

            //Mudando o tamanho
            mario.style.width = '50px';
            mario.style.marginLeft = '60px';

            //Parando as nuvéns
            clouds.style.animation = 'none';
            clouds.style.left = `${posicaoClouds}px`;


            //Parar o Loop do jogo
            clearInterval(loop);           
        }
    }, 10)
}