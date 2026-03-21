document.addEventListener('DOMContentLoaded', async () => {

    // ✅ Verificar sesión
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (!usuario) {
        alert("No hay sesión activa.");
        window.location.href = "../../index.html";
        return;
    }

    const cuadroFPerfil = document.getElementById("fotoPerfil");

    // ✅ Cargar configuración guardada (si existe)
    const configGuardada = JSON.parse(localStorage.getItem("configLMS")) || {};

    cuadroFPerfil.innerHTML = `
        <div class="p-3 w-100">

            <!-- Colores -->
            <div class="mb-4">
                <h5>🎨 Colores</h5>
                <p class="text-muted">Personaliza los colores principales del LMS</p>
                <div class="d-flex flex-wrap gap-3 align-items-center">
                    <div>
                        <label class="form-label">Color de Botones</label>
                        <input type="color" id="colorBotones" class="form-control form-control-color"
                            value="${configGuardada.colorBotones || '#FF9000'}" title="Color de botones">
                    </div>
                    <div>
                        <label class="form-label">Color de Fondo</label>
                        <input type="color" id="colorFondo" class="form-control form-control-color"
                            value="${configGuardada.colorFondo || '#ffffff'}" title="Color de fondo">
                    </div>
                    <div>
                        <label class="form-label">Color Sidebar</label>
                        <input type="color" id="colorSidebar" class="form-control form-control-color"
                            value="${configGuardada.colorSidebar || '#fbf8f8'}" title="Color sidebar">
                    </div>
                </div>
            </div>

            <!-- Parámetros -->
            <div class="mb-4">
                <h5>⚙️ Parámetros Generales</h5>
                <div class="mb-3" style="max-width:400px">
                    <label for="institutionName" class="form-label">Nombre de la institución</label>
                    <input type="text" id="institutionName" class="form-control"
                        placeholder="Ej: Academia SWBAR"
                        value="${configGuardada.institutionName || ''}">
                </div>
                <div class="mb-3" style="max-width:400px">
                    <label for="courseDuration" class="form-label">Duración predeterminada de cursos (días)</label>
                    <input type="number" id="courseDuration" class="form-control"
                        value="${configGuardada.courseDuration || 30}">
                </div>
                <div class="mb-3" style="max-width:400px">
                    <label for="notifications" class="form-label">Notificaciones de tareas</label>
                    <select id="notifications" class="form-select">
                        <option value="si" ${configGuardada.notifications === "si" ? "selected" : ""}>Activadas</option>
                        <option value="no" ${configGuardada.notifications === "no" ? "selected" : ""}>Desactivadas</option>
                    </select>
                </div>
            </div>

            <!-- Botones -->
            <div class="d-flex gap-2">
                <button class="btn btn-primary" id="btnGuardarConfig">Guardar Cambios</button>
                <button class="btn btn-secondary" id="btnRestaurarConfig">Restaurar Defaults</button>
            </div>

            <!-- Mensaje de confirmación -->
            <div id="mensajeConfig" class="mt-3" style="display:none">
                <div class="alert alert-success">✅ Configuración guardada correctamente</div>
            </div>

        </div>
    `;

    // ✅ Aplicar colores guardados al cargar la página
    aplicarColores(configGuardada);

    // ✅ Preview en tiempo real al cambiar los colores
    document.getElementById("colorBotones").addEventListener("input", (e) => {
        document.documentElement.style.setProperty("--color-componentes", e.target.value);
    });

    document.getElementById("colorFondo").addEventListener("input", (e) => {
        document.documentElement.style.setProperty("--color-fondo", e.target.value);
    });

    document.getElementById("colorSidebar").addEventListener("input", (e) => {
        document.documentElement.style.setProperty("--color-sidebar", e.target.value);
    });

    // ✅ Guardar configuración en localStorage
    document.getElementById("btnGuardarConfig").addEventListener("click", () => {
        const config = {
            colorBotones: document.getElementById("colorBotones").value,
            colorFondo: document.getElementById("colorFondo").value,
            colorSidebar: document.getElementById("colorSidebar").value,
            institutionName: document.getElementById("institutionName").value,
            courseDuration: document.getElementById("courseDuration").value,
            notifications: document.getElementById("notifications").value
        };

        localStorage.setItem("configLMS", JSON.stringify(config));
        aplicarColores(config);

        const mensaje = document.getElementById("mensajeConfig");
        mensaje.style.display = "block";
        setTimeout(() => mensaje.style.display = "none", 3000);
    });

    // ✅ Restaurar colores por defecto
    document.getElementById("btnRestaurarConfig").addEventListener("click", () => {
        if (confirm("¿Restaurar la configuración por defecto?")) {
            localStorage.removeItem("configLMS");

            const defaults = {
                colorBotones: "#FF9000",
                colorFondo: "#ffffff",
                colorSidebar: "#fbf8f8"
            };

            document.getElementById("colorBotones").value = defaults.colorBotones;
            document.getElementById("colorFondo").value = defaults.colorFondo;
            document.getElementById("colorSidebar").value = defaults.colorSidebar;
            document.getElementById("institutionName").value = "";
            document.getElementById("courseDuration").value = 30;
            document.getElementById("notifications").value = "si";

            aplicarColores(defaults);
            alert("Configuración restaurada");
        }
    });

    // ✅ Función para aplicar colores al DOM
    function aplicarColores(config) {
        if (config.colorBotones) {
            document.documentElement.style.setProperty("--color-componentes", config.colorBotones);
        }
        if (config.colorFondo) {
            document.documentElement.style.setProperty("--color-fondo", config.colorFondo);
        }
        if (config.colorSidebar) {
            document.documentElement.style.setProperty("--color-sidebar", config.colorSidebar);
        }
    }

});
