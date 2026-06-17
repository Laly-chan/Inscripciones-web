async function getObject(path, attempt) {
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
            const response = await fetch(path);
            if (!response.ok) {
                reject(response.status);
                return;
            }
            resolve(response);
        }, 100*(attempt+1))
    });

    promise.then(
        function(response) {resp = response.json();},
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
            return getObject(path,attempt+1);
        }
    }

    return resp;
}

function loadingLogo(mainId){
    if (!mainId){
        mainId = "themain";
    }
    let main = document.getElementById(mainId);
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

function emptyMessage(item,mainId){
    if (!mainId){
        mainId = "themain";
    }
    let main = document.getElementById(mainId);
    let br = document.createElement('br');

    let emptyart = document.createElement("article");

    emptyart.classList.add("listarticle");
    emptyart.classList.add("articleclaro");
    emptyart.style = "color: rgb(73, 64, 92);";
    emptyart.appendChild(document.createTextNode(`No se encontraron datos de ${item}`));

    main.appendChild(emptyart);
}

function crearBoton(text,path,mainId){
    if (!mainId){
        mainId = "themain";
    }

    let main = document.getElementById(mainId);

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

export {getObject, loadingLogo, emptyMessage, crearBoton};