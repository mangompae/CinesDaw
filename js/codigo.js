document.addEventListener("DOMContentLoaded", ocultarForm);

// Variables para los contenedores de formularios
const consLocalidades = document.getElementById("consultaLocalidades");
const newSala = document.getElementById("salas");
const newPelicula = document.getElementById("nuevaPelicula");
const consPelicula = document.getElementById("consultaPelicula");
const btnImportarProvncias = document.getElementById("importarProvincia");


// Eventos para cada elemento del menú
document.getElementById("consultaLocalidad").addEventListener("click", function () {
    mostrarForm("consultaLocalidades");
    cargarProvincia();

});

document.getElementById("nuevaSala").addEventListener("click", function () {
    mostrarForm("salas");
    cargarProvinciaSala();

});

document.getElementById("mosNuevaPelicula").addEventListener("click", function () {
    mostrarForm("nuevaPelicula");
    cargarSalaNewPelicula();
});

document.getElementById("conPelicula").addEventListener("click", function () {
    mostrarForm("consultaPelicula");
    cargarSalaConsPelicula();
});

// Función para ocultar todos los formularios
function ocultarForm() {
    consLocalidades.style.display = "none";
    newSala.style.display = "none";
    newPelicula.style.display = "none";
    consPelicula.style.display = "none";
}

// Función para mostrar el formulario específico
function mostrarForm(idForm) {
    ocultarForm();
    document.getElementById(idForm).style.display = "block";
}


//importar

function importarProvncias() {
    fetch("importar/txt/Provincias.txt", {
        method: "POST",
    })
        .then(response => response.text())
        .then(response => {
            const lineas = response.split("\n");
            for (let i = 0; i < lineas.length; i++) {
                insertarLineas(lineas[i]);

            }

        })
}

function insertarLineas(linea) {
    fetch("php/insertarProvincias.php", {
        method: "POST",
        body: linea
    })
        .then(response => response.text())
        .then(response => {
            if (response === "ok") {
                console.log("bien");
            } else {
                console.log("mal");
            }

        })

}
btnImportarProvncias.addEventListener("click", importarProvncias);


const selectProvConLoc = document.getElementById("selProvConLoc");
const selectProvNewSala = document.getElementById("selProvRegSala");
const selectLocalidadesNewSala = document.getElementById("selLocRegSala");
const inputNombreNewSala = document.getElementById("txtRegSala");
const BotonConsLoc = document.getElementById("btnConsultarLocalidad");
const btnNuevaSala = document.getElementById("insertarSala");
const selectSalaNewPeli = document.getElementById("selRegSala");
const btnNuevaPelicula = document.getElementById("insertarPelicula");
const selectConSala = document.getElementById("selConSala");
const botonConsLocalidades = document.getElementById("btnConsultarLocalidad");
const BotonConsPelis = document.getElementById("consultarPelis");

BotonConsLoc.addEventListener("click", mostrarLocalidades);
btnNuevaSala.addEventListener("click", registrarSala);
btnNuevaPelicula.addEventListener("click", registrarPelicula);
botonConsLocalidades.addEventListener("click", listarLocalidades);
BotonConsPelis.addEventListener("click", mostrarPeliculas);



function cargarProvincia() {
    fetch('php/consultaProvincias.php', {
        method: "POST"

    })
        .then(response => response.json())
        .then(response => {
            let opt = document.createElement("option");
            response.forEach(provincia => {
                opt = document.createElement("option");
                opt.value = provincia.nombre;
                opt.textContent = provincia.nombre
                selectProvConLoc.appendChild(opt);
            })

        })

}

function listarLocalidades() {
    fetch('php/consultaLocalidades.php', {
        method: "POST",
        body: new FormData(frmConsultaLocalidades),
    })
        .then(response => response.json())
        .then(response => {

            response.forEach(linea => {
                console.log(linea.poblacion);
            })


        })

}



function cargarProvinciaSala() {
    fetch('php/consultaProvincias.php', {
        method: "POST"

    })
        .then(response => response.json())
        .then(response => {
            let opt = document.createElement("option");
            response.forEach(provincia => {
                opt = document.createElement("option");
                opt.value = provincia.nombre;
                opt.textContent = provincia.nombre
                selectProvNewSala.appendChild(opt);
            })

        })

}




function mostrarLocalidades() {
    selectLocalidadesNewSala.removeAttribute("disabled");

    fetch('php/consultaLocalidades.php', {
        method: "POST",
        body: new FormData(frmRegSala),
    })
        .then(response => response.json())
        .then(response => {

            response.forEach(localidad => {
                opt = document.createElement("option");
                opt.value = localidad.poblacion;
                opt.textContent = localidad.poblacion
                selectLocalidadesNewSala.appendChild(opt);
            })

        })
}

selectProvNewSala.addEventListener("change", mostrarLocalidades);

function habilitarNombreSala() {
    inputNombreNewSala.removeAttribute("disabled");
}

selectLocalidadesNewSala.addEventListener("change", habilitarNombreSala);

function registrarSala() {

    fetch('php/insertarSala.php', {
        method: "POST",
        body: new FormData(frmRegSala),
    })
        .then(response => response.text())
        .then(response => {
            if (response.trim() === "ok") {
                alert("Sala registrada con éxito");

            } else {
                alert("Error al registrar la sala: " + response);
            }
        })
        .catch(error => {
            console.error("Error en la solicitud:", error);
        });
}


function cargarSalaNewPelicula() {
    selectSalaNewPeli.innerHTML = '';
    fetch('php/consultaSalas.php', {
        method: "POST"
    })
        .then(response => response.json())
        .then(response => {
            response.forEach(salas => {
                const opt = document.createElement("option");
                opt.value = salas.idSala;
                opt.textContent = salas.nombre;
                selectSalaNewPeli.appendChild(opt);
            });
        })
        .catch(error => console.error("Error en la solicitud:", error));
}


function cargarSalaConsPelicula() {
    selectSalaNewPeli.innerHTML = '';
    fetch('php/consultaSalas.php', {
        method: "POST"
    })
        .then(response => response.json())
        .then(response => {
            response.forEach(salas => {
                const opt = document.createElement("option");
                opt.value = salas.idSala;
                opt.textContent = salas.nombre;
                selectConSala.appendChild(opt);
            });
        })
        .catch(error => console.error("Error en la solicitud:", error));
}

function registrarPelicula() {

    fetch('php/insertarPelicula.php', {
        method: "POST",
        body: new FormData(frmRegPeliculas),
    })
        .then(response => response.text())
        .then(response => {
            if (response.trim() === "ok") {
                alert("Pelicula registrada con éxito");

            } else {
                alert("Error al registrar la pelicula: " + response);
            }
        })
        .catch(error => {
            console.error("Error en la solicitud:", error);
        });
}

function mostrarPeliculas() {
    const tablaPeliculas = document.getElementById("tablaPeliculas");

    fetch('php/consultaPeliculas.php', {
        method: "POST",
        body: new FormData(frmConPeliculas),
    })
        .then(response => response.json())
        .then(response => {
            response.forEach(linea => {
                console.log(linea.Nombre);

            });


        })
}