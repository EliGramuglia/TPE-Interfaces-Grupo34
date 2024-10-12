"use strict"

document.addEventListener('DOMContentLoaded', () => {
    let listaItemsCompartir = document.querySelector('#lista-items-compartir');
    let btnCompartir = document.querySelector('#btn-compartir-juego');
    btnCompartir.addEventListener('click', () =>{
        listaItemsCompartir.classList.toggle('hidden');
    });
});
const botonCorazon = document.getElementById('opc-corazon');
const imgEstados = ['img/iconos/comentarios-juego/icono-corazon.png', 'img/iconos/tarjetas-juegos/corazon-rosa.png'];
let indice = 0;

botonCorazon.addEventListener('click', () => {
    indice = (indice + 1) % imgEstados.length;
    botonCorazon.src = imgEstados[indice];
});
