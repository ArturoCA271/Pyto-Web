const express = require('express');
const router = express.Router();
const pool = require('../conexion');


router.get('/percusion', async(req, res) => {
    let tipo = 'P';
    let query = `SELECT C.curso_id, C.nombre, C.descripcion, P.nombre AS Proveedor, P.usuario, I.nombre_imagen, MIN(I.imagenes_id) as img ` +
        `FROM cursos C ` +
        `JOIN proveedores P ON (C.proveedor_id = P.proveedor_id) ` +
        `JOIN imagenes_cursos I ON (C.curso_id = I.curso_id) ` +
        `WHERE C.tipo_musica = '${tipo}' AND P.estatus = 'A' ` +
        `GROUP BY C.curso_id;`;
    let percusion = await pool.query(query);
    res.render('curso_percusion.html', { 'datos': percusion });
});

router.post('/percusion', (req, res) => {
    let respuesta = req.body;
    let id_curso;
    for (const id in respuesta)
        id_curso = id;
    req.session.id_curso_selected = id_curso;
    res.redirect('/inscripcion');
})

module.exports = router;