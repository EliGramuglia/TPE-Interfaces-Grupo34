"use strict";

document.addEventListener('DOMContentLoaded', () => {
    class Juego {
        constructor(titulo, categoria, img) {
            this.titulo = titulo;
            this.categoria = categoria;
            this.img = img;
        }
    }

    const juegos = [
        new Juego('Bloxd.io', 'Juegos de aventura', 'bloxd-io.jpeg'),
        new Juego('Alien Hominid', 'Juegos de acción', 'alien-hominid.jpg'),
        new Juego('Among Us', 'Juegos multijugador', 'among-us.webp'),
        new Juego('Super Mario Bros', 'Juegos clásicos', 'super-mario-bros.jpg'),
    ];

    // Contenedor de imagen hero
    const sectionHero = document.querySelector('#imagen-hero');

    // Flechas
    const flechaIzq = document.querySelector('.hero-flecha-izquierda');
    const flechaDer = document.querySelector('.hero-flecha-derecha');
    sectionHero.addEventListener('mouseenter', () => {
        flechaIzq.classList.add('visible');
        flechaDer.classList.add('visible');
    });
    sectionHero.addEventListener('mouseleave', () => {
        flechaIzq.classList.remove('visible');
        flechaDer.classList.remove('visible');
    });

    // Tiempo de espera antes de activar la animación
    setTimeout(() => {
        animarHero();
    }, 7000);

    function animarHero() {
        // Generación de imagen hero
        const titulo = document.querySelector('#info-juego h1');
        const categoria = document.querySelector('#info-juego p');
        const frecuencia = 10000; // Frecuencia de cambio en milisegundos
        const cantidadJuegos = juegos.length;

        let i = 0;
        const intervalo = setInterval(() => {
            if (i >= cantidadJuegos) {
                i = 0;
            }
            titulo.textContent = juegos[i].titulo
            categoria.textContent = juegos[i].categoria;
            sectionHero.style.backgroundImage = `url('img/hero/${juegos[i].img}')`;
            i++;
        }, frecuencia);
    }
});
