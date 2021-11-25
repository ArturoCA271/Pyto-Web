const cons = require('consolidate');
const express = require('express');
const router = express.Router();
const pool = require('../conexion');
const crea_ruta = require('./crea_carpeta');



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
        passw: password,
        estatus: 'I',
    }

    const query = `CALL validaUsuario_Proveedores('${usuario}', @existe)`;
    await pool.query(query);
    let param = await pool.query('SELECT @existe;');
    let existe;
    param.forEach(element => {
        existe = element['@existe'];
    });
    if (existe === null || existe === undefined) {
        console.log('wwwww', existe);
        await pool.query('INSERT INTO proveedores set ?', [newProveedor]);
        console.log(req.body);
        crea_ruta(usuario);

        res.redirect('/login');
    } else {
        console.log(existe);
        res.status(500).send({ 'Error': 'El usuario proporcionado ya existe, proporciona otro usuario' });
    }

});



module.exports = router;