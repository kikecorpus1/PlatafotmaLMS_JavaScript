document.addEventListener("DOMContentLoaded", async () => {

    const contenedorModulos = document.getElementById("contenedorModulos");
    const tablaLecciones = document.getElementById("tablaLecciones");
    const portadaImg = document.getElementById("portadaImg");
    const tituloCurso = document.getElementById("tituloCurso");
    const descripcionCurso = document.getElementById("descripcionCurso");
    const statEstudiantes = document.getElementById("statEstudiantes");
    const statProgreso = document.getElementById("statProgreso");
    const statTareas = document.getElementById("statTareas");

    const params = new URLSearchParams(window.location.search);
    let cursoId = params.get("id");
    const baseUrl = "https://68aab3e1909a5835049ccc4f.mockapi.io/cursos";

    // ✅ Fetch inicial con try/catch
    let curso;
    try {
        const res = await fetch(`${baseUrl}/${cursoId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        if (!res.ok) throw new Error("Error al obtener el curso");
        curso = await res.json();
    } catch (error) {
        console.error("Error al cargar el curso:", error);
        alert("No se pudo cargar el curso. Verifica tu conexión.");
        return;
    }

    portadaImg.src = curso.foto;
    tituloCurso.textContent = curso.nombre;
    descripcionCurso.textContent = curso.descripcion;
    statEstudiantes.textContent = 30;
    statProgreso.textContent = "50%";
    statTareas.textContent = 1;

    // ✅ Renderizar módulos en el sidebar
    function renderizarModulos() {
        contenedorModulos.innerHTML = "";

        curso.modulos.forEach((modulo, idx) => {
            const modulito = document.createElement("div");
            modulito.className = "nav-link";
            modulito.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:center; padding:4px 8px;">
                    <p class="mb-0" style="cursor:pointer">${modulo.nombre}</p>
                    <button class="btn btn-sm btn-warning btnAgregarLeccion" data-idx="${idx}" title="Agregar lección">+</button>
                </div>
            `;

            modulito.querySelector("p").addEventListener("click", () => {
                verLecciones(modulo);
            });

            modulito.querySelector(".btnAgregarLeccion").addEventListener("click", (e) => {
                e.stopPropagation();
                mostrarFormLeccion(idx);
            });

            contenedorModulos.appendChild(modulito);

            if (idx === 0) verLecciones(modulo);
        });

        // Botón agregar módulo
        const btnAgregarModulo = document.createElement("button");
        btnAgregarModulo.className = "btn btn-primary btn-sm mt-3";
        btnAgregarModulo.style.width = "100%";
        btnAgregarModulo.textContent = "+ Agregar Módulo";
        btnAgregarModulo.addEventListener("click", mostrarFormModulo);
        contenedorModulos.appendChild(btnAgregarModulo);
    }

    renderizarModulos();

    // ✅ Ver lecciones de un módulo
    function verLecciones(modulo) {
        tablaLecciones.innerHTML = "";
        const lecciones = modulo.lecciones || [];

        if (lecciones.length === 0) {
            tablaLecciones.innerHTML = `<tr><td colspan="4" class="text-muted text-center">Sin lecciones aún</td></tr>`;
            return;
        }

        lecciones.forEach((leccion, i) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${i + 1}</td>
                <td>${leccion.nombre}</td>
                <td>${leccion.fechaInicio}</td>
                <td>${leccion.fechaFin}</td>
            `;
            tablaLecciones.appendChild(tr);
        });
    }

    // ✅ Form para crear módulo
    function mostrarFormModulo() {
        const existe = document.getElementById("formModuloContainer");
        if (existe) existe.remove();

        const formDiv = document.createElement("div");
        formDiv.id = "formModuloContainer";
        formDiv.className = "mt-3 p-2";
        formDiv.style.background = "var(--color-tarjeta)";
        formDiv.style.borderRadius = "8px";
        formDiv.innerHTML = `
            <p class="mb-1"><strong>Nuevo Módulo</strong></p>
            <input type="text" id="inputNombreModulo" class="form-control mb-2" placeholder="Nombre del módulo">
            <div class="d-flex gap-2">
                <button class="btn btn-warning btn-sm" id="btnGuardarModulo">Guardar</button>
                <button class="btn btn-secondary btn-sm" id="btnCancelarModulo">Cancelar</button>
            </div>
        `;
        contenedorModulos.appendChild(formDiv);

        document.getElementById("btnCancelarModulo").addEventListener("click", () => formDiv.remove());
        document.getElementById("btnGuardarModulo").addEventListener("click", guardarModulo);
    }

    // ✅ Guardar módulo
    async function guardarModulo() {
        const nombre = document.getElementById("inputNombreModulo").value.trim();
        if (!nombre) { alert("Ingresa un nombre para el módulo"); return; }

        curso.modulos.push({ nombre, lecciones: [] });
        await actualizarCurso();
        renderizarModulos();
    }

    // ✅ Form para crear lección
    function mostrarFormLeccion(moduloIdx) {
        const existe = document.getElementById("formLeccionContainer");
        if (existe) existe.remove();

        const formDiv = document.createElement("div");
        formDiv.id = "formLeccionContainer";
        formDiv.className = "mt-3 p-3";
        formDiv.style.background = "var(--color-tarjeta)";
        formDiv.style.borderRadius = "8px";
        formDiv.innerHTML = `
            <p class="mb-2"><strong>Nueva Lección — ${curso.modulos[moduloIdx].nombre}</strong></p>
            <div class="mb-2">
                <label class="form-label">Nombre</label>
                <input type="text" id="inputNombreLeccion" class="form-control" placeholder="Ej: Introducción">
            </div>
            <div class="mb-2">
                <label class="form-label">Fecha de Inicio</label>
                <input type="date" id="inputFechaInicio" class="form-control">
            </div>
            <div class="mb-2">
                <label class="form-label">Fecha de Fin</label>
                <input type="date" id="inputFechaFin" class="form-control">
            </div>
            <div class="d-flex gap-2">
                <button class="btn btn-warning btn-sm" id="btnGuardarLeccion">Guardar</button>
                <button class="btn btn-secondary btn-sm" id="btnCancelarLeccion">Cancelar</button>
            </div>
        `;

        document.querySelector(".contenedorDeTablaL").after(formDiv);

        document.getElementById("btnCancelarLeccion").addEventListener("click", () => formDiv.remove());
        document.getElementById("btnGuardarLeccion").addEventListener("click", () => guardarLeccion(moduloIdx));
    }

    // ✅ Guardar lección
    async function guardarLeccion(moduloIdx) {
        const nombre = document.getElementById("inputNombreLeccion").value.trim();
        const fechaInicio = document.getElementById("inputFechaInicio").value;
        const fechaFin = document.getElementById("inputFechaFin").value;

        if (!nombre || !fechaInicio || !fechaFin) {
            alert("Por favor completa todos los campos");
            return;
        }
        if (fechaFin < fechaInicio) {
            alert("La fecha de fin no puede ser anterior a la de inicio");
            return;
        }

        curso.modulos[moduloIdx].lecciones.push({ nombre, fechaInicio, fechaFin });
        await actualizarCurso();
        renderizarModulos();
        verLecciones(curso.modulos[moduloIdx]);
        document.getElementById("formLeccionContainer")?.remove();
        alert("Lección creada correctamente");
    }

    // ✅ Actualizar curso en la API
    async function actualizarCurso() {
        try {
            const res = await fetch(`${baseUrl}/${cursoId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(curso)
            });
            if (!res.ok) throw new Error("Error al actualizar");
        } catch (error) {
            console.error("Error al actualizar curso:", error);
            alert("No se pudo guardar el cambio.");
        }
    }

    // ✅ Botón Modificar curso
    const btnModificar = document.getElementById("btnModificar");
    const formEditar = document.getElementById("formEditarCurso");

    btnModificar.addEventListener("click", () => {
        document.getElementById("nombreCurso").value = curso.nombre;
        document.getElementById("descripcionCursoInput").value = curso.descripcion;
        document.getElementById("fotoCurso").value = curso.foto;
        const modalEditar = new bootstrap.Modal(document.getElementById("modalEditarCurso"));
        modalEditar.show();
    });

    formEditar.addEventListener("submit", async (e) => {
        e.preventDefault();
        curso.nombre = document.getElementById("nombreCurso").value;
        curso.descripcion = document.getElementById("descripcionCursoInput").value;
        curso.foto = document.getElementById("fotoCurso").value;
        await actualizarCurso();
        alert("Curso actualizado correctamente");
        window.location.reload();
    });

    // ✅ Botón Eliminar curso
    document.getElementById("btnEliminar").addEventListener("click", async () => {
        if (confirm("¿Estás seguro de eliminar este curso? Esta acción no se puede deshacer.")) {
            try {
                const response = await fetch(`${baseUrl}/${cursoId}`, { method: "DELETE" });
                if (response.ok) {
                    alert("Curso eliminado correctamente");
                    window.location.href = "../cursos.html";
                } else {
                    alert("Error al eliminar el curso");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Hubo un problema con el servidor");
            }
        }
    });

});
