"use strict"

document.addEventListener('DOMContentLoaded', () => {
    // ELEMENTOS DE CADA SECCIÓN
    // Header
    const header = document.querySelector('header');
    const logo = document.getElementById('img-logo');

    // Sección 1: Hero -> FALTA PARALAX!!!
    const hero = document.getElementById('contenedor-hero-visual');

    // Sección 2: Presentación textual
    const introTextual = document.getElementById('contenedor-presentacion-textual'); //sec 2: intro textual

    // Sección 3: Recomendación videos
    const contenedorVideos = document.getElementById('contenedor-videos-recomendados');

    // Sección 4: Publicidad descarga
    const contenedor = document.getElementById('contenedor-publicidad-descarga');

    // Sección 6: Trailer con video y personaje
    const contenedorTrailer = document.getElementById('contenedor-video-publicidad');

    window.addEventListener('scroll', () => {
        modificarHeader();

        let distancia_Sec_2 = introTextual.getBoundingClientRect().top;
        let distancia_Sec_3 = contenedorVideos.getBoundingClientRect().top;
        let distancia_Sec_6 = contenedorTrailer.getBoundingClientRect().top;
        let alturaPantallaVisible = window.innerHeight / 1.3;

        if(distancia_Sec_2 <= alturaPantallaVisible){
            showIntroTextual();
        }
        if(distancia_Sec_3 <= alturaPantallaVisible){
            show3Videos();
        }
        if(distancia_Sec_6 <= alturaPantallaVisible){
            showTrailer();
        }

        //la seccion de descarga se activa al momento de empezar a bajar por la pag
        activarInteraccionConPersonajes();
    });


    // FUNCIONES PARA ANIMAR CADA SECCIÓN
    // Header
    function modificarHeader() {
        const scrollY = window.scrollY; // Valor del scroll vertical

        // Límites de transformación del logo (posición y tamaño)
        const maxScroll = 400;  // Valor máximo de scroll
        const maxWidth = 560;   // Tamaño inicial del logo (cuando no hay scroll)
        const minWidth = 150;   // Tamaño final del logo (cuando el scroll llega a maxScroll)
        const maxTop = 55;      // Posición inicial del logo (cuando no hay scroll)
        const minTop = 10;      // Posición final del logo (cuando el scroll llega a maxScroll)

        // Se calcula el nuevo tamaño y posición en función del scroll
        const width = Math.max(minWidth, maxWidth - (scrollY / maxScroll) * (maxWidth - minWidth));
        const top = Math.max(minTop, maxTop - (scrollY / maxScroll) * (maxTop - minTop));

        // Se aplican los valores calculados al logo
        logo.style.width = `${width}px`;
        logo.style.height = `${(width * 0.57)}px`;
        logo.style.top = `${top}px`;

        // Gradiente del header en función del scroll
        var opacidad = Math.min(scrollY / maxScroll, 1); // La opacidad va de 0 a 1 según el scroll
        var gradiente = `linear-gradient(to bottom, rgba(0, 209, 213, ${opacidad}), rgba(0, 209, 213, ${opacidad * 0.12}) 88%, rgba(0, 209, 213, 0))`;
        header.style.backgroundImage = gradiente;
    }

    // Sección 2: presentación textual de la app
    function showIntroTextual() {
        const title = introTextual.querySelector('.contenedor-informacion h1');
        const text = introTextual.querySelector('.contenedor-informacion p');
        const video = document.querySelector('.contenedor-informacion .caja-video-presentacion');
        const pj_Sec_1 = document.getElementById('pj-cuadrado-1');
        const pj_Sec_2 = document.getElementById('pj-cuadrado-2');

        //le agrego las animaciones de entrada
        title.classList.add('elem-animado-izq');
        text.classList.add('elem-animado-izq');
        video.classList.add('elem-animado-izq');
        pj_Sec_1.classList.add('elem-animado-izq');
        pj_Sec_2.classList.add('elem-animado-derecha');

        //los pj 1 y 2 deben tener la animacion luego de entrar ('personaje-flotante') para dar la ilusion de que estan flotando en la pantalla
        setTimeout(() => {
            pj_Sec_1.style.opacity = 1;
            pj_Sec_2.style.opacity = 1;
            pj_Sec_1.style.animation = 'flotando 2.5s infinite ease-in-out alternate';
            pj_Sec_2.style.animation = 'flotando 4s .3s infinite ease-in-out alternate';
        }, 2000);
    }

    // Sección 3: muestra 3 videos
    function show3Videos() {
        let tarjetas = contenedorVideos.querySelectorAll('div .tarjeta-recomendacion');
        tarjetas.forEach(tarjeta => tarjeta.classList.add('entradaInferior'));
        // se animan los elementos de esta seccion
    }

    // Sección 4: Descarga app
    function activarInteraccionConPersonajes() {
        const img = document.getElementById('fondo-personajes');

        if (contenedor && img) {
            contenedor.addEventListener('mousemove', (event) => {
                const x = (event.clientX - contenedor.offsetLeft) / contenedor.offsetWidth * 20;
                img.style.transform = `translateX(${x}px) scaleX(1.04)`;
            });
        }
    }

    // Sección 6: Trailer
    function showTrailer() {
        const title = contenedorTrailer.querySelector('h2');
        const video = document.getElementById('video-publicidad');
        const pj_Sec_6 = document.getElementById('pj-seccion-6');

        //le coloco las animaciones de entrada
        title.classList.add('elem-animado-izq');
        video.classList.add('elem-animado-izq');
        pj_Sec_6.classList.add('elem-animado-derecha');

//se le agrega despues de la entrada la animacion de para simular que flota el personaje
        setTimeout(() => {
            pj_Sec_6.style.opacity = 1;
            pj_Sec_6.style.animation = 'flotando 2.5s infinite ease-in-out alternate';
        }, 2000);
    }
});
