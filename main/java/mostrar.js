import {getObject, emptyMessage, loadingLogo, crearBoton} from "./funciones.js";

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

if (type == "cur"){
    fullInfoCur();
}

async function fullInfoCur(){

    let usuarioActual = 0;

    document.getElementById("otro").appendChild(document.createTextNode("Información de curso"));
    loadingLogo();
    let curso;
    
    try {
        curso = await getObject(`/cursos/${id}`);
    } catch {
        alert("Curso no encontrado.");
        window.location='./index.html';
        return;
    }
    
    let usuario, usuNom;

    try {
        usuario = await getObject(`/usuarios/${curso.idUsuarioModificacion}`);
        usuNom = usuario.nombreUsuario;
    } catch {
        usuNom = 'usuario no encontrado';
    }
    
    let info = document.getElementById("themain");
    let br = document.createElement('br');
    
    let infoart = document.createElement("article");
        
    infoart.classList.add("fullinfoarticle");
    
    infoart.appendChild(document.createTextNode(`${curso.nombre}`));
    
    let del = document.createElement("button");
    del.addEventListener("click", async () => {
        let ret = await borrar(`/cursos/${id}/${usuarioActual}`);
        if (ret){
            alert("Curso eliminado correctamente");
            window.location='./index.html';
        }});
    del.classList.add("masButton");
    del.appendChild(document.createTextNode(`x Eliminar`));
    infoart.appendChild(del);
        
    let moreinfo = document.createElement("p");

    let fecha = curso.fechaInicio.split('T')[0];

    let ini = `${fecha.split('-')[2]}/${fecha.split('-')[1]}/${fecha.split('-')[0]}`;

    fecha = curso.fechaHoraModificacion.split('T')[0];

    let hora = curso.fechaHoraModificacion.split('T')[1];
    
    let mod = `${fecha.split('-')[2]}/${fecha.split('-')[1]}/${fecha.split('-')[0]} ${hora.split(':')[0]}:${hora.split(':')[1]}`;
    
    moreinfo.classList.add("morefullinfo");
    moreinfo.appendChild(document.createTextNode(`Descripción:`));
    infoart.appendChild(moreinfo);
    moreinfo = document.createElement("p");
    moreinfo.classList.add("morefullinfo");
    moreinfo.appendChild(document.createTextNode(`${curso.descripcion}`));
    infoart.appendChild(moreinfo);
    moreinfo = document.createElement("p");
    moreinfo.classList.add("morefullinfo");
    
    moreinfo.appendChild(document.createTextNode(`Fecha de inicio: ${ini}`));
    infoart.appendChild(moreinfo);
    moreinfo = document.createElement("p");
    moreinfo.classList.add("morefullinfo");
    moreinfo.appendChild(document.createTextNode(`Cantidad de horas: ${curso.cantidadHoras}`));
    infoart.appendChild(moreinfo);
    moreinfo = document.createElement("p");
    moreinfo.classList.add("morefullinfo");
    
    moreinfo.appendChild(document.createTextNode(`Cantidad máxima de cupos: ${curso.inscriptosMax}`));
    infoart.appendChild(moreinfo);
    moreinfo = document.createElement("p");
    moreinfo.classList.add("morefullinfo");
    
    moreinfo.appendChild(document.createTextNode(`Estado: ${curso.idCursoEstado.descripcion.toLowerCase()}`));
    infoart.appendChild(moreinfo);
    moreinfo = document.createElement("p");
    moreinfo.classList.add("morefullinfo");
            
    moreinfo.appendChild(document.createTextNode(`Última modificación: ${mod} hecha por: ${usuNom}`));
    
    infoart.appendChild(moreinfo);
    
    info.lastChild.remove();
    
    info.appendChild(infoart);
    
    crearBoton("Editar",`./editarcurso.html?cur=${id}`);
}

if (type == "est"){
    document.getElementById("otro").appendChild(document.createTextNode("Información de Estudiante"));
    fullInfoEst();
}

async function fullInfoEst(){

    let usuarioActual = 0;

    loadingLogo();
    let estudiante;

    try {
        estudiante = await getObject(`/estudiantes/${id}`);
    } catch {
        alert("Estudiante no encontrado.");
        window.location='./index.html';
        return;
    }
    
    let usuario, usuNom;

    try {
        usuario = await getObject(`/usuarios/${estudiante.idUsuarioModificacion}`);
        usuNom = usuario.nombreUsuario;
    } catch {
        usuNom = 'usuario no encontrado';
    }

    let info = document.getElementById("themain");
    let br = document.createElement('br');

    let infoart = document.createElement("article");
    
    infoart.classList.add("fullinfoarticle");

    infoart.appendChild(document.createTextNode(`${estudiante.apellido} ${estudiante.nombres}`));
    
    let moreinfo = document.createElement("p");

    let del = document.createElement("button");
    del.addEventListener("click", async () => {
        let ret = await borrar(`/estudiantes/${id}/${usuarioActual}`);
        if (ret){
            alert("Estudiante eliminado correctamente");
            window.location='./index.html';
        }});
    del.classList.add("masButton");
    del.appendChild(document.createTextNode(`x Eliminar`));

    moreinfo = document.createElement("p");

    let fecha = estudiante.fechaNacimiento.split('T')[0];

    let nac = `${fecha.split('-')[2]}/${fecha.split('-')[1]}/${fecha.split('-')[0]}`;

    fecha = estudiante.fechaHoraModificacion.split('T')[0];

    let hora = estudiante.fechaHoraModificacion.split('T')[1];
    
    let mod = `${fecha.split('-')[2]}/${fecha.split('-')[1]}/${fecha.split('-')[0]} ${hora.split(':')[0]}:${hora.split(':')[1]}`;
    
    infoart.appendChild(del);
    moreinfo.classList.add("morefullinfo");
    moreinfo.appendChild(document.createTextNode(`Documento: ${estudiante.documento}`));
    infoart.appendChild(moreinfo);

    moreinfo = document.createElement("p");
    moreinfo.classList.add("morefullinfo");
    moreinfo.appendChild(document.createTextNode(`Mail: ${estudiante.email}`));
    infoart.appendChild(moreinfo);
    moreinfo = document.createElement("p");
    moreinfo.classList.add("morefullinfo");
    moreinfo.appendChild(document.createTextNode(`Fecha de nacimiento: ${nac}`));
    infoart.appendChild(moreinfo);
    moreinfo = document.createElement("p");
    moreinfo.classList.add("morefullinfo");
    moreinfo.appendChild(document.createTextNode(`Última modificación: ${mod} hecha por: ${usuNom}`));

    infoart.appendChild(moreinfo);
    
    info.lastChild.remove();

    info.appendChild(infoart);

    crearBoton("Editar",`./editstudy.html?est=${id}`);
}

if (type == "ins"){
    document.getElementById("otro").appendChild(document.createTextNode("Información de Inscripción"));
    fullInfoIns();
}

async function fullInfoIns(){

    let usuarioActual = 0;

    loadingLogo();

    let inscripcion;
    try {
        inscripcion = await getObject(`/inscripciones/${id}`);
    } catch {
        alert("Inscripción no encontrada.");
        window.location='./index.html';
        return;
    }
    let nomEst = '';
    let nomCur = '';
    try {
        let estudiante = await getObject(`/estudiantes/${inscripcion.idEstudiante}`);
        nomEst = `${estudiante.apellido} ${estudiante.nombres}`;
    } catch {
        nomEst = 'No registrado';
    }
    try {
        let curso = await getObject(`/cursos/${inscripcion.idCurso}`);
        nomCur = curso.nombre;
    } catch {
        nomCur = 'Curso no registrado';
    }
    
    let usuario, usuNom;

    try {
        usuario = await getObject(`/usuarios/${inscripcion.idUsuarioModificacion}`);
        usuNom = usuario.nombreUsuario;
    } catch {
        usuNom = 'usuario no encontrado';
    }

    let info = document.getElementById("themain");
    let br = document.createElement('br');

    let infoart = document.createElement("article");
    
    infoart.classList.add("fullinfoarticle");

    infoart.appendChild(document.createTextNode(`ID de inscripción: N°${inscripcion.idInscripcion}`));
    
    let moreinfo = document.createElement("p");

    let del = document.createElement("button");
    del.addEventListener("click", async () => {
        let ret = await borrar(`/inscripciones/${id}/${usuarioActual}`);
        if (ret){
            alert("Inscripción eliminada correctamente");
            window.location='./index.html';
        }});
    del.classList.add("masButton");
    del.appendChild(document.createTextNode(`x Eliminar`));

    moreinfo = document.createElement("p");

    let fecha = inscripcion.fechaHoraInscripcion.split('T')[0];

    let hora = inscripcion.fechaHoraInscripcion.split('T')[1];
    
    let dat = `${fecha.split('-')[2]}/${fecha.split('-')[1]}/${fecha.split('-')[0]} ${hora.split(':')[0]}:${hora.split(':')[1]}`;

    fecha = inscripcion.fechaHoraModificacion.split('T')[0];

    hora = inscripcion.fechaHoraModificacion.split('T')[1];
    
    let mod = `${fecha.split('-')[2]}/${fecha.split('-')[1]}/${fecha.split('-')[0]} ${hora.split(':')[0]}:${hora.split(':')[1]}`;
    
    infoart.appendChild(del);
    moreinfo.classList.add("morefullinfo");
    moreinfo.appendChild(document.createTextNode(`Curso: ${nomCur}`));
    infoart.appendChild(moreinfo);

    moreinfo = document.createElement("p");
    moreinfo.classList.add("morefullinfo");
    moreinfo.appendChild(document.createTextNode(`Estudiante: ${nomEst}`));
    infoart.appendChild(moreinfo);
    moreinfo = document.createElement("p");
    moreinfo.classList.add("morefullinfo");
    moreinfo.appendChild(document.createTextNode(`Fecha y hora de inscripción: ${dat}`));
    infoart.appendChild(moreinfo);
    moreinfo = document.createElement("p");
    moreinfo.classList.add("morefullinfo");
    moreinfo.appendChild(document.createTextNode(`Última modificación: ${mod} hecha por: ${usuNom}`));

    infoart.appendChild(moreinfo);
    
    info.lastChild.remove();

    info.appendChild(infoart);
}

async function borrar(path, attempt){
    let resp;

    if (!attempt){
        attempt = 0;
    }
    if (attempt >= 5){
        throw new Error("Error de red");
        return;
    }

    let promise = new Promise((resolve, reject) => {
        setTimeout(async () => {
            const response = await fetch(path,{method: 'DELETE'});
            if (!response.ok) {
                reject(response.status);
                return;
            }
            resolve(response);
        }, 100*(attempt+1))
    });

    promise.then(
        function(response) {resp = response},
        function(error) {
            if (error == 404){
                throw new Error('Objeto no encontrado');
            }
        }
    );

    try {
        await promise;
    } catch (error) {
        if (error.message == 'Objeto no encontrado'){
            throw error;
        } else{
            return borrar(path,attempt+1);
        }
    }

    return resp;
}