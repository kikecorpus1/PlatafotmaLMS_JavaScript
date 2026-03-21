document.addEventListener('DOMContentLoaded', async () => {

    // ✅ Verificar sesión
    const usuarioSesion = JSON.parse(localStorage.getItem("usuario"));
    if (!usuarioSesion) {
        alert("No hay sesión activa.");
        window.location.href = "../../../index.html";
        return;
    }

    let docente = {};
    const params = new URLSearchParams(window.location.search);
    const docenteId = params.get("id");

    const url = "https://68a35617c5a31eb7bb1ff133.mockapi.io/Academiaswbar400/docentes";

    const cuadroFPerfil = document.getElementById("fotoPerfil");
    const cuadroInfoP = document.getElementById("infoPerfil");

    // ✅ Fetch docente
    async function fetchDocente() {
        try {
            const res = await fetch(`${url}/${docenteId}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            if (!res.ok) throw new Error("Error al obtener docente");
            docente = await res.json();
        } catch (error) {
            console.error("Error:", error);
            alert("No se pudo cargar el docente.");
        }
    }

    // ✅ Renderizar perfil
    function renderizarPerfil() {
        cuadroFPerfil.innerHTML = `
            <div>
                <img src="${docente.foto}" width="150" style="border-radius: 50%; object-fit:cover; height:150px;">
            </div>
            <div>
                <p><strong>Nombre:</strong> ${docente.nombre}</p>
                <p><strong>Usuario:</strong> ${docente.usuario}</p>
                <p><strong>Fecha de inicio:</strong> ${docente.fechaInicio}</p>
                <p><strong>Estado:</strong> ${docente.estado}</p>
            </div>
        `;

        cuadroInfoP.innerHTML = `
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Cursos a Cargo</th>
                        <th>Estudiantes</th>
                        <th>Lecciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${(docente.cursosACargo || []).join(", ") || "—"}</td>
                        <td>30</td>
                        <td>6</td>
                    </tr>
                </tbody>
            </table>
        `;
    }

    await fetchDocente();
    renderizarPerfil();

    // ✅ Botón Modificar — abre formulario inline
    document.getElementById("modificarDocente").addEventListener("click", () => {
        const existe = document.getElementById("formModificarDocente");
        if (existe) { existe.remove(); return; }

        const formDiv = document.createElement("div");
        formDiv.id = "formModificarDocente";
        formDiv.className = "mt-3 p-3";
        formDiv.style.background = "var(--color-tarjeta)";
        formDiv.style.borderRadius = "8px";
        formDiv.innerHTML = `
            <h5>Modificar Docente</h5>
            <div class="mb-2">
                <label class="form-label">Nombre</label>
                <input type="text" id="editNombre" class="form-control" value="${docente.nombre}">
            </div>
            <div class="mb-2">
                <label class="form-label">Foto (URL)</label>
                <input type="url" id="editFoto" class="form-control" value="${docente.foto}">
            </div>
            <div class="mb-2">
                <label class="form-label">Estado</label>
                <select id="editEstado" class="form-select">
                    <option value="activo" ${docente.estado === "activo" ? "selected" : ""}>Activo</option>
                    <option value="inactivo" ${docente.estado === "inactivo" ? "selected" : ""}>Inactivo</option>
                </select>
            </div>
            <div class="mb-2">
                <label class="form-label">Cursos a cargo (separados por coma)</label>
                <input type="text" id="editCursos" class="form-control" value="${(docente.cursosACargo || []).join(", ")}">
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
        const docenteEditado = {
            ...docente,
            nombre: document.getElementById("editNombre").value.trim(),
            foto: document.getElementById("editFoto").value.trim(),
            estado: document.getElementById("editEstado").value,
            cursosACargo: document.getElementById("editCursos").value
                .split(",").map(c => c.trim()).filter(c => c !== "")
        };

        try {
            const res = await fetch(`${url}/${docenteId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(docenteEditado)
            });

            if (res.ok) {
                docente = docenteEditado;
                renderizarPerfil();
                document.getElementById("formModificarDocente")?.remove();
                alert("Docente actualizado correctamente");
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
        if (confirm(`¿Estás seguro de eliminar a ${docente.nombre}? Esta acción no se puede deshacer.`)) {
            try {
                const res = await fetch(`${url}/${docenteId}`, { method: "DELETE" });
                if (res.ok) {
                    alert("Docente eliminado correctamente");
                    window.location.href = "./docente.html";
                } else {
                    alert("Error al eliminar el docente");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Hubo un problema con el servidor");
            }
        }
    });

});
