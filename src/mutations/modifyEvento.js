//Importar models
const mongoose = require('mongoose');
const SolicitudModificarPolitico = mongoose.model('solicitud_modificar_politico');
const Politico = mongoose.model('politico');
const Partido = mongoose.model('partido');
const Estado = mongoose.model('estado');
const Estudio = mongoose.model('estudio');
const SolicitudModificarEvento = mongoose.model('solicitud_modificar_evento');

//Importar modulos de las suscripciones
const pubsub = require('graphql-subscriptions').PubSub;

//Funcion
function modifyEvento({ args, req }) {

    let {
        id_evento,  titulo,  descripcion,
        referencia, usuario, fecha, politico
    } = args;
 
    const evento = new SolicitudModificarEvento({
        id_evento,  titulo,  descripcion,
        referencia, usuario, fecha, politico
    });

    return evento.save();
}

//Se exporta la funcion
module.exports = { modifyEvento };