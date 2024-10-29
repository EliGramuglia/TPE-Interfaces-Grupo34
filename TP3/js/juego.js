"use strict";

import { Ficha } from './ficha.js';
import { Jugador } from './jugador.js';
import { Tablero } from './tablero.js';

/**
 * Esta clase representa el juego "4 en línea", con su canvas, tablero y jugadores.
 */
export class Juego {
    constructor(canvasId, filas) {
        // Canvas
        this.canvas = document.querySelector(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.ancho = 700;
        this.alto = 700;
        this.canvas.width = this.ancho;
        this.canvas.height = this.alto;
        this.colorFondo = '#bbbbbb';
        this.maxfilas = filas;
        this.maxColumnas = filas + 1;

        // Coordenadas del cursor del mouse
        this.mouse = {
            x: undefined,
            y: undefined
        };

        // Elementos del juego
        this.tablero = null;
        this.cantFichas = this.maxfilas * this.maxColumnas;
        this.fichas = [];
        this.fichaSeleccionada; // Determina qué ficha está siendo arrastrada
        this.j1 = null;
        this.j2 = null;

        this.inicializar();
    }

    inicializar() {
        // Tablero
        this.tablero = new Tablero(this.maxfilas, this.maxColumnas);
        
        // Jugadores
        this.j1 = new Jugador("Pedro", "Perros");
        this.j2 = new Jugador("Juan", "Gatos");

        // Fichas
        this.generarFichas();

        // Event listeners
        this.canvas.addEventListener('mousedown', (e) => {
            this.mouse = this.obtenerCoordenadasMouse(e);
            this.fichaSeleccionada = this.fichas.find(f => f.sobreCoordenadasMouse(this.mouse));
            
            if (this.fichaSeleccionada && !this.fichaSeleccionada.enTablero) {
                this.fichaSeleccionada.seleccionada = true;
            }
        });

        this.canvas.addEventListener('mousemove', (e) => {
            if (this.fichaSeleccionada) {
                this.mouse = this.obtenerCoordenadasMouse(e);
                this.fichaSeleccionada.x = this.mouse.x;
                this.fichaSeleccionada.y = this.mouse.y;
            }
        });

        this.canvas.addEventListener('mouseup', (e) => {
            if (this.fichaSeleccionada) {
                //this.colocarFichaEnTablero(this.fichaSeleccionada);
                this.fichaSeleccionada.seleccionada = false;
                this.fichaSeleccionada = undefined;
            }
        });
    }

    colocarFichaEnTablero(columna, ficha) {
        for (let fila = this.maxfilas - 1; fila >= 0; fila--) { // Empezamos desde la fila más baja
            let casillero = this.tablero.obtenerCasillero(fila, columna); // Obtener casillero de la fila y columna
            if (!casillero.tieneFicha()) {
                casillero.colocarFicha(ficha);
                return true; // Colocamos la ficha y salimos
            }
        }
        console.log("No se puede colocar la ficha; la columna está llena");
        return false; // Retorna falso si la columna está llena
    }

    obtenerCoordenadasMouse(evento) {
        const rect = this.canvas.getBoundingClientRect()
        return {
            x: evento.clientX - rect.left,
            y: evento.clientY - rect.top
        }
    }

    generarFichas() {
        const radio = 30;
        const margenInferior = this.alto - 20;
        const margenLateral = 20;
        const separacionFichas = 20;
        
        // Jugador 1
        for (let i = 0; i < this.cantFichas / 2; i++) {
            const x = margenLateral + radio;
            const y = margenInferior - i * separacionFichas - radio;
            let tonoRandom = Math.random() * 360;
            this.j1.agregarFicha(new Ficha(x, y, radio, `hsla(${tonoRandom}, 40%, 50%, 0.8)`));
        }

        // Jugador 2
        for (let i = 0; i < this.cantFichas / 2; i++) {
            const x = this.ancho - margenLateral - radio;
            const y = margenInferior - i * separacionFichas - radio;
            let tonoRandom = Math.random() * 360;
            this.j2.agregarFicha(new Ficha(x, y, radio, `hsla(${tonoRandom}, 40%, 50%, 0.8)`));
        }
    }

    jugar() {
        // Se limpia el canvas
        this.ctx.clearRect(0, 0, this.ancho, this.alto); 

        // Se actualizan y dibujan los elementos del juego
        // this.actualizar();
        this.dibujar();

        // Se solicita el próximo frame
        requestAnimationFrame(() => { this.jugar() });
    }

    actualizar() {
        // Fichas
        for (let f of this.j1.fichas) {
            f.actualizar(this.canvas);
        }

        for (let f of this.j2.fichas) {
            f.actualizar(this.canvas);
        }
    }

    dibujar() {
        // Fondo
        this.ctx.fillStyle = this.colorFondo;
        this.ctx.fillRect(0, 0, this.ancho, this.alto);

        // Fichas
        for (let f of this.j1.fichas) {
            f.dibujar(this.ctx);
        }

        for (let f of this.j2.fichas) {
            f.dibujar(this.ctx);
        }

        // Tablero
        this.tablero.dibujar(this.ctx);
    }

    cuentaRegresiva(cantSeg) {
        // tendra una cuenta regresiva de N s para activarse en cada turno
        for (i = cantSeg; i >= 0; i--) {
            console.log('Cuenta regresiva:' + i)
        }
        // cambiar turno() -> habilita y desabilita las fichas del equipo contrincante
    }

    terminaJuego() {
        //pregunto si hay ganador al tablero cada vez qeu se tire una ficha
        if (this.tablero.hayGanador()) {
            console.log("ganador: jugador 1");
            //sino pregunto si quedan casillas y fichas para seguir jugando
        }else if(!this.tablero.quedanCasillas() && this.cantFichas > 0){
            console.log("no quedan lugares para seguir jugando");
        }
    }
}
