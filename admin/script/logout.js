// ✅ logout.js — Limpia la sesión antes de redirigir
// Agregar este script a cualquier página que tenga "Cerrar Sesión"

function cerrarSesion(rutaLogin = "../../index.html") {
    // Guardar preferencias antes de limpiar
    const modoOscuro = localStorage.getItem("modoOscuro");
    const configLMS = localStorage.getItem("configLMS");
    
    localStorage.clear();
    
    // Restaurar preferencias
    if (modoOscuro) localStorage.setItem("modoOscuro", modoOscuro);
    if (configLMS) localStorage.setItem("configLMS", configLMS);
    
    window.location.href = rutaLogin;
}

// Aplica automáticamente a todos los links con id="btnCerrarSesion"
document.addEventListener("DOMContentLoaded", () => {
    const btns = document.querySelectorAll("#btnCerrarSesion, .btn-cerrar-sesion");
    btns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            cerrarSesion();
        });
    });
});
