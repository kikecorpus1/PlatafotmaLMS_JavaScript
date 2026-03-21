document.addEventListener('DOMContentLoaded', async() => {

    let listaAdministradores = [];
    let listaEstudiantes = [];
    let listaDocentes = [];
    let perfil = "";
    let usuarioEncontrado = {};

    let inputTipoUsuario = document.getElementById("floatingSelect");
    let inputUsuario = document.getElementById("floatingInput");
    let inputContrasena = document.getElementById("floatingPassword");
    let botonIngresar = document.getElementById("ingresar");

    async function fetchEstudiantes() {
        const res = await fetch("https://68a35617c5a31eb7bb1ff133.mockapi.io/Academiaswbar400/usuarios", {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        listaEstudiantes = await res.json();
    }

    async function fetchDocentes() {
        const res = await fetch("https://68a35617c5a31eb7bb1ff133.mockapi.io/Academiaswbar400/docentes", {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        listaDocentes = await res.json();
    }

    async function fetchAdmin() {
        const res = await fetch("https://68aab3e1909a5835049ccc4f.mockapi.io/administradores", {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        listaAdministradores = await res.json();
    }

    async function login() {

        perfil = inputTipoUsuario.value;
        let usuario = inputUsuario.value;
        let contrasena = inputContrasena.value;

        if (perfil === "Selecciona Tipo de Usuario") {
            alert("Por favor selecciona un tipo de usuario");
            return;
        }

        if (!usuario || !contrasena) {
            alert("Por favor ingresa usuario y contraseña");
            return;
        }

        if (perfil === "1") {
            // ✅ FIX: era fetchData() que no existía
            if (listaAdministradores.length === 0) {
                await fetchAdmin();
            }
            usuarioEncontrado = listaAdministradores.find(u => u.usuario === usuario && u.contrasena === contrasena);

            if (usuarioEncontrado) {
                localStorage.setItem("usuario", JSON.stringify(usuarioEncontrado));
                // ✅ FIX: ruta corregida (era '../admin/panel.html')
                window.location.href = './admin/panel.html';
            } else {
                // ✅ FIX: ahora el usuario ve el mensaje de error
                alert("Usuario o contraseña incorrectos");
            }
        }

        else if (perfil === "2") {
            if (listaDocentes.length === 0) {
                await fetchDocentes();
            }
            usuarioEncontrado = listaDocentes.find(u => u.usuario === usuario && u.contrasena === contrasena);

            if (usuarioEncontrado) {
                localStorage.setItem("usuario", JSON.stringify(usuarioEncontrado));
                // ✅ FIX: ruta corregida (era '../pages/panel.html' que no existe)
                window.location.href = './pages/panel.html';
            } else {
                alert("Usuario o contraseña incorrectos");
            }
        }

        else if (perfil === "3") {
            if (listaEstudiantes.length === 0) {
                await fetchEstudiantes();
            }
            usuarioEncontrado = listaEstudiantes.find(u => u.usuario === usuario && u.contrasena === contrasena);

            if (usuarioEncontrado) {
                localStorage.setItem("usuario", JSON.stringify(usuarioEncontrado));
                // ✅ FIX: ruta corregida (era '../pages/panel.html' que no existe)
                window.location.href = './pages/panel.html';
            } else {
                alert("Usuario o contraseña incorrectos");
            }
        }
    }

    await fetchEstudiantes();
    await fetchAdmin();
    await fetchDocentes();

    botonIngresar.addEventListener("click", login);
});
