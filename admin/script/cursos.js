
document.addEventListener('DOMContentLoaded', async() => {

//varibles globales
    //Data
let cursos = [];

    //tablas
let tablaCursos = document.getElementById("tablaCursos");
    //grafica panel
const canvas = document.getElementById("grafica");
let  contexto2D = canvas.getContext("2d");

//creacion de sistema de informacion 
    //link api respuesta completa 

const url=  "https://68aab3e1909a5835049ccc4f.mockapi.io/cursos";

  // Funciones de Fetch

  async function fetchCursos() {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });


        cursos = await res.json();

        console.log(cursos);


    }   


function listadoCursos(){

    try {
     
      cursos.forEach((curso, index) => {
    const filaCurso = document.createElement("tr");
        console.log(curso)
        filaCurso.innerHTML = `
          <td> ${index + 1}</td>
          <td><img src="${curso.foto}" width="30"></td>
           <td>${curso.nombre}</td>
          <td>${curso.docente}</td>
          <td>${curso.categoria}</td>
          <td><img src="../../recursos/img/componentes/arrow-right-square-fill.svg" alt="" class="botonFlecha"></td>
          
        `;
        
      const flecha = filaCurso.querySelector(".botonFlecha");
      flecha.addEventListener("click", () => {
        window.location.href =  `./cursos/modeloC.html?id=${curso.id}`;
      });


        tablaCursos.appendChild(filaCurso);
      });
    } catch (error) {
      console.error("Error al traer usuarios:", error);
    }
  
}

function modalCrearCurso(){

 

 let botonCrear = document.getElementById("crearCurso");
 let modal = document.getElementById("dashboard");

 botonCrear.addEventListener("click", (e) => { 

  console.log(botonCrear)
  
console.log(e)

botonCrear.disabled= true; 


  modal.innerHTML= `
  
<!-- Modal -->

<h1 class="display-6 text-center mb-4">Registro de Curso</h1>

<form id="formRegistroCurso" class="container">
  <div class="row g-3">

    <!-- Nombre -->
    <div class="col-md-12">
      <label for="nombreCurso" class="form-label">Nombre del curso</label>
      <input type="text" id="nombreCurso" class="form-control" placeholder="Ej: Calistenia" required />
    </div>

    <!-- Categoría -->
    <div class="col-md-12">
      <label for="categoriaCurso" class="form-label">Categoría</label>
      <input type="text" id="categoriaCurso" class="form-control" placeholder="Ej: Fundamentos" required />
    </div>

    <!-- Docente -->
    <div class="col-md-12">
      <label for="docenteCurso" class="form-label">Docente a cargo</label>
      <input type="text" id="docenteCurso" class="form-control" placeholder="Ej: Enrique Corpus" required />
    </div>

    <!-- Duración -->
    <div class="col-md-6">
      <label for="duracionCurso" class="form-label">Duración (horas)</label>
      <input type="number" id="duracionCurso" class="form-control" min="1" required />
    </div>

    <!-- Etiqueta -->
    <div class="col-md-6">
      <label for="etiquetaCurso" class="form-label">Etiqueta</label>
      <input type="text" id="etiquetaCurso" class="form-control" placeholder="Ej: Ciencia del Deporte" />
    </div>

    <!-- Descripción -->
    <div class="col-md-12">
      <label for="descripcionCurso" class="form-label">Descripción</label>
      <textarea id="descripcionCurso" class="form-control" rows="3" placeholder="Breve descripción del curso" required></textarea>
    </div>

    <!-- Foto -->
    <div class="col-md-12">
      <label for="fotoCurso" class="form-label">Foto (URL)</label>
      <input type="url" id="fotoCurso" class="form-control" placeholder="https://..." />
    </div>

    <!-- Botones -->
    <div class="col-12 d-flex justify-content-between mt-4">
      <button type="reset" class="btn btn-secondary">Cancelar</button>
      <button type="submit" class="btn btn-warning">Registrar</button>
    </div>
  </div>
</form>


  `
  
const form = document.getElementById("formRegistroCurso");

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      // 1. Capturar datos
      const nuevoCurso = {
        nombre: document.getElementById("nombreCurso").value,
        categoria: document.getElementById("categoriaCurso").value,
        docente: document.getElementById("docenteCurso").value,
        duracion: document.getElementById("duracionCurso").value,
        etiqueta: document.getElementById("etiquetaCurso").value,
        descripcion: document.getElementById("descripcionCurso").value,
        foto: document.getElementById("fotoCurso").value || "https://via.placeholder.com/300", // default si no pone foto
        fechaInicio: new Date().toISOString().split("T")[0], // fecha de hoy
        estado: "activo",
        estudiantes: 0,
        modulos: [] // arranca vacío
      };

      try {
        // 2. Enviar a la API
        const response = await fetch("https://68aab3e1909a5835049ccc4f.mockapi.io/cursos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(nuevoCurso)
        });

        if (response.ok) {
          alert("Curso creado con éxito ");
          form.reset();
          // Opcional: redirigir al listado
          window.location.href = "./cursos.html";
        } else {
          alert("Error al registrar curso ");
        }
      } catch (error) {
        console.error("Error en el registro:", error);
        alert("No se pudo conectar con el servidor ");
      }
    });
  });

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

//algoritmo

await fetchCursos();
listadoCursos();
verGrafica();
modalCrearCurso();

});






