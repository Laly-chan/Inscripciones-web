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

    editar(documento, nombre, apellido, mail, nacimiento, usuario){
        this.documento = documento;
        this.apellido = apellido;
        this.nombres = nombre;
        this.email = mail;
        this.fechaNacimiento = nacimiento;
        this.idUsuarioModificacion = usuario;
        this.fechaHoraModificacion = new Date();
    }

    borrar(usuario){
        this.activo = 0;
        this.idUsuarioModificacion = usuario;
        this.fechaHoraModificacion = new Date();
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

    editar(nombre, desc, inicio, horas, max, est, usuario){
        this.nombre = nombre;
        this.descripcion = desc;
        this.fechaInicio = inicio;
        this.cantidadHoras = horas;
        this.inscriptosMax = max;
        this.cursoEstado = est;
        this.idUsuarioModificacion = usuario;
        this.fechaHoraModificacion = new Date();
    }

    borrar(usuario){
        this.idCursoEstado = 4; //Eliminado
        this.idUsuarioModificacion = usuario;
        this.fechaHoraModificacion = new Date();
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

    borrar(usuario){
        this.idInscripcionEstado = 2;
        this.idUsuarioModificacion = usuario;
        this.fechaHoraModificacion = new Date();
    }
}

class Usuario{
    constructor(id,apellido,nombre,nom_usuario,contra,activo){
        this.idUsuario = id;
        this.apellido = apellido;
        this.nombre = nombre;
        this.nombreUsuario = nom_usuario;
        //this.contrasenia = contra;
        this.activo = activo;
    }
}

export {Estudiante, Curso, Inscripcion, Usuario};