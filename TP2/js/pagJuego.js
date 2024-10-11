"use strict"

let listaItemsCompartir = document.querySelector('#lista-items-compartir');
let btnCompartir = document.querySelector('#btn-compartir-juego');
btnCompartir.addEventListener('click', () =>{
    listaItemsCompartir.classList.toggle('hidden');
});
