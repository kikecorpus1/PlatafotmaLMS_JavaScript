
document.addEventListener('DOMContentLoaded', async() => {

//varibles globales
    //Data
let listaDocentes = [];

    //tablas
let tablaDocentes = document.getElementById("tablaDocentes");
    //grafica panel
const canvas = document.getElementById("grafica");
let  contexto2D = canvas.getContext("2d");

//creacion de sistema de informacion 
    //link api respuesta completa 

const url=  "https://68a35617c5a31eb7bb1ff133.mockapi.io/Academiaswbar400/docentes";

  // Funciones de Fetch

  async function fetchDocentes() {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        listaDocentes = await res.json();

        console.log(listaDocentes)
    }   


function listadoDocentes(){

    try {
     
      listaDocentes.forEach((docente, index) => {
    const filaCurso = document.createElement("tr");
        console.log(docente)
        filaCurso.innerHTML = `
          <td> ${index + 1}</td>
          <td><img src="${docente.foto}" width="30"></td>
           <td>${docente.nombre}</td>
          <td>${docente.usuario}</td>
          <td>${docente.cursosACargo[0]}, ${docente.cursosACargo[1]}</td>
          <td><img src="../../../recursos/img/componentes/arrow-right-square-fill.svg" alt="" class="botonFlecha"></td>
          
        `;
        
      const flecha = filaCurso.querySelector(".botonFlecha");
      flecha.addEventListener("click", () => {
        window.location.href = `./perfilDocente.html?id=${docente.id}`;
      });

        tablaDocentes.appendChild(filaCurso);
      });
    } catch (error) {
      console.error("Error al traer usuarios:", error);
    }
  
}

//graficas

function verGrafica(){

    const inscripciones = [3, 5, 7, 15];
    const meses = ["May", "Jun",  "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    const ancho = canvas.width;
    const alto = canvas.height;
    const grosorDeBarra = ancho / inscripciones.length - 5;

    inscripciones.forEach((valor, i) => {
      let  x = i * (grosorDeBarra + 5);
      let  h = valor * 5;
      let  y = alto - h;

    contexto2D.fillStyle = "#777272ff";
    contexto2D.fillRect(x, y, grosorDeBarra, h);

    contexto2D.fillStyle = "#ffffffff";
    contexto2D.font = "10px Arial";
    contexto2D.fillText(meses[i], x + grosorDeBarra / 4, alto - 5);

    contexto2D.fillStyle = "#f3c548ff";
    contexto2D.fillText(valor, x + ancho / 10, y -5);
  })
}

function modalCrearDocente(){

 

 let botonCrear = document.getElementById("crearDocente");
 let modal = document.getElementById("dashboard");

 botonCrear.addEventListener("click", (e) => { 

  console.log(botonCrear)
  
console.log(e)

botonCrear.disabled= true; 


  modal.innerHTML= `
  
<!-- Modal -->

<form id="formRegistroDocente" class="container">
  <div class="row g-3">

    <!-- Nombre -->
    <div class="col-md-12">
      <label for="nombreDocente" class="form-label">Nombre del docente</label>
      <input type="text" id="nombreDocente" name="nombreDocente" class="form-control" placeholder="Ingrese nombre completo" required />
    </div>

    <!-- Correo -->
    <div class="col-md-12">
      <label for="correoDocente" class="form-label">Correo electrónico</label>
      <input type="email" id="correoDocente" name="correoDocente" class="form-control" placeholder="correo@ejemplo.com" required />
    </div>

    <!-- Contraseña -->
    <div class="col-md-12">
      <label for="contrasenaDocente" class="form-label">Contraseña</label>
      <input type="password" id="contrasenaDocente" name="contrasenaDocente" class="form-control" placeholder="Cree una contraseña" required />
    </div>

    <!-- Foto -->
    <div class="col-md-12">
      <label for="fotoDocente" class="form-label">Foto (URL)</label>
      <input type="url" id="fotoDocente" name="fotoDocente" class="form-control" placeholder="https://..." />
    </div>

    <!-- Cursos a cargo -->
    <div class="col-md-12">
      <label for="cursosACargo" class="form-label">Cursos a cargo</label>
      <input type="text" id="cursosACargo" name="cursosACargo" class="form-control" placeholder="Ej: Calistenia, Yoga, Pilates" />
      <small class="text-muted">Escribe los cursos separados por coma</small>
    </div>

    <!-- Botones -->
    <div class="col-12 d-flex justify-content-between mt-4">
      <button type="reset" class="btn btn-secondary">Cancelar</button>
      <button type="submit" class="btn btn-warning">Registrar</button>
    </div>
  </div>
</form>

  `

  const formDocente = document.getElementById("formRegistroDocente");

  formDocente.addEventListener("submit", async (e) => {
    e.preventDefault();

    const hoy = new Date();
    const fechaInicio = `${String(hoy.getDate()).padStart(2, "0")}/${String(hoy.getMonth() + 1).padStart(2, "0")}/${hoy.getFullYear()}`;

    const nuevoDocente = {
      nombre: document.getElementById("nombreDocente").value,
      usuario: document.getElementById("correoDocente").value,
      contrasena: document.getElementById("contrasenaDocente").value,
      foto: document.getElementById("fotoDocente").value || "https://randomuser.me/api/portraits/men/44.jpg",
      cursosACargo: document.getElementById("cursosACargo").value.split(",").map(c => c.trim()).filter(c => c !== ""),
      url: "./perfilDocente.html",   
      fechaInicio: fechaInicio,   
      estado: "activo"              
    };

    try {
      const res = await fetch("https://68a35617c5a31eb7bb1ff133.mockapi.io/Academiaswbar400/docentes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoDocente)
      });


      const data = await res.json();
      alert(" Docente registrado con éxito: " + data.nombre);

      formDocente.reset();
    } catch (err) {
      console.error(" Error:", err);
      alert("Ocurrió un error al registrar el docente");
    }
  });

 });

}

//algoritmo

await fetchDocentes();
listadoDocentes();
verGrafica();
modalCrearDocente();

});






