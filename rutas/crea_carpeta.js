const mkdirp = require('mkdirp');
const { join } = require('path');
const path = require('path');

const crea_ruta = (filename) => {
    let length_Cadena = __dirname.length - 5;
    let ruta = __dirname.substring(0, length_Cadena);
    let dirname = path.join(ruta, 'public', '/', filename);
    console.log(dirname);
    mkdirp(dirname).catch(err => { console.log(err) }).then(p => console.log('made dir staring with ${p}'));
    return dirname;
}

module.exports = crea_ruta;