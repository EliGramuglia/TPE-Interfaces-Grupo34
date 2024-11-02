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
        this.preparandoFicha = false;
        this.fichaEnPreparacion = null;
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
                arreglo[col][fila] = new Casillero(x, y, this.tamanioCasillero, fila, col);
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
            casillerosLanzamiento[col] = new CasilleroLanzamiento(x, y, this.tamanioCasillero, col);
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

    activarCasilleroLanzamiento(ficha) {
        for (let c of this.casillerosLanzamiento) {
            if (c.sePuedeSoltarFicha(ficha)) {
                c.activado = true;
                this.casilleroLanzamientoActivo = c;
            } else {
                c.activado = false;
            }
        }
    }

    sePuedeSoltarFicha() {
        return this.casilleroLanzamientoActivo != null && 
               this.buscarCasilleroLibre(this.casilleroLanzamientoActivo.columna) != null;
    }

    prepararFicha(ficha) {
        this.fichaEnPreparacion = ficha;
        this.preparandoFicha = true;
    }

    colocarFicha(ficha) {
        const col = this.casilleroLanzamientoActivo.columna;
        const casilleroLibre = this.buscarCasilleroLibre(col);
        if (casilleroLibre) {
            casilleroLibre.ficha = ficha;
            ficha.colocada = true;
            ficha.limiteInferior = casilleroLibre.y + casilleroLibre.tamanio;
        }
        return casilleroLibre;
    }

    colocarFichaAlAzar(ficha) {
        let indice = Math.floor(Math.random() * this.maxColumnas);
        this.casilleroLanzamientoActivo = this.casillerosLanzamiento[indice];

        while (!this.sePuedeSoltarFicha()) {
            indice = Math.floor(Math.random() * this.maxColumnas);
            this.casilleroLanzamientoActivo = this.casillerosLanzamiento[indice];            
        }

        this.colocarFicha(ficha)
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

    }
    
    verificarColumna(columna, cantFichasParaGanar) {

    }
    
    verificarDiagonalIzquierda(fila, columna, cantFichasParaGanar) {

    }
    
    verificarDiagonalDerecha(fila, columna, cantFichasParaGanar) {

    }

    quedanCasillerosDisponibles() {

    }

    coordenadasCasilleroLanzamiento() {
        let coordenadas = {
            x: undefined,
            y: undefined
        }
        if (this.casilleroLanzamientoActivo) {
            coordenadas.x = this.casilleroLanzamientoActivo.x + this.tamanioCasillero / 2;
            coordenadas.y = this.casilleroLanzamientoActivo.y + this.tamanioCasillero / 2;
        }
        return coordenadas;
    }

    moverFichaALanzamiento() {
        // Se calcula la distancia entre la ficha y el destino
        const destino = this.coordenadasCasilleroLanzamiento();
        const dx = destino.x - this.fichaEnPreparacion.x;
        const dy = destino.y - this.fichaEnPreparacion.y;
        const distancia = Math.sqrt(dx * dx + dy * dy);

        let velocidad = distancia * 0.1; // La velocidad varía con la distancia
        const velocidadMinima = 0.5;
        if (velocidad < velocidadMinima) {
            velocidad = velocidadMinima;
        }

        if (distancia > velocidadMinima) {
            // Se mueve la ficha hacia el casillero de lanzamiento
            this.fichaEnPreparacion.x += (dx / distancia) * velocidad;
            this.fichaEnPreparacion.y += (dy / distancia) * velocidad;
        } else {
            // Se coloca la ficha en la posición final
            this.fichaEnPreparacion.x = destino.x;
            this.fichaEnPreparacion.y = destino.y;
            
            // Se marca la ficha como preparada
            this.fichaEnPreparacion.preparada = true;
            this.fichaEnPreparacion = null;
            this.preparandoFicha = false;
        }
    }

    actualizar() {
        for (let c of this.casillerosLanzamiento) {
            c.actualizar();
        }

        if (this.preparandoFicha) {
            this.moverFichaALanzamiento();
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
