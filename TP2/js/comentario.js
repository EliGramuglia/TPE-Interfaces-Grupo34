"use strict";


//Selecciona todas las estrellas
const estrellas = document.querySelectorAll('.estrella');

for (let i = 0; i < estrellas.length; i++) {
    //Añade un evento de escucha a cada estrella
    estrellas[i].addEventListener('click', function() {

        for (let j = 0; j < estrellas.length; j++) {
            if (j <= i) {
                //Cambia las estrellas anteriores a amarillas
                estrellas[j].src = "img/iconos/comentarios-juego/estrella-amarilla.png";
            } else {
                //Deja las estrellas posteriores a blanca
                estrellas[j].src = "img/iconos/comentarios-juego/estrella-blanca.png";
            }
        }
    });
}
