const express = require('express');
const router = express.Router();
const pool = require('../conexion');


router.get('/graficado', (req, res) => {
    if (req.session.id_proveedor !== undefined) {
        let usuario = req.session.user;
        res.render('graficado.html');
    } else
        res.render('login.html');
    console.log('Entro al get');

});

module.exports = router;