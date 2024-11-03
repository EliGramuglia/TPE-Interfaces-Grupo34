"use strict";

import { Ficha } from './ficha.js';
import { Jugador } from './jugador.js';
import { Tablero } from './tablero.js';

/**
 * Esta clase representa el juego "4 en línea", con su canvas, tablero y jugadores.
 */
export class Juego {
    constructor(canvasId, cantFichasEnLinea, imgFichaGato, imgFichaPerro) {
        // Canvas
        this.canvas = document.querySelector(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.alto = Math.floor(window.innerHeight * 0.7);
        this.ancho = Math.floor(this.alto * 1.5);
        this.canvas.width = this.ancho;
        this.canvas.height = this.alto;
        this.maxFilas = cantFichasEnLinea + 2; // Por ejemplo, el 4 en línea necesita 6 filas
        this.maxColumnas = this.maxFilas + 1; // Por ejemplo, si hay 6 filas se necesitan 7 columnas
        this.unidad = Math.floor(this.alto / (this.maxFilas * 1.5));
        
        // Imagen de fondo
        this.imgFondo = new Image();
        this.imgFondo.src = './img/pagina-juego/perros-vs-gatos/fondo-parque.png';
        this.imgFondoCargada = false;
        this.imgFondo.onload = () => {
            this.imgFondoCargada = true;
        };

        // Coordenadas del cursor del mouse
        this.coordenadasMouse = {
            x: undefined,
            y: undefined
        };

        // Elementos del juego
        this.tablero = null;
        this.cantFichas = this.maxFilas * this.maxColumnas;
        this.cantFichasEnLinea = cantFichasEnLinea;
        this.fichaSeleccionada = null; // Determina qué ficha está siendo arrastrada
        this.j1 = null;
        this.j2 = null;
        this.jugadorActual = null;
        this.imgFichaGato = imgFichaGato;
        this.imgFichaPerro = imgFichaPerro;

        // Estado del juego
        this.ganador = null;
        this.empate = false;
        this.juegoTerminado = false;

        // Estilos de texto
        this.fuente = 'sans-serif';
        this.tamanioFuente = 20;
        this.colorFuente = 'white';

        // Tiempo de turno y contadores
        this.tiempoTurno = 1800; // Tiempo máximo de cada turno en FPS (1800FPS = 30s)
        this.contadorTurno = this.tiempoTurno; // Contador de tiempo de turno (en FPS)
        this.contadorFinalizacionJuego; // Contador para verificar si hay ganador o empate

        // Se inicializa el juego
        this.inicializar();

        // Event listeners
        this.inicializarEventListeners();
    }

    inicializar() {
        // Tablero
        this.tablero = new Tablero(this.maxFilas, this.maxColumnas, this.unidad, this.canvas);
        
        // Jugadores
        this.j1 = new Jugador("Perros");
        this.j2 = new Jugador("Gatos");
        this.jugadorActual = Math.floor(Math.random() * 2) === 0 ? this.j1 : this.j2;

        // Estado del juego
        this.ganador = null;
        this.empate = false;
        this.juegoTerminado = false;

        // Contadores
        this.contadorTurno = this.tiempoTurno;
        this.contadorFinalizacionJuego = 120;

        // Fichas
        this.generarFichas();
        this.fichaSeleccionada = null;
    }

    inicializarEventListeners() {
        this.canvas.addEventListener('mousedown', (e) => {
            if (this.tablero.fichaEnPreparacion != null) {
                return;
            }

            this.coordenadasMouse = this.obtenerCoordenadasMouse(e);
            
            if (this.jugadorActual === this.j1) {
                this.fichaSeleccionada = this.j1.fichas.find(f => f.seleccionar(this.coordenadasMouse));
            } else {
                this.fichaSeleccionada = this.j2.fichas.find(f => f.seleccionar(this.coordenadasMouse));
            }

            if (this.fichaSeleccionada) {
                this.fichaSeleccionada.seleccionada = true;
                this.tablero.casilleroLanzamientoActivo = null;
                this.tablero.mostrarCasillerosLanzamiento();
            }
        });

        this.canvas.addEventListener('mousemove', (e) => {
            if (this.fichaSeleccionada && !this.fichaSeleccionada.colocada) {
                this.coordenadasMouse = this.obtenerCoordenadasMouse(e);
                this.fichaSeleccionada.x = this.coordenadasMouse.x;
                this.fichaSeleccionada.y = this.coordenadasMouse.y;
                const casilleroLanzamiento = this.tablero.activarCasilleroLanzamiento(this.fichaSeleccionada);
                if (casilleroLanzamiento) {
                    this.tablero.resaltarCasilleroLibre(casilleroLanzamiento);
                } else {
                    this.tablero.quitarResaltadoCasillero();
                }
            }
        });

        this.canvas.addEventListener('mouseup', (e) => {
            if (this.fichaSeleccionada) {
                // Se verifica si se puede soltar la ficha
                if (this.tablero.sePuedeSoltarFicha(this.fichaSeleccionada)) {
                    // Se prepara la ficha en el centro del casillero de lanzamiento
                    this.tablero.prepararFicha(this.fichaSeleccionada);

                    // Se coloca en el tablero y actualiza el límite inferior de rebote
                    const casillero = this.tablero.colocarFicha(this.fichaSeleccionada);
                    
                    // Se verifica estado del juego (empate, ganador o cambio de turno)
                    if (casillero) {
                        this.verificarEstadoJuego(casillero);
                    }
                } else {
                    // Si no se puede soltar la ficha, se reestablece su posición
                    this.fichaSeleccionada.x = this.fichaSeleccionada.xOriginal;
                    this.fichaSeleccionada.y = this.fichaSeleccionada.yOriginal;
                }

                this.fichaSeleccionada.seleccionada = false;
                this.fichaSeleccionada = null;
                this.tablero.ocultarCasillerosLanzamiento();
                this.tablero.quitarResaltadoCasillero();
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
        const radio = Math.floor(this.unidad / 2);
        const alto = radio * (this.cantFichas / 2) + radio;
        const separacionFichas = radio / 2;
        const margenSuperior = (this.alto - alto) / 2 + alto / 4 ;
        const margenIzquierdo = this.tablero.x - this.unidad - radio;
        const margenDerecho = this.tablero.x + this.tablero.ancho + this.unidad + radio;

        // Jugador 1 (Perros)
        for (let i = 0; i < this.cantFichas / 2; i++) {
            const x = margenIzquierdo;
            const y = margenSuperior + i * separacionFichas;
            this.j1.agregarFicha(new Ficha(x, y, radio, "Perros", this.imgFichaPerro));
        }

        // Jugador 2 (Gatos)
        for (let i = 0; i < this.cantFichas / 2; i++) {
            const x = margenDerecho;
            const y = margenSuperior + i * separacionFichas;
            this.j2.agregarFicha(new Ficha(x, y, radio, "Gatos", this.imgFichaGato));
        }
    }

    /**
     * Establece un temporizador para cada turno. Al finalizar el tiempo, se cambia el turno.
     */
    cuentaRegresiva() {
        this.contadorTurno--;

        if (this.contadorTurno <= 0) {
            const casillero = this.colocarFichaAlAzar(this.jugadorActual.fichas);
            if (casillero) {
                this.verificarEstadoJuego(casillero);
            }
        }
    }

    /**
     * Coloca una ficha en una columna al azar. Se utiliza cuando se termina el tiempo de un turno.
     */
    colocarFichaAlAzar(fichas) {
        let casilleroLibre = null;

        if (this.fichaSeleccionada) {
            this.tablero.prepararFicha(this.fichaSeleccionada);
            casilleroLibre = this.tablero.colocarFichaAlAzar(this.fichaSeleccionada)
            this.fichaSeleccionada.seleccionada = false;
            this.fichaSeleccionada = null;
        } else {
            for (let f of fichas) {
                if (!f.seleccionada && !f.enCaida && !f.colocada) {
                    this.tablero.prepararFicha(f);
                    casilleroLibre = this.tablero.colocarFichaAlAzar(f);
                    break;
                }
            }
        }

        return casilleroLibre;
    }

    verificarEstadoJuego(casillero) {
        // Se verifica si hay un empate o un ganador
        if (this.tablero.hayEmpate()) {
            this.empate = true;
            this.juegoTerminado = true;
        } else if (this.tablero.hayGanador(casillero, this.cantFichasEnLinea, this.jugadorActual.equipo)) {
            this.ganador = this.jugadorActual;
            this.juegoTerminado = true;
        } else {
            // Si no, se cambia de turno
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
        this.tablero.desactivarCasillerosLanzamiento;
        this.contadorTurno = this.tiempoTurno;
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

        // Si se terminó el juego, se busca ganador o empate
        if (this.juegoTerminado) {
            this.contadorFinalizacionJuego--;
            if (this.contadorFinalizacionJuego === 0 && this.empate) {
                alert("Empate");
                this.inicializar();
            } else if (this.contadorFinalizacionJuego === 0 && this.ganador) {
                alert("Ganan los " + (this.ganador.equipo).toLowerCase());
                this.inicializar();
            }
        }

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
            this.j1.fichas[i].dibujar(this.ctx, this.jugadorActual.equipo);
        }

        for (let i = this.j2.fichas.length - 1; i >= 0; i--) {
            this.j2.fichas[i].dibujar(this.ctx, this.jugadorActual.equipo);
        }

        // Tablero
        this.tablero.dibujar(this.ctx);

        // Temporizador
        this.dibujarTemporizador(this.ancho / 2, 40);

        // Nombres de equipos
        this.dibujarNombreEquipo(this.j1.fichas[0].xOriginal, this.alto - 40, this.j1.equipo); // Perros
        this.dibujarNombreEquipo(this.j2.fichas[0].xOriginal, this.alto - 40, this.j2.equipo); // Gatos
        
    }

    dibujarTemporizador(x, y) {
        // Texto
        const texto = `Tiempo restante: ${Math.ceil((this.contadorTurno / 60))}`;
        this.ctx.font = `${this.tamanioFuente}px ${this.fuente}`;
        const anchoTexto = this.ctx.measureText(texto).width;
        
        // Rectángulo
        const margen = 10;
        const anchoRectangulo = anchoTexto + margen * 2;
        const altoRectangulo = this.tamanioFuente + margen * 2;
        const radio = 10; // Radio de los bordes redondeados
        
        // Se dibuja el rectángulo
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        this.dibujarRectanguloRedondeado(x - anchoRectangulo / 2, y - altoRectangulo / 2, anchoRectangulo, altoRectangulo, radio);
        
        // Se dibuja el texto
        this.ctx.fillStyle = this.colorFuente;
        this.ctx.textAlign = 'center';
        this.ctx.fillText(texto, x, y + altoRectangulo / 6);
    }

    dibujarNombreEquipo(x, y, equipo) {
        // Texto
        const texto = equipo;
        this.ctx.font = `${this.tamanioFuente}px ${this.fuente}`;
        const anchoTexto = this.ctx.measureText(texto).width;
        
        // Rectángulo
        const margen = 10;
        const anchoRectangulo = anchoTexto + margen * 2;
        const altoRectangulo = this.tamanioFuente + margen * 2;
        const radio = 10; // Radio de los bordes redondeados
        
        // Se dibuja el rectángulo con bordes redondeados
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        this.dibujarRectanguloRedondeado(x - anchoRectangulo / 2, y - altoRectangulo / 2, anchoRectangulo, altoRectangulo, radio)
     
        // Se dibuja el texto
        this.ctx.fillStyle = this.colorFuente;
        this.ctx.textAlign = 'center';
        this.ctx.fillText(texto, x, y + altoRectangulo / 6);
    }

    dibujarRectanguloRedondeado(x, y, ancho, alto, radio) {
        this.ctx.beginPath();
        this.ctx.moveTo(x + radio, y); // Esquina superior izquierda
        this.ctx.lineTo(x + ancho - radio, y); // Línea superior
        this.ctx.arc(x + ancho - radio, y + radio, radio, -Math.PI / 2, 0); // Esquina superior derecha
        this.ctx.lineTo(x + ancho, y + alto - radio); // Línea derecha
        this.ctx.arc(x + ancho - radio, y + alto - radio, radio, 0, Math.PI / 2); // Esquina inferior derecha
        this.ctx.lineTo(x + radio, y + alto); // Línea inferior
        this.ctx.arc(x + radio, y + alto - radio, radio, Math.PI / 2, Math.PI); // Esquina inferior izquierda
        this.ctx.lineTo(x, y + radio); // Línea izquierda
        this.ctx.arc(x + radio, y + radio, radio, Math.PI, -Math.PI / 2); // Esquina superior izquierda
        this.ctx.closePath(); // Cerrar el camino
        this.ctx.fill(); // Rellenar el rectángulo
    }
}
