//Importar models
const mongoose = require('mongoose');
const SolicitudEliminarEvento = mongoose.model('solicitud_eliminar_evento');
const pubsub  = require('graphql-subscriptions').PubSub;
const Evento = mongoose.model('evento');
//Funcion
function aceptarSolicitudDeleteEvento({args, req}) {
    const { id_evento } = args;
     if (!id_evento) {
        throw new Error('Error al hacer fetch con el Evento');
    }
     Evento.findByIdAndRemove(id_evento, (err)=> {
        if(err) return console.error(err);
    });

}

function denegarSolicitudDeleteEvento({args, req}) {
    const { id_evento } = args;

    SolicitudEliminarEvento.findByIdAndRemove(id_evento, (err)=> {
        if(err) return console.error(err);
    });
}
module.exports = { 
    aceptarSolicitudDeleteEvento, 
    denegarSolicitudDeleteEvento
};