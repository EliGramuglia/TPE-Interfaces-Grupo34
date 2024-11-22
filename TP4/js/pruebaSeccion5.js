"use strict";
const scrollingImagen = document.querySelector('.columna-imagenes');
const textos = document.querySelectorAll('.columna-texto > div'); //Selecciona todos los textos

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
          img.classList.add('oculta'); // Asegurarnos de que las otras imágenes estén ocultas
        });

        // Obtenemos la imagen correspondiente a través de su id
        const currentImage = scrollingImagen.querySelector(`#${currentImageId}`); 

        // Mostramos solo la imagen correspondiente
        if (currentImage && currentImage.classList.contains('oculta')) {
          currentImage.classList.remove('oculta'); // Asegurarnos de que no tenga la clase 'oculta'
        }
      }
    });
  }, { threshold: 0.8 }); // Ajustamos el umbral de visibilidad al 80%

  // Observamos todos los párrafos
  textos.forEach(paragraph => {
    observerCols2.observe(paragraph);
  });