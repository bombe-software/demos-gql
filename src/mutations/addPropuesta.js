//Importar models
const mongoose = require('mongoose');
const solicitud_propuesta = mongoose.model('solicitud_propuesta');
const Politico = mongoose.model('politico');

//Importar modulos de las suscripciones
const pubsub  = require('graphql-subscriptions').PubSub;
const { PROPUESTA_AGREGADA } = require('./../subscriptions/constantes');

//Funcion
function addPropuesta({ args, req }) {

    const {
        usuario, politico,
        fecha, titulo,
        descripcion, referencia,
        tipo_propuesta
    } = args;

    if (!usuario) {
        throw new Error('Falta id del Usuario');
    }
    if (!politico) {
        throw new Error('Falta id del Politico');
    }
    if (!titulo) {
        throw new Error('Falta titulo de la propuesta');
    } else if (/^\s+|\s+$/.test(titulo)) {
        throw new Error('Titulo invalido');
    }
    if (!descripcion) {
        throw new Error('Falta descripción');
    } else if (/^\s+|\s+$/.test(descripcion)) {
        throw new Error('Descripcion inválida');
    }
    if (!tipo_propuesta) {
        throw new Error('Falta tipo de propuesta');
    }
    if (!fecha) {
        throw new Error('Falta la fecha');
    }
    if (!referencia) {
        throw new Error('Falta link de referencia');

    } else if (referencia != undefined) {
        var re = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/;
        if (/^\s+|\s+$/.test(referencia)) {
            throw new Error('Link invalido');
        } else
            if (!re.test(referencia)) {
                throw new Error('Link invalido');
            }
    }
    console.log(args);

    //Area de registro
    const propuesta = new solicitud_propuesta({
        usuario,
        politico,
        fecha,
        titulo,
        descripcion,
        referencia,
        tipo_propuesta
    });

    //Guardar
    propuesta.save(function (err) {
        if (err) return console.error(err);
    });

    console.log(politico, usuario);

    //Area del resolver
    new pubsub().publish(PROPUESTA_AGREGADA, { propuestaAdded: solicitud_propuesta.findOne({titulo})});
    return solicitud_propuesta.findOne({titulo});
}

//Se exporta la funcion
module.exports = { addPropuesta };
