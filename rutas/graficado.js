const express = require('express');
const router = express.Router();
const pool = require('../conexion');


router.get('/graficado', (req, res) => {
    res.render('graficado.html');
});

module.exports = router;