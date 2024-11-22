"use strict"

document.addEventListener('DOMContentLoaded', () => {
    const pantallaLoader = document.querySelector('#loader');
    const porcentajeCarga = document.querySelector('#porcentaje-carga');

    // Loader
    let contador = 0; // Valor inicial
    const objetivo = 100; // Objetivo del contador (100%)
    const duracion = 5000; // Duración total en milisegundos
    const intervalo = 50; // Intervalo de actualización en milisegundos
    const pasos = objetivo / (duracion / intervalo); // Cantidad de pasos para alcanzar el objetivo
    document.body.classList.add('no-scroll');

    const intervaloContador = setInterval(() => {
        contador += pasos;
        porcentajeCarga.innerHTML = Math.round(contador) + "%"

        if (contador >= objetivo) {
            clearInterval(intervaloContador);

            // Cuando termina la carga, se dispara la animación de finalización
            porcentajeCarga.innerHTML = "100%";
            pantallaLoader.style.opacity = 0;

            setTimeout(() => {
                document.body.classList.remove('no-scroll');
                pantallaLoader.remove();
            }, 1000);
        }
    }, intervalo);


    // ELEMENTOS DE CADA SECCIÓN
    // Header
    const header = document.querySelector('header');
    const logo = document.getElementById('img-logo');
    const menuHamburguesa =document.getElementById('menu-hamburguesa');
    const listaSecciones = document.getElementById('lista-secciones');
    const listItems = document.querySelectorAll('#lista-secciones li');

    // Sección 1: Hero -> FALTA PARALAX!!!
    const hero = document.getElementById('contenedor-hero-visual');
    const fondoHero = document.getElementById('fondo-hero');
    const elementosHero = document.querySelectorAll('.elemento-hero');
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
    menuHamburguesa.addEventListener('click', () => {
        visible = !visible;

        // Alterna el ícono de menú hamburguesa abierto y cerrado
        if (visible) {
            listaSecciones.style.display = 'block';
            menuHamburguesa.classList.add("abrir");
            menuHamburguesa.classList.remove("cerrar");
        } else {
            listaSecciones.style.display = 'none';
            menuHamburguesa.classList.remove("abrir");
            menuHamburguesa.classList.add("cerrar");
        }

        // Lista de elementos
        listItems.forEach(item => {
            if (visible) {
                item.classList.add('entradaItems');
                listaSecciones.classList.add('sombra');
            } else {
                item.classList.remove('entradaItems');
                listaSecciones.classList.remove('sombra');
            }
        });
    });

    window.addEventListener('load', () => {
        const scrollY = window.scrollY;
        actualizarScrollPagina(scrollY);
    });

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        actualizarScrollPagina(scrollY);
    });

    function actualizarScrollPagina(scrollY) {
        heroParalax(scrollY)
        modificarHeader(scrollY);
        showIntroTextual(scrollY);
        show3Videos(scrollY);
        showTrailer(scrollY);
        modelo3D(scrollY);
        activarInteraccionConPersonajes();
    }

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
        // Se van moviendo los elementos, desde la "mas" alejada a las mas cercanas -> personajes
        // Lado derecho
        fondoHero.style.filter = `blur(${scrollY * .02}px)`; 
        let escala = scrollY * 0.0001;
        fondoHero.style.transform = `scale(${1 + escala})`;

        arbusto1.style.right = 60 - scrollY * 0.3 + "px"; 
        arbolChico.style.right = -80 - scrollY * 0.4 + "px"; 
        arbusto2.style.right = -50 - scrollY * 0.5 + "px";
        arbolMediano.style.right = -36 - scrollY * .3 + "px";
        roca1.style.right = 177 - scrollY * .5 + "px"; 
        roca2.style.right = 100 - scrollY * .5 + "px";
        roca3.style.right = 177 - scrollY * .5 + "px";

        // Lado izquierdo
        arbusto3.style.left =  161 - scrollY * .5 + "px"; 
        arbolGrande.style.left = -152 - scrollY * .4 + "px"; 
        roca4.style.left =  130 - scrollY * .8 + "px"; 
        arbusto4.style.left =  198 - scrollY * .8 + "px"; 

        // Personajes
        pj1.style.transform = `scale(${ 1 + scrollY * 0.5})`;

        //tienen un limite los personajes de cuanto pueden bajar
        if (scrollY <= 250) {
            pj1.style.top = 340 + scrollY * .1 + "px";
            pj2.style.top = 404 + scrollY * .2 + "px";
            pj3.style.top = 420 + scrollY * .3 + "px";
            sombra1.style.top = 680 + scrollY * .1 + "px";
            sombra2.style.top = 700 + scrollY * .2 + "px";
            sombra3.style.top = 735 + scrollY * .3 + "px";
        }
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

    // Sección 5
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

    function modelo3D() {
        const objeto3D = document.getElementById('modelo-3d');
        const contenedorModelo3d = document.getElementById('contenedor-objeto-3d-publicidad');

        contenedorModelo3d.addEventListener("mousemove", (event) => {
            //se calcula la rotacion del personaje con la posicion del mouse en x e y dividido el alto y ancho del contenedor
            const rotacionX = ((event.clientY / window.innerHeight) - .4) * 30;
            const rotacionY = ((event.clientX / window.innerWidth) - .4) * 30;        
            
            objeto3D.setAttribute("camera-orbit", `${-75 - rotacionY}deg ${85 - rotacionX}deg 0`);
        });

        //vuelve a su posicion cuando el mouse deje el contenedor del modelo 3d
        contenedorModelo3d.addEventListener("mouseleave", () => {
            objeto3D.setAttribute("camera-orbit", "-75deg 85deg 0"); // steamos a la rotacion original 
        });
    }

    document.addEventListener('click', () => {
        console.log(window.scrollY);
    })

});
