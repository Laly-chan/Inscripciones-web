import { Client } from 'pg';

const main = async () => {
    const client = new Client({
        host: process.env.PGHOST || 'localhost',
        port: process.env.PGPORT ? Number(process.env.PGPORT) : 5432,
        user: process.env.PGUSER || 'postgres',
        password: process.env.PGPASSWORD || 'wwssadadqe',
        database: process.env.PGDATABASE || 'postgres',
    });

    try {
        await client.connect();
        const result = await client.query('SELECT * FROM public.cursos');
        return result.rows;
    } catch (err) {
        console.error('Error consultando PostgreSQL:', err);
        process.exitCode = 1;
    } finally {
        try {
            await client.end();
        } catch {

        }
    }
}

const getEstudiantePage = async (pag) => {
    const client = new Client({
        host: process.env.PGHOST || 'localhost',
        port: process.env.PGPORT ? Number(process.env.PGPORT) : 5432,
        user: process.env.PGUSER || 'postgres',
        password: process.env.PGPASSWORD || 'wwssadadqe',
        database: process.env.PGDATABASE || 'postgres',
    });

    let start = pag*10;

    try {
        await client.connect();
        const result = await client.query(`SELECT * FROM public.estudiantes WHERE activo != 0 LIMIT 10 OFFSET ${start}`);
        return result.rows;
    } catch (err) {
        console.error('Error consultando PostgreSQL:', err);
        process.exitCode = 1;
    } finally {
        try {
            await client.end();
        } catch {

        }
    }
}

const getLenghtEstudiante = async () => {
    const client = new Client({
        host: process.env.PGHOST || 'localhost',
        port: process.env.PGPORT ? Number(process.env.PGPORT) : 5432,
        user: process.env.PGUSER || 'postgres',
        password: process.env.PGPASSWORD || 'wwssadadqe',
        database: process.env.PGDATABASE || 'postgres',
    });

    try {
        await client.connect();
        const result = await client.query(`SELECT COUNT(*) FROM public.estudiantes WHERE activo != 0`);
        return parseInt(result.rows.pop().count);
    } catch (err) {
        console.error('Error consultando PostgreSQL:', err);
        process.exitCode = 1;
    } finally {
        try {
            await client.end();
        } catch {

        }
    }
}

const getEstudiante = async (id) => {
    const client = new Client({
        host: process.env.PGHOST || 'localhost',
        port: process.env.PGPORT ? Number(process.env.PGPORT) : 5432,
        user: process.env.PGUSER || 'postgres',
        password: process.env.PGPASSWORD || 'wwssadadqe',
        database: process.env.PGDATABASE || 'postgres',
    });

    try {
        await client.connect();
        const result = await client.query(`SELECT * FROM public.estudiantes WHERE id_estudiante = ${id}`);
        return result.rows[0];
    } catch (err) {
        console.error('Error consultando PostgreSQL:', err);
        process.exitCode = 1;
    } finally {
        try {
            await client.end();
        } catch {

        }
    }
}

const getCursoPage = async (pag) => {
    const client = new Client({
        host: process.env.PGHOST || 'localhost',
        port: process.env.PGPORT ? Number(process.env.PGPORT) : 5432,
        user: process.env.PGUSER || 'postgres',
        password: process.env.PGPASSWORD || 'wwssadadqe',
        database: process.env.PGDATABASE || 'postgres',
    });

    let start = pag*10;

    try {
        await client.connect();
        const result = await client.query(`SELECT * FROM public.cursos WHERE id_curso_estado != 4 LIMIT 10 OFFSET ${start}`);
        return result.rows;
    } catch (err) {
        console.error('Error consultando PostgreSQL:', err);
        process.exitCode = 1;
    } finally {
        try {
            await client.end();
        } catch {

        }
    }
}

const getLenghtCurso = async () => {
    const client = new Client({
        host: process.env.PGHOST || 'localhost',
        port: process.env.PGPORT ? Number(process.env.PGPORT) : 5432,
        user: process.env.PGUSER || 'postgres',
        password: process.env.PGPASSWORD || 'wwssadadqe',
        database: process.env.PGDATABASE || 'postgres',
    });

    try {
        await client.connect();
        const result = await client.query(`SELECT COUNT(*) FROM public.cursos WHERE id_curso_estado != 4`);
        return parseInt(result.rows.pop().count);
    } catch (err) {
        console.error('Error consultando PostgreSQL:', err);
        process.exitCode = 1;
    } finally {
        try {
            await client.end();
        } catch {

        }
    }
}

const getCurso = async (id) => {
    const client = new Client({
        host: process.env.PGHOST || 'localhost',
        port: process.env.PGPORT ? Number(process.env.PGPORT) : 5432,
        user: process.env.PGUSER || 'postgres',
        password: process.env.PGPASSWORD || 'wwssadadqe',
        database: process.env.PGDATABASE || 'postgres',
    });

    try {
        await client.connect();
        const result = await client.query(`SELECT * FROM public.cursos WHERE id_curso = ${id}`);
        return result.rows[0];
    } catch (err) {
        console.error('Error consultando PostgreSQL:', err);
        process.exitCode = 1;
    } finally {
        try {
            await client.end();
        } catch {

        }
    }
}

const getInscripcionPage = async (pag) => {
    const client = new Client({
        host: process.env.PGHOST || 'localhost',
        port: process.env.PGPORT ? Number(process.env.PGPORT) : 5432,
        user: process.env.PGUSER || 'postgres',
        password: process.env.PGPASSWORD || 'wwssadadqe',
        database: process.env.PGDATABASE || 'postgres',
    });

    let start = pag*10;

    try {
        await client.connect();
        const result = await client.query(`SELECT * FROM public.inscripciones WHERE id_inscripcion_estado != 2 LIMIT 10 OFFSET ${start}`);
        return result.rows;
    } catch (err) {
        console.error('Error consultando PostgreSQL:', err);
        process.exitCode = 1;
    } finally {
        try {
            await client.end();
        } catch {

        }
    }
}

const getLenghtInscripcion = async () => {
    const client = new Client({
        host: process.env.PGHOST || 'localhost',
        port: process.env.PGPORT ? Number(process.env.PGPORT) : 5432,
        user: process.env.PGUSER || 'postgres',
        password: process.env.PGPASSWORD || 'wwssadadqe',
        database: process.env.PGDATABASE || 'postgres',
    });

    try {
        await client.connect();
        const result = await client.query(`SELECT COUNT(*) FROM public.inscripciones WHERE id_inscripcion_estado != 2`);
        return parseInt(result.rows.pop().count);
    } catch (err) {
        console.error('Error consultando PostgreSQL:', err);
        process.exitCode = 1;
    } finally {
        try {
            await client.end();
        } catch {

        }
    }
}

const getInscripcion = async (id) => {
    const client = new Client({
        host: process.env.PGHOST || 'localhost',
        port: process.env.PGPORT ? Number(process.env.PGPORT) : 5432,
        user: process.env.PGUSER || 'postgres',
        password: process.env.PGPASSWORD || 'wwssadadqe',
        database: process.env.PGDATABASE || 'postgres',
    });

    try {
        await client.connect();
        const result = await client.query(`SELECT * FROM public.inscripciones WHERE id_inscripcion = ${id}`);
        return result.rows[0];
    } catch (err) {
        console.error('Error consultando PostgreSQL:', err);
        process.exitCode = 1;
    } finally {
        try {
            await client.end();
        } catch {

        }
    }
}

const getCursosEstados = async () => {
    const client = new Client({
        host: process.env.PGHOST || 'localhost',
        port: process.env.PGPORT ? Number(process.env.PGPORT) : 5432,
        user: process.env.PGUSER || 'postgres',
        password: process.env.PGPASSWORD || 'wwssadadqe',
        database: process.env.PGDATABASE || 'postgres',
    });

    try {
        await client.connect();
        const result = await client.query(`SELECT * FROM public.cursos_estados`);
        return result.rows;
    } catch (err) {
        console.error('Error consultando PostgreSQL:', err);
        process.exitCode = 1;
    } finally {
        try {
            await client.end();
        } catch {

        }
    }
}

const getInscripcionesEstados = async () => {
    const client = new Client({
        host: process.env.PGHOST || 'localhost',
        port: process.env.PGPORT ? Number(process.env.PGPORT) : 5432,
        user: process.env.PGUSER || 'postgres',
        password: process.env.PGPASSWORD || 'wwssadadqe',
        database: process.env.PGDATABASE || 'postgres',
    });

    try {
        await client.connect();
        const result = await client.query(`SELECT * FROM public.inscripciones_estados`);
        return result.rows;
    } catch (err) {
        console.error('Error consultando PostgreSQL:', err);
        process.exitCode = 1;
    } finally {
        try {
            await client.end();
        } catch {

        }
    }
}

const getUsuarios = async () => {
    const client = new Client({
        host: process.env.PGHOST || 'localhost',
        port: process.env.PGPORT ? Number(process.env.PGPORT) : 5432,
        user: process.env.PGUSER || 'postgres',
        password: process.env.PGPASSWORD || 'wwssadadqe',
        database: process.env.PGDATABASE || 'postgres',
    });

    try {
        await client.connect();
        const result = await client.query(`SELECT * FROM public.usuarios`);
        return result.rows;
    } catch (err) {
        console.error('Error consultando PostgreSQL:', err);
        process.exitCode = 1;
    } finally {
        try {
            await client.end();
        } catch {

        }
    }
}

const softDelCurso = async (id,est,usu) => {
    const client = new Client({
        host: process.env.PGHOST || 'localhost',
        port: process.env.PGPORT ? Number(process.env.PGPORT) : 5432,
        user: process.env.PGUSER || 'postgres',
        password: process.env.PGPASSWORD || 'wwssadadqe',
        database: process.env.PGDATABASE || 'postgres',
    });
    
    let now = dateToBase(new Date().toISOString());

    try {
        await client.connect();
        await client.query(`UPDATE public.cursos 
                            SET id_curso_estado = ${est.id_curso_estado}, 
                            id_usuario_modificacion = ${usu.idUsuario}, 
                            fecha_hora_modificacion = ${now} 
                            WHERE id_curso = ${id};`);
        return true;
    } catch (err) {
        console.error('Error consultando PostgreSQL:', err);
        process.exitCode = 1;
    } finally {
        try {
            await client.end();
            
        } catch {

        }
    }
}

const softDelEstudiante = async (id,usu) => {
    const client = new Client({
        host: process.env.PGHOST || 'localhost',
        port: process.env.PGPORT ? Number(process.env.PGPORT) : 5432,
        user: process.env.PGUSER || 'postgres',
        password: process.env.PGPASSWORD || 'wwssadadqe',
        database: process.env.PGDATABASE || 'postgres',
    });

    let now = dateToBase(new Date().toISOString());
    
    try {
        await client.connect();
        await client.query(`UPDATE public.estudiantes SET activo = 0, 
                            id_usuario_modificacion = ${usu.idUsuario}, 
                            fecha_hora_modificacion = ${now} 
                            WHERE id_estudiante = ${id};`);
        return true;
    } catch (err) {
        console.error('Error consultando PostgreSQL:', err);
        process.exitCode = 1;
    } finally {
        try {
            await client.end();
            
        } catch {

        }
    }
}

const modificarCurso = async (cur) => {
    const client = new Client({
        host: process.env.PGHOST || 'localhost',
        port: process.env.PGPORT ? Number(process.env.PGPORT) : 5432,
        user: process.env.PGUSER || 'postgres',
        password: process.env.PGPASSWORD || 'wwssadadqe',
        database: process.env.PGDATABASE || 'postgres',
    });
    
    let now = dateToBase(cur.fechaHoraModificacion);
    let ini = dateToBase(cur.fechaInicio);

    try {
        await client.connect();
        await client.query(`UPDATE public.cursos 
                            SET nombre = '${cur.nombre}', 
                            descripcion = '${cur.descripcion}', 
                            fecha_inicio = ${ini}, 
                            cantidad_horas = ${cur.cantidadHoras}, 
                            inscriptos_max = ${cur.inscriptosMax}, 
                            id_curso_estado = ${cur.idCursoEstado}, 
                            id_usuario_modificacion = ${cur.idUsuarioModificacion}, 
                            fecha_hora_modificacion = ${now} 
                            WHERE id_curso = ${cur.idCurso};`);
        return true;
    } catch (err) {
        console.error('Error consultando PostgreSQL:', err);
        process.exitCode = 1;
    } finally {
        try {
            await client.end();
            
        } catch {

        }
    }
}

const modificarEstudiante = async (est) => {
    const client = new Client({
        host: process.env.PGHOST || 'localhost',
        port: process.env.PGPORT ? Number(process.env.PGPORT) : 5432,
        user: process.env.PGUSER || 'postgres',
        password: process.env.PGPASSWORD || 'wwssadadqe',
        database: process.env.PGDATABASE || 'postgres',
    });

    let now = dateToBase(est.fechaHoraModificacion);
    let nac = dateToBase(est.fechaNacimiento);
    
    try {
        await client.connect();
        await client.query(`UPDATE public.estudiantes 
                            SET documento = '${est.documento}', 
                            apellido = '${est.apellido}', 
                            nombres = '${est.nombres}', 
                            email = '${est.email}', 
                            fecha_nacimiento = ${nac}, 
                            activo = 1, 
                            id_usuario_modificacion = ${est.idUsuarioModificacion}, 
                            fecha_hora_modificacion = ${now} 
                            WHERE id_estudiante = ${est.idEstudiante};`);
        return true;
    } catch (err) {
        console.error('Error consultando PostgreSQL:', err);
        process.exitCode = 1;
    } finally {
        try {
            await client.end();
            
        } catch {

        }
    }
}

const softDelInscripcion = async (id,usu) => {
    const client = new Client({
        host: process.env.PGHOST || 'localhost',
        port: process.env.PGPORT ? Number(process.env.PGPORT) : 5432,
        user: process.env.PGUSER || 'postgres',
        password: process.env.PGPASSWORD || 'wwssadadqe',
        database: process.env.PGDATABASE || 'postgres',
    });

    let now = dateToBase(new Date().toISOString());
    
    try {
        await client.connect();
        await client.query(`UPDATE public.inscripciones 
                            SET id_inscripcion_estado = 2, 
                            id_usuario_modificacion = ${usu.idUsuario}, 
                            fecha_hora_modificacion = ${now} 
                            WHERE id_inscripcion = ${id};`);
        return true;
    } catch (err) {
        console.error('Error consultando PostgreSQL:', err);
        process.exitCode = 1;
    } finally {
        try {
            await client.end();
            
        } catch {

        }
    }
}

const agregarCurso = async (obj) => {
    const client = new Client({
        host: process.env.PGHOST || 'localhost',
        port: process.env.PGPORT ? Number(process.env.PGPORT) : 5432,
        user: process.env.PGUSER || 'postgres',
        password: process.env.PGPASSWORD || 'wwssadadqe',
        database: process.env.PGDATABASE || 'postgres',
    });

    let now = dateToBase(obj.fechaHoraModificacion);
    let ini = dateToBase(obj.fechaInicio);

    try {
        await client.connect();
        let last = await client.query(`SELECT COUNT(*) FROM public.cursos`);
        let newid = parseInt(last.rows.pop().count) + 1;
        await client.query(`INSERT INTO public.cursos VALUES
                            (${newid},'${obj.nombre}', '${obj.descripcion}', ${ini}, 
                            ${parseInt(obj.cantidadHoras)}, ${parseInt(obj.inscriptosMax)}, 
                            ${obj.idCursoEstado}, ${obj.idUsuarioModificacion}, ${now})`);

        return true;
    } catch (err) {
        console.error('Error consultando PostgreSQL:', err);
        process.exitCode = 1;
    } finally {
        try {
            await client.end();
            
        } catch {

        }
    }
}

const agregarEstudiante = async (obj) => {
    const client = new Client({
        host: process.env.PGHOST || 'localhost',
        port: process.env.PGPORT ? Number(process.env.PGPORT) : 5432,
        user: process.env.PGUSER || 'postgres',
        password: process.env.PGPASSWORD || 'wwssadadqe',
        database: process.env.PGDATABASE || 'postgres',
    });

    let now = dateToBase(obj.fechaHoraModificacion);
    let nac = dateToBase(obj.fechaNacimiento);

    try {
        await client.connect();
        let last = await client.query(`SELECT COUNT(*) FROM public.estudiantes`);
        let newid = parseInt(last.rows.pop().count) + 6;
        await client.query(`INSERT INTO public.estudiantes VALUES
                            (${newid},'${obj.documento}', '${obj.apellido}', '${obj.nombres}', '${obj.email}', 
                            ${nac}, 1, ${obj.idUsuarioModificacion}, ${now})`);

        return true;
    } catch (err) {
        console.error('Error consultando PostgreSQL:', err);
        process.exitCode = 1;
    } finally {
        try {
            await client.end();
            
        } catch {

        }
    }
}

const agregarInscripcion = async (obj) => {
    const client = new Client({
        host: process.env.PGHOST || 'localhost',
        port: process.env.PGPORT ? Number(process.env.PGPORT) : 5432,
        user: process.env.PGUSER || 'postgres',
        password: process.env.PGPASSWORD || 'wwssadadqe',
        database: process.env.PGDATABASE || 'postgres',
    });

    let now = dateToBase(obj.fechaHoraModificacion);
    let insc = dateToBase(obj.fechaHoraInscripcion);

    try {
        await client.connect();
        let last = await client.query(`SELECT COUNT(*) FROM public.inscripciones`);
        let newid = parseInt(last.rows.pop().count) + 1;
        await client.query(`INSERT INTO public.inscripciones VALUES
                            (${newid},${obj.idCurso}, ${obj.idEstudiante}, ${insc}, 
                            ${obj.idInscripcionEstado}, ${obj.idUsuarioModificacion}, ${now})`);

        return true;
    } catch (err) {
        console.error('Error consultando PostgreSQL:', err);
        process.exitCode = 1;
    } finally {
        try {
            await client.end();
            
        } catch {

        }
    }
}

function dateToBase(date){
    let fecha = date;

    let hora = fecha.split('T')[1];
    
    fecha = fecha.split('T')[0];

    if (hora){
        return `'${fecha.split('-')[2]}/${fecha.split('-')[1]}/${fecha.split('-')[0]}T${hora.split(':')[0]}:${hora.split(':')[1]}:${hora.split(':')[2]}'`;
    }
    return `'${fecha.split('-')[2]}/${fecha.split('-')[1]}/${fecha.split('-')[0]}'`;
}

export {main, getCursoPage, getLenghtCurso, getCurso,
        getEstudiantePage, getLenghtEstudiante, getEstudiante,
        getInscripcionPage, getLenghtInscripcion, getInscripcion,
        getCursosEstados, getInscripcionesEstados, getUsuarios,
        softDelCurso, softDelEstudiante, softDelInscripcion, 
        agregarCurso, agregarEstudiante, agregarInscripcion,
        modificarCurso, modificarEstudiante};