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
router.post('/borrar_curso:id_curso', async(req, res) => {
    if (req.session.user === 'admin') {
        console.log('Entro al get');
        await pool.query(`DELETE * FROM cursos WHERE  P.nombre = ${req.session.curso_nombre}`);
        res.redirect('/tipo');
    } else
        res.redirect('login.html');
})
module.exports = router;