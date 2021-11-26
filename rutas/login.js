const express = require('express');
const router = express.Router();
const pool = require('../conexion');


router.get('/login', (req, res) => {
    if (req.session.id_proveedor !== undefined) {
        let usuario = req.session.user;
        res.redirect('/agregar_cursos/' + usuario);
    } else
        res.render('login.html');
    console.log('Entro al get');
});

router.post('/login', async(req, res) => {

    const { usuario, password } = req.body;
    req.session.user = usuario;
    req.session.pass = password;
    if (usuario === 'admin' && password === 'admin') {
        res.redirect('/proveedores_inscritos');
    } else {
        let id_proveedor = await consulta_id_proveedor(usuario, password);
        console.log('*******', id_proveedor);


        if (id_proveedor !== undefined && !isNaN(id_proveedor)) {
            req.session.id_proveedor = id_proveedor;
            res.redirect('/agregar_cursos/' + usuario);
        } else {
            res.redirect('/login');
        }
    }


});

const consulta_id_proveedor = async(user, passw) => {
    let consulta = 'SELECT * FROM proveedores P WHERE P.usuario = ' + "'" + user + "'" + ' AND P.passw =' + "'" + passw + "'";
    console.log('------', passw);
    const datos_proveedor = await pool.query(consulta);
    try {
        return datos_proveedor[0].proveedor_id;
    } catch (err) {
        return undefined;
    }

}

module.exports = router;