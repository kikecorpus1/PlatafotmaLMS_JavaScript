# 🎓 Academia SWBAR400 — Learning Management System

![Banner](./recursos/img/img/sin%20fondo.png)

Sistema de gestión de aprendizaje (LMS) desarrollado como proyecto académico para demostrar habilidades en **JavaScript**, **HTML** y **CSS**.

---

## 🚀 Demo

👉 [Ver proyecto desplegado](https://kikecorpus.github.io/PlataformaLMS_JavaScript)

**Credenciales de prueba:**
| Rol | Usuario | Contraseña |
|---|---|---|
| Administrador | admin@swbar400.com | 0000 |


---

## 📋 Descripción

Academia SWBAR400 es un LMS funcional que permite gestionar cursos, docentes y estudiantes. Cuenta con tres roles de usuario diferenciados, cada uno con su propio panel y funcionalidades específicas.

---

## ✨ Funcionalidades

### 👨‍💼 Administrador
- Panel general con estadísticas dinámicas
- Gestión completa de **cursos** (crear, editar, eliminar)
- Gestión completa de **docentes** (crear, editar, eliminar)
- Gestión completa de **estudiantes** (crear, editar, eliminar)
- Creación de **módulos y lecciones** dentro de cada curso
- Sistema de **notificaciones** en tiempo real
- **Herramientas** de personalización (colores, parámetros)
- Modo oscuro

### 👨‍🏫 Docente
- Panel personalizado con sus cursos asignados
- Vista de módulos y lecciones

### 👨‍🎓 Estudiante
- Panel personalizado con sus cursos inscritos
- Vista de progreso

### 🔐 Sistema de autenticación
- Login con selección de tipo de usuario
- Sesión persistente con `localStorage`
- Cierre de sesión que limpia la sesión correctamente

---

## 🛠️ Tecnologías utilizadas

### Frontend
![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)

### APIs y servicios
- **MockAPI** — Base de datos REST para usuarios, docentes y cursos
- **Fetch API** — Consumo de datos asíncronos
- **LocalStorage** — Gestión de sesión y configuración

### Conceptos aplicados
- Manipulación del **DOM**
- Programación **asíncrona** (async/await)
- Consumo de **APIs REST** (GET, POST, PUT, DELETE)
- **CSS Variables** para temas dinámicos
- **Responsive design**
- Gestión de **rutas y navegación** entre páginas

---

## 📁 Estructura del proyecto

```
📦 Academia-SWBAR400
│
├── 📄 index.html                    # Login
├── 📁 css/                          # Estilos globales
│   ├── style.css
│   ├── fonts.css
│   ├── variation.css
│   ├── animation.css
│   └── components.css
│
├── 📁 script/
│   └── script.js                    # Lógica del login
│
├── 📁 pages/                        # Paneles de docente y estudiante
│   ├── panel.html
│   └── script/
│       └── panelUsuario.js
│
├── 📁 recursos/                     # Imágenes y fuentes
│
└── 📁 admin/                        # Panel de administrador
    ├── panel.html
    ├── 📁 csspages/
    │   ├── style.css
    │   └── layout.css
    ├── 📁 script/
    │   ├── panel.js
    │   ├── perfilAdmi.js
    │   ├── herramientas.js
    │   ├── notificaciones.js
    │   ├── logout.js
    │   └── modoOscuro.js
    └── 📁 pages/
        ├── cursos.html
        ├── perfilAdmi.html
        ├── herramientas.html
        ├── 📁 cursos/
        │   ├── modeloC.html
        │   └── modeloC.js
        ├── 📁 docentes/
        │   ├── docente.html
        │   ├── docentes.js
        │   ├── perfilDocente.html
        │   └── perfilD.js
        └── 📁 estudiantes/
            ├── estudiantes.html
            ├── estudiante.js
            ├── perfilEstudiante.html
            └── perfilE.js
```

---

## 🔌 APIs utilizadas

| Recurso | URL |
|---|---|
| Usuarios/Estudiantes | `https://68a35617c5a31eb7bb1ff133.mockapi.io/Academiaswbar400/usuarios` |
| Docentes | `https://68a35617c5a31eb7bb1ff133.mockapi.io/Academiaswbar400/docentes` |
| Cursos | `https://68aab3e1909a5835049ccc4f.mockapi.io/cursos` |
| Administradores | `https://68aab3e1909a5835049ccc4f.mockapi.io/administradores` |

---

## ⚙️ Cómo ejecutar el proyecto

### Opción A — GitHub Pages
Accede directamente desde el link del demo arriba.

### Opción B — Local
1. Clona el repositorio:
```bash
git clone https://github.com/kikecorpus/NOMBRE_REPO.git
```
2. Abre `index.html` en tu navegador o usa Live Server en VS Code.

> **Nota:** No requiere instalación de dependencias. Todo corre en el navegador.

---

## 📸 Capturas de pantalla

| Login | Panel Admin | Cursos |
|---|---|---|
| ![login](./recursos/img/screenshots/login.png) | ![panel](./recursos/img/screenshots/panel.png) | ![cursos](./recursos/img/screenshots/cursos.png) |

> *(Reemplaza las imágenes con capturas reales de tu proyecto)*

---

## 👨‍💻 Autor

**Enrique Corpus Bejarano**
Técnico Laboral en Desarrollo de Software — Campuslands

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/enrique-corpus-9a1b9a329/)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/3105261024)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:corpus.dev@gmail.com)

---

## 📄 Licencia

Este proyecto fue desarrollado con fines académicos en **Campuslands — Cajasan**, grupo S2, 2025-2026.
