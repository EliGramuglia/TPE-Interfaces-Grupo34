"use strict"

document.addEventListener('DOMContentLoaded', () => {
    // ELEMENTOS DE CADA SECCIÓN
    // Header
    const header = document.querySelector('header');
    const logo = document.getElementById('img-logo');
    const menuHamburguesa =document.getElementById('menu-hamburguesa');
    const listaSecciones = document.getElementById('lista-secciones');
    // Sección 1: Hero -> FALTA PARALAX!!!
    const hero = document.getElementById('contenedor-hero-visual');

    // Sección 2: Presentación textual
    const introTextual = document.getElementById('contenedor-presentacion-textual'); //sec 2: intro textual

    // Sección 3: Recomendación videos
    const contenedorVideos = document.getElementById('contenedor-videos-recomendados');

    // Sección 4: Publicidad descarga
    const contenedorDescarga = document.getElementById('contenedor-publicidad-descarga');

    // Sección 6: Trailer con video y personaje
    const contenedorTrailer = document.getElementById('contenedor-video-publicidad');



    //funcion para desplegar el menu hamburguesa y tambien para que se vuelva cruz(falta)
    let visible = false;
    const listItems = document.querySelectorAll('#lista-secciones li');

    menuHamburguesa.addEventListener('click', () =>{
        visible = !visible;
        listItems.forEach(item => {
            if (visible) {
                item.classList.add('entradaItems');
                item.style.opacity = 1;
            } else {
                item.classList.remove('entradaItems');
                item.style.opacity = 0;
            }
        });
    });





    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        heroParalax(scrollY)
        modificarHeader(scrollY);
        showIntroTextual(scrollY);
        show3Videos(scrollY);
        showTrailer(scrollY);

        //la seccion de descarga se activa al momento de empezar a bajar por la pag
        activarInteraccionConPersonajes();
    });


    // FUNCIONES PARA ANIMAR CADA SECCIÓN
    // Header
    function modificarHeader(scrollY) {
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

    //seccion 1: hero con paralax
    function heroParalax(scrollY){
        const arbolChico = document.getElementById('arbol-chico');
        const arbolMediano = document.getElementById('arbol-mediano');
        const arbolGrande = document.getElementById('arbol-grande');
        const arbusto1 = document.getElementById('arbusto-1');
        const arbusto2 = document.getElementById('arbusto-2');
        const arbusto3 = document.getElementById('arbusto-3');
        const arbusto4 = document.getElementById('arbusto-4');
        const roca1 = document.getElementById('roca-1');
        const roca2 = document.getElementById('roca-2');
        const roca3 = document.getElementById('roca-3');
        const roca4 = document.getElementById('roca-4');
        const pj1 = document.getElementById('pj-1');
        const pj2 = document.getElementById('pj-2');
        const pj3 = document.getElementById('pj-3');
        const sombra1 = document.getElementById('sombra-1');
        const sombra2 = document.getElementById('sombra-2');
        const sombra3 = document.getElementById('sombra-3');

        if(scrollY <= 200){

            pj1.style.top = 340 + scrollY * 1 + "px";

        }
        //se agrandan los arboles y se corren para el costado. haciendo zoom en el personajes
        //se agrandan y acercan a la pantalla los personajes 
        //se achica toda la naturaleza
    }


    // Sección 2: presentación textual de la app
    function showIntroTextual(scrollY) {
        const title = introTextual.querySelector('.contenedor-informacion h1');
        const text = introTextual.querySelector('.contenedor-informacion p');
        const video = document.querySelector('.contenedor-informacion .caja-video-presentacion');
        const pj_Sec_1 = document.getElementById('pj-cuadrado-1');
        const pj_Sec_2 = document.getElementById('pj-cuadrado-2');

        //le agrego las animaciones de entrada
        if (scrollY >= 400) {
            title.classList.add('elem-animado-izq');
        }

        if (scrollY >= 500) {
            text.classList.add('elem-animado-izq');
        }
        
        if (scrollY >= 600) {
            video.classList.add('elem-animado-izq');
        }

        if (scrollY >= 700) {
            // Aparece number block 5 (rectángulo azul)
            pj_Sec_2.classList.add('elem-animado-derecha');
            setTimeout(() => {
                pj_Sec_2.style.animation = 'flotando 4s .3s infinite ease-in-out alternate';
                pj_Sec_2.style.opacity = 1;
            }, 1000);
        }

        if (scrollY >= 1100) {
            // Aparece number block 4 (cuadrado verde)
            pj_Sec_1.classList.add('elem-animado-izq');
            setTimeout(() => {
                pj_Sec_1.style.animation = 'flotando 2.5s infinite ease-in-out alternate';
                pj_Sec_1.style.opacity = 1;
            }, 1000);
        }
    }

    // Sección 3: muestra 3 videos
    function show3Videos(scrollY) {
        if (scrollY >= 1600) {
            // se animan los elementos de esta seccion
            let tarjetas = contenedorVideos.querySelectorAll('div .tarjeta-recomendacion');
            tarjetas.forEach(tarjeta => tarjeta.classList.add('entradaInferior'));
        }
    }

    // Sección 4: Descarga app
    function activarInteraccionConPersonajes() {
        const img = document.getElementById('fondo-personajes');

        contenedorDescarga.addEventListener('mousemove', (event) => {
            // Coordenadas del mouse
            const rect = contenedorDescarga.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            // Normalización (-1 a 1)
            const xRatio = (x / rect.width) * 2 - 1;
            const yRatio = (y / rect.height) * 2 - 1;

            // Desplazamiento en eje X e Y
            const translateX = Math.round(-xRatio * 20);
            const translateY = Math.round(-yRatio * 10);

            img.style.transform = `translate(${translateX}px, ${translateY}px) scale(1.04)`;
        });

        contenedorDescarga.addEventListener('mouseleave', () => {
            img.style.transform = `translate(0, 0) scale(1.04)`;
        });
    }

    // Sección 6: Trailer
    function showTrailer(scrollY) {
        const title = contenedorTrailer.querySelector('h2');
        const video = document.getElementById('video-publicidad');
        const pj_Sec_6 = document.getElementById('pj-seccion-6');

        //le coloco las animaciones de entrada
        if (scrollY >= 9000) {
            title.classList.add('elem-animado-izq');            
        }

        if (scrollY >= 9300) {
            video.classList.add('elem-animado-izq');
        }

        if (scrollY >= 9400) {
            pj_Sec_6.classList.add('elem-animado-derecha');
            setTimeout(() => {
                pj_Sec_6.style.opacity = 1;
                pj_Sec_6.style.animation = 'flotando 2.5s infinite ease-in-out alternate';
            }, 1000);
        }
    }

});
