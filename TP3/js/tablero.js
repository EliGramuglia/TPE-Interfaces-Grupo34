"use strict";

import { Casillero } from "./casillero";

/**
 * Esta clase representa el tablero de juego, el cual consiste en una matriz bidimensional de casilleros.
 */
export class Tablero {
    constructor(cantFilas, cantColumnas) {
        this.cantFilas = cantFilas;
        this.cantColumnas = cantColumnas;
        this.casilleros = [];

        for (let fila = 0; fila < cantFilas; fila++) {
            for (let col = 0; col < cantColumnas; col++) {
                this.casilleros.push(new Casillero(fila, col));
            }
        }
    }
    
    dibujar() {

    }

    actualizar() {

    }

    verificarLinea() {

    }

    hayGanador() {

    }
}