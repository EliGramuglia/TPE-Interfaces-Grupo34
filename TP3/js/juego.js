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
        this.maxfilas = filas;
        this.maxColumnas = filas + 1;
        
        // Imagen de fondo
        this.imgFondo = new Image();
        this.imgFondo.src = './img/fondo-parque.png';
        this.imgFondoCargada = false;
        this.imgFondo.onload = () => {
            this.imgFondoCargada = true;
        };

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
        this.jugadorActual = null;
        this.tiempoTurno; // Tiempo máximo de cada turno (en FPS)
        this.contadorTurno; // Contador de tiempo de turno (en FPS)

        this.inicializar();
    }

    inicializar() {
        // Tablero
        this.tablero = new Tablero(this.maxfilas, this.maxColumnas);
        
        // Jugadores
        this.j1 = new Jugador("Pedro", "Perros");
        this.j2 = new Jugador("Juan", "Gatos");
        this.jugadorActual = this.j1;

        // Fichas
        this.generarFichas();

        // Tiempo de turno y contador
        this.tiempoTurno = 300; // (3600 FPS = 60 seg)
        this.contadorTurno = this.tiempoTurno;

        // Event listeners
        this.canvas.addEventListener('mousedown', (e) => {
            this.mouse = this.obtenerCoordenadasMouse(e);
            this.fichaSeleccionada = this.fichas.find(f => f.enCoordenadas(this.mouse));
            
            if (this.fichaSeleccionada && !this.fichaSeleccionada.posicionada) {
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
                if (sePuedeColocar(this.fichaSeleccionada)) {
                    this.fichaSeleccionada.enCaida = true;
                    // this.colocarFichaEnTablero(this.fichaSeleccionada);
                } else {
                    this.fichaSeleccionada.x = this.fichaSeleccionada.xOriginal;
                    this.fichaSeleccionada.y = this.fichaSeleccionada.yOriginal;
                }

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

    /**
     * Genera fichas y las reparte a cada jugador.
     */
    generarFichas() {
        const radio = 30;
        const rutaImagenPerros = "./img/ficha-perro-1.png";
        const rutaImagenGatos = "./img/ficha-gato-1.png";

        const separacionFichas = 20;
        const margenInferior = this.alto - 20;
        const margenLateral = 20;
        
        // Jugador 1
        for (let i = 0; i < this.cantFichas / 2; i++) {
            const x = margenLateral + radio;
            const y = margenInferior - i * separacionFichas - radio;
            this.j1.agregarFicha(new Ficha(x, y, radio, "Perros", rutaImagenPerros));
        }

        // Jugador 2
        for (let i = 0; i < this.cantFichas / 2; i++) {
            const x = this.ancho - margenLateral - radio;
            const y = margenInferior - i * separacionFichas - radio;
            this.j2.agregarFicha(new Ficha(x, y, radio, "Gatos", rutaImagenGatos));
        }
    }

    /**
     * Coloca una ficha en una columna dada. Retorna true si se pudo colocar la ficha, y false en caso conrario.
     */
    colocarFichaEnTablero(columna, ficha) {
        for (let fila = this.maxfilas - 1; fila >= 0; fila--) { // Se empieza desde la fila inferior
            let casillero = this.tablero.obtenerCasillero(fila, columna); // Se obtiene cada casillero de la fila
            if (!casillero.tieneFicha()) {
                casillero.colocarFicha(ficha);
                return true;
            }
        }
        return false;
    }

    jugar() {
        // Se limpia el canvas
        this.ctx.clearRect(0, 0, this.ancho, this.alto); 

        // Tiempo de cada turno
        this.cuentaRegresiva();

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
        if (this.imgFondoCargada) {
            this.ctx.drawImage(this.imgFondo, 0, 0, this.ancho, this.alto);
        }

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

    cuentaRegresiva() {
        if (this.contadorTurno % 60 === 0) { // 0 60 120 180 ... -> FPS
            console.log(this.contadorTurno / 60); // 0 1 2 3 ... -> seg
        }
        
        this.contadorTurno--;

        if (this.contadorTurno <= 0) {
            this.cambiarTurno();
            this.contadorTurno = this.tiempoTurno;
        }
    }

    cambiarTurno() {
        if (this.jugadorActual === this.j1) {
            this.jugadorActual = this.j2;
        } else {
            this.jugadorActual = this.j1;
        }
        console.log("Turno de " + this.jugadorActual.nombre);
    }

    hayGanador() {
        // pregunto si hay ganador al tablero cada vez qeu se tire una ficha
        if (this.tablero.hayGanador()) {
            console.log("ganador: jugador 1");
            // sino pregunto si quedan casillas y fichas para seguir jugando
        } else if (!this.tablero.quedanCasillas() && this.cantFichas > 0) {
            console.log("no quedan lugares para seguir jugando");
        }
    }
}
