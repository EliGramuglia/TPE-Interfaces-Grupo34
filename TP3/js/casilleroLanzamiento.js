export class CasilleroLanzamiento {
    constructor(x, y, columna, tamanio) {
        this.x = x;
        this.y = y;
        this.columna = columna;
        this.ancho = tamanio;
        this.alto = tamanio * 2;
        this.activo = false;

        this.img = new Image();
        this.img.src = '';
        this.anchoImg = 30;
        this.altoImg = 30;
        this.posYImg; // Se va a calcular cuando elijamos una imagen
        this.contadorMovimiento = 0;
        this.cambioDireccion = 60; // Cantidad de frames antes de un cambio de direccion
        this.vy = .5; // Velocidad de movimiento en Y de la imagen
        this.imgCargada = false;
        this.img.onload = () => {
            this.imgCargada = true;
        };
    }

    actualizar() {
        if (this.contadorMovimiento < this.cambioMovimiento) {
            this.posYImg += this.vy;
        } else {
            this.cambioMovimiento = 0;
            this.vy *= -1;
        }
    }

    /**
     * Muestra imagen de flecha cuando es seleccionada una ficha.
     */
    dibujar(ctx) {
        if (this.imgCargada && this.activo) {
            ctx.drawImage(this.img, this.x, this.y, this.ancho, this.alto);
        }
    }
}