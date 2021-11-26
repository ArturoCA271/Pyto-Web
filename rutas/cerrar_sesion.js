const express = require('express');
const router = express.Router();
const pool = require('../conexion');

router.post('/cierre_sesion', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
})
router.get('/cierre_sesion', (req, res) => {
    res.send('Cierre sesion');
})



module.exports = router;