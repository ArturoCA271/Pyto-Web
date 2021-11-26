const express = require('express');
const pool = require('../conexion');
const router = express.Router();


router.get('/inscripcion', (req, res) => {
    if (req.session.id_curso_selected !== undefined)
        res.render('inscripcion.html');
    else
        res.redirect('/');
});

router.post('/inscripcion', async(req, res) => {
    if (req.session.id_curso_selected !== undefined) {
        const {
            nombre_i,
            apellidos_i,
            correo_i,
            telefono1,
            fecha_nacimiento
        } = req.body;


        const query = `CALL validaCorreoInscritos('${correo_i}', @existe)`;
        await pool.query(query);
        let param = await pool.query('SELECT @existe;');
        let existe = undefined;
        param.forEach(element => {
            existe = element['@existe'];
        });
        if (existe === null || existe === undefined) {

            const newInscrito = {
                nombre: nombre_i,
                apellidos: apellidos_i,
                correo: correo_i,
                telefono: telefono1,
                fecha_nacimiento: fecha_nacimiento,
            }
            await pool.query('INSERT INTO inscritos set ?', [newInscrito]);

            let resultado = await pool.query(`SELECT P.inscrito_id FROM inscritos P WHERE P.correo ='${correo_i}'`);
            let id_inscrito;
            resultado.forEach(element => {
                id_inscrito = element['inscrito_id'];
            });
            let curso_id = req.session.id_curso_selected;
            const fecha = new Date();
            let dd = fecha.getDate();
            let mm = fecha.getMonth() + 1; //January is 0!
            let yyyy = fecha.getFullYear();
            let str_fecha = yyyy + '-' + mm + '-' + dd;

            const newInscritos_x_curso = {
                inscrito_id: id_inscrito,
                curso_id: curso_id,
                fecha_inscripcion: str_fecha
            }
            await pool.query('INSERT INTO detalle_inscritos_x_curso SET ?', [newInscritos_x_curso]);
            res.redirect('/');
        } else {
            res.status(500).send({ 'Error': 'El correo proporcionado ya existe, proporciona otro correo' });
        }
    } else
        res.redirect('/');
});

module.exports = router;