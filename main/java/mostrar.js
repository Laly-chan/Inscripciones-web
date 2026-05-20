let url = document.location.href;

let params = url.split('?')[1];

let type = params.split('=')[0];
let id = parseInt(params.split('=')[1]);

if (type == "cur"){
    fullInfoCur();
}

async function fullInfoCur(){
    document.getElementById("otro").appendChild(document.createTextNode("Información de curso"));
    loadingLogo();
    
    let curso = await getSingleObject(`mostrar.html/cursos/${id}`);
    
    let usuario = await getSingleObject(`mostrar.html/usuarios/${curso.idUsuarioModificacion}`);
    
    let info = document.getElementById("themain");
    let br = document.createElement('br');
    
    let infoart = document.createElement("article");
        
    infoart.classList.add("fullinfoarticle");
    
    infoart.appendChild(document.createTextNode(`${curso.nombre}`));
    
    let del = document.createElement("button");
    del.addEventListener("click", async () => {
        let ret = await borrar(`cursos/${id}`);
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
            
    moreinfo.appendChild(document.createTextNode(`Última modificación: ${mod} hecha por: ${usuario.nombre}`));
    
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
    loadingLogo();

    let estudiante = await getSingleObject(`mostrar.html/estudiantes/${id}`);
    
    let usuario = await getSingleObject(`mostrar.html/usuarios/${estudiante.idUsuarioModificacion}`);

    let info = document.getElementById("themain");
    let br = document.createElement('br');

    let infoart = document.createElement("article");
    
    infoart.classList.add("fullinfoarticle");

    infoart.appendChild(document.createTextNode(`${estudiante.apellido} ${estudiante.nombres}`));
    
    let moreinfo = document.createElement("p");

    let del = document.createElement("button");
    del.addEventListener("click", async () => {
        let ret = await borrar(`estudiantes/${id}`);
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
    moreinfo.appendChild(document.createTextNode(`Última modificación: ${mod} hecha por: ${usuario.nombre}`));

    infoart.appendChild(moreinfo);
    
    info.lastChild.remove();

    info.appendChild(infoart);

    crearBoton("Editar",`./editstudy.html?est=${id}`);
}

function crearBoton(text,path){

    let main = document.getElementById("themain");

    let crart = document.createElement("article");
    crart.classList.add("listarticle");

    let create = document.createElement("button");

    create.classList.add("crearButton");
    create.appendChild(document.createTextNode(text));
    create.setAttribute("onclick", `window.location='${path}'`);
    crart.appendChild(create);
    crart.appendChild(document.createElement('br'));
    main.appendChild(crart);
}

async function borrar(path){
    let resp;

    let promise = new Promise((resolve, reject) => {
        setTimeout(async () => {
            const response = await fetch(path,{method: 'DELETE'});
            if (!response.ok) {
                setTimeout(async () => {
                    const response = await fetch(path,{method: 'DELETE'});
                    if (!response.ok) {
                        reject("Error al borrar");
                        return;
                    }
                    resp = await response;
                    resolve("terminé!");
                }, 1000)
                return;
            }
            resp = await response;
            resolve("terminé!");
        }, 10)
    });

    await promise;

    return resp;
}

if (type == "ins"){
    document.getElementById("otro").appendChild(document.createTextNode("Información de Inscripción"));
    fullInfoIns();
}

async function fullInfoIns(){
    loadingLogo();

    let inscripcion = await getSingleObject(`/mostrar.html/inscripciones/${id}`);

    let estudiante = await getSingleObject(`mostrar.html/estudiantes/${inscripcion.idEstudiante}`);
    let curso = await getSingleObject(`mostrar.html/cursos/${inscripcion.idCurso}`);
    
    let usuario = await getSingleObject(`mostrar.html/usuarios/${inscripcion.idUsuarioModificacion}`);

    let info = document.getElementById("themain");
    let br = document.createElement('br');

    let infoart = document.createElement("article");
    
    infoart.classList.add("fullinfoarticle");

    infoart.appendChild(document.createTextNode(`ID de inscripción: N°${inscripcion.idInscripcion}`));
    
    let moreinfo = document.createElement("p");

    let del = document.createElement("button");
    del.addEventListener("click", async () => {
        let ret = await borrar(`inscripciones/${id}`);
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
    moreinfo.appendChild(document.createTextNode(`Curso: ${curso.nombre}`));
    infoart.appendChild(moreinfo);

    moreinfo = document.createElement("p");
    moreinfo.classList.add("morefullinfo");
    moreinfo.appendChild(document.createTextNode(`Estudiante: ${estudiante.apellido} ${estudiante.nombres}`));
    infoart.appendChild(moreinfo);
    moreinfo = document.createElement("p");
    moreinfo.classList.add("morefullinfo");
    moreinfo.appendChild(document.createTextNode(`Fecha y hora de inscripción: ${dat}`));
    infoart.appendChild(moreinfo);
    moreinfo = document.createElement("p");
    moreinfo.classList.add("morefullinfo");
    moreinfo.appendChild(document.createTextNode(`Última modificación: ${mod} hecha por: ${usuario.nombre}`));

    infoart.appendChild(moreinfo);
    
    info.lastChild.remove();

    info.appendChild(infoart);
}

function crearBoton(text,path){

    let main = document.getElementById("themain");

    let crart = document.createElement("article");
    crart.classList.add("listarticle");

    let create = document.createElement("button");

    create.classList.add("crearButton");
    create.appendChild(document.createTextNode(text));
    create.setAttribute("onclick", `window.location='${path}'`);
    crart.appendChild(create);
    crart.appendChild(document.createElement('br'));
    main.appendChild(crart);
}

function loadingLogo(){
    let main = document.getElementById("themain");
    let br = document.createElement('br');

    let loadart = document.createElement("article");

    loadart.classList.add("listarticle");
    
    let mozza = document.createElement("img");
    mozza.src = "./image/Loading.gif";
    mozza.alt = "Mozzarella Cookie Loading";
    mozza.style = "height: 60px; margin-left: 47%";

    loadart.appendChild(mozza);

    main.appendChild(loadart);
}

async function borrar(path){
    let resp;

    let promise = new Promise((resolve, reject) => {
        setTimeout(async () => {
            const response = await fetch(path,{method: 'DELETE'});
            if (!response.ok) {
                setTimeout(async () => {
                    const response = await fetch(path,{method: 'DELETE'});
                    if (!response.ok) {
                        reject("Error al borrar");
                        return;
                    }
                    resp = await response;
                    resolve("terminé!");
                }, 1000)
                return;
            }
            resp = await response;
            resolve("terminé!");
        }, 10)
    });

    await promise;

    return resp;
}

async function getSingleObject(path) {
    let resp;

    let promise = new Promise((resolve, reject) => {
        setTimeout(async () => {
            const response = await fetch(path);
            if (!response.ok) {
                setTimeout(async () => {
                    const response = await fetch(path);
                    if (!response.ok) {
                        reject("Error al borrar");
                        return;
                    }
                    resp = await response.json();
                    resolve("terminé!");
                }, 1000)
                return;
            }
            resp = await response.json();
            resolve("terminé!");
        }, 10)
    });

    await promise;

    return resp;
}