import {Estudiante, Curso, Inscripcion, Usuario} from "./objetos.js";
import * as base from './connectbase.js';

let cursos = [];
let estudiantes = [];
let inscripciones = [];
let cursosEstados = [];
let inscripcionesEstados = [];
let usuarios = [];
let curlen = 0, estlen = 0, inslen = 0;

async function loadCursoEstado() {
    cursosEstados = await base.getCursosEstados();
};
async function loadInscripcionEstado() {
    inscripcionesEstados = await base.getInscripcionesEstados();
};
async function loadUsuarios() {
    let baseUsuarios = await base.getUsuarios();
    baseUsuarios.forEach(row => {
        usuarios.push(new Usuario(  row.id_usuario, row.apellido, row.nombre,
                                    row.nombre_usuario, row.activo));
    });
};
async function loadCantidad(){
    //curso
    let count = await base.mainGet('COUNT(*)','cursos',undefined,undefined,`id_curso_estado != 4`);

    curlen = parseInt(count.pop().count);

    //estudiante
    count = await base.mainGet('COUNT(*)','estudiantes',undefined,undefined,`activo != 0`);

    estlen = parseInt(count.pop().count);

    //inscripcion
    count = await base.mainGet('COUNT(*)','inscripciones',undefined,undefined,`id_inscripcion_estado != 2`);

    inslen = parseInt(count.pop().count);
}

loadCursoEstado();
loadInscripcionEstado();
loadUsuarios();
loadCantidad();

const loadCursoPage = async (req, res, next) => {
    const start = parseInt(req.pag)*req.limit;
    cursos = [];
    if (base.getLenghtCurso() == 0){
        res.status(404).json({ error: 'Lista de cursos vacía' });
        return;
    }

    let filtro = `id_curso_estado != 4`;

    let baseCursos = await base.mainGet('*','cursos',req.limit,start,filtro,"id_curso DESC");

    baseCursos.forEach(row => {
        let estado = cursosEstados.find(c => c.id_curso_estado === row.id_curso_estado);
        cursos.push(new Curso(  row.id_curso, row.nombre, row.descripcion, row.fecha_inicio,
                                row.cantidad_horas, row.inscriptos_max, estado,
                                row.id_usuario_modificacion, row.fecha_hora_modificacion));
    });

    return res.json(JSON.stringify(cursos));
};

const getCantCurso = async (req, res, next) => {
    return res.send(curlen);
};

const getCurso = async (req,res,next) => {
    if (base.getLenghtCurso() == 0){
        res.status(404).json({ error: 'Lista de cursos vacía' });
        return;
    }

    let cur = cursos.find(c => c.idCurso == req.id);
    if (cur){
        return res.json(cur);
    }
    
    let filtro = `id_curso_estado != 4,id_curso = ${req.id}`;

    let row = await base.mainGet('*','cursos',undefined,undefined,filtro);
    
    row = row[0];

    if (!row) {
        res.status(404).json({ error: 'Curso no encontrado' });
        return;
    }

    let estado = cursosEstados.find(c => c.id_curso_estado === row.id_curso_estado);
    cur = new Curso(row.id_curso, row.nombre, row.descripcion, row.fecha_inicio,
                    row.cantidad_horas, row.inscriptos_max, estado,
                    row.id_usuario_modificacion, row.fecha_hora_modificacion);
    
    return res.json(cur);
};

const loadEstudiantePage = async (req, res, next) => {
    estudiantes = [];

    if (base.getLenghtEstudiante() == 0){
        res.status(404).json({ error: 'Lista de estudiantes vacía' });
        return;
    }

    const start = parseInt(req.pag)*req.limit;
    
    let filtro = `activo != 0`;
    
    let baseEstudiantes = await base.mainGet('*','estudiantes',req.limit,start,filtro,"id_estudiante DESC");
    baseEstudiantes.forEach(row => {
        estudiantes.push(new Estudiante(row.id_estudiante, row.documento, row.apellido,
                                        row.nombres, row.email, row.fecha_nacimiento, row.activo,
                                        row.id_usuario_modificacion, row.fecha_hora_modificacion));
    });
    
    return res.json(JSON.stringify(estudiantes));
};

const getCantEstudiante = async (req, res, next) => {
    return res.send(estlen);
};

const getEstudiante = async (req, res, next) => {
    if (base.getLenghtEstudiante() == 0){
        res.status(404).json({ error: 'Lista de estudiantes vacía' });
        return;
    }

    let est = estudiantes.find(c => c.idEstudiante == req.id);
    if (est){
        return res.json(est);
    }

    let filtro = `activo != 0,id_estudiante = ${req.id}`;

    let row = await base.mainGet('*','estudiantes',undefined,undefined,filtro);

    row = row[0];

    if (!row) {
        res.status(404).json({ error: 'Estudiante no encontrado' });
        return;
    }

    est = new Estudiante(row.id_estudiante, row.documento, row.apellido,
                         row.nombres, row.email, row.fecha_nacimiento, row.activo,
                         row.id_usuario_modificacion, row.fecha_hora_modificacion);
    
    return res.json(est);
};

const loadInscripcionPage = async (req, res, next) => {
    inscripciones = [];

    if (base.getLenghtInscripcion() == 0){
        res.status(404).json({ error: 'Lista de inscripciones vacía' });
        return;
    }
    
    const start = parseInt(req.pag)*req.limit;
    
    let filtro = `id_inscripcion_estado != 2`;
    
    let baseInscripciones = await base.mainGet('*','inscripciones',req.limit,start,filtro,"id_inscripcion DESC");
    baseInscripciones.forEach(row => {
        inscripciones.push(new Inscripcion( row.id_inscripcion, row.id_curso, row.id_estudiante,
                                            row.fecha_hora_inscripcion, row.id_inscripcion_estado,
                                            row.id_usuario_modificacion, row.fecha_hora_modificacion));
    });

    return res.json(JSON.stringify(inscripciones));
};

const getCantInscripcion = async (req, res, next) => {
    return res.send(inslen);
};

const getInscripcion = async (req, res, next) => {
    if (base.getLenghtInscripcion() == 0){
        res.status(404).json({ error: 'Lista de inscripciones vacía' });
        return;
    }

    let ins = inscripciones.find(c => c.idInscripcion == req.id);
    if (ins){
        return res.json(ins);
    }
    
    let filtro = `id_inscripcion_estado != 2,id_inscripcion = ${req.id}`;

    let row = await base.mainGet('*','inscripciones',undefined,undefined,filtro);

    row = row[0];

    if (!row) {
        res.status(404).json({ error: 'Inscripcion no encontrada' });
        return;
    }

    ins = new Inscripcion(row.id_inscripcion, row.id_curso, row.id_estudiante,
                          row.fecha_hora_inscripcion, row.id_inscripcion_estado,
                          row.id_usuario_modificacion, row.fecha_hora_modificacion);
    
    return res.json(ins);
};

const getUsuario = async (id) => {
    return await usuarios.find(c => c.idUsuario == id);
};

const delCurso = async (req, res, next) => {

    let now = dateToBase(new Date().toISOString());

    try {
        let est = cursosEstados[3].id_curso_estado;
        let usu = usuarios[req.idUs].idUsuario;
        let resp = await base.mainSet('cursos',`id_curso_estado = ${est}, 
                                   id_usuario_modificacion = ${usu}, 
                                   fecha_hora_modificacion = ${now}`,
                                   `id_curso = ${req.id};`);
        curlen--;
        return res.status(204).send(resp);
    } catch {
        return res.status(500).send(false);
    }
};

const delEstudiante = async (req, res, next) => {

    let now = dateToBase(new Date().toISOString());

    try {
        let usu = usuarios[req.idUs].idUsuario;
        let resp = await base.mainSet(  'estudiantes',`activo = 0, 
                                    id_usuario_modificacion = ${usu}, 
                                    fecha_hora_modificacion = ${now} `,
                                    `id_estudiante = ${req.id};`);
        estlen--;
        return res.status(204).send(resp);
    } catch {
        return res.status(500).send(false);
    }
};

const delInscripcion = async (req, res, next) => {

    let now = dateToBase(new Date().toISOString());

    try {
        let usu = usuarios[req.idUs].idUsuario;
        let resp = await base.mainSet('inscripciones',`id_inscripcion_estado = 2, 
                                                   id_usuario_modificacion = ${usu}, 
                                                   fecha_hora_modificacion = ${now} `,
                                                  `id_inscripcion = ${req.id};`);
        inslen--;
        return res.status(204).send(true);
    } catch {
        return res.status(500).send(false);
    }
};

const agregar = async (req, res, next) => {
    let obj;
    let conf = false;
    try {
        if (req.cur){
            let aux = req.cur;
            obj = new Curso(aux.idCurso, aux.nombre, aux.descripcion, aux.fechaInicio,
                            aux.cantidadHoras, aux.inscriptosMax, aux.idCursoEstado,
                            aux.idUsuarioModificacion, aux.fechaHoraModificacion);
            conf = await base.agregarCurso(obj)
            curlen++;
            return res.status(201).send(conf);
        }
        if (req.est){
            let aux = req.est;
            obj = new Estudiante(aux.idEstudiante, aux.documento, aux.apellido,
                                aux.nombres, aux.email, aux.fechaNacimiento, aux.activo,
                                aux.idUsuarioModificacion, aux.fechaHoraModificacion);
            conf = base.agregarEstudiante(obj);
            estlen++;
            return res.status(201).send(conf);
        }
        if (req.ins){
            let aux = req.ins;
            obj = new Inscripcion(aux.idInscripcion, aux.idCurso, aux.idEstudiante,
                                aux.fechaHoraInscripcion, aux.idInscripcionEstado,
                                aux.idUsuarioModificacion, aux.fechaHoraModificacion);
            conf = base.agregarInscripcion(obj);
            inslen++;
            return res.status(201).send(conf);
        }
        throw new Error('Missing dataset');
    } catch (error) {
        let status = 500;
        if (error.message === 'Missing dataset'){
            status = 404;
        }
        return res.status(status).send(false);
    }

    return res.status(201).send(conf);
};

const modificar = async (req, res, next) => {
    let obj;
    if (req.cur){
        let cur = req.cur;
        let now = dateToBase(cur.fechaHoraModificacion);
        let ini = dateToBase(cur.fechaInicio);
        cur.cantidadHoras = parseInt(cur.cantidadHoras);
        cur.inscriptosMax = parseInt(cur.inscriptosMax);
    
        let resp = await base.mainSet('cursos',`nombre = $1, 
                                           descripcion = $2, 
                                           fecha_inicio = $3, 
                                           cantidad_horas = $4, 
                                           inscriptos_max = $5, 
                                           id_curso_estado = $6, 
                                           id_usuario_modificacion = $7, 
                                           fecha_hora_modificacion = $8`,
                                          `id_curso = $9;`,
                                           [cur.nombre,cur.descripcion,ini,cur.cantidadHoras,cur.inscriptosMax,
                                            cur.idCursoEstado,cur.idUsuarioModificacion,now,cur.idCurso]);
        return await res.status(202).send(resp);
    }
    if (req.est){
        let est = req.est;
        let now = dateToBase(est.fechaHoraModificacion);
        let nac = dateToBase(est.fechaNacimiento);
        
        let resp = await base.mainSet('estudiantes',`documento = $1, 
                                                apellido = $2, 
                                                nombres = $3,  
                                                email = $4, 
                                                fecha_nacimiento = $5, 
                                                activo = 1, 
                                                id_usuario_modificacion = $6, 
                                                fecha_hora_modificacion = $7`,
                                               `id_estudiante = $8`,
                                                [est.documento,est.apellido,est.nombres,est.email,
                                                nac,est.idUsuarioModificacion,now,est.idEstudiante]);
        return await res.status(202).send(resp);
    }
    return res.status(500).send(false);
};

const inscripcionValidation = async (req, res, next) => {
    let idCur = req.ins.idCurso, idEst = req.ins.idEstudiante;

    if (curlen == 0){
        res.status(404).json({ error: 'Lista de cursos vacía' });
        return;
    }
    
    let filtro = `id_curso_estado != 4,id_curso = ${idCur}`;

    let cur = await base.mainGet('1','cursos',undefined,undefined,filtro);

    if (!cur[0]) {
        res.status(404).json({ error: 'Curso no encontrado' });
        return;
    }

    if (estlen == 0){
        res.status(404).json({ error: 'Lista de estudiantes vacía' });
        return;
    }

    filtro = `activo != 0,id_estudiante = ${idEst}`;

    let est = await base.mainGet('1','estudiantes',undefined,undefined,filtro);

    if (!est[0]) {
        res.status(404).json({ error: 'Estudiante no encontrado' });
        return;
    }

    next();
};

function dateToBase(date){
    let fecha = date;

    let hora = fecha.split('T')[1];
    
    fecha = fecha.split('T')[0];

    if (hora){
        return `${fecha.split('-')[2]}/${fecha.split('-')[1]}/${fecha.split('-')[0]}T${hora.split(':')[0]}:${hora.split(':')[1]}:${hora.split(':')[2]}`;
    }
    return `${fecha.split('-')[2]}/${fecha.split('-')[1]}/${fecha.split('-')[0]}`;
}

export {cursos, estudiantes, inscripciones, loadCursoPage, getCantCurso,
        loadEstudiantePage, getCantEstudiante, loadInscripcionPage, getCantInscripcion,
        getCurso, getEstudiante, getInscripcion, getUsuario, 
        delCurso, delEstudiante, delInscripcion,
        agregar, modificar, inscripcionValidation};