//Importar models
const mongoose = require('mongoose');
const Propuesta = mongoose.model('propuesta');

function dislikePropuesta({args, req}) {
    const {
        id_propuesta,
        id_usuario
    } = args;

    console.log("Dislike: " + args);
    return Propuesta.findById(id_propuesta);
}

function likePropuesta({args, req}) {
    const { 
        id_propuesta,
        id_usuario
    } = args;

    console.log("Like: " + args);
    return Propuesta.findById(id_propuesta);
}

module.exports = { 
    dislikePropuesta,
    likePropuesta
};