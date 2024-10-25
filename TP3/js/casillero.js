"use strict";

/**
 * Esta clase representa un casillero del tablero de juego. El mismo tiene un par de coordenadas x-y.
 */
export class Casillero {
    constructor(fila, columna) {
        this.fila = fila;
        this.columna = columna;
        this.ficha = ficha;
    }

    actualizar() {

    }
    
    dibujar() {

    }
    set ficha(f){
        this.ficha = f;
    }
    tieneFicha() { 
        return ficha != null;
        //el tablero pregunta si tiene ficha, para evitar permitir tirar en un mismo casillero mas de una ficha
    }
}
