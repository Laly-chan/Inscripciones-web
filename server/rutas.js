import express from 'express';
import * as estructuras from "./estructuras.js";
import * as validations from "./validations.js";

const cursos = express.Router();
const estudiantes = express.Router();
const inscripciones = express.Router();

//cursos

cursos.get('/lenght', async (req, res, next) => {
    next();
}, estructuras.getCantCurso);

cursos.get('/:id', async (req, res, next) => {
    req.id = req.params.id ? parseInt(req.params.id) : 0;
    if (isNaN(req.id)){
        return res.status(400).send(false);
    }
    next();
}, estructuras.getCurso);

cursos.get('/:pag/:limit', async (req, res, next) => {
    req.limit = req.params.limit ? parseInt(req.params.limit) : 10;
    req.pag = req.params.pag ? parseInt(req.params.pag) : 0;
    if (isNaN(req.limit) || isNaN(req.pag)){
        return res.status(400).send(false);
    }

    next();
}, estructuras.loadCursoPage);

cursos.post('/', (req, res, next) => {
    req.cur = req.body;
    next();
}, validations.cursos, estructuras.agregar);

cursos.put('/', (req, res, next) => {
    req.cur = req.body;
    next();
}, validations.cursos, estructuras.modificar);

cursos.delete('/:id/:idUs', async (req, res, next) => {
    req.id = req.params.id ? parseInt(req.params.id) : 0;
    req.idUs = req.params.idUs ? parseInt(req.params.idUs) : 0;
    if (isNaN(req.id) || isNaN(req.idUs)){
        return res.status(400).send(false);
    }
    next();
}, estructuras.delCurso);

//estudiantes

estudiantes.get('/lenght', async (req, res, next) => {
    next();
}, estructuras.getCantEstudiante);

estudiantes.get('/:id', async (req, res, next) => {
    req.id = req.params.id ? parseInt(req.params.id) : 5;
    if (isNaN(req.id)){
        return res.status(400).send(false);
    }
    next();
}, estructuras.getEstudiante);

estudiantes.get('/:pag/:limit', async (req, res, next) => {
    req.limit = req.params.limit ? parseInt(req.params.limit) : 10;
    req.pag = req.params.pag ? parseInt(req.params.pag) : 0;
    if (isNaN(req.limit) || isNaN(req.pag)){
        return res.status(400).send(false);
    }

    next();
}, estructuras.loadEstudiantePage);

estudiantes.post('/', (req, res, next) => {
    req.est = req.body;
    next();
}, validations.estudiantes, estructuras.agregar);

estudiantes.put('/', (req, res, next) => {
    req.est = req.body;
    next();
}, validations.estudiantes, estructuras.modificar);

estudiantes.delete('/:id/:idUs', async (req, res, next) => {
    req.id = req.params.id ? parseInt(req.params.id) : 5;
    req.idUs = req.params.idUs ? parseInt(req.params.idUs) : 0;
    if (isNaN(req.id) || isNaN(req.idUs)){
        return res.status(400).send(false);
    }
    next();
}, estructuras.delEstudiante);

//inscripciones

inscripciones.get('/lenght', async (req, res, next) => {
    next();
}, estructuras.getCantInscripcion);

inscripciones.get('/:id', async (req, res, next) => {
    req.id = req.params.id ? parseInt(req.params.id) : 0;
    if (isNaN(req.id)){
        return res.status(400).send(false);
    }
    next();
}, estructuras.getInscripcion);

inscripciones.get('/:pag/:limit', async (req, res, next) => {
    req.limit = req.params.limit ? parseInt(req.params.limit) : 10;
    req.pag = req.params.pag ? parseInt(req.params.pag) : 0;
    if (isNaN(req.limit) || isNaN(req.pag)){
        return res.status(400).send(false);
    }

    next();
}, estructuras.loadInscripcionPage);

inscripciones.post('/', (req, res, next) => {
    req.ins = req.body;
    next();
}, estructuras.inscripcionValidation, estructuras.agregar);

inscripciones.delete('/:id/:idUs', async (req, res, next) => {
    req.id = req.params.id ? parseInt(req.params.id) : 0;
    req.idUs = req.params.idUs ? parseInt(req.params.idUs) : 0;
    if (isNaN(req.id) || isNaN(req.idUs)){
        return res.status(400).send(false);
    }
    next();
}, estructuras.delInscripcion);

export {cursos, estudiantes, inscripciones}