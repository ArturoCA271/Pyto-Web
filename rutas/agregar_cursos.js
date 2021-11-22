const express = require('express');
const pool = require('../conexion');
const router = express.Router();
const crea_ruta = require('./crea_carpeta');
const { join } = require('path');
const path = require('path');


router.get('/agregar_cursos', (req, res) => {
    console.log(req.session.user);

    if (req.session.id_proveedor !== undefined) {
        res.render('agregar_cursos.html');
    } else {
        res.redirect('/login');
        console.log('No estas registrado');
    }

});

router.post('/agregar_cursos', async(req, res) => {
    let proveedor_id = req.session.id_proveedor;
    const {
        nombre,
        clave,
        descripcion,
        imagen,
        tipo
    } = req.body;

    const newCurso = {
        proveedor_id,
        nombre,
        clave,
        descripcion,
        nombre_imagen: imagen,
        tipo_musica: tipo
    }
    console.log(newCurso);

    await pool.query('INSERT INTO cursos set ?', [newCurso]);
    let usuario = req.session.user;
    let newroute = path.join(usuario, '/', nombre);
    console.log(newroute);
    crea_ruta(newroute);


    res.redirect('/agregar_cursos');

});



module.exports = router;