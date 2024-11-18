"use strict";

const sec5 = document.getElementById('contenedor-mas-amigos');
const personaje = document.querySelector('#personaje-0');
const textos = document.getElementsByClassName('texto-oculto');


//Rutas de las imágenes que se deben mostrar según el índice calculado (PERSONAJES)
const imagenes = [
    '/TP4/img/number-blocks/sec_5_mas_amigos/img-0.png',
    '/TP4/img/number-blocks/sec_5_mas_amigos/img-1.png',
    '/TP4/img/number-blocks/sec_5_mas_amigos/img-2.png',
    '/TP4/img/number-blocks/sec_5_mas_amigos/img-3.png',
    '/TP4/img/number-blocks/sec_5_mas_amigos/img-4.png',
    '/TP4/img/number-blocks/sec_5_mas_amigos/img-5.png',
    '/TP4/img/number-blocks/sec_5_mas_amigos/img-6.png',
    '/TP4/img/number-blocks/sec_5_mas_amigos/img-7.png',
    '/TP4/img/number-blocks/sec_5_mas_amigos/img-8.png',
    '/TP4/img/number-blocks/sec_5_mas_amigos/img-9.png',
    '/TP4/img/number-blocks/sec_5_mas_amigos/img-10.png',
];

//Listener para el evento scroll (Este evento está escuchando cuando el usuario hace scroll en la página)
window.addEventListener('scroll', () => {
    const sectionTop = sec5.offsetTop; //obtiene la posición de la parte superior de la sección 
    const sectionHeight = sec5.offsetHeight; //devuelve la altura total de la sección

    //Cant de píxeles que el usuario ha desplazado desde la parte superior de la página
    const scrollPosition = window.scrollY;

    // Verifica si la sección está visible en el viewport.
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) { //Si el usuario está dentro de la sección
        const indiceActual = calcularIndexParaImagen(scrollPosition - sectionTop);
        cambiarTexto(indiceActual);
        cambiarImagen(indiceActual);
        console.log(indiceActual);
    }
})

//Calcula el índice de la imagen que se debe mostrar en base a la cantidad de píxeles desplazados
function calcularIndexParaImagen(cantPixelesScroll){
    const cambioImagen = 500; //A cuantos pixeles cambiar la imágen
    let index = Math.floor(cantPixelesScroll / cambioImagen);

    if(index >= imagenes.length) { //Si el index es mayor, entonces lo ajusto (para mostrar efectivamente una imágen SIEMPRE)
        index = imagenes.length - 1;
    } else if (index < 0) {
        index = 0;
    }
    return index;
}

//Función para cambiar el texto 
function cambiarTexto(index) {
    for (let i = 0; i < textos.length; i++) {
        if (i === index) { //Si el índice del texto coincide con el índice actual le agrega display block
            textos[i].classList.add("texto-visible");
            textos[i].classList.remove("texto-oculto");
        } else {
            textos[i].classList.add("texto-oculto");
            textos[i].classList.remove("texto-visible");
        }
    }
}

//Función para cambiar el texto 
function cambiarImagen(index) {
    if (personaje.src !== imagenes[index]) {
        personaje.src = imagenes[index];

        if(index > 0 && index < 10) {
        personaje.classList.add("imagen-fija");
        } else if (index === 0 || index === 10){
            personaje.classList.remove("imagen-fija");
        }
    }
}