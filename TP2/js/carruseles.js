"use strict";

document.addEventListener("DOMContentLoaded", () => {
    class Tarjeta {
        constructor(nombre, img, precio, puntaje) {
            this.nombre = nombre;
            this.img = img;
            this.precio = precio;
            this.puntaje = puntaje;
        }
    }
    
    const tarjetas = {
        accion: [
            new Tarjeta("Battle Simulator", "ac_battle-simulator.png", 0, 4.7),
            new Tarjeta("Merge Cannon: Chicken Defense", "ac_chicken-defense.png", 0, 3.8),
            new Tarjeta("Merge Tanks", "ac_merge-tanks.png", 1299, 4.0),
            new Tarjeta("Stickman Archero Fight", "ac_stickman-archero-fight.png", 0, 3.2),
            new Tarjeta("Stickman WWII", "ac_stickman-ww2.png", 2499, 4.9),
        ],
        aventura: [
            new Tarjeta("Age of Tanks", "av_age-of-tanks.png", 0, 4.2),
            new Tarjeta("Build & Crush", "av_build-and-crush.png", 1399, 4.0),
            new Tarjeta("Hero 3", "av_hero-3.png", 399, 3.7),
            new Tarjeta("Ninja Parkour", "av_ninja-parkour.png", 0, 4.5),
            new Tarjeta("Space Wars", "av_space-wars.png", 0, 4.7),
        ],
        clasicos: [
            new Tarjeta("DuckPark.io", "cl_duckpark-io.png", 599, 4.8),
            new Tarjeta("Shell Shockers", "cl_shell-shockers.png", 799, 4.3),
            new Tarjeta("Snake.io", "cl_snake-io.png", 1299, 3.2),
            new Tarjeta("Taming.io", "cl_taming-io.png", 0, 4.9),
            new Tarjeta("Worm Hunt", "cl_worm-hunt.png", 0, 3.9),
        ],
        destacados: [
            new Tarjeta("Bloxd.io", "ds_bloxd-io.png", 1399, 4.5),
            new Tarjeta("Crazy Flips 3D", "ds_crazy-flips-3d.png", 599, 4.1),
            new Tarjeta("Doodle Road", "ds_doodle-road.png", 399, 4.6),
            new Tarjeta("Drift Boss", "ds_drift-boss.png", 0, 4.3),
            new Tarjeta("Jump Guys", "ds_jump-guys.png", 0, 4.8),
            new Tarjeta("Kour.io", "ds_kour-io.png", 799, 4.2),
            new Tarjeta("Lines", "ds_lines.png", 2999, 4.4),
            new Tarjeta("Smash Karts", "ds_smash-karts.png", 499, 4.7),
        ],
        futbol: [
            new Tarjeta("International Super Animal Soccer", "fb_international-super-animal-soccer.png", 1599, 4.5),
            new Tarjeta("Mini Caps Soccer", "fb_mini-caps-soccer.png", 0, 4.1),
            new Tarjeta("Penalty Rivals", "fb_penalty-rivals.png", 0, 4.3),
            new Tarjeta("Pill Soccer", "fb_pill-soccer.png", 799, 4.2),
            new Tarjeta("Soccer Challenge", "fb_soccer-challenge.png", 0, 4.6),
        ]
    }

    // Para cada categoría, se obtiene su tipo y contenedor, y se crea el carrusel correspondiente
    document.querySelectorAll('.categoria').forEach(categoria => {
        const tipo = categoria.dataset.tipo;
        const contenedorCarrusel = categoria.querySelector('.carrusel');
        if (tarjetas[tipo]) {
            crearCarrusel(tarjetas[tipo], contenedorCarrusel);
        }
    });

    // Crea un carrusel de tarjetas en un contenedor dado
    function crearCarrusel(tarjetas, contenedor) {
        for (let t of tarjetas) {
            // Se crea el contenedor principal de la tarjeta
            const divTarjeta = document.createElement('div');
            divTarjeta.className = "tarjeta";
        
            // Se crea el contenedor de la imagen
            const divImagen = document.createElement('div');
            divImagen.className = "contenedor-imagen-tarjeta";
        
            // Se crea la imagen del juego
            const imgJuego = document.createElement('img');
            imgJuego.src = `img/tarjetas/${t.img}`;
            imgJuego.alt = t.nombre;
        
            // Se crea el botón de favoritos
            const btnFavoritos = document.createElement('button');
            btnFavoritos.className = "icono-corazon-favoritos";
            const imgCorazon = document.createElement('img');
            imgCorazon.src = "img/iconos/tarjetas-juegos/corazon-blanco.png";
            imgCorazon.alt = "Agregar a favoritos";
            btnFavoritos.appendChild(imgCorazon);

            // Se agrega comportamiento al botón de favoritos
            let activado = false;
            btnFavoritos.addEventListener('click', () => {
                if (activado) {
                    imgCorazon.src = "img/iconos/tarjetas-juegos/corazon-blanco.png";
                    activado = false;
                } else {
                    imgCorazon.src = "img/iconos/tarjetas-juegos/corazon-rosa.png";
                    activado = true;
                }
            });
        
            // Se crea el contenedor de puntaje
            const divPuntaje = document.createElement('div');
            divPuntaje.className = "puntaje-juego";
            const imgEstrella = document.createElement('img');
            imgEstrella.src = "img/iconos/tarjetas-juegos/estrella.png";
            imgEstrella.alt = "Estrella de puntaje de juego";
            const pPuntaje = document.createElement('p');
            pPuntaje.textContent = t.puntaje.toFixed(1); // Puntaje con un solo decimal
            divPuntaje.appendChild(imgEstrella);
            divPuntaje.appendChild(pPuntaje);
        
            // Se agrega la imagen y el botón de favoritos al contenedor de imagen
            divImagen.appendChild(imgJuego);
            divImagen.appendChild(btnFavoritos);
            divImagen.appendChild(divPuntaje);
        
            // Se crea el contenedor de texto
            const divTexto = document.createElement('div');
            divTexto.className = "contenedor-texto-tarjeta";
            const divTextoInterno = document.createElement('div');
        
            // Se crea el nombre del juego
            const pNombreJuego = document.createElement('p');
            pNombreJuego.className = "tarjeta-nombre-juego";
            pNombreJuego.textContent = t.nombre;
        
            // Se crea el precio del juego
            const pPrecioJuego = document.createElement('p');
            pPrecioJuego.className = "tarjeta-precio-juego";
            pPrecioJuego.textContent = t.precio == 0 ? "Gratis" : `$ ${t.precio.toFixed(2)}`;
        
            // Se agrega nombre y precio al contenedor de texto
            divTextoInterno.appendChild(pNombreJuego);
            divTextoInterno.appendChild(pPrecioJuego);
            divTexto.appendChild(divTextoInterno);
        
            // Se crea el botón de jugar
            const btnPlay = document.createElement('button');
            btnPlay.className = "iconos-tarjetas-play-carrito";
            const imgPlay = document.createElement('img');
            imgPlay.src = "img/iconos/tarjetas-juegos/icono-play.png";
            imgPlay.alt = "Play";
            btnPlay.appendChild(imgPlay);
        
            // Se agrega el botón de jugar al contenedor de texto
            divTexto.appendChild(btnPlay);
        
            // Se agrega todos los elementos a la tarjeta
            divTarjeta.appendChild(divImagen);
            divTarjeta.appendChild(divTexto);
        
            // Se agrega la tarjeta al contenedor del carrusel
            contenedor.appendChild(divTarjeta);
        }
    }
});


/*
----------------------------- Ejemplo de tarjeta generada en HTML -----------------------------
<div class="tarjeta">
    <div class="contenedor-imagen-tarjeta">
        <img src="img/cards/ac_chicken-defense.png" alt="Juego de acción">
        <button class="icono-corazon-favoritos">
            <img src="img/iconos/tarjetas-juegos/corazon-blanco.png"
                alt="Corazón para clickear los juegos favoritos">
        </button>
        <div class="puntaje-juego">
            <img src="img/iconos/tarjetas-juegos/estrella.png" alt="Estrella de puntaje juego">
            <p>0.0</p>
        </div>
    </div>
    <div class="contenedor-texto-tarjeta">
        <div>
            <p class="tarjeta-nombre-juego">Nombre del juego</p>
            <p class="tarjeta-precio-juego">$000.00</p>
        </div>
        <button class="iconos-tarjetas-play-carrito">
            <img src="img/iconos/tarjetas-juegos/icono-play.png" alt="Icono play">
        </button>
    </div>
</div> 
*/