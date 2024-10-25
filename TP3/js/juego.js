"use strict";

import { Ficha } from './Ficha.js';
import { Jugador } from './Jugador.js';
import { Tablero } from './Tablero.js';

/**
 * Esta clase representa el juego "4 en línea", con su canvas, tablero y jugadores.
 */
export class Juego {
    constructor(canvasId, width, height) {
        // Canvas
        this.canvas = document.querySelector(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.width = width;
        this.height = height;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.colorFondo = '#222222';

        // Coordenadas del cursor del mouse
        this.mouse = {
            x: undefined,
            y: undefined
        };
        this.offset = {
            x: undefined,
            y: undefined
        }

        // Elementos del juego
        this.tablero = new Tablero();
        this.j1 = new Jugador();
        this.j2 = new Jugador();
        this.fichas = [];
        this.cantFichas = 20;
        this.fichaSeleccionada; // Determina qué ficha está siendo arrastrada

        this.inicializar();
    }

    inicializar() {
        // Fichas
        for (let i = 0; i < this.cantFichas; i++) {
            let yRandom = Math.random() * 400 + 20;
            let tonoRandom = Math.random() * 360;
            this.fichas.push(new Ficha(i * 50, yRandom, `hsla(${tonoRandom}, 40%, 50%, 0.8)`));
        }

        // Event listeners
        this.canvas.addEventListener('mousedown', (e) => {
            this.mouse = this.obtenerCoordenadasMouse(e);
            this.fichaSeleccionada = this.fichas.find(f => f.sobreCoordenadasMouse(this.mouse));
            
            if (this.fichaSeleccionada) {
                this.fichaSeleccionada.seleccionada = true;
                this.arrastrando = true;
                this.offset.x = this.mouse.x - this.fichaSeleccionada.x;
                this.offset.y = this.mouse.y - this.fichaSeleccionada.y;
            }
        });

        this.canvas.addEventListener('mousemove', (e) => {
            if (this.fichaSeleccionada) {
                this.mouse = this.obtenerCoordenadasMouse(e);
                this.fichaSeleccionada.x = this.mouse.x - this.offset.x;
                this.fichaSeleccionada.y = this.mouse.y - this.offset.y;
            }
        });

        this.canvas.addEventListener('mouseup', (e) => {
            if (this.fichaSeleccionada) {
                this.fichaSeleccionada.seleccionada = false;
                this.fichaSeleccionada = undefined;
            }
        });
    }

    obtenerCoordenadasMouse(evento) {
        const rect = this.canvas.getBoundingClientRect()
        return {
            x: evento.clientX - rect.left,
            y: evento.clientY - rect.top
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
        this.ctx.fillStyle = this.colorFondo;
        this.ctx.fillRect(0, 0, this.width, this.height);

        // Fichas
        for (let f of this.fichas) {
            f.dibujar(this.ctx);
        }
    }
}
