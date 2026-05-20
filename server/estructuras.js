import {Estudiante, Curso, Inscripcion, Usuario} from "./objetos.js";
import * as base from './connectbase.js';

//let baseCursos;
let cursos = [];
let estudiantes = [];
let inscripciones = [];
let cursosEstados = [];
let inscripcionesEstados = [];
let usuarios = [];

const loadCursoEstado = async () => {
    cursosEstados = await base.getCursosEstados();
};
const loadInscripcionEstado = async () => {
    inscripcionesEstados = await base.getInscripcionesEstados();
};
const loadUsuarios = async () => {
    let baseUsuarios = await base.getUsuarios();
    baseUsuarios.forEach(row => {
        usuarios.push(new Usuario(  row.id_usuario, row.apellido, row.nombre,
                                    row.nombre_usuario, row.contrasenia, row.activo));
    });
};

loadCursoEstado();
loadInscripcionEstado();
loadUsuarios();

const loadCursoPage = async (pag) => {
    cursos = [];
    let baseCursos = await base.getCursoPage(pag);
    baseCursos.forEach(row => {
        let estado = cursosEstados.find(c => c.id_curso_estado === row.id_curso_estado);
        cursos.push(new Curso(  row.id_curso, row.nombre, row.descripcion, row.fecha_inicio,
                                row.cantidad_horas, row.inscriptos_max, estado,
                                row.id_usuario_modificacion, row.fecha_hora_modificacion));
    });
};

const getCantCurso = async () => {
    return await base.getLenghtCurso();
};

const getCurso = async (id) => {
    let row = await base.getCurso(id);
    let estado = cursosEstados.find(c => c.id_curso_estado === row.id_curso_estado);
    let cur = new Curso(  row.id_curso, row.nombre, row.descripcion, row.fecha_inicio,
                                row.cantidad_horas, row.inscriptos_max, estado,
                                row.id_usuario_modificacion, row.fecha_hora_modificacion);
    return cur;
};

const loadEstudiantePage = async (pag) => {
    estudiantes = [];
    let baseEstudiantes = await base.getEstudiantePage(pag);
    baseEstudiantes.forEach(row => {
        estudiantes.push(new Estudiante(row.id_estudiante, row.documento, row.apellido,
                                        row.nombres, row.email, row.fecha_nacimiento, row.activo,
                                        row.id_usuario_modificacion, row.fecha_hora_modificacion));
    });
};

const getCantEstudiante = async () => {
    return await base.getLenghtEstudiante();
};

const getEstudiante = async (id) => {
    let row = await base.getEstudiante(id);
    let est = new Estudiante(row.id_estudiante, row.documento, row.apellido,
                                        row.nombres, row.email, row.fecha_nacimiento, row.activo,
                                        row.id_usuario_modificacion, row.fecha_hora_modificacion);
    return est;
};

const loadInscripcionPage = async (pag) => {
    inscripciones = [];
    let baseInscripciones = await base.getInscripcionPage(pag);
    baseInscripciones.forEach(row => {
        inscripciones.push(new Inscripcion( row.id_inscripcion, row.id_curso, row.id_estudiante,
                                            row.fecha_hora_inscripcion, row.id_inscripcion_estado,
                                            row.id_usuario_modificacion, row.fecha_hora_modificacion));
    });
};

const getCantInscripcion = async () => {
    return await base.getLenghtInscripcion();
};

const getInscripcion = async (id) => {
    let row = await base.getInscripcion(id);
    let ins = new Inscripcion( row.id_inscripcion, row.id_curso, row.id_estudiante,
                                            row.fecha_hora_inscripcion, row.id_inscripcion_estado,
                                            row.id_usuario_modificacion, row.fecha_hora_modificacion);
    return ins;
};

const getUsuario = async (id) => {
    return await usuarios.find(c => c.idUsuario == id);
};

const delCurso = async (id) => {
    let est = cursosEstados[3];
    return await base.softDelCurso(id,est,usuarios[0]);
};

const delEstudiante = async (id) => {
    return await base.softDelEstudiante(id,usuarios[0]);
};

const delInscripcion = async (id) => {
    return await base.softDelInscripcion(id,usuarios[0]);
};

const agregarCurso = async (obj) => {
    return await base.agregarCurso(obj);
};
const agregarEstudiante = async (obj) => {
    return await base.agregarEstudiante(obj);
};
const agregarInscripcion = async (obj) => {
    return await base.agregarInscripcion(obj);
};

const modificarCurso = async (obj) => {
    return await base.modificarCurso(obj);
};
const modificarEstudiante = async (obj) => {
    return await base.modificarEstudiante(obj);
};

loadCursoPage(0);

loadEstudiantePage(0);

loadInscripcionPage(0);

export {cursos, estudiantes, inscripciones, loadCursoPage, getCantCurso,
        loadEstudiantePage, getCantEstudiante, loadInscripcionPage, getCantInscripcion,
        getCurso, getEstudiante, getInscripcion, getUsuario, 
        delCurso, delEstudiante, delInscripcion, 
        agregarCurso, agregarEstudiante, agregarInscripcion,
        modificarCurso, modificarEstudiante};