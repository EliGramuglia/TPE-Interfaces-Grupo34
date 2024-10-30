"use strict"

import {Juego} from './juego.js';

//variables que se setean en la config para el juego
//ya estan cargadas previamente, por si se quiere apretar el btn jugar
let cantFilas = 6;
let imgGato= '.img/pagJuego/juego/ficha-gato-1.png';
let imgPerro ='.img/pagJuego/juego/ficha-perro-1.png';
let j1Equipo = 'gatos';
let j2Equipo = 'perros';


document.addEventListener('DOMContentLoaded', () => {
    //me traigo todos los elementos que voy a usar en la configuracion
    let btnJugar = document.getElementById('btn-jugar-especial');
    const previsualizacion = document.querySelector('.previsualizacion');
    let lineaCarga = document.getElementById('animacion-carga');
    const contenedorOpcTablero = document.querySelector('.contenedor-modos-tablero');
    const contenedorConfig = document.getElementById('contenedor-configuracion-juego');
    const pantallaJuego = document.getElementById('pantallaJuego');
    const canvas = document.getElementById('canvas');
    const btnsCambiarFicha = document.querySelectorAll('.btn-modificar-ficha');

    //si clickean el btn se activa la funcion que muestra la configuracion
    btnJugar.addEventListener('click', mostrarConfiguracionJuego);

    function mostrarConfiguracionJuego() {
        previsualizacion.classList.remove('previsualizacion');
        previsualizacion.classList.add('oculto');
        mostrarConfigTablero()
    }
//funcion para comenzar a mostrar la configuracion y modficiar el modo tablero
    function mostrarConfigTablero() {
        pantallaJuego.style.backgroundColor = '#16161D';
        contenedorOpcTablero.classList.add('contenedor-modos-tablero-activo');
        contenedorOpcTablero.classList.remove('oculto');
        habilitarBotonesOpcTablero();


        //si se aprieta alguna opcion de tablero, se sigue con la configuracion
        const botonesTablero = contenedorOpcTablero.querySelectorAll('.btn-tipoTablero');
        botonesTablero.forEach(boton => {
            boton.addEventListener('click', () => {
                contenedorOpcTablero.classList.remove('contenedor-modos-tablero-activo');
                contenedorOpcTablero.classList.add('oculto');
                contenedorConfig.classList.remove('oculto');
                contenedorConfig.classList.add('contenedor-configuracion-juego-activo');
                gestionarDatosJuego();
            });
        });

    }

//funcion para variar quien es el jugador 1 y jugador 2
    function gestionarDatosJuego(contenedorConfig) {
        const btnGato = document.getElementById('btn-equipo-gato');
        const btnPerro = document.getElementById('btn-equipo-perro');
        const h2Gato = btnGato.parentNode.querySelector('h2');
        const h2Perro = btnPerro.parentNode.querySelector('h2');

        btnGato.addEventListener('click', () => {
            h2Gato.textContent = 'Jugador 1';
            h2Perro.textContent = 'Jugador 2';
        });

        btnPerro.addEventListener('click', () => {
            h2Gato.textContent = 'Jugador 2';
            h2Perro.textContent = 'Jugador 1';
        });
        habilitarCambioFicha();

    }

//funcion para habilitar el despliegue de las opciones de ficha
    function habilitarCambioFicha() {
        const btnCambarFichaGato = document.getElementById('btnModificarFichaGato');
        const btnCambarFichaPerro = document.getElementById('btnModificarFichaPerro');
        const contenedorOpcFichasPerro = document.getElementById('cajas-opc-fichas-perro');
        const contenedorOpcFichasGato = document.getElementById('cajas-opc-fichas-gato');
        console.log('dentro')
        btnCambarFichaGato.addEventListener('click', () => {
            contenedorOpcFichasGato.classList.toggle('objInvisible');
        })
        btnCambarFichaPerro.addEventListener('click', () => {
            contenedorOpcFichasPerro.classList.toggle('objInvisible');
        })
        //ME FALTA QUE LA FICHA MAS GRANDE TOME EL VALOR DEL BTN OPC FICHA CLICKEADO
        // Y LUEGO TODOS LOS DATOS PASARLOS AL JUEGO UNA VEZ QUE SE CLICKEA EL BTN JUGAR
        //ahora no me anda el for que capta los eventos
        let fichasGato = document.querySelectorAll('.imgs-cat');
        console.log(fichasGato);
        fichasGato.forEach(btnFicha => {
        btnFicha.addEventListener('click', () => {
            console.log('Eligió:', btnFicha.querySelector('img').src); 
        });
        });
    

    };

    //funcionalidad para que si se clickea un btn de caja-opc-fichas, le saque la img al btn
    // botonesFichas.forEach(boton => {
    //     boton.addEventListener('click', () => {
    //         console.log('clickeado');
    //         imagenSeleccionada = boton.querySelector('img').src;
    //         console.log('Imagen seleccionada:', imagenSeleccionada);
    //         // Aquí puedes hacer algo con la imagen seleccionada, como mostrarla en otro lugar
    //     });
    // });





    function habilitarBotonesOpcTablero() {
        document.getElementById('btn-opc1').addEventListener('click', () => {
            //const juego = new Juego('#canvas', 6);
            //juego.jugar();
        });

        document.getElementById('btn-opc2').addEventListener('click', () => {
            //const juego = new Juego('#canvas', 7);
            //juego.jugar();
        });

        document.getElementById('btn-opc3').addEventListener('click', () => {
            //const juego = new Juego('#canvas', 8);
            //juego.jugar();
        });
    }

});
