//Importar models
const mongoose = require('mongoose');
const SolicitudEliminarPropuesta = mongoose.model('solicitud_eliminar_propuesta');
const pubsub  = require('graphql-subscriptions').PubSub;
const Propuesta = mongoose.model('propuesta');

//Funcion
function aceptarSolicitudDeletePropuesta({args, req}) {
    const { id_propuesta } = args;
     if (!id_propuesta) {
        throw new Error('Error al hacer fetch con la Propuesta');
    }
     Propuesta.findByIdAndRemove(id_propuesta, (err)=> {
        if(err) return console.error(err);
    });

}

function denegarSolicitudDeletePropuesta({args, req}) {
    const { id_propuesta } = args;

    SolicitudEliminarPropuesta.findByIdAndRemove(id_propuesta, (err)=> {
        if(err) return console.error(err);
    });
}
module.exports = { 
    aceptarSolicitudDeletePropuesta, 
    denegarSolicitudDeletePropuesta
};