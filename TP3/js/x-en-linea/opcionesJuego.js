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
    const contenedorPantallaJuego = document.querySelector('.contenedor-pantalla-juego');
    const canvas = document.getElementById('canvas');


    //si clickean el btn se activa la funcion que muestra la configuracion
    btnJugar.addEventListener('click', mostrarConfiguracionJuego);

    function mostrarConfiguracionJuego() {
        previsualizacion.classList.remove('previsualizacion');
        previsualizacion.classList.add('oculto');
        mostrarConfigTablero()
    }
//funcion para comenzar a mostrar la configuracion y modficiar el modo tablero
    function mostrarConfigTablero() {
        contenedorPantallaJuego.style.backgroundImage = 'none';
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
    function gestionarDatosJuego() {
        const btnGato = document.getElementById('btn-equipo-gato');
        const btnPerro = document.getElementById('btn-equipo-perro');
        const h2Gato = btnGato.parentNode.querySelector('h2');
        const h2Perro = btnPerro.parentNode.querySelector('h2');

        btnGato.addEventListener('click', () => {
            h2Gato.innerHTML = 'Jugador 1';
            h2Perro.innerHTML = 'Jugador 2';
            j1Equipo = 'gatos';
            j2Equipo = 'perros';
        });

        btnPerro.addEventListener('click', () => {
            h2Gato.innerHTML = 'Jugador 2';
            h2Perro.innerHTML = 'Jugador 1';
            j1Equipo = 'perros';
            j2Equipo = 'gatos';
        });

        habilitarCambioFicha();
        let btnComenzarJuego = document.getElementById('btn-jugar-comenzar');
        btnComenzarJuego.addEventListener('click', () =>{
            //oculto el contenedor de configuracion para mostrar el juego
            contenedorConfig.classList.remove('contenedor-configuracion-juego-activo');
            contenedorConfig.classList.add('oculto');
            inicializarJuego();
        })
        //si se aprieta el btn jugar se activa la funcion que crea el juego con los datos recolectados


    }

//funcion para habilitar el despliegue de las opciones de ficha
    function habilitarCambioFicha() {
        const btnCambarFichaGato = document.getElementById('btnModificarFichaGato');
        const btnCambarFichaPerro = document.getElementById('btnModificarFichaPerro');
        const contenedorOpcFichasPerro = document.getElementById('cajas-opc-fichas-perro');
        const contenedorOpcFichasGato = document.getElementById('cajas-opc-fichas-gato');
        const fichaprincipalGato = document.getElementById('fichaPrincipalGato');
        const fichaprincipalPerro = document.getElementById('fichaPrincipalPerro');



        console.log('dentro')
        btnCambarFichaGato.addEventListener('click', () => {
            contenedorOpcFichasGato.classList.toggle('objInvisible');
        })
        btnCambarFichaPerro.addEventListener('click', () => {
            contenedorOpcFichasPerro.classList.toggle('objInvisible');
        })
        //LA FICHA MAS GRANDE TOME EL VALOR DEL BTN OPC FICHA seleccionado
        let fichasGato = document.querySelectorAll('.imgs-cat');
        console.log(fichasGato);
        fichasGato.forEach(btnFicha => {
        btnFicha.addEventListener('click', () => {
            imgGato = btnFicha.src;
            fichaprincipalGato.src = imgGato;
        });
        });
        let fichasPerro = document.querySelectorAll('.imgs-dog');
        console.log(fichasPerro);
        fichasPerro.forEach(btnFicha => {
        btnFicha.addEventListener('click', () => {
            imgPerro = btnFicha.src;
            fichaprincipalPerro.src = imgPerro;
        });
        });
    

    };


    function habilitarBotonesOpcTablero() {
        document.getElementById('btn-opc1').addEventListener('click', () => {
            cantFilas = 6;
        });

        document.getElementById('btn-opc2').addEventListener('click', () => {
            cantFilas = 7;

        });

        document.getElementById('btn-opc3').addEventListener('click', () => {
            cantFilas = 8;

        });
    }
    
    function inicializarJuego(){
        //creo la instancia juego con todos los datos necesarios y luego muestro el canvas
        const juego = new Juego('#canvas', cantFilas,j1Equipo,j2Equipo,imgGato,imgPerro);
        pantallaJuego.style.height = '100%';
        canvas.classList.remove('oculto');
        juego.jugar();
    }
});


