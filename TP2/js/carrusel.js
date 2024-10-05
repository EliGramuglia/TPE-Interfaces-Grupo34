"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const cardsAccion = [ // Carrusel
        { nombre: "Battle Simulator", img: "ac_battle-simulator.png", precio: 0, puntaje: 4.7 }, // Card 1
        { nombre: "Merge Cannon: Chicken Defense", img: "ac_chicken-defense.png", precio: 0, puntaje: 3.8 }, // Card 2
        { nombre: "Merge Tanks", img: "ac_merge-tanks.png", precio: 1299, puntaje: 4.0 }, // ...
        { nombre: "Stickman Archero Fight", img: "ac_stickman-archero-fight.png", precio: 0, puntaje: 3.2 },
        { nombre: "Stickman WWII", img: "ac_stickman-ww2.png", precio: 2499, puntaje: 4.9 }
    ];

    const cardsAventura = [
        { nombre: "Battle Simulator", img: "ac_battle-simulator.png", precio: 0, puntaje: 4.7 },
        { nombre: "Merge Cannon: Chicken Defense", img: "ac_chicken-defense.png", precio: 0, puntaje: 3.8 },
        { nombre: "Merge Tanks", img: "ac_merge-tanks.png", precio: 1299, puntaje: 4.0 },
        { nombre: "Stickman Archero Fight", img: "ac_stickman-archero-fight.png", precio: 0, puntaje: 3.2 },
        { nombre: "Stickman WWII", img: "ac_stickman-ww2.png", precio: 2499, puntaje: 4.9 }
    ];

    const cardsClasicos = [
        { nombre: "DuckPark.io", img: "cl_duckpark-io.png", precio: 899, puntaje: 4.6 },
        { nombre: "Shell Shockers", img: "cl_shell-shockers.png", precio: 599, puntaje: 3.2 },
        { nombre: "Snake.io", img: "cl_snake-io.png", precio: 599, puntaje: 3.2 },
        { nombre: "Taming.io", img: "cl_taming-io.png", precio: 0, puntaje: 4.9 },
        { nombre: "Worm Hunt", img: "cl_worm-hunt.png", precio: 0, puntaje: 3.9 }
    ];

    const cardsDestacados = [
        { nombre: "", img: "ds_drift-boss.png", precio: 0, puntaje: 0 },
        { nombre: "", img: "", precio: 0, puntaje: 0 },
        { nombre: "", img: "", precio: 0, puntaje: 0 },
        { nombre: "", img: "", precio: 0, puntaje: 0 },
        { nombre: "", img: "", precio: 0, puntaje: 0 },
    ];

    const cardsFutbol = [
        { nombre: "", img: "", precio: 0, puntaje: 0 },
        { nombre: "", img: "", precio: 0, puntaje: 0 },
        { nombre: "", img: "", precio: 0, puntaje: 0 },
        { nombre: "", img: "", precio: 0, puntaje: 0 },
        { nombre: "", img: "", precio: 0, puntaje: 0 },
    ];

    const carruselAccion = document.querySelector("#carrusel-accion");
    for (let card of cardsAccion) {
        // Crear el contenedor principal de la tarjeta
        const divCard = document.createElement('div');
        divCard.id = "card";
    
        // Crear el contenedor de la imagen
        const divImagen = document.createElement('div');
        divImagen.id = "contenedor-imagen-tarjeta";
    
        // Crear la imagen del juego
        const imgJuego = document.createElement('img');
        imgJuego.src = `img/cards/${card.img}`;
        imgJuego.alt = card.nombre;
    
        // Crear el botón de favoritos
        const btnFavoritos = document.createElement('button');
        btnFavoritos.id = "icono-corazon-favoritos";
        const imgCorazon = document.createElement('img');
        imgCorazon.src = "img/iconos/tarjetas-juegos/corazon-blanco.png";
        imgCorazon.alt = "Corazón para clickear los juegos favoritos";
        btnFavoritos.appendChild(imgCorazon);
    
        // Crear el contenedor de puntaje
        const divPuntaje = document.createElement('div');
        divPuntaje.id = "puntaje-juego";
        const imgEstrella = document.createElement('img');
        imgEstrella.src = "img/iconos/tarjetas-juegos/Estrella.png";
        imgEstrella.alt = "Estrella de puntaje juego";
        const pPuntaje = document.createElement('p');
        pPuntaje.textContent = card.puntaje.toFixed(1); // Formatear el puntaje a un decimal
        divPuntaje.appendChild(imgEstrella);
        divPuntaje.appendChild(pPuntaje);
    
        // Agregar la imagen y el botón de favoritos al contenedor de imagen
        divImagen.appendChild(imgJuego);
        divImagen.appendChild(btnFavoritos);
        divImagen.appendChild(divPuntaje);
    
        // Crear el contenedor de texto
        const divTexto = document.createElement('div');
        divTexto.id = "contenedor-texto-tarjeta";
        const divTextoInterno = document.createElement('div');
    
        // Crear el nombre del juego
        const pNombreJuego = document.createElement('p');
        pNombreJuego.id = "tarjeta-nombre-juego";
        pNombreJuego.textContent = card.nombre;
    
        // Crear el precio del juego
        const pPrecioJuego = document.createElement('p');
        pPrecioJuego.id = "tarjeta-precio-juego";
        pPrecioJuego.textContent = `$${card.precio.toFixed(2)}`; // Formatear el precio
    
        // Agregar nombre y precio al contenedor de texto
        divTextoInterno.appendChild(pNombreJuego);
        divTextoInterno.appendChild(pPrecioJuego);
        divTexto.appendChild(divTextoInterno);
    
        // Crear el botón de jugar
        const btnPlay = document.createElement('button');
        btnPlay.className = "iconos-tarjetas-play-carrito";
        const imgPlay = document.createElement('img');
        imgPlay.src = "img/iconos/tarjetas-juegos/icono-play.png";
        imgPlay.alt = "Icono play";
        btnPlay.appendChild(imgPlay);
    
        // Agregar el botón de jugar al contenedor de texto
        divTexto.appendChild(btnPlay);
    
        // Agregar todos los elementos a la tarjeta
        divCard.appendChild(divImagen);
        divCard.appendChild(divTexto);
    
        // Agregar la tarjeta al carrusel
        carruselAccion.appendChild(divCard);
    }
});



/* 
<div id="card">
    <div id="contenedor-imagen-tarjeta">
        <img src="img/cards/ac_chicken-defense.png" alt="Juego de acción">
        <button id="icono-corazon-favoritos">
            <img src="img/iconos/tarjetas-juegos/corazon-blanco.png"
                alt="Corazón para clickear los juegos favoritos">
        </button>
        <div id="puntaje-juego">
            <img src="img/iconos/tarjetas-juegos/Estrella.png" alt="Estrella de puntaje juego">
            <p>0.0</p>
        </div>
    </div>
    <div id="contenedor-texto-tarjeta">
        <div>
            <p id="tarjeta-nombre-juego">Nombre del juego</p>
            <p id="tarjeta-precio-juego">$000.00</p>
        </div>
        <button class="iconos-tarjetas-play-carrito">
            <img src="img/iconos/tarjetas-juegos/icono-play.png" alt="Icono play">
        </button>
    </div>
</div> 
*/