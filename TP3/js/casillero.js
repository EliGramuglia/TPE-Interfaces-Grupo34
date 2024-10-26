"use strict";

/**
 * Esta clase representa un casillero del tablero de juego. El mismo tiene un par de coordenadas x-y.
 */
export class Casillero {
    constructor(fila, columna, tamanio) {
        this.fila = fila;
        this.columna = columna;
        this.ficha = null;
        this.tamanio = tamanio; 
        
        this.img = new Image();
        this.img.src = './img/casillero.png';
        this.imgCargada = false;
        this.img.onload = () => {
           this.imgCargada = true;
        };
    }

    actualizar() {

    }
    
    dibujar(ctx, desplazamientoX, desplazamientoY) {
        ctx.drawImage(
            this.img, 
            this.columna * this.tamanio + desplazamientoX, 
            this.fila * this.tamanio + desplazamientoY, 
            this.tamanio, 
            this.tamanio
        );
    }

    colocarFicha(ficha) {
        this.ficha = ficha;
    }

    tieneFicha() { 
        return ficha != null;
        //el tablero pregunta si tiene ficha, para evitar permitir tirar en un mismo casillero mas de una ficha
    }
}
