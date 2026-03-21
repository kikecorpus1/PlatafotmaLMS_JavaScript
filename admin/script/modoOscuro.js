// ✅ modoOscuro.js — Aplica el modo oscuro en TODAS las páginas automáticamente
// Agregar en todos los HTML del admin antes de </body>:
// <script src="../script/modoOscuro.js"></script>

document.addEventListener("DOMContentLoaded", () => {

    // ✅ Aplicar modo guardado al cargar CUALQUIER página
    if (localStorage.getItem("modoOscuro") === "true") {
        document.body.classList.add("modoOscuro");
        const toggleOff = document.getElementById("modoOscuro");
        const toggleOn  = document.getElementById("modoClaro");
        if (toggleOff) toggleOff.style.opacity = "0";
        if (toggleOn)  toggleOn.style.display = "block";
    }

    // ✅ Botón encender modo oscuro
    const btnOff = document.getElementById("modoOscuro");
    const btnOn  = document.getElementById("modoClaro");

    if (btnOff) {
        btnOff.addEventListener("click", () => {
            document.body.classList.add("modoOscuro");
            btnOff.style.opacity = "0";
            if (btnOn) btnOn.style.display = "block";
            localStorage.setItem("modoOscuro", "true");
        });
    }

    if (btnOn) {
        btnOn.addEventListener("click", () => {
            document.body.classList.remove("modoOscuro");
            if (btnOff) btnOff.style.opacity = "1";
            btnOn.style.display = "none";
            localStorage.setItem("modoOscuro", "false");
        });
    }

});
