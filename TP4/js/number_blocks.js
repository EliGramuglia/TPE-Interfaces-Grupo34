"use strict"

//elementos necesarios para las animaciones
const pagina = document.getElementById('contenedor-pagina');
//guardo las secciones de la pag
const hero = document.getElementById('contenedor-hero-visual'); //sec 1: hero
const introTextual = document.getElementById('contenedor-presentacion-textual'); //sec 2: intro textual




// const wrapper = document.getElementById("wrapper");
// const paralx0 = document.getElementById("paralx0");
// const paralx1 = document.getElementById("paralx1");
// const paralx2 = document.getElementById("paralx2");

// wrapper.onscroll = function () {
//   let y = wrapper.scrollTop;
//   paralx0.style.top = 1800 - y * 2.65 + "px";
//   paralx1.style.top = 1200 - y * 0.75 + "px";
//   paralx2.style.top = 800 + y * 0.5 + "px";
// };

//capto el scroll de toda la pantalla
window.addEventListener('scroll', () => {
    let scrollTop = window.scrollY; 

        let topSec_2 = introTextual.getBoundingClientRect().top;
        // console.log("Posición actual del scroll:"+ topSec_2);
        previousScrollTop = scrollTop;
        if(scrollTop >= topSec_2 - topSec_2 / 2){
            console.log('dentor de la seccion, se activa animacion')
        }
});

let previousScrollTop = 0; // Variable para almacenar la posición anterior del scroll

// Tus funciones para mostrar/ocultar el menú o realizar otras acciones
function showIntroTextual() {
    // se animan los elementos de esta seccion
}

function show3Videos() {
    // se animan los elementos de esta seccion
}
