// ✅ notificaciones.js
// Agrega este script a todas las páginas del admin que tengan el ícono de campana
// <script src="../script/notificaciones.js"></script>

document.addEventListener("DOMContentLoaded", () => {

    // ✅ FIX: seleccionar tanto el img como su padre <a>
    const campanaImg = document.getElementById("notificaciones");
    if (!campanaImg) return;
    const campana = campanaImg.closest("a") || campanaImg;

    // ✅ Estructura de notificaciones guardadas en localStorage
    function getNotificaciones() {
        return JSON.parse(localStorage.getItem("notificaciones")) || [];
    }

    function guardarNotificaciones(lista) {
        localStorage.setItem("notificaciones", JSON.stringify(lista));
    }

    // ✅ Agregar notificación nueva (llamar desde cualquier parte del sistema)
    window.agregarNotificacion = function (mensaje, tipo = "info") {
        const lista = getNotificaciones();
        lista.unshift({
            id: Date.now(),
            mensaje,
            tipo,       // "info" | "success" | "warning" | "danger"
            leida: false,
            fecha: new Date().toLocaleString("es-CO")
        });
        // Máximo 20 notificaciones
        if (lista.length > 20) lista.pop();
        guardarNotificaciones(lista);
        actualizarBadge();
    };

    // ✅ Crear el panel de notificaciones en el DOM
    const panelNotif = document.createElement("div");
    panelNotif.id = "panelNotificaciones";
    panelNotif.style.cssText = `
        display: none;
        position: fixed;
        top: 70px;
        right: 20px;
        width: 320px;
        max-height: 450px;
        overflow-y: auto;
        background: white;
        border-radius: 12px;
        box-shadow: 0 8px 24px rgba(0,0,0,0.15);
        z-index: 9999;
        padding: 0;
    `;
    document.body.appendChild(panelNotif);

    // ✅ Badge de notificaciones no leídas
    const badge = document.createElement("span");
    badge.id = "badgeNotif";
    badge.style.cssText = `
        position: absolute;
        top: -6px;
        right: -6px;
        background: #FC3B56;
        color: white;
        border-radius: 50%;
        width: 18px;
        height: 18px;
        font-size: 11px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        display: none;
    `;
    campana.parentElement.style.position = "relative";
    campana.parentElement.appendChild(badge);

    function actualizarBadge() {
        const noLeidas = getNotificaciones().filter(n => !n.leida).length;
        if (noLeidas > 0) {
            badge.textContent = noLeidas > 9 ? "9+" : noLeidas;
            badge.style.display = "flex";
        } else {
            badge.style.display = "none";
        }
    }

    // ✅ Renderizar notificaciones en el panel
    function renderizarNotificaciones() {
        const lista = getNotificaciones();

        const colores = {
            info:    { bg: "#D0E4FF", text: "#1775F1" },
            success: { bg: "#E3FFCB", text: "#4a8f00" },
            warning: { bg: "#FFF3CD", text: "#856404" },
            danger:  { bg: "#FFE0E4", text: "#FC3B56" }
        };

        panelNotif.innerHTML = `
            <div style="padding:12px 16px; border-bottom:1px solid #eee; display:flex; justify-content:space-between; align-items:center; position:sticky; top:0; background:white; z-index:1;">
                <strong>Notificaciones</strong>
                <div style="display:flex; gap:8px;">
                    <button id="btnMarcarTodas" style="font-size:11px; border:none; background:none; color:#1775F1; cursor:pointer;">Marcar todas como leídas</button>
                    <button id="btnLimpiarNotif" style="font-size:11px; border:none; background:none; color:#FC3B56; cursor:pointer;">Limpiar</button>
                </div>
            </div>
            <div id="listaNotificaciones">
                ${lista.length === 0
                    ? `<p style="text-align:center; color:#8D8D8D; padding:20px;">Sin notificaciones</p>`
                    : lista.map(n => {
                        const color = colores[n.tipo] || colores.info;
                        return `
                            <div class="notif-item" data-id="${n.id}" style="
                                padding: 12px 16px;
                                border-bottom: 1px solid #f1f1f1;
                                background: ${n.leida ? "white" : color.bg};
                                cursor: pointer;
                                transition: background 0.2s;
                            ">
                                <p style="margin:0; font-size:13px; color:${n.leida ? "#555" : color.text}; font-weight:${n.leida ? "normal" : "600"}">
                                    ${n.mensaje}
                                </p>
                                <small style="color:#8D8D8D">${n.fecha}</small>
                            </div>
                        `;
                    }).join("")
                }
            </div>
        `;

        // Marcar como leída al hacer clic
        panelNotif.querySelectorAll(".notif-item").forEach(item => {
            item.addEventListener("click", () => {
                const id = parseInt(item.dataset.id);
                const lista = getNotificaciones();
                const notif = lista.find(n => n.id === id);
                if (notif) {
                    notif.leida = true;
                    guardarNotificaciones(lista);
                    renderizarNotificaciones();
                    actualizarBadge();
                }
            });
        });

        // Marcar todas como leídas
        document.getElementById("btnMarcarTodas")?.addEventListener("click", () => {
            const lista = getNotificaciones().map(n => ({ ...n, leida: true }));
            guardarNotificaciones(lista);
            renderizarNotificaciones();
            actualizarBadge();
        });

        // Limpiar todas
        document.getElementById("btnLimpiarNotif")?.addEventListener("click", () => {
            if (confirm("¿Limpiar todas las notificaciones?")) {
                guardarNotificaciones([]);
                renderizarNotificaciones();
                actualizarBadge();
            }
        });
    }

    // ✅ Abrir/cerrar panel al hacer clic en campana
    // ✅ FIX: click en la campana (img o su padre <a>)
    campana.style.cursor = "pointer";
    campanaImg.style.cursor = "pointer";

    function togglePanel(e) {
        e.preventDefault();
        e.stopPropagation();
        const visible = panelNotif.style.display === "block";
        panelNotif.style.display = visible ? "none" : "block";
        if (!visible) renderizarNotificaciones();
    }

    campana.addEventListener("click", togglePanel);
    if (campana !== campanaImg) {
        campanaImg.addEventListener("click", togglePanel);
    }

    // Cerrar al hacer clic fuera
    document.addEventListener("click", (e) => {
        if (!panelNotif.contains(e.target) && e.target !== campana) {
            panelNotif.style.display = "none";
        }
    });

    // ✅ Notificaciones automáticas del sistema
    async function notificacionesAutomaticas() {
        try {
            const [resEstudiantes, resDocentes, resCursos] = await Promise.all([
                fetch("https://68a35617c5a31eb7bb1ff133.mockapi.io/Academiaswbar400/usuarios"),
                fetch("https://68a35617c5a31eb7bb1ff133.mockapi.io/Academiaswbar400/docentes"),
                fetch("https://68aab3e1909a5835049ccc4f.mockapi.io/cursos")
            ]);

            const estudiantes = await resEstudiantes.json();
            const docentes = await resDocentes.json();
            const cursos = await resCursos.json();

            const ultimaRevision = localStorage.getItem("ultimaRevisionNotif");
            const ahora = Date.now();

            // Solo generar notificaciones automáticas cada 5 minutos
            if (ultimaRevision && ahora - parseInt(ultimaRevision) < 300000) return;

            localStorage.setItem("ultimaRevisionNotif", ahora.toString());

            // Notificación si hay docentes inactivos
            const docentesInactivos = docentes.filter(d => d.estado === "inactivo");
            if (docentesInactivos.length > 0) {
                window.agregarNotificacion(
                    `⚠️ ${docentesInactivos.length} docente(s) con estado inactivo`,
                    "warning"
                );
            }

            // Notificación de cursos sin módulos
            const cursosSinModulos = cursos.filter(c => !c.modulos || c.modulos.length === 0);
            if (cursosSinModulos.length > 0) {
                window.agregarNotificacion(
                    `📚 ${cursosSinModulos.length} curso(s) sin módulos asignados`,
                    "info"
                );
            }

            // Notificación de bienvenida
            const usuario = JSON.parse(localStorage.getItem("usuario"));
            if (usuario) {
                window.agregarNotificacion(
                    `👋 Bienvenido de nuevo, ${usuario.nombre}`,
                    "success"
                );
            }

        } catch (error) {
            console.error("Error al cargar notificaciones automáticas:", error);
        }
    }

    // ✅ Iniciar
    actualizarBadge();
    notificacionesAutomaticas();
});
