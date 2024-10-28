import { Juego } from './Juego.js';


document.addEventListener('DOMContentLoaded', () => {
    seleccionModo();

});

function seleccionModo(){
    let filas = 4;
    
    document.getElementById('btn-opc1').addEventListener('click', () => {
        filas = 4
        const juego = new Juego('#canvas', 700, 700, filas);
        juego.jugar();

    });
    document.getElementById('btn-opc2').addEventListener('click', () => {
        filas = 5
        const juego = new Juego('#canvas', 700, 700, filas);
        juego.jugar();
    });
    document.getElementById('btn-opc3').addEventListener('click', () => {
        filas = 6
        const juego = new Juego('#canvas', 700, 700, filas);
        juego.jugar();
    });
}
