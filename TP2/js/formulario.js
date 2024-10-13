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


const btnLogin = document.getElementById('btn-login');
const btnRegistro = document.getElementById('btn-registro');

btnRegistro.addEventListener('click', (e) => {
    e.preventDefault();

    window.location.href = 'login.html';
})

btnLogin.addEventListener('click', (e) => {
    e.preventDefault();

    window.location.href = 'index.html';
})


//funcionalidades para validacion de inputs
//arreglar problema de que se envia igual los btn, no importa el preventDefault
const formularioIngreso = document.querySelector('#formIngreso form');
const formularioRegistro = document.querySelector('#formRegistro form');


function advertenciaInput(inputForm) {
    inputForm.forEach(input => {
        if(input.value === ""){
            input.classList.add('inputFaltante');
        }else{
            input.classList.remove('inputFaltante');
        }
})
}
function prevenirEnvio(e) {
    e.preventDefault();
}
btnLogin.addEventListener('click', (e) => {
    let inputForm = document.querySelectorAll('#formIngreso form input');
    e.preventDefault();
    advertenciaInput(inputForm);
});

btnRegistro.addEventListener('click', (e) => {
    let inputForm = document.querySelectorAll('#formRegistro form input');
    e.preventDefault();
    advertenciaInput(inputForm);
});
