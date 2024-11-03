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
        this.x;
        this.y;
        this.ancho = this.maxColumnas * this.tamanioCasillero;
        this.alto = this.maxFilas * this.tamanioCasillero;
        this.casilleros = this.crearCasilleros(this.maxFilas, this.maxColumnas);
        this.casillerosLanzamiento = this.crearCasillerosLanzamiento(this.maxColumnas);
        this.casilleroLanzamientoActivo = null;
        this.casilleroResaltado = null;
        this.fichaEnPreparacion = null;
        this.cantFichasEnTablero = 0;
        this.fichasGanadoras = [];
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

                if (col == 0 && fila == 0) {
                    this.x = x;
                    this.y = y;
                }
                
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
        this.desactivarCasillerosLanzamiento();

        for (let cl of this.casillerosLanzamiento) {
            if (cl.sePuedeSoltarFicha(ficha)) {
                cl.activado = true;
                this.casilleroLanzamientoActivo = cl;
            } else {
                cl.activado = false;
            }
        }

        return this.casilleroLanzamientoActivo;
    }

    desactivarCasillerosLanzamiento() {
        this.casilleroLanzamientoActivo = null;
        
        for(let cl of this.casillerosLanzamiento) {
            cl.activado = null;
        }
    }

    resaltarCasilleroLibre(casilleroLanzamiento) {
        const col = casilleroLanzamiento.columna;
        const casilleroLibre = this.buscarCasilleroLibre(col);
        
        for (let col = 0; col < this.maxColumnas; col++) {
            for (let fila = 0; fila < this.maxFilas; fila++) {
                if (this.casilleros[col][fila] === casilleroLibre) {
                    this.casilleroResaltado = this.casilleros[col][fila];
                    this.casilleros[col][fila].resaltado = true;
                } else {
                    this.casilleros[col][fila].resaltado = false;
                }
            }
        }
    }

    quitarResaltadoCasillero() {
        if (this.casilleroResaltado) {
            this.casilleroResaltado.resaltado = false;
            this.casilleroResaltado = null;
        }
    }

    sePuedeSoltarFicha() {
        return this.casilleroLanzamientoActivo != null && 
               this.buscarCasilleroLibre(this.casilleroLanzamientoActivo.columna) != null;
    }

    prepararFicha(ficha) {
        this.fichaEnPreparacion = ficha;
    }

    colocarFicha(ficha) {
        const col = this.casilleroLanzamientoActivo.columna;
        const casilleroLibre = this.buscarCasilleroLibre(col);
        if (casilleroLibre) {
            this.cantFichasEnTablero++;
            casilleroLibre.ficha = ficha;
            ficha.colocada = true;
            ficha.limiteInferior = casilleroLibre.y + casilleroLibre.tamanio / 2;
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
        return this.colocarFicha(ficha);
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
            this.fichaEnPreparacion.enCaida = true;
            this.fichaEnPreparacion = null;
        }
    }

    hayEmpate() {
        // Si la cantidad de fichas en el tablero es igual a la cantidad de casilleros, hay empate
        return this.cantFichasEnTablero === this.maxFilas * this.maxColumnas;
    }

    hayGanador(casillero, cantFichasParaGanar, equipo) {
        return this.verificarFila(casillero.fila, cantFichasParaGanar, equipo) || 
            this.verificarColumna(casillero.columna, cantFichasParaGanar, equipo) ||
            this.verificarDiagonalIzquierda(casillero.fila, casillero.columna, cantFichasParaGanar, equipo) ||
            this.verificarDiagonalDerecha(casillero.fila, casillero.columna, cantFichasParaGanar, equipo);
    }

    verificarFila(fila, cantFichasParaGanar, equipo) {
        this.fichasGanadoras.length = 0;
        for (let col = 0; col < this.maxColumnas; col++) {
            const casillero = this.casilleros[col][fila];
            if (casillero.ficha && casillero.ficha.equipo === equipo) {
                this.fichasGanadoras.push(casillero.ficha);
                if (this.fichasGanadoras.length == cantFichasParaGanar) {
                    this.resaltarFichasGanadoras();
                    return true;
                }
            } else {
                this.fichasGanadoras.length = 0;
            }
        }
        return false;
    }
    
    verificarColumna(columna, cantFichasParaGanar, equipo) {
        this.fichasGanadoras.length = 0;
        for (let fila = 0; fila < this.maxFilas; fila++) {
            const casillero = this.casilleros[columna][fila];
            if (casillero.ficha && casillero.ficha.equipo === equipo) {
                this.fichasGanadoras.push(casillero.ficha);
                if (this.fichasGanadoras.length == cantFichasParaGanar) {
                    this.resaltarFichasGanadoras();
                    return true;
                }
            } else {
                this.fichasGanadoras.length = 0;
            }
        }
        return false;
    }
    
    verificarDiagonalIzquierda(fila, columna, cantFichasParaGanar, equipo) {
        this.fichasGanadoras.length = 0;

        // Cantidad de filas para abajo y columnas para la izquierda
        const filasMax = Math.min(this.maxFilas - fila, columna + 1);
        const columnasMax = Math.min(columna + 1, cantFichasParaGanar);
    
        // Se verifica cada diagonal izquierda
        for (let i = 0; i < filasMax && i < columnasMax; i++) {
            const casillero = this.casilleros[columna - i][fila + i];
    
            if (casillero.ficha && casillero.ficha.equipo === equipo) {
                this.fichasGanadoras.push(casillero.ficha);
                if (this.fichasGanadoras.length == cantFichasParaGanar) {
                    this.resaltarFichasGanadoras();
                    return true;
                }
            } else {
                this.fichasGanadoras.length = 0;
            }
        }

        return false;
    }
    
    verificarDiagonalDerecha(fila, columna, cantFichasParaGanar, equipo) {
        this.fichasGanadoras.length = 0;

        // Cantidad de filas para abajo y columnas para la izquierda
        const filasMax = Math.min(this.maxFilas - fila, this.maxColumnas - columna);
        const columnasMax = Math.min(this.maxColumnas - columna, cantFichasParaGanar);
    
        // Se verifica cada diagonal derecha
        for (let i = 0; i < filasMax && i < columnasMax; i++) {
            const casillero = this.casilleros[columna + i][fila + i];
            if (casillero.ficha && casillero.ficha.equipo === equipo) {
                this.fichasGanadoras.push(casillero.ficha);
                if (this.fichasGanadoras.length == cantFichasParaGanar) {
                    this.resaltarFichasGanadoras();
                    return true;
                }
            } else {
                this.fichasGanadoras.length = 0;
            }
        }
    
        return false;
    }

    resaltarFichasGanadoras() {
        for (let f of this.fichasGanadoras) {
            f.resaltada = true;
        }
    }

    actualizar() {
        for (let c of this.casillerosLanzamiento) {
            c.actualizar();
        }

        if (this.fichaEnPreparacion != null) {
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
