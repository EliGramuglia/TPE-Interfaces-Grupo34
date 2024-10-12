"use strict";

document.addEventListener('DOMContentLoaded', () => {
    class Imagen {
        constructor(titulo, categoria, img) {
            this.titulo = titulo;
            this.categoria = categoria;
            this.img = img;
        }
    }

    const juegos = [
        new Imagen('Super Mario Bros', 'Juegos clásicos', 'super-mario-bros.jpg'),
    ];

    // Contenedor de imagen hero
    const imagenHero = document.querySelector('#imagen-hero');

    // Flechas
    const flechaIzq = document.querySelector('.hero-flecha-izquierda');
    const flechaDer = document.querySelector('.hero-flecha-derecha');
    imagenHero.addEventListener('mouseenter', () => {
        flechaIzq.classList.add('visible');
        flechaDer.classList.add('visible');
    });
    imagenHero.addEventListener('mouseleave', () => {
        flechaIzq.classList.remove('visible');
        flechaDer.classList.remove('visible');
    });

    // Generación de imagen hero
    const titulo = document.querySelector('#info-juego h1');
    const categoria = document.querySelector('#info-juego p');
    const frecuencia = 6000; // Frecuencia de cambio en milisegundos
    const cantidadJuegos = juegos.length;

    let i = 0;
    const intervalo = setInterval(() => {
        if (i >= cantidadJuegos) {
            i = 0;
        } 
        titulo.textContent = juegos[i].titulo
        categoria.textContent = juegos[i].titulo;
        i++;
    }, frecuencia);
    
    
});