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

    return Propuesta.findById(id_propuesta)
        .then(propuesta => {

          var usuariosLike = propuesta.likes;
          var nuevosUsuariosLike = usuariosLike.slice(usuariosLike.indexOf(id_usuario));
          console.log('dislike');
          propuesta.set({ likes: nuevosUsuariosLike });
          return Promise.resolve(propuesta.save());
        });
}


module.exports = { dislikePropuesta };