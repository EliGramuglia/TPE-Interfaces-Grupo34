export class CasilleroLanzamiento {
    constructor(x, y, columna, tamanio) {
        this.x = x;
        this.y = y;
        this.columna = columna;
        this.tamanio = tamanio;

        this.img = new Image();
        this.img.src = './img/pagJuego/juego/flecha-lanzamiento.png';
        this.anchoImg = 30;
        this.altoImg = 30;
        this.posYImg; // Se va a calcular cuando elijamos una imagen
        this.imgCargada = false;
        this.img.onload = () => {
            this.imgCargada = true;
        };
        this.visible = false;
        this.activado = false;

        this.contadorMovimiento = 0;
        this.framesCambioDireccion = 60; // Cantidad de frames antes de un cambio de dirección
        this.vy = .5; // Velocidad de movimiento en Y de la imagen
    }

    actualizar() {
        if (this.activado) {
            this.contadorMovimiento++;
            if (this.contadorMovimiento < this.framesCambioDireccion) {
                this.posYImg += this.vy;
            } else {
                this.contadorMovimiento = 0;
                this.vy *= -1; // Se invierte la dirección
            }
        }
    }

    /**
     * Muestra imagen de flecha cuando es seleccionada una ficha.
     */
    dibujar(ctx) {
        if (this.imgCargada && this.visible) {
            ctx.save();
            if (!this.activado) {
                ctx.globalAlpha = 0.5;
            }
            ctx.drawImage(this.img, this.x, this.y, this.tamanio, this.tamanio);
            ctx.restore();
        }
    }

    sePuedeSoltarFicha(ficha) {
        const enRangoHorizontal = ficha.x >= this.x && ficha.x <= this.x + this.tamanio;
        const enRangoVertical = ficha.y >= this.y && ficha.y <= this.y + this.tamanio;
        return enRangoHorizontal && enRangoVertical;
    }
}