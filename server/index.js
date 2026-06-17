import express from 'express';
import helmet from 'helmet';
import * as estructuras from "./estructuras.js";
import * as rutas from "./rutas.js";
// import * as base from './connectbase.js';
const app = express();
const port = (process.env.PORT || 3000);

app.use(express.json()); 
app.use(express.static('../main'));
app.use(express.urlencoded({ extended: true })); 
app.use(helmet());

app.get('/', (req, res) => {
    res.type("text/html");
    res.status(200);
    res.sendFile("index.html", {root: __dirname});
});

app.use('/cursos',rutas.cursos);

app.use('/estudiantes',rutas.estudiantes);

app.use('/inscripciones',rutas.inscripciones);

app.get('/usuarios/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const usu = await estructuras.getUsuario(id);
    if (usu) {
        res.json(usu);
    } else {
        res.status(404).json({ error: 'Usuario no encontrado' });
    }
});

app.listen(port, () => console.log(`Express iniciado en http://localhost:${port}`));