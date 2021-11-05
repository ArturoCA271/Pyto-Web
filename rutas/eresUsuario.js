const express = require('express');
const router = express.Router();
const pool = require('../conexion');


router.get('/eresUsuario', (req, res) => {
    res.render('eresUsuario.html');
});

module.exports = router;