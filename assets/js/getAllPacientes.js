document.addEventListener("DOMContentLoaded", () => {
  getAllPacientes();
  const tablaPacientes = document.querySelector("#tablaPacientes");
  tablaPacientes.addEventListener("click", (e) => {
    gestionPacientes(e);
  });

  const btnCrearPaciente = document.querySelector("#btnCrearPaciente");
  btnCrearPaciente.addEventListener("click", (e) => {
    e.preventDefault();
    crearPaciente();
  });

    const btnEditarPaciente = document.querySelector("#btnEditarPaciente");
    btnEditarPaciente.addEventListener('click', (e) => {
        e.preventDefault();
        apiEditarPaciente();
     });

  btnCrearPaciente.addEventListener("click", (e) => {
    e.preventDefault();
    editarPaciente();
  });
});

const urlApi = "https://apipacientes.proyectosadso.com/api/";
async function getAllPacientes() {
  try {
    await fetch(`${urlApi}get_all.php`)
      .then((res) => res.json())
      .then((res) => {
        const cuerpoTablaPacientes = document.querySelector(
          "#cuerpoTablaPacientes"
        );
        res.forEach((paciente) => {
          let tr = document.createElement("tr");
          let btnEditar = document.createElement("button");
          btnEditar.setAttribute(
            "class",
            "btn btn-primary btnEditarPaciente m-1"
          );
          let dataPaciente = {
            name: paciente.name,
            age: paciente.age,
            gender: paciente.gender,
            diagnosis: paciente.diagnosis,
            created_at: paciente.created_at,
          };
          btnEditar.appendChild(document.createTextNode("Editar"));
          btnEditar.setAttribute("data-id", `${paciente.id}`);
          btnEditar.setAttribute("data-paciente", JSON.stringify(dataPaciente));
          btnEditar.setAttribute("data-bs-toggle", "modal");
          btnEditar.setAttribute("data-bs-target", "#editarPaciente");
          let btnEliminar = document.createElement("button");
          btnEliminar.setAttribute(
            "class",
            "btn btn-danger btnEliminarPaciente m-1"
          );
          btnEliminar.appendChild(document.createTextNode("Eliminar"));
          btnEliminar.setAttribute("data-id", `${paciente.id}`);

          let td1 = document.createElement("td");
          let td2 = document.createElement("td");
          let td3 = document.createElement("td");
          let td4 = document.createElement("td");
          let td5 = document.createElement("td");
          let td6 = document.createElement("td");
          let td7 = document.createElement("td");

          td1.appendChild(document.createTextNode(paciente.id));
          td2.appendChild(document.createTextNode(paciente.name));
          td3.appendChild(document.createTextNode(paciente.age));
          td4.appendChild(document.createTextNode(paciente.gender));
          td5.appendChild(document.createTextNode(paciente.diagnosis));
          td6.appendChild(document.createTextNode(paciente.created_at));
          td7.append(btnEditar, btnEliminar);
          tr.append(td1, td2, td3, td4, td5, td6, td7);

          cuerpoTablaPacientes.appendChild(tr);
        });
      });
  } catch (error) {
    console.log(error + " error al traer los pacientes");
  }
}
function gestionPacientes(e) {
  const target = e.target;

  if (target.classList.contains("btnEditarPaciente")) {
    const id = target.getAttribute("data-id");
    const dataPaciente =JSON.parse(target.getAttribute("data-paciente"));
    llenarEditarPaciente(id, dataPaciente), dataPaciente;
  } else if (target.classList.contains("btnEliminarPaciente")) {
    const id = target.getAttribute("data-id");
    eliminarPaciente(id);
  }
}

async function llenarEditarPaciente(id, dataPaciente) {
    try {
    document.querySelector("#editarNombrePaciente").value=dataPaciente.name;
    document.querySelector("#editarEdadPaciente").value=dataPaciente.age;
    document.querySelector("#editarGeneroPaciente").value=dataPaciente.gender;
    document.querySelector("#editarDiagnosticoPaciente").value=dataPaciente.diagnosis;
    document.querySelector("#editarFechaIngresoPaciente").value=dataPaciente.created_at;
  } catch (error)
  {
      console.log(error);
   }
}

async function eliminarPaciente(id) {
  await fetch(`${urlApi}delete.php?id=${id}`);
  window.location.reload();
}

async function crearPaciente() {
  let nombre = document.querySelector("#nombrePaciente").value;
  let edad = document.querySelector("#edadPaciente").value;
  let genero = document.querySelector("#generoPaciente").value;
  let diagnostico = document.querySelector("#diagnosticoPaciente").value;
  let fechaIngreso = document.querySelector("#fechaIngresoPaciente").value;
  const paciente = {
    name: nombre,
    age: edad,
    gender: genero,
    diagnosis: diagnostico,
    created_at: fechaIngreso,
  };
  await fetch(`${urlApi}create.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(paciente),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.sucess === true) {
        console.log("agregado con éxito");
      } else {
        console.log("No se pudo agregar");
      }
      window.location.reload();
    });
}

async apiEditarPaciente()
{
    
 }