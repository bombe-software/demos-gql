//Importar models
const mongoose = require('mongoose');
const pubsub = require('graphql-subscriptions').PubSub;
const Usuario = mongoose.model('usuario');
//Funcion
function aumentarPuntosUsuario({ args, req }) {
    const { id_usuario } = args;
    if (!id_usuario) {
        throw new Error('Error al hacer fetch con el Usuario');
    }
    const puntosUsuario = 100;
    Usuario.findById(id_usuario)
        .then((usuario) => {
            var { puntos, _id } = usuario;
            var puntosConversion = puntos + puntosUsuario
            usuario.puntos = puntosConversion;
            usuario.save(function (err, resp) {
                return Usuario.findById(resp._id);
            });
        });
}

function restarPuntosUsuario({ args, req }) {
    const { id_usuario } = args;
    if (!id_usuario) {
        throw new Error('Error al hacer fetch con el Usuario');
    }
    const puntosUsuario = 20;
    Usuario.findById(id_usuario)
        .then((usuario) => {
            var { puntos, _id } = usuario;
            var puntosConversion = puntos - puntosUsuario
            usuario.puntos = puntosConversion;
            usuario.save(function (err, resp) {
                return Usuario.findById(resp._id);
            });
        });
}
module.exports = {
    aumentarPuntosUsuario,
    restarPuntosUsuario
};