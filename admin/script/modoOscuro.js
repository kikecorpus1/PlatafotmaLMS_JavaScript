// Aplica inmediatamente antes de que renderice el DOM
(function() {
    if (localStorage.getItem("modoOscuro") === "true") {
        document.documentElement.classList.add("modoOscuro");
    }
})();

document.addEventListener("DOMContentLoaded", () => {

    // Sincronizar body con html
    if (localStorage.getItem("modoOscuro") === "true") {
        document.body.classList.add("modoOscuro");
    }

    const btnOff = document.getElementById("modoOscuro");
    const btnOn  = document.getElementById("modoClaro");

    // Actualizar estado visual del toggle si existe en esta página
    if (localStorage.getItem("modoOscuro") === "true") {
        if (btnOff) btnOff.style.opacity = "0";
        if (btnOn)  btnOn.style.display = "block";
    }

    if (btnOff) {
        btnOff.addEventListener("click", () => {
            document.body.classList.add("modoOscuro");
            document.documentElement.classList.add("modoOscuro");
            btnOff.style.opacity = "0";
            if (btnOn) btnOn.style.display = "block";
            localStorage.setItem("modoOscuro", "true");
        });
    }

    if (btnOn) {
        btnOn.addEventListener("click", () => {
            document.body.classList.remove("modoOscuro");
            document.documentElement.classList.remove("modoOscuro");
            if (btnOff) btnOff.style.opacity = "1";
            btnOn.style.display = "none";
            localStorage.setItem("modoOscuro", "false");
        });
    }
});