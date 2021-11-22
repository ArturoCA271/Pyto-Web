const cons = require('consolidate');
const express = require('express');
const router = express.Router();
const pool = require('../conexion');


router.get('/proveedores', (req, res) => {
    res.render('alta_proveedor.html');
});

router.post('/proveedores', async(req, res) => {
    const {
        nombre,
        clave,
        correo,
        telefono1,
        telefono2,
        usuario,
        password
    } = req.body;

    const newProveedor = {
        nombre: nombre,
        clave: clave,
        correo: correo,
        telefono1: telefono1,
        telefono2: telefono2,
        usuario: usuario,
        password: password,
        estatus: 'I',
    }
    await pool.query('INSERT INTO proveedores set ?', [newProveedor]);
    console.log(req.body);


    res.redirect('/eresUsuario');
    //res.redirect('/agregar_cursos');

});


module.exports = router;