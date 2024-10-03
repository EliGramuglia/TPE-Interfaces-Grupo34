"use strict";

document.addEventListener('DOMContentLoaded', () => {
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

    const listaCategorias = document.querySelector("#lista-categorias");

    for (let c of categorias) {
        listaCategorias.innerHTML +=
            `<li>
                <a href="#">
                    <img src="img/menu-categorias/${c.img}">
                    <span>${c.descripcion}</span>
                </a>
            </li>`;
    }

    const iconoMenu = document.querySelector('#menu-hamburguesa');
    const menuCategorias = document.querySelector('.contenedor-menu-categorias');

    iconoMenu.addEventListener('click', () => {
        menuCategorias.classList.toggle('abierto');
    });
});
