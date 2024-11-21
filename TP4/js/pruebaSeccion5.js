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


/*"use strict";
const scrollingImagen = document.querySelector('.imagen-sticky');
const textos = document.querySelectorAll('.texto-scrollear > div'); //Selecciona todos los textos


//IntersectionObserver detecta cuándo un elemento entra o sale del viewport
const observerCols2 = new IntersectionObserver((entries) => {
    //Entries es un array que guarda info de los elementos observados y su estado de visibilidad
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
        const index = Array.from(textos).indexOf(entry.target); // Índice del párrafo actual
  
        // Generamos el id de la imagen correspondiente al índice del párrafo
        const currentImageId = `personaje-${index}`; // Genera el id de la imagen
  
        // Obtenemos todas las imágenes dentro del contenedor 'imagen-sticky'
        const allImages = scrollingImagen.querySelectorAll('img'); 
  
        // Ocultamos todas las imágenes
        allImages.forEach(img => {
          img.classList.remove('visible'); // Eliminar clase visible
          img.classList.add('oculta'); // Asegurarnos de que las otras imágenes estén ocultas
        });
  
        // Obtenemos la imagen correspondiente a través de su id
        const currentImage = scrollingImagen.querySelector(`#${currentImageId}`); 
  
        // Mostramos solo la imagen correspondiente
        if (currentImage && !currentImage.classList.contains('visible')) {
          currentImage.classList.remove('oculta'); // Asegurarnos de que no tenga la clase 'oculta'
          currentImage.classList.add('visible');  // Mostrar la imagen correspondiente
        }
      }
    });
  }, { threshold: 0.8 }); // Ajustamos el umbral de visibilidad al 80%
  
  // Observamos todos los párrafos
  textos.forEach(paragraph => {
    observerCols2.observe(paragraph);
  });*/











window.addEventListener('scroll', () => {
    console.log(window.scrollY);

    //En 4100 queda la imagen fija
    const scroll = window.scrollY;
    const img = document.getElementById('personaje-0');
    if(scroll >= 4100){
        img.classList.add('fija');
  
    } else {
        img.classList.remove('fija');
    }

});