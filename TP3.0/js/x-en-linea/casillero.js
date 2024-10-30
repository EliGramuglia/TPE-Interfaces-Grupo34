"use strict";

/**
 * Esta clase representa un casillero del tablero de juego. El mismo tiene un par de coordenadas x-y.
 */
export class Casillero {
    constructor(x, y, fila, columna, tamanio) {
        this.x = x;
        this.y = y;
        this.fila = fila;
        this.columna = columna;
        this.tamanio = tamanio; 
        this.ficha = null;
        
        this.img = new Image();
        this.img.src = './img/pagJuego/juego/casillero.png';
        this.imgCargada = false;
        this.img.onload = () => {
            this.imgCargada = true;
        };
    }

    dibujar(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.tamanio, this.tamanio);
    }

    /**
     * Coloca una ficha en el casillero. Retorna true si se pudo colocar, o false si ya había una ficha.
     */
    colocarFicha(ficha) {
        if (!this.tieneFicha()) { 
            this.ficha = ficha;
            return true;
        }
        return false;
    }

    /**
     * Verifica si hay una ficha en el casillero.
     */
    tieneFicha() { 
        return this.ficha != null;
    }
}
