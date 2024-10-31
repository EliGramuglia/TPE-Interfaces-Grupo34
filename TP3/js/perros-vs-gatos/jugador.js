"use strict";

/**
 * Esta clase representa a cada jugador del juego, con su nombre, puntaje y equipo (perros o gatos).
 */
export class Jugador {
    constructor(equipo) {
        this.equipo = equipo;
        this.puntaje = 0;
        this.fichas = [];
    }

    tieneFichas(){
        return this.fichas.length > 0;
    }

    agregarFicha(ficha) {
        this.fichas.push(ficha);
    }
}
