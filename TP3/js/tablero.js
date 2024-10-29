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
        this.casilleros = this.crearMatriz(this.maxFilas, this.maxColumnas);
        this.casillerosLanzamiento = this.inicializarCasillerosLanzamiento();
    }

    /**
     * El tablero se compone por un arreglo de columnas. Cada columna es un arreglo de casilleros.
     */
    crearMatriz(filas, columnas) {
        const arreglo = new Array(columnas);
        for (let c = 0; c < columnas; c++) {
            arreglo[c] = []; // Inicializa la columna
            for (let f = 0; f < filas; f++) {
                arreglo[c][f] = new Casillero(f, c, this.tamanioCasillero);
            }
        }
        return arreglo;
    }

    /**
     * Inicializa casilleros de lanzamiento.
     */
    inicializarCasillerosLanzamiento() {
        return null;
    }

    mostrarCasillerosLanzamiento() {
        for (let c of this.casillerosLanzamiento) {
            c.visible = true;
        }
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

    hayGanador(fila, columna, cantFichasParaGanar) {
        return this.verificarFila(fila, cantFichasParaGanar) ||
               this.verificarColumna(columna, cantFichasParaGanar) ||
               this.verificarDiagonalIzquierda(fila, columna, cantFichasParaGanar) ||
               this.verificarDiagonalDerecha(fila, columna, cantFichasParaGanar);
    }

    verificarFila(fila, cantFichasParaGanar) {
        let contador = 0;
        let fichaActual = null;
    
        for (let col = 0; col < this.maxColumnas; col++) {
            const casillero = this.casilleros[col][fila];
            if (casillero.tieneFicha()) {
                if (fichaActual === null) {
                    fichaActual = casillero.ficha; // Suponiendo que `ficha` almacena el jugador (perro o gato)
                    contador = 1;
                } else if (casillero.ficha === fichaActual) {
                    contador++;
                    if (contador === cantFichasParaGanar) {
                        return true; // Se encontró una secuencia ganadora
                    }
                } else {
                    fichaActual = casillero.ficha;
                    contador = 1;
                }
            } else {
                contador = 0; // Reiniciar contador si no hay ficha
                fichaActual = null;
            }
        }
        return false; // No se encontró secuencia ganadora en esta fila
    }
    
    verificarColumna(columna, cantFichasParaGanar) {
        let contador = 0;
        let fichaActual = null;
    
        for (let fila = 0; fila < this.maxFilas; fila++) {
            const casillero = this.casilleros[columna][fila];
            if (casillero.tieneFicha()) {
                if (fichaActual === null) {
                    fichaActual = casillero.ficha;
                    contador = 1;
                } else if (casillero.ficha === fichaActual) {
                    contador++;
                    if (contador === cantFichasParaGanar) {
                        return true;
                    }
                } else {
                    fichaActual = casillero.ficha;
                    contador = 1;
                }
            } else {
                contador = 0;
                fichaActual = null;
            }
        }
        return false;
    }
    
    verificarDiagonalIzquierda(fila, columna, cantFichasParaGanar) {
        let contador = 0;
        let fichaActual = null;
    
        for (let d = -Math.min(fila, columna); d <= Math.min(this.maxFilas - 1 - fila, this.maxColumnas - 1 - columna); d++) {
            const casillero = this.casilleros[columna + d][fila + d];
            if (casillero.tieneFicha()) {
                if (fichaActual === null) {
                    fichaActual = casillero.ficha;
                    contador = 1;
                } else if (casillero.ficha === fichaActual) {
                    contador++;
                    if (contador === cantFichasParaGanar) {
                        return true;
                    }
                } else {
                    fichaActual = casillero.ficha;
                    contador = 1;
                }
            } else {
                contador = 0;
                fichaActual = null;
            }
        }
        return false;
    }
    
    verificarDiagonalDerecha(fila, columna, cantFichasParaGanar) {
        let contador = 0;
        let fichaActual = null;
    
        for (let d = -Math.min(fila, this.maxColumnas - 1 - columna); d <= Math.min(this.maxFilas - 1 - fila, columna); d++) {
            const casillero = this.casilleros[columna - d][fila + d];
            if (casillero.tieneFicha()) {
                if (fichaActual === null) {
                    fichaActual = casillero.ficha;
                    contador = 1;
                } else if (casillero.ficha === fichaActual) {
                    contador++;
                    if (contador === cantFichasParaGanar) {
                        return true;
                    }
                } else {
                    fichaActual = casillero.ficha;
                    contador = 1;
                }
            } else {
                contador = 0;
                fichaActual = null;
            }
        }
        return false;
    }

    //no la pude probar a la funcion, asi que no se si esta bien -_-
    quedanCasilleros() {
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

    posicionRandom() {
        //retonra un casillero disponible al azar
        //utiliza la funcion quedanCasillas() y tieneFicha()-> de tablero
        //sirve para cuando se acaba la cuenta regresiva del turno y el jugador todavia no eligio ninguna columna donde tirar la ficha, el juego la tira al azar
    }
}
