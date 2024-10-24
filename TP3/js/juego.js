"use strict";

import { Ficha } from './ficha.js';
import { Jugador } from './jugador.js';
import { Tablero } from './tablero.js';

document.addEventListener('DOMContentLoaded', () => {
    // Configuración del canvas
    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext('2d');
    const width = 500;
    const height = 500;
    canvas.width = width;
    canvas.height = height;

    const gravedad = 0.3;

    const tablero = new Tablero();
    const j1 = new Jugador();
    const j2 = new Jugador();
    let fichas = [];
    const cantFichas = 10;

    for (let i = 0; i < cantFichas; i++) {
        let r = Math.random() * 255;
        let g = Math.random() * 255;
        let b = Math.random() * 255;

        fichas.push(new Ficha(i * 50, 36, 36, 0, 1, `rgb(${r}, ${g}, ${b})`));
    }

    function jugar() {
        // Se limpia el canvas
        ctx.clearRect(0, 0, width, height);
        
        // Fondo
        ctx.fillStyle = 'lightblue';
        ctx.fillRect(0, 0, width, height);

        // Fichas
        for (let f of fichas) {
            f.dibujar(ctx);
            f.actualizar(canvas, gravedad);
        }

        // Se solicita el próximo frame
        requestAnimationFrame(jugar);
    }

    jugar();
});