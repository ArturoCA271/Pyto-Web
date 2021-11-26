const express = require('express');
const router = express.Router();
const pool = require('../conexion');


router.get('/graficado', async(req, res) => {
    if (req.session.id_proveedor !== undefined) {
        let query = `SELECT P.nombre, COUNT(*) as Inscritos ` +
            `FROM cursos P ` +
            `JOIN detalle_inscritos_x_curso D on (P.curso_id = D.curso_id) ` +
            `WHERE P.proveedor_id = ${req.session.id_proveedor} ` +
            `GROUP BY P.nombre`;
        const cursos = await pool.query(query);
        res.render('graficado.html', { 'datos': cursos });
    } else
        res.redirect('/login');

});


router.post('/graficado', (req, res) => {
    if (req.session.id_proveedor !== undefined) {
        res.redirect('/graficado');
    } else
        res.redirect('/login');

})

module.exports = router;