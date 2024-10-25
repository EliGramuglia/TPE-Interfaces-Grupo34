"use strict";

import { Ficha } from './Ficha.js';
import { Jugador } from './Jugador.js';
import { Tablero } from './Tablero.js';

/**
 * Esta clase representa el juego "4 en línea", con su canvas, tablero y jugadores.
 */
export class Juego {
    constructor(canvasId, width, height) {
        this.canvas = document.querySelector(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.width = width;
        this.height = height;
        this.canvas.width = this.width;
        this.canvas.height = this.height;

        // Elementos del juego
        this.gravedad = 0.3;
        this.tablero = new Tablero();
        this.fichas = [];
        this.cantFichas = 20;
        this.j1 = new Jugador();
        this.j2 = new Jugador();

        this.inicializar();
    }

    inicializar() {
        for (let i = 0; i < this.cantFichas; i++) {
            let tono = Math.random() * 360;

            let y = Math.random() * 400 + 20;
    
            this.fichas.push(new Ficha(i * 50, y, 36, 0, 1, 0.6, `hsla(${tono}, 40%, 50%, 0.8)`));
        }
    }

    jugar() {
        // Se limpia el canvas
        this.ctx.clearRect(0, 0, this.width, this.height); 

        // Se actualizan y dibujan los elementos del juego
        this.actualizar();
        this.dibujar();

        // Se solicita el próximo frame
        requestAnimationFrame(() => { this.jugar() });
    }

    actualizar() {
        // Fichas
        for (let f of this.fichas) {
            f.actualizar(this.canvas, this.gravedad);
        }
    }

    dibujar() {
        // Fondo
        this.ctx.fillStyle = 'lightblue';
        this.ctx.fillRect(0, 0, this.width, this.height);

        // Fichas
        for (let f of this.fichas) {
            f.dibujar(this.ctx);
        }
    }
}
