"use strict"

import {Juego} from './juego.js';

document.addEventListener('DOMContentLoaded', () => {
    //me traigo todos los elementos que voy a usar en la configuracion
    let btnJugar = document.getElementById('btn-jugar-especial');
    const previsualizacion = document.querySelector('.previsualizacion');
    const contenedorOpcTablero = document.querySelector('.contenedor-modos-tablero');
    const contenedorConfig = document.getElementById('contenedor-configuracion-juego');
    const canvas = document.getElementById('canvas');
    const contenedorbtnsJuego = document.querySelector('#contenedor-botones-canvas-juego');
    const cardResultado = document.getElementById('contenedor-card-ganador');
    const msgConfirmacion = document.getElementById('contenedor-mensaje-confirmacion');
    const contenedorPantallaJuego = document.querySelector('.contenedor-pantalla-juego');

    //si clickean el btn se activa la funcion que muestra la configuracion
    btnJugar.addEventListener('click', mostrarConfiguracionJuego);

    function mostrarConfiguracionJuego() {
        previsualizacion.classList.remove('previsualizacion');
        previsualizacion.classList.add('oculto');
        mostrarConfigTablero()
    }
    //funcion para comenzar a mostrar la configuracion y modficiar el modo tablero
    function mostrarConfigTablero() {
        contenedorbtnsJuego.style.display = 'none';
        pantallaJuego.style.backgroundImage = 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(2, 87, 214, 0.5))';
        contenedorPantallaJuego.style.backgroundImage = "url(../img/pagina-juego/perros-vs-gatos/fondo-huellitas.png)";
        contenedorOpcTablero.classList.add('contenedor-modos-tablero-activo');
        contenedorOpcTablero.classList.remove('oculto');
        habilitarBotonesOpcTablero();
        mostrar2daParteConfig();

    }
    function mostrar2daParteConfig(){
        //si se aprieta alguna opcion de tablero, se sigue con la configuracion
        const botonesTablero = contenedorOpcTablero.querySelectorAll('.btn-tipoTablero');
        botonesTablero.forEach(boton => {
            boton.addEventListener('click', () => {
                contenedorOpcTablero.classList.remove('contenedor-modos-tablero-activo');
                contenedorOpcTablero.classList.add('oculto');
                contenedorConfig.classList.remove('oculto');
                contenedorConfig.classList.add('contenedor-configuracion-juego-activo');
                gestionarDatosJuego();
                habilitarCambioFicha();
            });
        });
    }

    //funcion para variar quien es el jugador 1 y jugador 2
    function gestionarDatosJuego() {

        let btnComenzarJuego = document.getElementById('btn-jugar-comenzar');

        btnComenzarJuego.addEventListener('click', () => {
            //oculto el contenedor de configuracion para mostrar el juego
            contenedorConfig.classList.remove('contenedor-configuracion-juego-activo');
            contenedorConfig.classList.add('oculto');
            inicializarJuego();
        })

        let btnVolverConfigTablero = document.getElementById('btn-volver-juego');

        btnVolverConfigTablero.addEventListener('click', () =>{
            contenedorConfig.classList.remove('contenedor-configuracion-juego-activo');
            contenedorConfig.classList.add('oculto');
            mostrarConfigTablero();
        });
        //si se aprieta el btn jugar se activa la funcion que crea el juego con los datos recolectados
    }


    let imgGato = './img/pagina-juego/perros-vs-gatos/ficha-gato-1.png';
    let imgPerro = './img/pagina-juego/perros-vs-gatos/ficha-perro-1.png';

    // funcion para habilitar el despliegue de las opciones de ficha
    function habilitarCambioFicha(){
        const btnCambarFichaGato = document.getElementById('btnModificarFichaGato');
        const btnCambarFichaPerro = document.getElementById('btnModificarFichaPerro');
        const contenedorOpcFichasPerro = document.getElementById('cajas-opc-fichas-perro');
        const contenedorOpcFichasGato = document.getElementById('cajas-opc-fichas-gato');
        const fichaprincipalGato = document.getElementById('fichaPrincipalGato');
        const fichaprincipalPerro = document.getElementById('fichaPrincipalPerro');

        btnCambarFichaGato.addEventListener('click', () => {
            contenedorOpcFichasGato.classList.toggle('objInvisible');
        })
        btnCambarFichaPerro.addEventListener('click', () => {
            contenedorOpcFichasPerro.classList.toggle('objInvisible');
        })

        // LA FICHA MAS GRANDE TOME EL VALOR DEL BTN OPC FICHA seleccionado
        let fichasGato = document.querySelectorAll('.imgs-cat');
        fichasGato.forEach(btnFicha => {
            btnFicha.addEventListener('click', () => {
                imgGato = btnFicha.src;
                fichaprincipalGato.src = imgGato;
            });
        });

        let fichasPerro = document.querySelectorAll('.imgs-dog');
        fichasPerro.forEach(btnFicha => {
            btnFicha.addEventListener('click', () => {
                imgPerro = btnFicha.src;
                fichaprincipalPerro.src = imgPerro;
            });
        });
    };

    let cantFichasEnLinea = 4;

    function habilitarBotonesOpcTablero() {
        document.getElementById('btn-opc1').addEventListener('click', () => {
            cantFichasEnLinea = 4;
        });

        document.getElementById('btn-opc2').addEventListener('click', () => {
            cantFichasEnLinea = 5;

        });

        document.getElementById('btn-opc3').addEventListener('click', () => {
            cantFichasEnLinea = 6;
        });

        document.getElementById('btn-opc4').addEventListener('click', () => {
            cantFichasEnLinea = 7;
        });
    }


    function habilitarOpcJuego(juego){
        const btnHome = document.getElementById('btn-home');
        const btnReset = document.getElementById('btn-reset');
        const btnResetCard = document.getElementById('btn-card-reset');
        const btnVolverConfig = document.getElementById('btn-card-volver-config');
        const btnNegarReset = document.getElementById('btn-confirmacion-no');
        const btnConfirmarReset = document.getElementById('btn-confirmacion-si');
        
        //btn de volver a confirguracion en el juego
        btnHome.addEventListener('click', ()=>{
            canvas.classList.add('oculto');
            contenedorbtnsJuego.style.display = 'none';
            msgConfirmacion.classList.add('oculto');
            mostrarConfigTablero();
            //deberia de pausar el juego o elimiar la instancia de juego asi no se sigure ejecutando
        })
        //btn reset del juevo, muestra 2 btn para confirmar positiva o negativamente
        btnReset.addEventListener('click', () =>{
            msgConfirmacion.classList.remove('oculto');
        });

        btnNegarReset.addEventListener('click', ()=>{
            msgConfirmacion.classList.add('oculto');

        })

        btnConfirmarReset.addEventListener('click', ()=>{
            msgConfirmacion.classList.add('oculto');
            juego.inicializar();
        })


        //botones dentro de la card que dice el resultado, primero ocultan su contenedor y luego generan una accion
        btnResetCard.addEventListener('click', () =>{
            cardResultado.classList.remove('contenedor-card-ganador-activo')
            cardResultado.classList.add('oculto');
            juego.inicializar();
        })

        btnVolverConfig.addEventListener('click', () =>{
            cardResultado.classList.remove('contenedor-card-ganador-activo');
            cardResultado.classList.add('oculto');
            canvas.classList.add('oculto');
            mostrarConfigTablero();
            //deberia de pausar el juego o elimiar la instancia de juego asi no se sigure ejecutando
        })
    }

    function inicializarJuego() {
        //creo la instancia juego con todos los datos necesarios y luego muestro el canvas
        const juego = new Juego('#canvas', cantFichasEnLinea, imgGato, imgPerro,cardResultado);
        canvas.classList.remove('oculto');
        contenedorbtnsJuego.style.display = 'flex';
        juego.jugar();
        habilitarOpcJuego(juego);
    }
});
