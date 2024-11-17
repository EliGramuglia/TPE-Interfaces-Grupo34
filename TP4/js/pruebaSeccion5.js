"use strict"

/*-------------------- SECCIÓN 5: MÁS AMIGOS, MÁS DIVERSIÓN ------------------------*/

/*window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("#contenedor-mas-amigos .texto-oculto");
    const imgElement = document.getElementById("img-dinamica");

    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const progress = (window.innerHeight - rect.top) / window.innerHeight;

        // Ajusta la visibilidad de los textos y las imágenes basándote en el progreso
        if (progress > 0.2 && progress < 0.8) {
            section.classList.add("visible");

            // Cambiar la imagen dependiendo de la sección visible
            switch (index) {
                case 0:
                    imgElement.src = "img/number-blocks/sec_5_mas_amigos/img-1.png";
                    break;
                case 1:
                    imgElement.src = "img/number-blocks/sec_5_mas_amigos/img-2.png";
                    break;
                // Agrega más casos para cada texto y su imagen correspondiente
            }
        } else {
            section.classList.remove("visible");
        }
    });
});*/