const express = require('express');
const router = express.Router();
const pool = require('../conexion');



router.get('/proveedores_inscritos', async(req, res) => {
    if (req.session.user === 'admin') {
        console.log('Entro al get');
        const proveedores = await pool.query('SELECT * FROM proveedores');
        res.render('visualiza_proveedores.html', { 'datos': proveedores });
    } else
        res.render('login.html');

})


router.post('/proveedores_inscritos', async(req, res) => {
    const resultado = req.body;
    for (const id in resultado) {
        sql = `UPDATE proveedores P SET P.estatus = '${resultado[id]}' WHERE P.proveedor_id = ${id}`;
        await pool.query(sql);
    }
    res.redirect('/proveedores_inscritos');
})




module.exports = router;