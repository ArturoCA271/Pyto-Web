const express = require('express');
const router = express.Router();


router.get('/agregar_cursos', (req, res) => {
    res.render('agregar_cursos.html');
});

router.post('/agregar_cursos', (req, res) => {
    console.log(req.read(100));
    const {
        nombre,
        clave,
        descripcion,
        imagen
    } = req.body;

    const newProveedor = {
            nombre,
            clave,
            descripcion,
            imagen

        }
        //await pool.query('INSERT INTO proveedores set ?', [newProveedor]);
    console.log(req.body);
    res.redirect('/');

});

module.exports = router;