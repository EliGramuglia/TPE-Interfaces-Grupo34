"use strict";

/**
 * Esta clase representa una ficha del juego con su posición x-y, radio, velocidad x-y e imagen.
 */
export class Ficha {
    constructor(x, y, radio, rutaImagen) {
        this.x = x;
        this.y = y;
        this.radio = radio;
        this.vx = 0;
        this.vy = 1;
        this.friccion = 0.6; // Fricción que disminuye fuerza de rebote
        this.gravedad = 0.3; // Gravedad que afecta caída
        this.seleccionada = false;
        this.enCaida = false;
        this.posicionada = false;

        this.img = new Image();
        this.img.src = rutaImagen;
        this.imgCargada = false;
        this.img.onload = () => {
            this.imgCargada = true;
        };
    }

    actualizar(canvas) {
        if (this.enCaida && !this.posicionada) {
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
        // ctx.beginPath();
        // ctx.arc(this.x, this.y, this.radio, 0, Math.PI * 2);
        // ctx.fillStyle = this.imagen;
        // ctx.fill();
        // ctx.closePath();

        if (this.imgCargada) {
            ctx.drawImage(
                this.img, 
                this.x - this.radio, 
                this.y - this.radio, 
                this.radio * 2, 
                this.radio * 2
            );
        }
    }



    enCoordenadas(coordenadasMouse) {
        const distX = coordenadasMouse.x - this.x;
        const distY = coordenadasMouse.y - this.y;
        const distancia = Math.sqrt(distX * distX + distY * distY);
        
        // Si la distancia es menor o igual al radio, la ficha está siendo seleccionada
        return distancia <= this.radio;
    }

    
}
