import { Juego } from './Juego.js';

document.addEventListener('DOMContentLoaded', () => {
    const juego = new Juego('#canvas', 700, 700);
    juego.jugar();
});
