/*"use strict";

const sec5 = document.getElementById('contenedor-mas-amigos');
const personaje = document.querySelector('#personaje-0');
const textos = document.getElementsByClassName('texto-oculto');


//Rutas de las imágenes que se deben mostrar según el índice calculado (PERSONAJES)
const imagenes = [
    'img/number-blocks/sec_5_mas_amigos/img-0.png',
    'img/number-blocks/sec_5_mas_amigos/img-1.png',
    'img/number-blocks/sec_5_mas_amigos/img-2.png',
    'img/number-blocks/sec_5_mas_amigos/img-3.png',
    'img/number-blocks/sec_5_mas_amigos/img-4.png',
    'img/number-blocks/sec_5_mas_amigos/img-5.png',
    'img/number-blocks/sec_5_mas_amigos/img-6.png',
    'img/number-blocks/sec_5_mas_amigos/img-7.png',
    'img/number-blocks/sec_5_mas_amigos/img-8.png',
    'img/number-blocks/sec_5_mas_amigos/img-9.png',
    'img/number-blocks/sec_5_mas_amigos/img-10.png',
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
                // Añadir clase 'fixed' al personaje cuando se entra en la sección
                if (!personaje.classList.contains("imagen-fija")) {
                    personaje.classList.add("imagen-fija");
                }
    } else {
         // Si el usuario sale de la sección, eliminar la clase 'fixed'
         personaje.classList.remove("imagen-fija");
    }
})

//Calcula el índice de la imagen que se debe mostrar en base a la cantidad de píxeles desplazados
function calcularIndexParaImagen(cantPixelesScroll){
    const cambioImagen = 400; //A cuantos pixeles cambiar la imágen
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
}*/

"use strict";

// Selección de elementos
const sec5 = document.getElementById('contenedor-mas-amigos');
const contenedorMasAmigos = document.getElementById('contenedor-2-columnas');
const personaje = document.querySelector('#personaje-0');
const textos = document.getElementsByClassName('texto-oculto');

// Rutas de las imágenes que se deben mostrar según el índice calculado (PERSONAJES)
const imagenes = [
    'img/number-blocks/sec_5_mas_amigos/img-0.png',
    'img/number-blocks/sec_5_mas_amigos/img-1.png',
    'img/number-blocks/sec_5_mas_amigos/img-2.png',
    'img/number-blocks/sec_5_mas_amigos/img-3.png',
    'img/number-blocks/sec_5_mas_amigos/img-4.png',
    'img/number-blocks/sec_5_mas_amigos/img-5.png',
    'img/number-blocks/sec_5_mas_amigos/img-6.png',
    'img/number-blocks/sec_5_mas_amigos/img-7.png',
    'img/number-blocks/sec_5_mas_amigos/img-8.png',
    'img/number-blocks/sec_5_mas_amigos/img-9.png',
    'img/number-blocks/sec_5_mas_amigos/img-10.png',
];

// Listener para el evento scroll
window.addEventListener('scroll', () => {
    const sectionTop = sec5.offsetTop; // Obtiene la posición de la parte superior de la sección 
    const sectionHeight = sec5.offsetHeight; // Devuelve la altura total de la sección

    const scrollPosition = window.scrollY; // Desplazamiento actual de la página

    // Verifica si la sección está visible en el viewport.
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        const indiceActual = calcularIndexParaImagen(scrollPosition - sectionTop);
        cambiarTexto(indiceActual);
        cambiarImagen(indiceActual);
        console.log(indiceActual);
    }
});

// Calcula el índice de la imagen que se debe mostrar en base a la cantidad de píxeles desplazados
function calcularIndexParaImagen(cantPixelesScroll) {
    const cambioImagen = 500; // A cuantos píxeles cambiar la imagen
    let index = Math.floor(cantPixelesScroll / cambioImagen);

    if (index >= imagenes.length) {
        index = imagenes.length - 1;
    } else if (index < 0) {
        index = 0;
    }
    return index;
}

// Función para cambiar el texto 
function cambiarTexto(index) {
    for (let i = 0; i < textos.length; i++) {
        if (i === index) {
            textos[i].classList.add("texto-visible");
            textos[i].classList.remove("texto-oculto");
        } else {
            textos[i].classList.add("texto-oculto");
            textos[i].classList.remove("texto-visible");
        }
    }
}

// Función para cambiar la imagen
function cambiarImagen(index) {
    if (personaje.src !== imagenes[index]) {
        personaje.src = imagenes[index];

        if (index > 0 && index < 10) {
            personaje.classList.add("imagen-fija");
        } else if (index === 0 || index === 10) {
            personaje.classList.remove("imagen-fija");
        }
    }
}

// Crear un IntersectionObserver para observar cuando el contenedor entra en el viewport
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Si el contenedor entra en el viewport, hacer que la imagen sea fija
            personaje.classList.add('imagen-fija');
        } else {
            // Si el contenedor ya no está visible, quitar la clase 'imagen-fija'
            personaje.classList.remove('imagen-fija');
        }
    });
}, { threshold: 0.15}); // Umbral de visibilidad (0.1 significa que 10% del contenedor debe ser visible)

// Comienza a observar el contenedor sec5
observer.observe(sec5);