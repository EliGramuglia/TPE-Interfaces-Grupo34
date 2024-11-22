"use strict";
const scrollingImagen = document.querySelector('.columna-imagenes');
const personajes = [
    document.querySelector('#personaje-0'),
    document.querySelector('#personaje-1'),
    document.querySelector('#personaje-2'),
    document.querySelector('#personaje-3'),
    document.querySelector('#personaje-4'),
    document.querySelector('#personaje-5'),
    document.querySelector('#personaje-6'),
    document.querySelector('#personaje-7'),
    document.querySelector('#personaje-8'),
    document.querySelector('#personaje-9'),
    document.querySelector('#personaje-10')
];

personajes.forEach((personaje, index) => {
    if (index !== 0) {
        personaje.classList.add('oculto');
    }
});

const textos = document.querySelectorAll('.columna-texto > div'); //Selecciona todos los textos

window.addEventListener('scroll', () => {
    const puntoMedioY = window.innerHeight / 2;

    // Iteramos sobre los textos
    for (let i = 0; i < textos.length; i++) {
        const textoTop = textos[i].getBoundingClientRect().top;
        const textoBottom = textos[i].getBoundingClientRect().bottom;

        // Si el texto está en la mitad visible de la ventana, mostramos la imagen correspondiente
        if (textoTop < (puntoMedioY - 200) && textoBottom > (puntoMedioY + 200)) {
            // Ocultamos todos los personajes
            personajes.forEach(personaje => personaje.classList.add('oculto'));

            // Mostramos el personaje correspondiente
            personajes[i].classList.remove('oculto');
        }
    }
});