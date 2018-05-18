//Importar models
const mongoose = require('mongoose');
const Denuncia = mongoose.model('denuncia');

//Funciones
function add_denuncia({ args, req }) {
    //Obtencion de las variables
    const { titulo, descripcion, usuario, ubicacion} = args;

    //Area de registro
    const denuncia = new Denuncia({
        titulo, descripcion, usuario, ubicacion
    });
    denuncia.save(function (err) {
        console.log(err);
    }); 

    //Retorno
    return Denuncia.findOne({titulo});
}


//Se exportan las funciones
module.exports = {
    add_denuncia
};