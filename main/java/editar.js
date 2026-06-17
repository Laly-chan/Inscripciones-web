import {getObject} from "./funciones.js";
import {Estudiante, Curso} from "./objetos.js";
let url = document.location.href;
let params;

try {
    params = url.split('?')[1];
} catch {
    alert("URL no válida.");
    window.location='./index.html';
}

let type = params.split('=')[0];
let id = parseInt(params.split('=')[1]);

async function load(){
    if (type == "cur"){
        let curso;
        try {
            curso = await getObject(`/cursos/${id}`);
        } catch {
            alert("Curso no encontrado, redirigiendo a página de creación.");
            window.location='./crearcurso.html';
            return;
        }
        
        document.getElementById("nombre").value = curso.nombre;
        document.getElementById("descripcion").value = curso.descripcion;

        let fecha = curso.fechaInicio.split('T')[0];
        let auxm = parseInt(fecha.split('-')[1]);
        if (auxm < 10) auxm = "0" + auxm;

        let auxd = fecha.split('-')[2];

        let ini = `${fecha.split('-')[0]}-${auxm}-${auxd}`
        
        document.getElementById("inicio").value = ini;

        document.getElementById("horas").value = curso.cantidadHoras;
        document.getElementById("max").value = curso.inscriptosMax;
        document.getElementById("estado").value = curso.idCursoEstado.descripcion;
    }

    if (type == "est"){
        let estudiante;
        try {
            estudiante = await getObject(`/estudiantes/${id}`);
        } catch {
            alert("Estudiante no encontrado, redirigiendo a página de creación.");
            window.location='./addstudy.html';
            return;
        }
        
        document.getElementById("nombre").value = estudiante.nombres;
        document.getElementById("apellido").value = estudiante.apellido;
        document.getElementById("doc").value = estudiante.documento;
        document.getElementById("mail").value = estudiante.email;

        let fecha = estudiante.fechaNacimiento.split('T')[0];
        let auxm = parseInt(fecha.split('-')[1])+1;
        if (auxm < 10) auxm = "0" + auxm;

        let auxd = fecha.split('-')[2];

        let nac = `${fecha.split('-')[0]}-${auxm}-${auxd}`
        
        document.getElementById("nac").value = nac;
    }
}

document.addEventListener("DOMContentLoaded", async (e) => {
    e.stopPropagation();
    load();
    const cur = document.getElementById("modificarCurso");
    if (cur){
        cur.addEventListener("click", async (evt) => {
            evt.preventDefault();
            evt.stopPropagation();
            let valErr = 0;
            
            let nom = document.getElementById("nombre").value;
            let desc = document.getElementById("descripcion").value;
            let ini = document.getElementById("inicio").value;
            let hora = document.getElementById("horas").value;
            let max = document.getElementById("max").value;
            let est = document.getElementById("estado").value;
            let valEst = 1;
            
            if (nom === ""){
                valErr++;
            }
            if (desc === ""){
                valErr++;
            }
            if (ini === ""){
                valErr++;
            }
            
            switch(est.toLowerCase()){
                case "borrador": valEst = 1; break;
                case "inscripción abierta": valEst = 2; break;
                case "inscripción cerrada": valEst = 3; break;
                default: valErr++;
            }
            if (valErr === 0){
                let cur = new Curso(id,nom,desc,ini,hora,max,valEst,1,new Date());
                try {
                    let ret = await modificar("/cursos/",cur);
                    if (ret){
                        alert("Datos guardados correctamente");
                        window.location=`./mostrar.html?cur=${id}`;
                    }
                } catch {
                    valErr++;
                }
            }
            if (valErr >= 1) {
                document.getElementById("buttonform").style = "color: red";
                document.getElementById("buttonform").lastChild.remove();
                document.getElementById("buttonform").appendChild(document.createTextNode(`Hay campos vacios o con información errónea.`));
            }
        });
    }
    
    const est = document.getElementById("modificarEstudiante");
    if (est){
        est.addEventListener("click", async (evt2) => {
            evt2.preventDefault();
            evt2.stopPropagation();
            let valErr = 0;
            
            let nom = document.getElementById("nombre").value;
            let app = document.getElementById("apellido").value;
            let doc = document.getElementById("doc").value;
            let mail = document.getElementById("mail").value;
            let nac = document.getElementById("nac").value;
            
            if (nom === ""){
                valErr++;
            }
            if (app === ""){
                valErr++;
            }
            if (!doc.match("^[0-9]{8}$")){
                valErr++;
            }
            if (mail === ""){
                valErr++;
            }
            if (nac === ""){
                valErr++;
            }
            
            if (valErr === 0){
                let est = new Estudiante(id,doc,app,nom,mail,nac,1,1,new Date());
                try { 
                    let ret = await modificar("/estudiantes/",est);
                    if (ret){
                        alert("Datos guardados correctamente");
                        window.location=`./mostrar.html?est=${id}`;
                    }
                } catch {
                    valErr++;
                }
            }
            if (valErr >= 1){
                document.getElementById("buttonform").style = "color: red";
                document.getElementById("buttonform").lastChild.remove();
                document.getElementById("buttonform").appendChild(document.createTextNode(`Hay campos vacios o con información errónea.`));
            }
        });
    }
});

async function modificar(path,obj,attempt){
    let resp;

    if (!attempt){
        attempt = 0;
    }
    if (attempt >= 5){
        return false;
    }
    
    let promise = new Promise((resolve, reject) => {
        setTimeout(async () => {
            const response = await fetch(path,{method: 'PUT', body: JSON.stringify(obj),
                headers: {
                    "Content-Type": "application/json",
                }})
            resolve(response.ok);
        }, 100*(attempt+1))
    });

    promise.then(
        function(response) {resp = response},
        function(error) {
        }
    );

    try {
        await promise;
    } catch {
        return modificar(path,obj,attempt+1);
    }

    return resp;
}