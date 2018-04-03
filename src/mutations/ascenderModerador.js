
//Importar models
const mongoose = require('mongoose');
const Usuario = mongoose.model('usuario');
const axios = require('axios');

//Funcion
function ascenderModerador({ args, req }) {
    let {
        id_usuario
    } = args;
    if(!id_usuario){
        throw new Error('Escriba el email');
    }
    console.log(id_usuario);
        Usuario.findById(id_usuario)
        .then((usuario) => {
            console.log(usuario);
            const { tipo_usuario } = usuario;
            usuario.tipo_usuario = mongoose.Types.ObjectId('5a68bca9e9bfc6a2fee8cb07'); ; 
            usuario.save(function (err, resp) {
                return Usuario.findById(resp._id);
            });
        });
}

//Se exporta la funcion
module.exports = { ascenderModerador};