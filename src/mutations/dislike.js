//Importar models
const mongoose = require('mongoose');
const _ = require('lodash')
const Propuesta = mongoose.model('propuesta');

function dislikePropuesta({ args, req }) {
    const {
        id_propuesta,
        id_usuario
    } = args;
    if (!id_propuesta) {
        throw new Error('Error al hacer fetch con la Propuesta');
    }
    if (!id_usuario) {
        throw new Error('Error al hacer fetch con el Usuario');
    }

    Propuesta.findById(id_propuesta).then(propuesta => {
        const nuevos_usuarios = _.remove(propuesta.likes, function(n) {
            return n != id_usuario;
        });
        propuesta.set({likes: nuevos_usuarios});
        propuesta.save((err, prop) => {
            if(err) console.log(err);
        });
    });

    return Propuesta.findById(id_propuesta);
}


module.exports = { dislikePropuesta };