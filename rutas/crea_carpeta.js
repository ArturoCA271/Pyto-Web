const mkdirp = require('mkdirp');
const { join } = require('path');
const path = require('path');

const crea_ruta = (filename) => {
    let length_Cadena = __dirname.length - 5;
    let ruta = __dirname.substring(0, length_Cadena);
    let ruta_nvoProveedor = path.join(ruta, 'public', '/', filename);
    console.log(ruta_nvoProveedor);
    mkdirp(ruta_nvoProveedor).catch(err => { console.log(err) }).then(p => console.log('made dir staring with ${p}'));
}

module.exports = crea_ruta;