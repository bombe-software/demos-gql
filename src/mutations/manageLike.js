//Importar models
const mongoose = require('mongoose');
const _ = require('lodash')
const Propuesta = mongoose.model('propuesta');

function dislikePropuesta({ args, req }) {
    const {
        id_propuesta,
        id_usuario
    } = args;


    return Propuesta.findById(id_propuesta)
    .then(propuesta => {

        //Un pequeño problema en el remove :,V
        const array = _.remove(propuesta.likes, function (n) {
            return n!=id_usuario;
        });

        propuesta.set({likes: array});
        return Promise.resolve(propuesta.save());
    });
}

function likePropuesta({ args, req }) {
    const {
        id_propuesta,
        id_usuario
    } = args;



    return Propuesta.findById(id_propuesta)
    .then(propuesta => {
        propuesta.likes.push(id_usuario);
        return Promise.resolve(propuesta.save());
    });
}

module.exports = {
    dislikePropuesta,
    likePropuesta
};