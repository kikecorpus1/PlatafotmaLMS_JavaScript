document.addEventListener('DOMContentLoaded', async () => {

    // ✅ Verificar sesión
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if (!usuario) {
        alert("No hay sesión activa. Por favor inicia sesión.");
        window.location.href = "../index.html";
        return;
    }

    // ✅ Cerrar sesión — limpia localStorage antes de redirigir
    document.getElementById("btnCerrarSesion").addEventListener("click", cerrarSesion);
    document.getElementById("cerrarSesionNav").addEventListener("click", cerrarSesion);

    function cerrarSesion() {
        localStorage.clear();
        window.location.href = "../index.html";
    }

    // ✅ Mostrar info del usuario
    const esDocente = usuario.cursosACargo !== undefined;
    const rol = esDocente ? "Docente" : "Estudiante";

    document.getElementById("saludo").textContent = `Bienvenido, ${usuario.nombre}`;
    document.getElementById("rolUsuario").textContent = `Rol: ${rol}`;
    document.getElementById("usuarioInfo").textContent = `Usuario: ${usuario.usuario}`;
    document.getElementById("fotoBienvenida").src = usuario.foto || "https://randomuser.me/api/portraits/lego/1.jpg";
    document.getElementById("nombreUsuarioNav").textContent = usuario.nombre;

    document.getElementById("statNombre").textContent = usuario.nombre;
    document.getElementById("statRol").textContent = rol;

    const contenedorCursos = document.getElementById("contenedorCursos");

    // ✅ Panel DOCENTE
    if (esDocente) {
        const cursosACargo = usuario.cursosACargo || [];
        document.getElementById("statCursos").textContent = cursosACargo.length;

        if (cursosACargo.length === 0) {
            contenedorCursos.innerHTML = `<p class="text-muted">No tienes cursos asignados aún.</p>`;
            return;
        }

        try {
            const res = await fetch("https://68aab3e1909a5835049ccc4f.mockapi.io/cursos");
            const todosCursos = await res.json();

            // Filtrar solo los cursos del docente
            const misCursos = todosCursos.filter(curso =>
                cursosACargo.some(nombre =>
                    curso.nombre.toLowerCase().includes(nombre.toLowerCase())
                )
            );

            if (misCursos.length === 0) {
                contenedorCursos.innerHTML = `<p class="text-muted">No se encontraron cursos asignados.</p>`;
                return;
            }

            contenedorCursos.innerHTML = "";
            misCursos.forEach(curso => {
                contenedorCursos.innerHTML += `
                    <div class="curso-card">
                        <img src="${curso.foto || 'https://via.placeholder.com/80'}" alt="${curso.nombre}">
                        <div class="curso-info">
                            <h5>${curso.nombre}</h5>
                            <p>${curso.descripcion || ''}</p>
                            <p>Categoría: ${curso.categoria || '—'}</p>
                            <p>Módulos: ${curso.modulos ? curso.modulos.length : 0}</p>
                        </div>
                    </div>
                `;
            });

        } catch (error) {
            console.error("Error al cargar cursos:", error);
            contenedorCursos.innerHTML = `<p class="text-danger">Error al cargar los cursos.</p>`;
        }
    }

    // ✅ Panel ESTUDIANTE
    else {
        const cursosInscritos = usuario.cursosInscritos || [];
        document.getElementById("statCursos").textContent = cursosInscritos.length;

        if (cursosInscritos.length === 0) {
            contenedorCursos.innerHTML = `<p class="text-muted">No estás inscrito en ningún curso aún.</p>`;
            return;
        }

        try {
            const res = await fetch("https://68aab3e1909a5835049ccc4f.mockapi.io/cursos");
            const todosCursos = await res.json();

            const misCursos = todosCursos.filter(curso =>
                cursosInscritos.includes(curso.id) || cursosInscritos.includes(curso.nombre)
            );

            if (misCursos.length === 0) {
                contenedorCursos.innerHTML = `<p class="text-muted">No se encontraron tus cursos.</p>`;
                return;
            }

            contenedorCursos.innerHTML = "";
            misCursos.forEach(curso => {
                contenedorCursos.innerHTML += `
                    <div class="curso-card">
                        <img src="${curso.foto || 'https://via.placeholder.com/80'}" alt="${curso.nombre}">
                        <div class="curso-info">
                            <h5>${curso.nombre}</h5>
                            <p>${curso.descripcion || ''}</p>
                            <p>Docente: ${curso.docente || '—'}</p>
                            <p>Módulos: ${curso.modulos ? curso.modulos.length : 0}</p>
                        </div>
                    </div>
                `;
            });

        } catch (error) {
            console.error("Error al cargar cursos:", error);
            contenedorCursos.innerHTML = `<p class="text-danger">Error al cargar los cursos.</p>`;
        }
    }

});
