class Estudiante{

    constructor(id, documento, apellido, nombre, mail, nacimiento, activo, usuario, mod){
        this.idEstudiante = id;
        this.documento = documento;
        this.apellido = apellido;
        this.nombres = nombre;
        this.email = mail;
        this.fechaNacimiento = nacimiento;
        this.activo = activo;
        this.idUsuarioModificacion = usuario;
        this.fechaHoraModificacion = mod;
    }
}

class Curso{

    constructor(id, nombre, desc, inicio, horas, max, est, usuario, mod){
        this.idCurso = id;
        this.nombre = nombre;
        this.descripcion = desc;
        this.fechaInicio = inicio;
        this.cantidadHoras = horas;
        this.inscriptosMax = max;
        this.idCursoEstado = est;
        this.idUsuarioModificacion = usuario;
        this.fechaHoraModificacion = mod;
    }
}

class Inscripcion{
    constructor(id, idCur, idEst, ins, estado, usuario, mod){
        this.idInscripcion = id;
        this.idCurso = idCur;
        this.idEstudiante = idEst;
        this.fechaHoraInscripcion = ins;
        this.idInscripcionEstado = estado;
        this.idUsuarioModificacion = usuario;
        this.fechaHoraModificacion = mod;
    }
}

export {Estudiante, Curso, Inscripcion};