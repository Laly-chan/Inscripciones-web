import express from 'express';
import * as estructuras from "./estructuras.js";
const app = express();
const port = 3000;

// let cursos;

// const load = async () => { cursos = await main();}

// load();

app.use(express.static("C:/Users/lauta/Desktop/Integrador web/main"));

app.get('/', (req, res) => {
    let j = 0;
    res.type("text/html");
    res.status(200);
    res.sendFile("index.html", {root: __dirname});
});

app.get('/index.html/cursos/', async (req, res) => {
    await estructuras.loadCursoPage(0);
    res.json(JSON.stringify(estructuras.cursos));
});

app.get('/index.html/cursos/lenght', async (req, res) => {
    let curlen = await estructuras.getCantCurso();
    res.json(curlen);
});

app.get('/index.html/cursos/:pag', async (req, res) => {
    const pag = parseInt(req.params.pag);
    await estructuras.loadCursoPage(pag);
    res.json(JSON.stringify(estructuras.cursos));
});

app.get('/mostrar.html/cursos/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const curso = await estructuras.getCurso(id);
    if (curso) {
        res.json(curso);
    } else {
        res.status(404).json({ error: 'Curso no encontrado' });
    }
});

app.get('/index.html/estudiantes/', async (req, res) => {
    await estructuras.loadEstudiantePage(0);
    res.json(JSON.stringify(estructuras.estudiantes));
});

app.get('/index.html/estudiantes/lenght', async (req, res) => {
    let estlen = await estructuras.getCantEstudiante();
    res.json(estlen);
});

app.get('/index.html/estudiantes/:pag', async (req, res) => {
    const pag = parseInt(req.params.pag);
    await estructuras.loadEstudiantePage(pag);
    res.json(JSON.stringify(estructuras.estudiantes));
});

app.get('/mostrar.html/estudiantes/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const est = await estructuras.getEstudiante(id);
    if (est) {
        res.json(est);
    } else {
        res.status(404).json({ error: 'Curso no encontrado' });
    }
});

app.get('/index.html/inscripciones/', async (req, res) => {
    await estructuras.loadInscripcionPage(0);
    res.json(JSON.stringify(estructuras.inscripciones));
});

app.get('/index.html/inscripciones/lenght', async (req, res) => {
    let inslen = await estructuras.getCantInscripcion();
    res.json(inslen);
});

app.get('/index.html/inscripciones/:pag', async (req, res) => {
    const pag = parseInt(req.params.pag);
    await estructuras.loadInscripcionPage(pag);
    res.json(JSON.stringify(estructuras.inscripciones));
});

app.get('/mostrar.html/inscripciones/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const ins = await estructuras.getInscripcion(id);
    if (ins) {
        res.json(ins);
    } else {
        res.status(404).json({ error: 'Inscripcion no encontrada' });
    }
});

app.get('/mostrar.html/usuarios/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const usu = await estructuras.getUsuario(id);
    if (usu) {
        res.json(usu);
    } else {
        res.status(404).json({ error: 'Curso no encontrado' });
    }
});

app.get('/cursos/:id', (req, res) => {
    const id_curso = parseInt(req.params.id);
    const curso = cursos.find(c => c.id_curso === id_curso);
    if (curso) {
        res.json(curso);
    } else {
        res.status(404).json({ error: 'Curso no encontrado' });
    }
});

app.post('/cursos/:obj', (req, res) => {
    const cur = JSON.parse(req.params.obj);
    if (estructuras.agregarCurso(cur)){
        res.status(201).send(true);
    } else {
        res.status(500).send(false);
    }
});

app.post('/estudiantes/:obj', (req, res) => {
    const est = JSON.parse(req.params.obj);
    if (estructuras.agregarEstudiante(est)){
        res.status(201).send(true);
    } else {
        res.status(500).send(false);
    }
});

app.post('/inscripciones/:obj', (req, res) => {
    const ins = JSON.parse(req.params.obj);
    if (estructuras.agregarInscripcion(ins)){
        res.status(201).send(true);
    } else {
        res.status(500).send(false);
    }
});

app.put('/cursos/:obj', (req, res) => {
    const cur = JSON.parse(req.params.obj);
    if (estructuras.modificarCurso(cur)){
        res.status(202).send(true);
    } else {
        res.status(500).send(false);
    }
});

app.put('/estudiantes/:obj', (req, res) => {
    const est = JSON.parse(req.params.obj);
    if (estructuras.modificarEstudiante(est)){
        res.status(202).send(true);
    } else {
        res.status(500).send(false);
    }
});

app.delete('/cursos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (estructuras.delCurso(id)){
        res.status(204).send(true);
    } else {
        res.status(500).send(false);
    }
});

app.delete('/estudiantes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (estructuras.delEstudiante(id)){
        res.status(204).send(true);
    } else {
        res.status(500).send(false);
    }
});

app.delete('/inscripciones/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (estructuras.delInscripcion(id)){
        res.status(204).send(true);
    } else {
        res.status(500).send(false);
    }
});

app.listen(port, () => console.log(`Express iniciado en http://localhost:${port}`));