const mysql = require('mysql');
const { database } = require('./keys');
const { promisify } = require('util');

const pool = mysql.createPool(database);

pool.getConnection((err, conexion) => {
    if (err) {
        console.log('Error: ', err.code);
    } else if (conexion) {

        conexion.release();
        pool.query('USE baluxvwixylw17lpuboq; ');
        console.log('Conexion establecida');
    }
});

pool.query = promisify(pool.query);

module.exports = pool;