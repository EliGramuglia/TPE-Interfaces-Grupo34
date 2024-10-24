"use strict";

/**
 * Esta clase representa una ficha del juego con su posición x-y, radio, velocidad x-y y color.
 */
export class Ficha {
    constructor(x, y, radio, vx, vy, color) {
        this.x = x;
        this.y = y;
        this.radio = radio;
        this.vx = vx;
        this.vy = vy;
        this.color = color;
    }

    dibujar(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radio, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    actualizar(canvas, gravedad) {
        this.y += this.vy;
        this.vy += gravedad;

        if (this.y + this.radio > canvas.height) {
            this.vy = this.vy * -1;
        }
    }
}
