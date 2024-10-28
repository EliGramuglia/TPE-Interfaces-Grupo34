"use strict"
import { Juego } from './juego.js';

let btnJugar = document.getElementById('btn-jugar-especial');
btnJugar.addEventListener('click', mostrarConfiguracionJuego);
let pantallaJuego = document.querySelector('.pantalla-juego');
const canvas = document.getElementById('canvas');




    
        function mostrarConfiguracionJuego() {
            let lineaCarga = document.getElementById('animacion-carga');
            btnJugar.style.display= 'none';
            lineaCarga.classList.remove('oculto');
            setTimeout(()=>{
                    let previsualizacion = document.querySelector('.previsualizacion');
                    previsualizacion.style.display ='none';
                    agregarContenidoDeConfig();
                }, 3000);
        }
        
        function agregarContenidoDeConfig() {
            const contenedorOpcTablero = document.querySelector('.contenedor-modos-tablero');
            contenedorOpcTablero.classList.add('contenedor-modos-tablero-activo');
            contenedorOpcTablero.classList.remove('oculto');
        
            // Una vez agregado el contenido, habilitamos los botones
            habilitarBotones();
            const botones = contenedorOpcTablero.querySelectorAll('.btn-tipoTablero');
            botones.forEach(boton => {
            boton.addEventListener('click', () => {
            contenedorOpcTablero.classList.remove('contenedor-modos-tablero-activo');
            contenedorOpcTablero.classList.add('oculto');
                canvas.classList.remove('oculto');
            });
            });
        }
        
        function habilitarBotones() {
            let filas = 4;

            document.getElementById('btn-opc1').addEventListener('click', () => {
                filas = 4
                const juego = new Juego('#canvas', 700, 700, filas);
                juego.jugar();

            });
            document.getElementById('btn-opc2').addEventListener('click', () => {
                filas = 5
                const juego = new Juego('#canvas', 700, 700, filas);
                juego.jugar();
            });
            document.getElementById('btn-opc3').addEventListener('click', () => {
                filas = 6
                const juego = new Juego('#canvas', 700, 700, filas);
                juego.jugar();
            });
        }

