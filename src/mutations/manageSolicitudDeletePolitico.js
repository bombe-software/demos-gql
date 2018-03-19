//Importar models
const mongoose = require('mongoose');
const SolicitudEliminarPolitico = mongoose.model('solicitud_eliminar_politico');
const pubsub  = require('graphql-subscriptions').PubSub;

//Funcion
function aceptarSolicitudDeletePolitico({args, req}) {
    const { id_politico } = args;
     if (!id_politico) {
        throw new Error('Error al hacer fetch con el Politico');
    }
     Politico.findByIdAndRemove(id_politico, (err)=> {
        if(err) return console.error(err);
    });

}

function denegarSolicitudDeletePolitico({args, req}) {
    const { id_politico } = args;

    SolicitudEliminarPolitico.findByIdAndRemove(id_politico, (err)=> {
        if(err) return console.error(err);
    });
}
module.exports = { 
    aceptarSolicitudDeletePolitico, 
    denegarSolicitudDeletePolitico
};