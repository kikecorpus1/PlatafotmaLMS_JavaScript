document.addEventListener('DOMContentLoaded', async() => {

    // ✅ FIX: validar que haya sesión antes de continuar
    const listaAdministradores = JSON.parse(localStorage.getItem("usuario"));

    if (!listaAdministradores) {
        alert("No hay sesión activa. Por favor inicia sesión.");
        window.location.href = "../../index.html";
        return;
    }

    let cuadroFPerfil = document.getElementById("fotoPerfil");

    try {
        cuadroFPerfil.innerHTML = `
          <div>
            <img class="fp" src="${listaAdministradores.foto}" width="200" style="border-radius: 50%;">
          </div>
          <div>
            <p>Nombre: ${listaAdministradores.nombre}</p>
            <p>Usuario: ${listaAdministradores.usuario}</p>
            <p>Rol: ${listaAdministradores.rol}</p>
          </div>
        `;
    } catch (error) {
        console.error("Error al mostrar perfil:", error);
    }

});
