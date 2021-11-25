const express = require('express');
const pool = require('../conexion');
const router = express.Router();
const crea_ruta = require('./crea_carpeta');
const { join } = require('path');
const path = require('path');
const multer = require('multer');
const fs = require('fs-extra');
const session = require('express-session');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        let path = './uploads/' + req.params.user + '/' + req.params.curso;
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



router.get('/agregar_cursos', (req, res) => {

    if (req.session.id_proveedor !== undefined) {
        res.redirect('/agregar_cursos/' + req.session.user);
    } else {
        res.redirect('/login');
        console.log('No estas registrado');
    }


});


router.get('/agregar_cursos/:user', (req, res) => {
    console.log('*$$$$$$$', req.session.user);
    if (req.session.id_proveedor !== undefined) {
        res.render('agregar_cursos.html');
    } else {
        res.redirect('/login');
        console.log('No estas registrado');
    }

});

router.post('/agregar_cursos/:user', async(req, res) => {
    console.log('*$$$$$$$', req.session.user);
    if (req.session.id_proveedor !== undefined || req.session.user !== 'login') {
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
        const query = `CALL validaCurso_Proveedores('${nombre}', ${req.session.id_proveedor}, @existe)`;
        await pool.query(query);
        let param = await pool.query('SELECT @existe;');
        let existe;
        param.forEach(element => {
            existe = element['@existe'];
        });

        if (existe === null || existe === undefined) {
            await pool.query('INSERT INTO cursos set ?', [newCurso]);
            console.log(newCurso);
            let usuario = req.session.user;

            //crea_ruta(newroute);
            console.log(nombre);
            req.session.curso_nombre = nombre;

            res.redirect('/imagenes_cursos/' + req.params.user + '/' + nombre);

        } else {
            console.log(existe);
            res.status(500).send({ 'Error': 'El Curso proporcionado ya existe, proporciona otro nombre de curso' });
        }


    } else {
        res.redirect('/login');
        console.log('No estas registrado');
    }


});
/*********************  APARTADO PARA EL MANEJO DE IMAGENES EN CURSOS   ************************* */


router.get('/imagenes_cursos/:user/:curso', (req, res) => {
    console.log(req.session.user);

    if (req.session.id_proveedor !== undefined && req.session.curso_nombre !== undefined) {
        res.render('imagenes_cursos.html');
    } else {
        res.redirect('/login');
        console.log('No estas registrado');
    }


});

router.post('/imagenes_cursos/:user/:curso', upload.array('imagen_uploaded'), async(req, res) => {

    if (req.session.id_proveedor !== undefined && req.session.curso_nombre !== undefined) {
        let arreglo_imagenes = req.files;
        arreglo_imagenes.forEach(async element => {
            let nombre_img = element.originalname;
            const query = `CALL obtener_curso('${req.session.curso_nombre}', ${req.session.id_proveedor}, @existe)`;
            await pool.query(query);
            let param = await pool.query('SELECT @existe;');
            let curso_id;
            param.forEach(element => {
                curso_id = element['@existe'];
            });

            const newImgCurso = {
                curso_id: curso_id,
                nombre_imagen: nombre_img,
            }
            await pool.query('INSERT INTO imagenes_cursos set ?', [newImgCurso]);
        });


        req.session.curso_nombre = undefined;
        res.redirect('/agregar_cursos/' + req.params.user);

    } else if (req.session.curso_nombre !== undefined) {
        console.log('No has dado de alta un curso');
        res.redirect('/agregar_cursos/' + req.session.user);
    } else {
        res.redirect('/login');
        console.log('No estas registrado');
    }


});



module.exports = router;