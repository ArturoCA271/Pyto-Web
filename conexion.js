const mysql = require('mysql');
const { database } = require('./keys');
const { promisify } = require('util');

const pool = mysql.createPool(database);

pool.getConnection((err, conexion) => {
    if (err) {
        console.log('Error: ', err.code);
    } else if (conexion) {

        conexion.release();
        //pool.query('CREATE DATABASE IF NOT EXISTS pmusica; ');
        pool.query('USE baluxvwixylw17lpuboq;');

        pool.query(
            'CREATE TABLE IF NOT EXISTS proveedores( ' +
            'proveedor_id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, ' +
            'nombre VARCHAR(200) NOT NULL, ' +
            'clave VARCHAR(50), ' +
            'correo VARCHAR(100) NOT NULL, ' +
            'telefono1 VARCHAR(20) NOT NULL, ' +
            'telefono2 VARCHAR(20) NOT NULL,' +
            'usuario VARCHAR(20) NOT NULL, ' +
            'password VARCHAR(20) NOT NULL, ' +
            'estatus CHAR(1) NOT NULL' +
            ');'
        );

        pool.query(
            'CREATE TABLE IF NOT EXISTS cursos( ' +
            'curso_id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, ' +
            'proveedor_id INT(11) NOT NULL, ' + +
            'nombre VARCHAR(200) NOT NULL, ' +
            'clave VARCHAR(50),' +
            'descripcion VARCHAR(450) NOT NULL,' +
            'nombre_imagen VARCHAR(430) NOT NULL, ' +
            'tipo_musica CHAR(1) NOT NULL, ' +
            'FOREIGN KEY(proveedor_id) REFERENCES proveedores(proveedor_id)' +
            ');'
        );

        pool.query(
            'CREATE TABLE IF NOT EXISTS inscritos( ' +
            'inscrito_id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, ' +
            'nombre VARCHAR(200) NOT NULL, ' +
            'apellidos VARCHAR(50) NOT NULL, ' +
            'correo VARCHAR(100) NOT NULL, ' +
            'telefono VARCHAR(20), ' +
            ' fecha_nacimiento DATE ' +
            ' );'
        );



        pool.query(
            'CREATE TABLE IF NOT EXISTS detalle_inscritos_x_curso( ' +
            ' detalle_inscritos_x_curso_id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, ' +
            ' inscrito_id INT(11) NOT NULL, ' +
            ' curso_id INT(11) NOT NULL, ' +
            ' fecha_inscripcion DATE, ' +
            ' FOREIGN KEY(inscrito_id) REFERENCES inscritos(inscrito_id), ' +
            ' FOREIGN KEY(curso_id) REFERENCES cursos(curso_id) ' +
            ');'
        );




        console.log('Conexion establecida');
    }
});

pool.query = promisify(pool.query);

module.exports = pool;

/*
TABLA QUE PARA CURSOS -- SE OMITE
                pool.query(
                    'CREATE TABLE IF NOT EXISTS cursos_x_proveedor( ' +
                    'id_cursos_x_proveedor INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, ' +
                    ' proveedor_id INT(11) NOT NULL, ' +
                    'curso_id INT(11) NOT NULL, ' +
                    ' fecha_oferta DATE, ' +
                    'FOREIGN KEY(proveedor_id) REFERENCES proveedores(proveedor_id), ' +
                    ' FOREIGN KEY(curso_id) REFERENCES cursos(curso_id) ' +
                    ');'
                );*/