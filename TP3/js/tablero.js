"use strict";

import { Casillero } from "./casillero.js";

/**
 * Esta clase representa el tablero de juego, el cual consiste en una matriz bidimensional de casilleros.
 */
export class Tablero {
    constructor(maxFilas, maxColumnas) {
        this.maxFilas = maxFilas;
        this.maxColumnas = maxColumnas;
        this.tamanioCasillero = 70;
        this.ancho = this.maxColumnas * this.tamanioCasillero;
        this.alto = this.maxFilas * this.tamanioCasillero;
        this.casilleros = this.crearMatriz(this.maxFilas,this.maxColumnas);
    }

    crearMatriz(filas, columnas) {
        const matriz = [];

        for (let f = 0; f < filas; f++) {
            matriz[f] = [];
            for (let c = 0; c < columnas; c++) {
                matriz[f][c] = new Casillero(f, c, this.tamanioCasillero);
            }
        }
        return matriz;
    }

    actualizar() {

    }
    
    dibujar(ctx) {
        const desplazamientoX = (ctx.canvas.width - this.ancho) / 2;
        const desplazamientoY = (ctx.canvas.height - this.alto) / 2;

        for (let f = 0; f < this.casilleros.length; f++) {
            for (let c = 0; c < this.casilleros[f].length; c++) {
                this.casilleros[f][c].dibujar(ctx, desplazamientoX, desplazamientoY);
            }
        }
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
        let ganador = false;

        if (ganador === false) {
            ganador = recorrerColumna(columna, cantFichasParaGanar);
        }
        else if (ganador === false) {
            ganador = busquedaPorColumna();
        }
        else if (ganador === false) {
            ganador = busquedaPorDiagonalIzquierda();
        }
        else if (ganador === false) {
            ganador = busquedaPorDiagonalDerecha();
        }
        return ganador
    }
//no la pude probar a la funcion, asi que no se si esta bien -_-
    quedanCasillas() {
        for (let fila = 0; fila < maxFilas; fila++) {
            for (let columna = 0; columna < maxColumnas; columna++) {
                //mientras quede un lugar se puede seguir jugando
                if (!casilleros[fila][columna].tieneFicha()) {
                    return true;
                }
            }
        }
        return false;
    }

    zonaPermitida() {
        //evalua si la ficha se suelta desde la parte superior del tablero, retorna un booleano
    }

    posicionRandom() {
        //retonra un casillero disponible al azar
        //utiliza la funcion quedanCasillas() y tieneFicha()-> de tablero
        //sirve para cuando se acaba la cuenta regresiva del turno y el jugador todavia no eligio ninguna columna donde tirar la ficha, el juego la tira al azar
    }
    recorrerColumna(columna, cantFichasParaGanar){
        let contador = cantFichasParaGanar;
        for(let fila = 0; fila < this.maxFilas; fila++){
            if(this.casilleros[fila][columna].tieneFicha()){
                //me fijo de que equipo es la ficha
            }
        }
    }
    recorrerFila(fila, cantFichasParaGanar){
        let contador = cantFichasParaGanar;
        for(let colum = 0; colum < this.maxColumnas; Colum++){
            if(this.casilleros[fila][colum].tieneFicha()){
                //me fijo de que equipo es la ficha
            } 
        }
    }

    RecorrerDiagonalDerecha(){

    }
    RecorrerDiagonalIzquierda(){

    }
}
