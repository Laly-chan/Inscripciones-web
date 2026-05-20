import {Estudiante, Curso, Inscripcion} from "./objetos.js";

document.addEventListener("DOMContentLoaded", async () => {
    const cur = document.getElementById("guardarCurso");
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

            switch(est){
                case "Borrador": valEst = 1; break;
                case "Inscripción abierta": valEst = 2; break;
                case "Inscripción cerrada": valEst = 3; break;
                default: valErr++;
            }
            if (valErr === 0){
                let cur = new Curso(0,nom,desc,ini,hora,max,valEst,1,new Date());
                let ret = await crear("/cursos/",cur);
                if (ret){
                    alert("Datos guardados correctamente");
                    window.location='./index.html';
                }
            } else {
                document.getElementById("buttonform").style = "color: red";
                document.getElementById("buttonform").lastChild.remove();
                document.getElementById("buttonform").appendChild(document.createTextNode(`Hay campos vacios o con información errónea.`));
            }
        });
    }

    const est = document.getElementById("addEstudiante");
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
                let est = new Estudiante(0,doc,app,nom,mail,nac,1,1,new Date());
                let ret = await crear("/estudiantes/",est);
                if (ret){
                    alert("Datos guardados correctamente");
                    window.location='./index.html';
                }
            } else {
                document.getElementById("buttonform").style = "color: red";
                document.getElementById("buttonform").lastChild.remove();
                document.getElementById("buttonform").appendChild(document.createTextNode(`Hay campos vacios o con información errónea.`));
            }
        });
    }

    const ins = document.getElementById("guardarIns");
    if (ins){
        ins.addEventListener("click", async (evt3) => {
            evt3.preventDefault();
            evt3.stopPropagation();
            let valErr = 0;
        
            let cur = document.getElementById("idcur").value;
            let est = document.getElementById("idest").value;
            let dat = document.getElementById("fechains").value;

            if (!cur.match("[0-9]")){
                valErr++;
            }
            if (!est.match("[0-9]")){
                valErr++;
            }
            if (dat === ""){
                valErr++;
            }

            if (valErr === 0){
                let insc = new Inscripcion(0,cur,est,dat,1,1,new Date());
                let ret = await crear("/inscripciones/",insc);
                if (ret){
                    alert("Datos guardados correctamente");
                    window.location='./index.html';
                }
            } else {
                document.getElementById("buttonform").style = "color: red";
                document.getElementById("buttonform").lastChild.remove();
                document.getElementById("buttonform").appendChild(document.createTextNode(`Hay campos vacios o con información errónea.`));
            }
        });
    }
});

async function crear(path,obj){
    let resp;

    path = path + JSON.stringify(obj);

    let promise = new Promise((resolve, reject) => {
        setTimeout(async () => {
            const response = await fetch(path,{method: 'POST'});
            if (!response.ok) {
                setTimeout(async () => {
                    const response = await fetch(path,{method: 'POST'});
                    if (!response.ok) {
                        reject("Error al crear");
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