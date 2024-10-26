"use strict";

import { Casillero } from "./Casillero.js";

/**
 * Esta clase representa el tablero de juego, el cual consiste en una matriz bidimensional de casilleros.
 * 
 */


export class Tablero {
    constructor(cantFilas, cantColumnas) {
        this.maxFilas = cantFilas;
        this.maxColumnas = cantColumnas;
        this.tablero = this.crearMatriz(this.maxFilas,this.maxColumnas);

        // for (let fila = 0; fila < cantFilas; fila++) {
        //     for (let col = 0; col < cantColumnas; col++) {
        //         this.casilleros.push(new Casillero(fila, col));
        //     }
        // }

    }


    crearMatriz(filas,columnas){
        const matriz = [];
        for (let f = 0; f < filas; f++) {
        matriz[f] = [];
        for (let c = 0; c < columnas; c++) {
            matriz[f][c] = new Casillero(f,c);
        }
        }
        return matriz;
    }

    actualizar() {

    }
    
    dibujar() {
        //Se definen los estilos visuales que tomara la clase
        console.log(this.tablero);
    }

    verificarLinea() {
        //recorre la matriz de forma creciente o decreciente para evaluar la fila, columna, o diagonal  (fila,columna)
        //Tener en cuenta: Se puede recorrer a partir de: 
        // 1. desde el lugar que se tiro la ficha -> se analiza para los lados y las diagonales, subiendo una columna y una fila o bajando. 
            // teniendo en cuenta que la ficha soltada puede ser la del medio de la union
            /*   ↖  ↑  ↗     
                ←   O   →     O → | | | | |
                 ↙  ↓  ↘      ↓   | | | | |
            */
        // 2. Recorrer toda la matriz, desde la posicion [0,0] y evaluar si hay num° fichas seguidas de un bando para encontrar ganador [NO ES EFICIENTE]
        // 3.  Desde la posicion del casillero disponible donde se va a poner la ficha
            //recorrer la direccion (fila o columna) por si hay una coleccion ganadora en ella 
                //(comenzando desde el inicio de la fila o columna)  |c inicio| |c| |c| |c|                              ←   ←   ←  - pos +   →   →   →       
                //comenzando desde la posicion, yendo para adelante y para atras de la posicion de la ficha |c | |c| |c| |f| |c| |c| |c|
            //recorrer la columna por si hay una coleccion ganadora (comenzando desde el inicio de la columna)
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
        //sirve para cuando se acaba la cuenta regresiva del turno y el jugador todavia no eligio ninguna columna donde tirar la ficha, el juego la tira al azar
    }
}

