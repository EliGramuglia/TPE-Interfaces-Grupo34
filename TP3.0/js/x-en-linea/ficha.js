"use strict";

/**
 * Esta clase representa una ficha del juego con su posición x-y, radio, velocidad x-y e imagen.
 */
export class Ficha {
    constructor(x, y, radio, equipo, rutaImagen) {
        // Tamaño y posición
        this.x = x;
        this.y = y;
        this.xOriginal = this.x;
        this.yOriginal = this.y;
        this.radio = radio;

        // Movimiento
        this.vx = 0;
        this.vy = 1;
        this.friccion = 0.6; // Fricción que disminuye fuerza de rebote
        this.gravedad = 0.3; // Gravedad que afecta caída

        // Estados
        this.seleccionada = false;
        this.enCaida = false;
        this.posicionada = false;
        this.equipo = equipo;

        // Carga de imagen
        this.img = new Image();
        this.img.src = rutaImagen;
        this.imgCargada = false;
        this.img.onload = () => {
            this.imgCargada = true;
        };
    }

    actualizar(canvas) {
        if (this.enCaida) {
            this.vy += this.gravedad;
            this.y += this.vy;
            
            if (this.y + this.radio > canvas.height) {
                this.y = canvas.height - this.radio;
                this.vy *= -1;
                this.vy *= this.friccion;
            }
        }
    }

    dibujar(ctx) {
        if (this.imgCargada) {
            ctx.drawImage(this.img, this.x - this.radio, this.y - this.radio, this.radio * 2, this.radio * 2);
        }
    }

    enCoordenadas(coordenadasMouse) {
        const distX = coordenadasMouse.x - (this.x);
        const distY = coordenadasMouse.y - (this.y);
        const distancia = Math.sqrt(distX * distX + distY * distY);
        
        // Si la distancia es menor o igual al radio, el mouse está sobre la ficha
        return distancia <= this.radio;
    }
}
