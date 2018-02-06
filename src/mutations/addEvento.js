//Importar models
const mongoose = require('mongoose');
const solicitud_evento = mongoose.model('solicitud_evento');
const Politico = mongoose.model('politico');

//Importar modulos de las suscripciones
const pubsub  = require('graphql-subscriptions').PubSub;
const { EVENTO_AGREGADO } = require('./../subscriptions/constantes');

//Funcion
function addEvento({ args, req }) {
    const {
        usuario, politico,
        fecha, titulo, descripcion, referencia
    } = args;

    if (!usuario) {
        throw new Error('Falta id del usuario');
    }
    if (!politico) {
        throw new Error('Falta id del politico');
    }
    if (!fecha) {
        throw new Error('Falta fecha');
    }
    if (!titulo) {
        throw new Error('Falta titulo');
    }
    if (/^\s+|\s+$/.test(titulo)) {
        throw new Error('Titulo invalido');
    }

    if (!descripcion) {
        throw new Error('Falta descripcion');
    } else
        if (/^\s+|\s+$/.test(descripcion)) {
            throw new Error('Descripcion invalida');
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
    const evento = new solicitud_evento({
        usuario,
        politico,
        fecha,
        titulo,
        descripcion,
        referencia
    });

    //Guardar
    evento.save(function (err) {
        if (err) return console.error(err);
    });

    //Area del resolver
    new pubsub().publish(EVENTO_AGREGADO, { eventoAdded: solicitud_evento.findOne({titulo}) });
    return solicitud_evento.findOne({titulo});
}

//Se exporta la funcion
module.exports = { addEvento };
