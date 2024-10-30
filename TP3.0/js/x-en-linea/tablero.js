"use strict";

import { Casillero } from "./casillero.js";
import { CasilleroLanzamiento } from "./casilleroLanzamiento.js";

/**
 * Esta clase representa el tablero de juego, el cual consiste en una matriz bidimensional de casilleros.
 */
export class Tablero {
    constructor(maxFilas, maxColumnas, unidad, canvas) {
        this.maxFilas = maxFilas;
        this.maxColumnas = maxColumnas;
        this.tamanioCasillero = unidad;
        this.canvas = canvas;
        this.ancho = this.maxColumnas * this.tamanioCasillero;
        this.alto = this.maxFilas * this.tamanioCasillero;
        this.casilleros = this.crearCasilleros(this.maxFilas, this.maxColumnas);
        this.casillerosLanzamiento = this.crearCasillerosLanzamiento(this.maxColumnas);
        this.casilleroLanzamientoActivo = null;
        this.fichasPorColumna = new Array(this.maxColumnas);
    }

    /**
     * El tablero se compone por un arreglo de columnas. Cada columna es un arreglo de casilleros.
     */
    crearCasilleros(filas, columnas) {
        const arreglo = new Array(columnas);
        const desplazamientoX = (this.canvas.width - this.ancho) / 2;
        const desplazamientoY = (this.canvas.height - this.alto) / 2;
        
        for (let col = 0; col < columnas; col++) {
            arreglo[col] = []; // Inicializa la columna
            for (let fila = 0; fila < filas; fila++) {
                const x = col * this.tamanioCasillero + desplazamientoX;
                const y = fila * this.tamanioCasillero + desplazamientoY;
                arreglo[col][fila] = new Casillero(x, y, fila, col, this.tamanioCasillero);
            }
        }

        return arreglo;
    }

    /**
     * Inicializa casilleros de lanzamiento.
     */
    crearCasillerosLanzamiento(columnas) {
        const casillerosLanzamiento = new Array(columnas);
        for (let col = 0; col < columnas; col++) {
            const x = this.casilleros[col][0].x;
            const y = this.casilleros[col][0].y - this.tamanioCasillero;
            casillerosLanzamiento[col] = new CasilleroLanzamiento(x, y, col, this.tamanioCasillero);
        }
        return casillerosLanzamiento;
    }

    mostrarCasillerosLanzamiento() {
        for (let c of this.casillerosLanzamiento) {
            c.visible = true;
        }
    }

    ocultarCasillerosLanzamiento() {
        for (let c of this.casillerosLanzamiento) {
            c.visible = false;
        }        
    }

    obtenerCasilleroLanzamientoActivo(ficha) {
        for (let c of this.casillerosLanzamiento) {
            c.activado = false;
            if (c.sePuedeSoltarFicha(ficha)) {
                this.casilleroLanzamientoActivo = c;
                this.casilleroLanzamientoActivo.activado = true;
                return;
            }
            c.activado = false;
        }

        this.casilleroLanzamientoActivo = null;
    }

    sePuedeSoltarFicha() {
        return this.casilleroLanzamientoActivo != null && 
               this.buscarCasilleroLibre(this.casilleroLanzamientoActivo.columna) != null;
    }

    coordenadasFichaLanzada() {
        if (this.casilleroLanzamientoActivo) {
            return {
                x: this.casilleroLanzamientoActivo.x + this.tamanioCasillero / 2, 
                y: this.casilleroLanzamientoActivo.y + this.tamanioCasillero / 2
            }
        }
        return null;
    }

    colocarFicha(ficha) {
        const col = this.casilleroLanzamientoActivo.columna;
        const casilleroLibre = this.buscarCasilleroLibre(col);
        if (casilleroLibre) {
            casilleroLibre.ficha = ficha;
        }
        return casilleroLibre;
    }

    buscarCasilleroLibre(columna) {
        for (let fila = this.maxFilas - 1; fila >= 0; fila--) {
            const casillero = this.casilleros[columna][fila];
            if (!casillero.tieneFicha()) {
                return casillero;
            }
        }
        return null;
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

    quedanCasillerosDisponibles() {

    }

    colocarFichaAlAzar(ficha) {
        
    }

    actualizar() {
        for (let c of this.casillerosLanzamiento) {
            c.actualizar();
        }    
    }
    
    dibujar(ctx) {
        // Casilleros
        for (let f = 0; f < this.casilleros.length; f++) {
            for (let c = 0; c < this.casilleros[f].length; c++) {
                this.casilleros[f][c].dibujar(ctx);
            }
        }

        // Casilleros de lanzamiento
        for (let cl of this.casillerosLanzamiento) {
            cl.dibujar(ctx);
        }
    }
}
