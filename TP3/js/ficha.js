"use strict";

/**
 * Esta clase representa una ficha del juego con su posición x-y, radio, velocidad x-y e imagen.
 */
export class Ficha {
    constructor(x, y, radio, imagen) {
        this.x = x;
        this.y = y;
        this.radio = radio;
        this.imagen = imagen;
        this.vx = 0;
        this.vy = 1;
        this.friccion = 0.6; // Fricción que disminuye fuerza de rebote
        this.gravedad = 0.3; // Gravedad que afecta caída
        this.seleccionada = false;
        this.cayendo = false;
        this.enTablero = false;
    }

    actualizar(canvas) {
        if (this.cayendo && !this.seleccionada && this.vy != 0) {
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
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radio, 0, Math.PI * 2);
        ctx.fillStyle = this.imagen;
        ctx.fill();
        ctx.closePath();
    }

    sobreCoordenadasMouse(coordenadasMouse) {
        const distX = coordenadasMouse.x - this.x;
        const distY = coordenadasMouse.y - this.y;
        const distancia = Math.sqrt(distX * distX + distY * distY);
        
        // Si la distancia es menor o igual al radio, la ficha está siendo seleccionada
        return distancia <= this.radio;
    }

    getPosicion() {
        //retorna la posicion en x,y de la ficha (mouse) 
        //sirve para saber si la ficha esta en la zona permitida del tablero
    }

    estado() {
        //normal(quieta), clikeada, en movimietno o soltada
        //siento que podria servir saber el estado de la ficha, para activar ciertos eventos o no
        // como una animacion
    }
}
