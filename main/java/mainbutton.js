let dashnav = document.getElementById("dashboard");
let estudiantenav = document.getElementById("estudiante");
let cursonav = document.getElementById("curso");
let inscripcionnav = document.getElementById("inscripcion");

let cursotest = document.getElementById("cursotest");

let currentNav = 0;
let currentPage = 0;
let maxCurrentPage = 1;

dashnav.addEventListener('click', () => {
    clearMain();
    clearPage();
    dashnav.classList.add("navpressed");
    cursonav.classList.remove("navpressed");
    estudiantenav.classList.remove("navpressed");
    inscripcionnav.classList.remove("navpressed");
    currentNav = 0;
    showDash();
    pageBoton(-2);
});

estudiantenav.addEventListener('click', async () => {
    clearMain();
    clearPage();
    dashnav.classList.remove("navpressed");
    cursonav.classList.remove("navpressed");
    estudiantenav.classList.add("navpressed");
    inscripcionnav.classList.remove("navpressed");
    currentNav = 1;
    currentPage = 0;
    loadingLogo();
    let estudiantes = await getPromise(`index.html/estudiantes/0`);
    let estlen = await getPromise("index.html/estudiantes/lenght");
    
    document.getElementById("themain").lastChild.remove();

    let j = 0;
    for (let estudiante of estudiantes){
        showEstudianteInfo(estudiante.idEstudiante,estudiante.apellido,estudiante.nombres,estudiante.documento,estudiante.email,j%2);
        j++;
    }

    if (estlen == 0){
        emptyMessage("estudiantes");
        pageBoton(-1);
    }

    crearBoton("Agregar estudiante","./addstudy.html");

    estlen--;
    for (let i = 0; i <= (estlen/10); i++){
        pageBoton(i);
        maxCurrentPage = i+1;
    }
});

cursonav.addEventListener('click', async () => {
    clearMain();
    clearPage();
    dashnav.classList.remove("navpressed");
    cursonav.classList.add("navpressed");
    estudiantenav.classList.remove("navpressed");
    inscripcionnav.classList.remove("navpressed");
    currentNav = 2;
    currentPage = 0;
    loadingLogo();
    let cursos = await getPromise(`index.html/cursos/0`);
    let curlen = await getPromise("index.html/cursos/lenght");

    document.getElementById("themain").lastChild.remove();

    let j = 0;
    for (let curso of cursos){
        showCursoInfo(curso.idCurso,curso.nombre, curso.fechaInicio,curso.cantidadHoras,j%2);
        j++;
    }

    if (curlen == 0){
        emptyMessage("cursos");
        pageBoton(-1);
    }

    crearBoton("Crear curso","./crearcurso.html");

    curlen--;
    for (let i = 0; i <= (curlen/10); i++){
        pageBoton(i);
        maxCurrentPage = i+1;
    }
});

inscripcionnav.addEventListener('click', async () => {
    clearMain();
    clearPage();
    dashnav.classList.remove("navpressed");
    estudiantenav.classList.remove("navpressed");
    cursonav.classList.remove("navpressed");
    inscripcionnav.classList.add("navpressed");
    currentNav = 3;
    currentPage = 0;
    loadingLogo();
    let inscripciones = await getPromise(`index.html/inscripciones/0`);
    let inslen = await getPromise("index.html/inscripciones/lenght");
    
    document.getElementById("themain").lastChild.remove();

    let j = 0;
    for (let inscripcion of inscripciones){
        await showInscripcionInfo(inscripcion.idInscripcion,inscripcion.idCurso,inscripcion.idEstudiante,j%2);
        j++;
    }

    if (inslen == 0){
        emptyMessage("inscripciones");
        pageBoton(-1);
    }

    crearBoton("Crear inscripcion","./crearinscripcion.html");

    inslen--;
    for (let i = 0; i <= (inslen/10); i++){
        pageBoton(i);
        maxCurrentPage = i+1;
    }
});

async function showDash(){
    let main = document.getElementById("themain");
    let br = document.createElement('br');

    let mainart = document.createElement("article");
    
    mainart.classList.add("maininfo");
    loadingLogo();

    let cursos = await getPromise("index.html/cursos");
    let curlen = await getPromise("index.html/cursos/lenght");
    let estlen = await getPromise("index.html/estudiantes/lenght");
    
    document.getElementById("themain").lastChild.remove();

    mainart.appendChild(document.createTextNode(`Cantidad total de cursos: ${curlen}`));
    mainart.appendChild(br);
    mainart.appendChild(document.createTextNode(`Cantidad total de estudiantes: ${estlen}`));
    
    main.appendChild(mainart);

    mainart = document.createElement("article");

    mainart.classList.add("listarticle");
    mainart.appendChild(document.createTextNode(`Cursos disponibles`));

    main.appendChild(mainart);

    let j = 1;
    for (let curso of cursos){
        showCursoInfo(curso.idCurso,curso.nombre, curso.fechaInicio,curso.cantidadHoras,j%2);
        j++;
        if (j == 4) break;
    }
    
}

function clearMain(){
    let main = document.getElementById("themain");
    while (main.firstChild){
        main.lastChild.remove();
    }
}

function clearPage(){
    let page = document.getElementById("pagenav");
    while (page.firstChild){
        page.lastChild.remove();
    }
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

function pageBoton(num){
    let page = document.getElementById("pagenav");

    let paglab = document.createElement("label");
    paglab.classList.add("pageButton");

    if (num <= 0){
        paglab.classList.add("pagepressed");
    }

    paglab.appendChild(document.createTextNode(num+1));

    paglab.setAttribute("id","pag"+num);

    page.appendChild(paglab);

    document.getElementById("pag"+num).addEventListener("click", (evt) => {
        evt.preventDefault();
        evt.stopPropagation();
        changePage(num);
    });
}

async function changePage(num){
    if (num == currentPage){
        return;
    }
    currentPage = num;

    for (let i = 0; i < maxCurrentPage; i++){
        document.getElementById("pag"+i).classList.remove("pagepressed");
    }

    document.getElementById("pag"+num).classList.add("pagepressed");

    clearMain();
    loadingLogo();

    let start = currentPage*10;
    let j = 0;

    if (currentNav == 1){
        let estudiantes = await getPromise(`index.html/estudiantes/${currentPage}`);
        document.getElementById("themain").lastChild.remove();
        for (let estudiante of estudiantes){
            showEstudianteInfo(estudiante.idEstudiante,estudiante.apellido,estudiante.nombres,estudiante.documento,estudiante.email,j%2);
            j++;
        }
    }

    if (currentNav == 2){
        let cursos = await getPromise(`index.html/cursos/${currentPage}`);
        document.getElementById("themain").lastChild.remove();
        for (let curso of cursos){
            showCursoInfo(curso.idCurso,curso.nombre, curso.fechaInicio,curso.cantidadHoras,j%2);
            j++;
        }
    }
    
    if (currentNav == 3){
        let inscripciones = await getPromise(`index.html/inscripciones/${currentPage}`);
        document.getElementById("themain").lastChild.remove();
        for (let inscripcion of inscripciones){
            showInscripcionInfo(inscripcion.idInscripcion,inscripcion.idCurso,inscripcion.idEstudiante,j%2);
            j++;
        }
    }
}

function emptyMessage(item){
    let main = document.getElementById("themain");
    let br = document.createElement('br');

    let emptyart = document.createElement("article");

    emptyart.classList.add("listarticle");
    emptyart.classList.add("articleclaro");
    emptyart.style = "color: rgb(73, 64, 92);";
    emptyart.appendChild(document.createTextNode(`No se encontraron datos de ${item}`));

    main.appendChild(emptyart);
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

function showCursoInfo(id, nom, inicio, hora, pair){
    let main = document.getElementById("themain");
    let br = document.createElement('br');

    let Cursoart = document.createElement("article");
    
    Cursoart.classList.add("listarticle");

    if (pair == 1){
        Cursoart.classList.add("articleclaro");
    }

    Cursoart.appendChild(document.createTextNode(`${nom}`));
    
    let moreinfo = document.createElement("p");

    let more = document.createElement("a");
    let path = `./mostrar.html?cur=${id}`;
    more.setAttribute("href", path);
    more.classList.add("masButton");
    more.appendChild(document.createTextNode(`Mostrar más`));

    let fecha = inicio.split('T')[0];

    let ini = `${fecha.split('-')[2]}/${fecha.split('-')[1]}/${fecha.split('-')[0]}`;

    moreinfo.classList.add("moreinfo");
    moreinfo.appendChild(document.createTextNode(`Fecha de inicio: ${ini}`));
    moreinfo.appendChild(more);
    moreinfo.appendChild(br);
    moreinfo.appendChild(document.createTextNode(`Cantidad de horas: ${hora}`));

    Cursoart.appendChild(moreinfo);

    main.appendChild(Cursoart);
}

function showEstudianteInfo(id, ap, nom, doc, mail, pair){
    let main = document.getElementById("themain");
    let br = document.createElement('br');

    let estudianteart = document.createElement("article");
    
    estudianteart.classList.add("listarticle");

    if (pair == 1){
        estudianteart.classList.add("articleclaro");
    }

    estudianteart.appendChild(document.createTextNode(`${ap} ${nom}`));
    
    let moreinfo = document.createElement("p");
        
    let more = document.createElement("a");
    let path = `./mostrar.html?est=${id}`;
    more.setAttribute("href", path);
    more.classList.add("masButton");
    more.appendChild(document.createTextNode(`Mostrar más`));

    moreinfo.classList.add("moreinfo");
    moreinfo.appendChild(document.createTextNode(`Documento: ${doc}`));
    moreinfo.appendChild(more);
    moreinfo.appendChild(br);
    moreinfo.appendChild(document.createTextNode(`Mail: ${mail}`));

    estudianteart.appendChild(moreinfo);

    main.appendChild(estudianteart);
}

async function showInscripcionInfo(id, idcur, idest, pair){

    let main = document.getElementById("themain");
    let br = document.createElement('br');

    let estudianteart = document.createElement("article");
    
    estudianteart.classList.add("listarticle");

    if (pair == 1){
        estudianteart.classList.add("articleclaro");
    }

    estudianteart.appendChild(document.createTextNode(`Inscripción N° ${id}`));
    
    let moreinfo = document.createElement("p");
        
    let more = document.createElement("a");
    let path = `./mostrar.html?ins=${id}`;
    more.setAttribute("href", path);
    more.classList.add("masButton");
    more.appendChild(document.createTextNode(`Mostrar más`));

    moreinfo.classList.add("moreinfo");
    moreinfo.appendChild(document.createTextNode(`Curso ID: ${idcur}`));
    moreinfo.appendChild(more);
    moreinfo.appendChild(br);
    moreinfo.appendChild(document.createTextNode(`Estudiante ID: ${idest}`));

    estudianteart.appendChild(moreinfo);

    main.appendChild(estudianteart);
}

async function getPromise(path) {
    let obj;

    let promise = new Promise((resolve, reject) => {
        setTimeout(async () => {
            const response = await fetch(path);
            if (!response.ok) {
                setTimeout(async () => {
                    const response = await fetch(path);
                    if (!response.ok) {
                        reject("Error al consultar");
                        return;
                    }
                    let aux = await response.json();
                    obj = JSON.parse(aux);
                    resolve("terminé!");
                }, 1000)
                return;
            }
            let aux = await response.json();
            obj = JSON.parse(aux);
            resolve("terminé!");
        }, 10)
    });

    await promise;

    return obj;
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

showDash();
pageBoton(-2);