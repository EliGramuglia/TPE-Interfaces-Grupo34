"use strict";

/**
 * Esta clase representa a cada jugador del juego, con su nombre, puntaje y equipo (perros o gatos).
 */
export class Jugador {
    constructor(nombre, puntaje, equipo) {
        this.nombre = nombre;
        this.puntaje = puntaje;
        this.equipo = equipo;
    }
}