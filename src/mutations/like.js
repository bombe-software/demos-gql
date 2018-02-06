//Importar models
const mongoose = require('mongoose');
const _ = require('lodash')
const Propuesta = mongoose.model('propuesta');

function likePropuesta({ args, req }) {
    const {
        id_propuesta,
        id_usuario
    } = args;

    console.log('like');

    return Propuesta.findById(id_propuesta)
        .then(propuesta => {
            propuesta.likes.push(id_usuario);
            return Promise.resolve(propuesta.save());
        });
}

module.exports = { likePropuesta };