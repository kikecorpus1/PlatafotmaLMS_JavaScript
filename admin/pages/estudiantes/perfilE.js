document.addEventListener('DOMContentLoaded', async () => {

    // ✅ Verificar sesión
    const usuarioSesion = JSON.parse(localStorage.getItem("usuario"));
    if (!usuarioSesion) {
        alert("No hay sesión activa.");
        window.location.href = "../../../index.html";
        return;
    }

    let estudiante = {};
    const params = new URLSearchParams(window.location.search);
    const estudianteId = params.get("id");

    const url = "https://68a35617c5a31eb7bb1ff133.mockapi.io/Academiaswbar400/usuarios";

    const cuadroFPerfil = document.getElementById("fotoPerfil");
    const cuadroInfoP = document.getElementById("infoPerfil");

    // ✅ Fetch estudiante
    async function fetchEstudiante() {
        try {
            const res = await fetch(`${url}/${estudianteId}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            if (!res.ok) throw new Error("Error al obtener estudiante");
            estudiante = await res.json();
        } catch (error) {
            console.error("Error:", error);
            alert("No se pudo cargar el estudiante.");
        }
    }

    // ✅ Renderizar perfil
    function renderizarPerfil() {
        cuadroFPerfil.innerHTML = `
            <div>
                <img src="${estudiante.foto}" width="150" style="border-radius: 50%; object-fit:cover; height:150px;">
            </div>
            <div>
                <p><strong>Nombre:</strong> ${estudiante.nombre}</p>
                <p><strong>Usuario:</strong> ${estudiante.usuario}</p>
                <p><strong>Identificación:</strong> ${estudiante.identificacion}</p>
                <p><strong>Estado:</strong> ${estudiante.estado || "activo"}</p>
            </div>
        `;

        cuadroInfoP.innerHTML = `
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Cursos Inscritos</th>
                        <th>Cursos Completados</th>
                        <th>Lecciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${(estudiante.cursosInscritos || []).length}</td>
                        <td>${(estudiante.cursosCompletados || []).length}</td>
                        <td>6</td>
                    </tr>
                </tbody>
            </table>
        `;
    }

    await fetchEstudiante();
    renderizarPerfil();

    // ✅ Botón Modificar
    document.getElementById("modificarDocente").addEventListener("click", () => {
        const existe = document.getElementById("formModificarEstudiante");
        if (existe) { existe.remove(); return; }

        const formDiv = document.createElement("div");
        formDiv.id = "formModificarEstudiante";
        formDiv.className = "mt-3 p-3";
        formDiv.style.background = "var(--color-tarjeta)";
        formDiv.style.borderRadius = "8px";
        formDiv.innerHTML = `
            <h5>Modificar Estudiante</h5>
            <div class="mb-2">
                <label class="form-label">Nombre</label>
                <input type="text" id="editNombre" class="form-control" value="${estudiante.nombre}">
            </div>
            <div class="mb-2">
                <label class="form-label">Foto (URL)</label>
                <input type="url" id="editFoto" class="form-control" value="${estudiante.foto}">
            </div>
            <div class="mb-2">
                <label class="form-label">Identificación</label>
                <input type="text" id="editIdentificacion" class="form-control" value="${estudiante.identificacion}">
            </div>
            <div class="mb-2">
                <label class="form-label">Estado</label>
                <select id="editEstado" class="form-select">
                    <option value="activo" ${estudiante.estado === "activo" ? "selected" : ""}>Activo</option>
                    <option value="inactivo" ${estudiante.estado === "inactivo" ? "selected" : ""}>Inactivo</option>
                </select>
            </div>
            <div class="d-flex gap-2 mt-3">
                <button class="btn btn-warning" id="btnGuardarModificacion">Guardar</button>
                <button class="btn btn-secondary" id="btnCancelarModificacion">Cancelar</button>
            </div>
        `;

        cuadroInfoP.after(formDiv);

        document.getElementById("btnCancelarModificacion").addEventListener("click", () => formDiv.remove());
        document.getElementById("btnGuardarModificacion").addEventListener("click", guardarModificacion);
    });

    // ✅ Guardar modificación
    async function guardarModificacion() {
        const estudianteEditado = {
            ...estudiante,
            nombre: document.getElementById("editNombre").value.trim(),
            foto: document.getElementById("editFoto").value.trim(),
            identificacion: document.getElementById("editIdentificacion").value.trim(),
            estado: document.getElementById("editEstado").value
        };

        try {
            const res = await fetch(`${url}/${estudianteId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(estudianteEditado)
            });

            if (res.ok) {
                estudiante = estudianteEditado;
                renderizarPerfil();
                document.getElementById("formModificarEstudiante")?.remove();
                alert("Estudiante actualizado correctamente");
            } else {
                alert("Error al actualizar");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("No se pudo conectar con el servidor");
        }
    }

    // ✅ Botón Eliminar
    document.getElementById("eliminarDocente").addEventListener("click", async () => {
        if (confirm(`¿Estás seguro de eliminar a ${estudiante.nombre}? Esta acción no se puede deshacer.`)) {
            try {
                const res = await fetch(`${url}/${estudianteId}`, { method: "DELETE" });
                if (res.ok) {
                    alert("Estudiante eliminado correctamente");
                    window.location.href = "./estudiantes.html";
                } else {
                    alert("Error al eliminar el estudiante");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Hubo un problema con el servidor");
            }
        }
    });

});
