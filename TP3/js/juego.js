"use strict";

import { Ficha } from './Ficha.js';
import { Jugador } from './jugador.js';
import { Tablero } from './Tablero.js';

/**
 * Esta clase representa el juego "4 en línea", con su canvas, tablero y jugadores.
*/
//guardo el ancho y alto de la resolucion de pantalla
// let fullWidth = screen.width;
// let fullHeight = screen.height;

export class Juego {
    constructor(canvasId, ancho, alto, filas) {
        // Canvas
        this.canvas = document.querySelector(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.ancho = ancho;
        this.alto = alto;
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
        this.fichas = [];
        this.cantFichas = this.maxfilas * this.maxColumnas;
        console.log(this.cantFichas)
        this.fichaSeleccionada; // Determina qué ficha está siendo arrastrada
        
        this.tablero = new Tablero();
        this.j1 = new Jugador("pedro", this.generarFichasDeJugador(this.cantFichas/2));
        this.j2 = new Jugador("juan", this.generarFichasDeJugador(this.cantFichas/2));
        console.log(this.j1); 
        console.log(this.j2); 

        this.inicializar();
    }

    inicializar() {
        // Fichas
        for (let i = 0; i < this.cantFichas; i++) {
            let yRandom = Math.random() * 400 + 20;
            let tonoRandom = Math.random() * 360;
            this.fichas.push(new Ficha(i * 50, yRandom, `hsla(${tonoRandom}, 40%, 50%, 0.8)`));
        }

        // Tablero
        this.tablero = new Tablero(this.maxfilas, this.maxColumnas);

        // Event listeners
        this.canvas.addEventListener('mousedown', (e) => {
            this.mouse = this.obtenerCoordenadasMouse(e);
            this.fichaSeleccionada = this.fichas.find(f => f.sobreCoordenadasMouse(this.mouse));
            
            if (this.fichaSeleccionada) {
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
        this.ctx.clearRect(0, 0, this.ancho, this.alto); 

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
        this.ctx.fillRect(0, 0, this.ancho, this.alto);

        // Fichas
        for (let f of this.fichas) {
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

    TerminaJuego(){
        //pregunto si hay ganador al tablero cada vez qeu se tire una ficha
        if(this.tablero.hayGanador()){
            console.log("ganador: jugador 1");
            //sino pregunto si quedan casillas y fichas para seguir jugando
        }else if(!this.tablero.quedanCasillas() && this.cantFichas > 0){
            console.log("quedan lugares para seguir jugando");
        }
    }

    generarFichasDeJugador(cantfichas){
        let fichasjugador = [];
        for(let i = 0; i < cantfichas; i++){
            fichasjugador.push(i);
        }
        console.log(fichasjugador);
        return fichasjugador;
    }
}
