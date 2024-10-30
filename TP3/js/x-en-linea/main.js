import { Juego } from './juego.js';

document.addEventListener('DOMContentLoaded', () => {
    const juego = new Juego('#canvas', 8);
    juego.jugar();
});
