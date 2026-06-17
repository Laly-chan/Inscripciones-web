import { Client } from 'pg';

const mainGet = async (object,base,limit,offset,filter,order) => {
    const client = new Client({
        host: process.env.PGHOST || 'localhost',
        port: process.env.PGPORT ? Number(process.env.PGPORT) : 5432,
        user: process.env.PGUSER || 'postgres',
        password: process.env.PGPASSWORD || 'wwssadadqe', //por algún motivo no carga la contraseña del .env
        database: process.env.PGDATABASE || '',
    });

    let strLimit = '';
    let strOff = '';
    let strFilter = '';
    let strOrder = '';

    if (limit){
        strLimit = `LIMIT ${limit} `;
    }

    if (offset){
        strOff = `OFFSET ${offset} `;
    }
    
    if (filter){
        strFilter = `WHERE ${filter.replaceAll(',',' AND ')}`
    }

    if (order){
        strOrder = `ORDER BY ${order}`
    }

    try {
        await client.connect();
        const result = await client.query(`SELECT ${object} FROM public.${base} 
                                           ${strFilter} ${strOrder} ${strLimit} ${strOff}`);
            await client.end();
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

const mainSet = async (base,edit,id,info) => {
    const client = new Client({
        host: process.env.PGHOST || 'localhost',
        port: process.env.PGPORT ? Number(process.env.PGPORT) : 5432,
        user: process.env.PGUSER || 'postgres',
        password: process.env.PGPASSWORD || 'wwssadadqe',
        database: process.env.PGDATABASE || '',
    });

    let strEdit = '';
    let strId = '';
    
    if (edit){
        strEdit = `SET ${edit}`;
    }
    if (id){
        strId = `WHERE ${id}`;
    }

    try {
        await client.connect();
        await client.query(`UPDATE public.${base} ${strEdit} ${strId}`,info);
        await client.end();
        return true;
    } catch (err) {
        console.error('Error consultando PostgreSQL:', err);
        process.exitCode = 1;
    } finally {
        try {
            await client.end();
            return false;
        } catch {

        }
    }
}

const mainAdd = async (base,info,data) => {
    const client = new Client({
        host: process.env.PGHOST || 'localhost',
        port: process.env.PGPORT ? Number(process.env.PGPORT) : 5432,
        user: process.env.PGUSER || 'postgres',
        password: process.env.PGPASSWORD || 'wwssadadqe', //por algún motivo no carga la contraseña del .env
        database: process.env.PGDATABASE || '',
    });

    let strInfo = '';
    let idOffset = 1;
    
    if (base == 'estudiantes'){
        idOffset = 6; //por algún motivo el id de los estudiantes se saltea los primeros 5 puestos y ocupa los últimos 5, por eso el +6
    }

    try {
        await client.connect();
        let last = await client.query(`SELECT COUNT(*) FROM public.${base}`);
        let newid = parseInt(last.rows.pop().count) + idOffset;
        if (info){
            strInfo = `VALUES (${newid},${info})`;
        }
        await client.query(`INSERT INTO public.${base} ${strInfo}`,data);
        await client.end();
        return true;
    } catch (err) {
        console.error('Error consultando PostgreSQL:', err);
        process.exitCode = 1;
    } finally {
        try {
            await client.end();
            return false;
        } catch {

        }
    }
}

const getLenghtEstudiante = async () => {

    let filtro = `activo != 0`;

    let count = await mainGet('COUNT(*)','estudiantes',undefined,undefined,filtro);

    return parseInt(count.pop().count);
}

const getLenghtCurso = async () => {
    
    let filtro = `id_curso_estado != 4`;

    let count = await mainGet('COUNT(*)','cursos',undefined,undefined,filtro);

    return parseInt(count.pop().count);
}

const getLenghtInscripcion = async () => {

    let filtro = `id_inscripcion_estado != 2`;

    let count = await mainGet('COUNT(*)','inscripciones',undefined,undefined,filtro);

    return parseInt(count.pop().count);
}

const getCursosEstados = async () => {

    return await mainGet('*','cursos_estados');
}

const getInscripcionesEstados = async () => {
    return await mainGet('*','inscripciones_estados');
}

const getUsuarios = async () => {
    return await mainGet('*','usuarios'); //tengo que poner menos acceso a esto
}

const agregarCurso = async (obj) => {
    let now = dateToBase(obj.fechaHoraModificacion);
    let ini = dateToBase(obj.fechaInicio);
    obj.cantidadHoras = parseInt(obj.cantidadHoras);
    obj.inscriptosMax = parseInt(obj.inscriptosMax);

    return await mainAdd('cursos',`$1, $2, $3, $4, $5, $6, $7, $8`,
                                    [obj.nombre,obj.descripcion,ini,obj.cantidadHoras,obj.inscriptosMax,
                                    obj.idCursoEstado,obj.idUsuarioModificacion,now]);
}

const agregarEstudiante = async (obj) => {
    let now = dateToBase(obj.fechaHoraModificacion);
    let nac = dateToBase(obj.fechaNacimiento);

    return await mainAdd('estudiantes',`$1, $2, $3, $4, $5, 1, $6, $7`,
                                    [obj.documento,obj.apellido,obj.nombres,obj.email,nac,
                                    obj.idUsuarioModificacion,now]);
}

const agregarInscripcion = async (obj) => {
    let now = dateToBase(obj.fechaHoraModificacion);
    let insc = dateToBase(obj.fechaHoraInscripcion);

    return await mainAdd('inscripciones',`$1, $2, $3, $4, $5, $6`,
                                    [obj.idCurso,obj.idEstudiante,insc,obj.idInscripcionEstado,
                                    obj.idUsuarioModificacion,now]);
}

function dateToBase(date){
    let fecha = date;

    let hora = fecha.split('T')[1];
    
    fecha = fecha.split('T')[0];

    if (hora){
        return `${fecha.split('-')[2]}/${fecha.split('-')[1]}/${fecha.split('-')[0]}T${hora.split(':')[0]}:${hora.split(':')[1]}:${hora.split(':')[2]}`;
    }
    return `${fecha.split('-')[2]}/${fecha.split('-')[1]}/${fecha.split('-')[0]}`;
}

export {getLenghtCurso, getLenghtEstudiante, getLenghtInscripcion,
        getCursosEstados, getInscripcionesEstados, getUsuarios,
        agregarCurso, agregarEstudiante, agregarInscripcion,
        mainGet, mainSet};