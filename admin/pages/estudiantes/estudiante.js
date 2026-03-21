
document.addEventListener('DOMContentLoaded', async() => {

//varibles globales
    //Data
let data= []
let listaAdministradores = [];
let listaEstudiantes = [];
let listaDocentes = [];

    //tablas
let tablaEstudiante = document.getElementById("tablaEstudiantes");
    //grafica panel
const canvas = document.getElementById("grafica");
let  contexto2D = canvas.getContext("2d");

//creacion de sistema de informacion 
    //link api respuesta completa 

const url=  "https://68a35617c5a31eb7bb1ff133.mockapi.io/Academiaswbar400/usuarios";

  // Funciones de Fetch

  async function fetchEstudiantes() {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        listaEstudiantes = await res.json();
        console.log(listaEstudiantes)


        
    }   


function estudiantesInscritos(){

    try {
     
      listaEstudiantes.forEach((usuario, index) => {
    const filaEstudiante = document.createElement("tr");

        filaEstudiante.innerHTML = `
          <td> ${index + 1}</td>
          <td><img src="${usuario.foto}" width="30"></td>
           <td>${usuario.nombre}</td>
          <td>${usuario.identificacion}</td>
          <td>Estudiante</td>
          <td><img src="../../../recursos/img/componentes/arrow-right-square-fill.svg" alt="" class="botonFlecha"></td>
        `;

        const flecha = filaEstudiante.querySelector(".botonFlecha");
        flecha.addEventListener("click", () => {
        window.location.href = `./perfilEstudiante.html?id=${usuario.id}`;
      });

        tablaEstudiante.appendChild(filaEstudiante);
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

function modalCrearEstudiantes(){

 

 let botonCrear = document.getElementById("crearEstudiante");
 let modal = document.getElementById("dashboard");

 botonCrear.addEventListener("click", (e) => { 

  console.log(botonCrear)
  
console.log(e)

botonCrear.disabled= true; 


  modal.innerHTML= `
  
<!-- Modal -->

<h1 class="display-6 text-center mb-4">Inscripción estudiante</h1>

<form id="formInscripcionEstudiante" class="container">
  <div class="row g-3">
    
    <!-- nommbre -->
    <div class="col-md-12">
      <label for="nombre" class="form-label">Nombre del estudiante</label>
      <input 
        type="text" 
        id="nombre" 
        name="nombre" 
        class="form-control" 
        placeholder="Ingrese nombre completo" 
        required
      />
    </div>

    <!-- correo -->
    <div class="col-md-12">
      <label for="correo" class="form-label">Correo electrónico</label>
      <input 
        type="email" 
        id="correo" 
        name="correo" 
        class="form-control" 
        placeholder="correo@ejemplo.com" 
        required
      />
    </div>

    <!-- identificación -->
    <div class="col-md-12">
      <label for="identificacion" class="form-label">Cédula/Tarjeta de identidad</label>
      <input 
        type="text" 
        id="identificacion" 
        name="identificacion" 
        class="form-control" 
        placeholder="Número de documento" 
        required
      />
    </div>

    <!-- contraseña -->
    <div class="col-md-12">
      <label for="contrasena" class="form-label">Contraseña</label>
      <input 
        type="password" 
        id="contrasena" 
        name="contrasena" 
        class="form-control" 
        placeholder="Cree una contraseña" 
        required
      />
    </div>

    <!-- foto -->
    <div class="col-md-12">
      <label for="foto" class="form-label">Foto (URL)</label>
      <input 
        type="url" 
        id="foto" 
        name="foto" 
        class="form-control" 
        placeholder="https://..."
      />
    </div>

    <!-- botoness -->
    <div class="col-12 d-flex justify-content-between mt-4">
      <button type="reset" class="btn btn-secondary">Cancelar</button>
      <button type="submit" class="btn btn-warning">Aceptar</button>
    </div>
  </div>
</form>



    
  `

  const formularioEstudiante = document.getElementById("formInscripcionEstudiante");

  formularioEstudiante.addEventListener("submit", async (e) => {
    e.preventDefault();

    //formulario
    const nuevoUsuario = {
      nombre: document.getElementById("nombre").value,
      usuario: document.getElementById("correo").value,
      contrasena: document.getElementById("contrasena").value,
      foto: document.getElementById("foto").value || "https://randomuser.me/api/portraits/lego/1.jpg",
      identificacion: document.getElementById("identificacion").value,
      cursosInscritos: [],
      cursosCompletados: []
    };

    try {
      const res = await fetch("https://68a35617c5a31eb7bb1ff133.mockapi.io/Academiaswbar400/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoUsuario)
      });

      const data = await res.json();
      alert("Estudiante registrado con éxito: " + data.nombre);

      formularioEstudiante.reset(); 
    } catch (err) {
      console.error("Error:", err);
      alert("Ocurrió un error al registrar el estudiante");
    }
  })
 });

}


//algoritmo

await fetchEstudiantes();
estudiantesInscritos();
verGrafica();
modalCrearEstudiantes();

});






