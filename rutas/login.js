const express = require('express');
const router = express.Router();
const pool = require('../conexion');


router.get('/login', (req, res) => {
    res.render('login.html');
});

module.exports = router;