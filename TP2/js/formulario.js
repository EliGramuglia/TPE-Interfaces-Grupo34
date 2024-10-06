"use strict"

//selecciono las 2 opciones con sus dos contenedores correspondientes
const opcIngreso = document.getElementById('opcIngreso');
const opcRegistro = document.getElementById('opcRegistro');
const formIngreso = document.getElementById('formIngreso');
const formRegistro = document.getElementById('formRegistro');

opcIngreso.addEventListener('click', () => cambiarCaja(formIngreso, formRegistro));
opcRegistro.addEventListener('click', () => cambiarCaja(formRegistro, formIngreso));

function cambiarCaja(box1,box2){
    //muestro el box1
    box1.classList.remove("oculto");
    //escondo el box2
    box2.classList.add("oculto");
}

//----------------------------------------------------------------------------------
// funcionalidad para cambiar el estilo al nav del formulario de ingreso/registro
const opciones = document.querySelectorAll('.nav-registro h2');

opciones.forEach(opcion => {
    opcion.addEventListener('click', () => {
        opciones.forEach(opc => opc.classList.remove('active')),
        opciones.forEach(opc => opc.classList.add('inactivo'));

    opcion.classList.add("active");
    });
});


