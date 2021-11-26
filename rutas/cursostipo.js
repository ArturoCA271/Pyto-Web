const { render } = require('ejs');
const express = require('express');
const router = express.Router();
const pool = require('../conexion');


router.get('/tipo', async(req, res) => {
    if (req.session.id_proveedor !== undefined) {
        const cursos = await pool.query(`SELECT * FROM cursos P WHERE P.proveedor_id = ${req.session.id_proveedor}`);
        console.log(cursos);
        res.render('listado_cursos.html', { 'datos': cursos });
    } else {
        res.redirect('/login');
    }

});

router.get('/borrar_curso/:id_curso', async(req, res) => {

    if (req.session.id_proveedor !== undefined) {
        console.log('Entro al get');
        let query = `DELETE FROM cursos WHERE  curso_id = ${req.params.id_curso};`;
        try {
            await pool.query(query);
        } catch (error) {
            res.status(500).send({ 'Error': 'Ya existen alumnos inscritos, no se puede eliminar' });
        }

        res.redirect('/tipo');
    } else
        res.redirect('/login');
})


router.get('/borrar_curso', (req, res) => {
    res.redirect('/login');
})
module.exports = router;