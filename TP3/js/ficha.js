"use strict";

/**
 * Esta clase representa una ficha del juego con su posición x-y, radio, velocidad x-y y color.
 */
export class Ficha {
    constructor(x, y, radio, vx, vy, friccion, color) {
        this.x = x;
        this.y = y;
        this.radio = radio;
        this.vx = vx;
        this.vy = vy;
        this.friccion = friccion;
        this.color = color;
    }

    actualizar(canvas, gravedad) {
        this.y += this.vy;
        this.vy += gravedad;

        if (this.y + this.radio > canvas.height) {
            this.y = canvas.height - this.radio;
            this.vy *= -1;
            this.vy *= this.friccion;
        }
    }

    dibujar(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radio, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}
