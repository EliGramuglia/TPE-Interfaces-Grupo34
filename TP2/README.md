# Interfaces de usuario e interacción
## Integrantes del grupo
- Guidi, Franco
- Simos, Julieta
- Gramuglia Eliana

## Ejercicio Entregable N2: Desarrollo de interfaz de usuario.
El presente trabajo fue desarrollado en el marco de la materia "Interfaces de usuario e interacción" (Facultad de Ciencias Exactas, UNICEN, Tandil). El mismo propone desarrollar en HTML, CSS y JavaScript realizado en el Ejercicio Entregable N1.

La plataforma solicitada incluye las siguientes 3 páginas:
1. Home con listado de juegos
2. Página de juego en modo ejecución usando “4 en línea” cómo juego a mostrar
3. Página de registración (login) a la pagina.

A continuación, se enumeran algunas de las funcionalidades que posee el sitio:
### 1. Elementos comunes a todas las páginas
#### Header
- Logos animados al hacer hover.
- Barra de búsqueda con input de texto.
- Menú hamburguesa que, al hacer clic, despliega un menú de categorías en el borde izquierdo. Cada elemento del menú tiene una animación de desplazamiento horizontal.
- Avatar de usuario que, al hacer clic, despliega un menú de usuario en el borde derecho.
- Diseño responsive mobile first.

#### Footer
- Diseño con estilo Fat Footer.
- Posee un menú con enlaces relacionados a la página, íconos de redes sociales y un formulario para suscribirse al sitio.
- En la versión para escritorio, el menú muestra todos los enlaces en distintas columnas, mientras que en la versión móvil, se debe hacer clic en cada título para poder desplegar las opciones.
- Los íconos de redes sociales tienen animación al hacer hover.
- Diseño responsive mobile first.

### 2. Inicio
La página de inicio presenta una imagen hero, carruseles de juegos ordenados por categoría y un banner. Esta página está diseñada siguiendo los principios de mobile first.

#### Imagen hero
- Se ubica en la parte superior de la página y muestra los juegos descatados.
- Cambia la imagen y datos del juego en intervalos regulares de tiempo.
- Al cambiar de imagen se producen las siguientes animaciones: Desenfoque de imagen, desplazamiento lateral en título de juego y transparencia en categoría de juego.
- Posee flechas de navegación que se hacen visibles cuando se coloca el cursor sobre la imagen. Además, éstas se descatan al hacerles hover.
- Cada imagen de fondo se desliza verticalmente.

#### Carruseles
- Carruseles funcionales de tarjetas (cards) de juegos. Cada tarjeta posee la imagen, titulo, precio y puntaje del juego. Además, tiene un botón para agregar a favoritos (corazón rojo) y otro para añadir al carrito de compras o jugar, dependiendo de si el juego es pago o gratuito.
- La navegación en el carrusel se realiza mediante flechas que aparecen al hacer hover.

#### Banner
- Se sitúa en la parte inferior de la página, justo por encima del footer.
- Incluye una imagen que se desliza verticalmente.

### 3. Login

### 4. Página de juego