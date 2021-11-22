const express = require('express');
const pool = require('../conexion');
const router = express.Router();
const crea_ruta = require('./crea_carpeta');
const { join } = require('path');
const path = require('path');
const multer = require('multer');
const fs = require('fs-extra');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        let path = './public/' + req.params.user + '/' + req.params.curso;
        let stat = null;
        try {
            stat = fs.mkdirsSync(path);
        } catch (error) {
            fs.mkdirSync(path);
        }
        cb(null, path);
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
});
const upload = multer({ storage: storage });



router.get('/agregar_cursos/:user', (req, res) => {
    console.log(req.session.user);

    if (req.session.id_proveedor !== undefined) {
        res.render('agregar_cursos.html');
    } else {
        res.redirect('/login');
        console.log('No estas registrado');
    }

});

router.post('/agregar_cursos/:user', async(req, res) => {

    if (req.session.id_proveedor !== undefined) {
        //let img = req.file.filename;
        let proveedor_id = req.session.id_proveedor;
        const {
            nombre,
            clave,
            descripcion,
            tipo
        } = req.body;

        const newCurso = {
            proveedor_id,
            nombre,
            clave,
            descripcion,
            tipo_musica: tipo
        }
        await pool.query('INSERT INTO cursos set ?', [newCurso]);
        console.log(newCurso);
        let usuario = req.session.user;
        //let newroute = path.join(usuario, '/', nombre);
        //console.log(newroute);

        //crea_ruta(newroute);
        console.log(nombre);
        res.redirect('/imagenes_cursos/' + req.params.user + '/' + nombre);
        //req.session.curso_nombre = nombre;

    } else {
        res.redirect('/login');
        console.log('No estas registrado');
    }


});
/*********************  APARTADO PARA EL MANEJO DE IMAGENES EN CURSOS   ************************* */

router.get('/imagenes_cursos/:user/:curso', (req, res) => {
    console.log(req.session.user);

    if (req.session.id_proveedor !== undefined) {
        res.render('imagenes_cursos.html');
    } else {
        res.redirect('/login');
        console.log('No estas registrado');
    }

});

router.post('/imagenes_cursos/:user/:curso', upload.array('imagen_uploaded'), async(req, res) => {

    if (req.session.id_proveedor !== undefined) {
        res.redirect('/agregar_cursos/' + req.params.user);

    } else {
        res.redirect('/login');
        console.log('No estas registrado');
    }


});


module.exports = router;