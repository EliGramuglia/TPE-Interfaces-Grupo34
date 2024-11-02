"use strict";

import { Ficha } from './ficha.js';
import { Jugador } from './jugador.js';
import { Tablero } from './tablero.js';


/**
 * Esta clase representa el juego "4 en línea", con su canvas, tablero y jugadores.
 */
export class Juego {
    constructor(canvasId, filas, imgFichaGato,imgFichaPerro) {
        // Canvas
        this.canvas = document.querySelector(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.alto = Math.floor(window.innerHeight * 0.7);
        this.ancho = Math.floor(this.alto * 1.5);
        this.canvas.width = this.ancho;
        this.canvas.height = this.alto;
        this.unidad = Math.floor(this.alto / (filas * 1.4));
        this.maxfilas = filas;
        this.maxColumnas = filas + 1;
        
        // Imagen de fondo
        this.imgFondo = new Image();
        this.imgFondo.src = './img/pagina-juego/perros-vs-gatos/fondo-parque.png';
        this.imgFondoCargada = false;
        this.imgFondo.onload = () => {
            this.imgFondoCargada = true;
        };

        // Coordenadas del cursor del mouse
        this.mouse = {
            x: undefined,
            y: undefined
        };

        // Elementos del juego
        this.tablero = null;
        this.cantFichas = this.maxfilas * this.maxColumnas;
        this.fichas = [];
        this.fichaSeleccionada = null; // Determina qué ficha está siendo arrastrada
        this.j1 = null;
        this.j2 = null;
        this.jugadorActual = null;
        this.tiempoTurno; // Tiempo máximo de cada turno (en FPS)
        this.contadorTurno; // Contador de tiempo de turno (en FPS)

        // Datos del jugador
        this.imgFichaGato = imgFichaGato;
        this.imgFichaPerro = imgFichaPerro;

        // Se inicializa el juego
        this.inicializar();
    }

    inicializar() {
        // Tablero
        this.tablero = new Tablero(this.maxfilas, this.maxColumnas, this.unidad, this.canvas);
        
        // Jugadores
        this.j1 = new Jugador("Perros");
        this.j2 = new Jugador("Gatos");
        this.jugadorActual = this.j1;

        // Fichas
        this.generarFichas();

        // Tiempo de turno y contador
        this.tiempoTurno = 3600; // (3600F / 60FPS = 60 seg)
        this.contadorTurno = this.tiempoTurno;
        
        // Event listeners
        this.inicializarEventListeners();
    }

    inicializarEventListeners() {
        this.canvas.addEventListener('mousedown', (e) => {
            this.mouse = this.obtenerCoordenadasMouse(e);
            
            if (this.jugadorActual === this.j1) {
                this.fichaSeleccionada = this.j1.fichas.find(f => f.enCoordenadasMouse(this.mouse));
            } else {
                this.fichaSeleccionada = this.j2.fichas.find(f => f.enCoordenadasMouse(this.mouse));
            }

            if (this.fichaSeleccionada && !this.fichaSeleccionada.colocada) {
                this.fichaSeleccionada.seleccionada = true;
                this.tablero.casilleroLanzamientoActivo = null;
                this.tablero.mostrarCasillerosLanzamiento();
            }
        });

        this.canvas.addEventListener('mousemove', (e) => {
            if (this.fichaSeleccionada) {
                this.mouse = this.obtenerCoordenadasMouse(e);
                this.fichaSeleccionada.x = this.mouse.x;
                this.fichaSeleccionada.y = this.mouse.y;
                this.tablero.activarCasilleroLanzamiento(this.fichaSeleccionada);
            }
        });

        this.canvas.addEventListener('mouseup', (e) => {
            if (this.fichaSeleccionada) {
                // Se verifica si se puede soltar la ficha
                if (this.tablero.sePuedeSoltarFicha(this.fichaSeleccionada)) {
                    // Se prepara la ficha en el centro del casillero de lanzamiento
                    this.tablero.prepararFicha(this.fichaSeleccionada);

                    // Se suelta la ficha (activando su caída)
                    this.fichaSeleccionada.enCaida = true;

                    // Se coloca en el tablero y actualiza el límite inferior de rebote
                    const casilleroLibre = this.tablero.colocarFicha(this.fichaSeleccionada);
                    this.fichaSeleccionada.limiteInferior = casilleroLibre.y + casilleroLibre.tamanio;

                    // Se cambia de turno
                    this.cambiarTurno();
                } else {
                    // Si no se puede soltar la ficha, se reestablece su posición
                    this.fichaSeleccionada.x = this.fichaSeleccionada.xOriginal;
                    this.fichaSeleccionada.y = this.fichaSeleccionada.yOriginal;
                }

                this.fichaSeleccionada.seleccionada = false;
                this.fichaSeleccionada = undefined;
                this.tablero.ocultarCasillerosLanzamiento();
            }
        });
    }

    obtenerCoordenadasMouse(evento) {
        const rect = this.canvas.getBoundingClientRect()
        return {
            x: evento.clientX - rect.left,
            y: evento.clientY - rect.top
        }
    }

    /**
     * Genera fichas y las reparte a cada jugador.
     */
    generarFichas() {
        const radio = this.unidad / 2;
        const alto = radio * (this.cantFichas / 2) + radio;
        const separacionFichas = radio / 2;
        const margenSuperior = (this.alto - alto) / 2 + alto / 4 ;
        const margenLateral = this.unidad;
        
        // Jugador 1 (Perros)
        for (let i = 0; i < this.cantFichas / 2; i++) {
            const x = margenLateral + radio;
            const y = margenSuperior + i * separacionFichas;
            //deberia de tomar de que equipo es el jugador 1 -> si es perro le pone la ficha de perro al crear en el lado izq
            this.j1.agregarFicha(new Ficha(x, y, radio, "Perros", this.imgFichaPerro));
        }

        // Jugador 2 (Gatos)
        for (let i = 0; i < this.cantFichas / 2; i++) {
            const x = this.ancho - margenLateral - radio;
            const y = margenSuperior + i * separacionFichas;
            this.j2.agregarFicha(new Ficha(x, y, radio, "Gatos", this.imgFichaGato));
        }
    }

    /**
     * Gameloop del juego.
     */
    jugar() {
        // Se limpia el canvas
        this.ctx.clearRect(0, 0, this.ancho, this.alto); 

        // Tiempo de cada turno
        this.cuentaRegresiva();

        // Se actualizan y dibujan los elementos del juego
        this.actualizar();
        this.dibujar();

        // Se solicita el próximo frame
        requestAnimationFrame(() => { this.jugar() });
    }

    /**
     * Actualiza las posiciones de los elementos del juego.
     */
    actualizar() {
        // Tablero
        this.tablero.actualizar();

        // Fichas
        for (let f of this.j1.fichas) {
            f.actualizar(this.canvas);
        }

        for (let f of this.j2.fichas) {
            f.actualizar(this.canvas);
        }
    }

    /**
     * Renderiza los elementos del juego.
     */
    dibujar() {
        // Fondo
        if (this.imgFondoCargada) {
            this.ctx.drawImage(this.imgFondo, 0, 0, this.ancho, this.alto);
        }

        // Fichas
        for (let i = this.j1.fichas.length - 1; i >= 0; i--) {
            this.j1.fichas[i].dibujar(this.ctx);
        }

        for (let i = this.j2.fichas.length - 1; i >= 0; i--) {
            this.j2.fichas[i].dibujar(this.ctx);
        }

        // Tablero
        this.tablero.dibujar(this.ctx);
    }

    /**
     * Establece un temporizador para cada turno. Al finalizar el tiempo, se cambia el turno.
     */
    cuentaRegresiva() {
        if (this.contadorTurno % 60 === 0) { // 0 60 120 180 ... -> FPS
            console.log(this.contadorTurno / 60); // 0 1 2 3 ... -> seg
        }
        
        this.contadorTurno--;

        if (this.contadorTurno <= 0) {
            this.colocarFichaAlAzar(this.jugadorActual.fichas);
            this.cambiarTurno();
        }
    }

    /**
     * Cambia el turno entre jugadores. El turno se cambia cuando finaliza su tiempo o cuando
     * se suelta una ficha en el tablero. 
     */
    cambiarTurno() {
        if (this.jugadorActual === this.j1) {
            this.jugadorActual = this.j2;
        } else {
            this.jugadorActual = this.j1;
        }
        console.log("Turno del equipo " + this.jugadorActual.equipo);
        this.contadorTurno = this.tiempoTurno;
    }

    /**
     * Coloca una ficha en una columna al azar. Se utiliza cuando se termina el tiempo de un turno.
     */
    colocarFichaAlAzar(fichas) {
        for (let f of fichas) {
            if (!f.seleccionada && !f.enCaida && !f.colocada) {
                this.tablero.prepararFicha(f);
                f.enCaida = true;
                this.tablero.colocarFichaAlAzar(f);
                return;
            }
        }
    }
}
