"use strict"

document.addEventListener('DOMContentLoaded', () => {
    // ---- Corazón ----
    const btnCorazon = document.getElementById('opc-corazon');
    const imgEstados = ['img/iconos/comentarios-juego/icono-corazon.png', 'img/iconos/tarjetas-juegos/corazon-rosa.png'];
    let indice = 0;
    btnCorazon.addEventListener('click', () => {
        indice = (indice + 1) % imgEstados.length;
        btnCorazon.src = imgEstados[indice];
    });

    // ---- Botón Compartir ----
    const listaItemsCompartir = document.querySelector('#lista-items-compartir');
    const btnCompartir = document.querySelector('#btn-compartir-juego');
    btnCompartir.addEventListener('click', () => {
        listaItemsCompartir.classList.toggle('hidden');
    });
    
    // ---- Botón de instrucciones ----
    const btnInstrucciones = document.getElementById('opc-instrucciones');
    const btnCerrar = document.getElementById('btn-cerrar-instrucciones');
    const caja = document.getElementById('caja-instrucciones');
    
    btnInstrucciones.addEventListener('click', () => {
        caja.classList.toggle('visible');
    });

    btnCerrar.addEventListener('click', () => {
        caja.classList.remove('visible');
    });
});
    