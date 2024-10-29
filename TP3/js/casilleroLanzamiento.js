export class CasilleroLanzamiento {
    constructor(x, y, columna, tamanio) {
        this.x = x;
        this.y = y;
        this.columna = columna;
        this.ancho = tamanio;
        this.alto = tamanio * 2;
        this.visible = false;

        this.img = new Image();
        this.img.src = '';
        this.anchoImg = 30;
        this.altoImg = 30;
        this.posYImg; // Se va a calcular cuando elijamos una imagen
        this.imgCargada = false;
        this.img.onload = () => {
            this.imgCargada = true;
        };

        this.contadorMovimiento = 0;
        this.framesCambioDireccion = 60; // Cantidad de frames antes de un cambio de dirección
        this.vy = .5; // Velocidad de movimiento en Y de la imagen
    }

    actualizar() {
        this.contadorMovimiento++;
        if (this.contadorMovimiento < this.framesCambioDireccion) {
            this.posYImg += this.vy;
        } else {
            this.contadorMovimiento = 0;
            this.vy *= -1; // Se invierte la dirección
        }
    }

    /**
     * Muestra imagen de flecha cuando es seleccionada una ficha.
     */
    dibujar(ctx) {
        if (this.imgCargada && this.visible) {
            ctx.drawImage(this.img, this.x, this.y, this.ancho, this.alto);
        }
    }

    fichaEnCasilleroLanzamiento(ficha) {
        const enRangoHorizontal = ficha.x >= this.x && ficha.x + ficha.radio * 2 <= this.x + this.ancho;
        const enRangoVertical = ficha.y >= this.y && ficha.y + ficha.radio * 2 <= this.y + this.alto;
        return enRangoHorizontal && enRangoVertical; 
    }
}