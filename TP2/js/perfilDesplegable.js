"use strict";

//Traigo los elementos html que voy a manipular
const iconoPerfil = document.getElementById('icono-perfil'); //const porque los valores de las variables no pueden ser re-asignados
const perfilDesplegable = document.getElementById('contendor-perfil-desplegable');
const cruzSalir = document.getElementById('cerrar-perfil');

//Agrego un evento de escucha: cuando el usuario haga click ejecute las sig sentencias
iconoPerfil.addEventListener('click', () => {
    if(perfilDesplegable.style.display === 'none'){ //la sección del perfil desplegable comienza oculta
        perfilDesplegable.style.display = 'block'; //Block -> muestra el perfil
    } else {
        perfilDesplegable.style.display = 'none';
    }
});

cruzSalir.addEventListener('click', () => {
    perfilDesplegable.style.display = 'none'; //le reasigno el valor None para ocultar el perfil desplegable
});