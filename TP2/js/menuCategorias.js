"use strict";

document.addEventListener('DOMContentLoaded', () => {
    // Cada categoría es un JSON con una imágen y una descripción
    const categorias = [
        { img: "inicio.png", descripcion: "Inicio" },
        { img: "recientes.png", descripcion: "Recientes" },
        { img: "favoritos.png", descripcion: "Favoritos" },
        { img: "nuevos.png", descripcion: "Nuevos" },
        { img: "trending.png", descripcion: "Trending" },
        { img: "random.png", descripcion: "Random" },
        { img: "accion.png", descripcion: "Acción" },
        { img: "autos.png", descripcion: "Autos" },
        { img: "aventura.png", descripcion: "Aventura" },
        { img: "basquet.png", descripcion: "Básquet" },
        { img: "billar.png", descripcion: "Billar" },
        { img: "cartas.png", descripcion: "Cartas" },
        { img: "clasicos.png", descripcion: "Clásicos" },
        { img: "defensa-torre.png", descripcion: "Defensa de torre" },
        { img: "disparos.png", descripcion: "Disparos" },
        { img: "escape.png", descripcion: "Escape" },
        { img: "futbol.png", descripcion: "Fútbol" },
        { img: "flash.png", descripcion: "Flash" },
        { img: "logica.png", descripcion: "Lógica" },
        { img: "minecraft.png", descripcion: "Minecraft" },
        { img: "motos.png", descripcion: "Motos" },
        { img: "multijugador.png", descripcion: "Multijugador" },
        { img: "puzzle.png", descripcion: "Puzzle" },
        { img: "terror.png", descripcion: "Terror" },
        { img: "etiquetas.png", descripcion: "Etiquetas" }
    ];

    // Creación de lista de categorías
    const listaCategorias = document.querySelector("#lista-categorias");
    for (let c of categorias) {
        // Se crean elementos HTML
        const li = document.createElement('li');
        const a = document.createElement('a');
        const img = document.createElement('img');
        const span = document.createElement('span');
    
        // Se establecen atributos
        img.src = `img/menu-categorias/${c.img}`;
        span.textContent = c.descripcion;
        a.href = '#';

        // Se agregan al documento
        a.appendChild(img);
        a.appendChild(span);
        li.appendChild(a);
        listaCategorias.appendChild(li);
    }

    // Menú hamburguesa
    const iconoMenu = document.querySelector('#menu-hamburguesa');
    const menuCategorias = document.querySelector('.contenedor-menu-categorias');

    iconoMenu.addEventListener('click', () => {
        menuCategorias.classList.toggle('abierto');
    });
});
