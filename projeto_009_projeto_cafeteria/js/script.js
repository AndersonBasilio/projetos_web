/* Logica de Programção
    [x] - Saber quando o usuário cliclou no botão.
    [] - Mudar o posionamento do modal
    [] - Fazer a Mascara ficar visivel
    [] - Quando clicar na mascara, fechar o modal

*/

const modal = document.querySelector(".modal");
const mascara = document.querySelector(".mascara-modal");


function mostrarModal(){
    modal.style.left = '50%';
    mascara.style.visibility = 'visible';
}

function esconderModal(){
    modal.style.left = '-70%';
    mascara.style.visibility = 'hidden';
}