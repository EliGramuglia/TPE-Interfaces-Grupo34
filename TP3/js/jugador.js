"use strict";

/**
 * Esta clase representa a cada jugador del juego, con su nombre, puntaje y equipo (perros o gatos).
 */
export class Jugador {
    constructor(nombre,fichas) {
        this.nombre = nombre;
        // this.puntaje = puntaje;
        this.fichas = [];
    }


    // get puntaje(){
    //     return this.puntaje;
    // }
    // set puntaje(num){
    //     this.puntaje = num;
    // }

    get tieneFichas(){
        return this.fichas.length > 0;
    }

    set darFichas(fichas){
    //desde la clase del juego genero el arreglo y se las mando
        this.fichas = fichas;
    }
}
