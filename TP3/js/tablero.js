"use strict";

import { Casillero } from "./Casillero.js";

/**
 * Esta clase representa el tablero de juego, el cual consiste en una matriz bidimensional de casilleros.
 * 
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

    actualizar() {

    }
    
    dibujar() {
        //Se definen los estilos visuales que tomara la clase
    }

    verificarLinea() {
        //recorre la matriz de forma creciente o decreciente para evaluar la fila, columna, o diagonal  (fila,columna)
    }

    hayGanador() {
        //se recorre vertical, horizontal y diagonalmente para verificar que haya N cantidad de fichas iguales
        //retorna que jugador es el ganador, dependiendo de que tipo de ficha sea (perro o gato)
    }

    quedanCasillas(){
        //retorna si quedan casilleros vacios en el tablero,
        //en el caso de que no hayan mas disponibles, y que no queden mas fichas sera un empate
    }
    zonaPermitida(){
        //evalua si la ficha se suelta desde la parte superior del tablero, retorna un booleano
    }

    posicionRandom(){
        //retonra un casillero disponible al azar
        //utiliza la funcion quedanCasillas() y tieneFicha()-> de tablero
    }
}
