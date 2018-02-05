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
