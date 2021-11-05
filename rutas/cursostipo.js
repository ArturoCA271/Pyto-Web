const express = require('express');
const router = express.Router();
const pool = require('../conexion');


router.get('/tipo', (req, res) => {
    res.render('listado_cursos.html');
});

module.exports = router;