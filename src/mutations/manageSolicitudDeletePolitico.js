//Importar models
const mongoose = require('mongoose');
const SolicitudEliminarPolitico = mongoose.model('solicitud_eliminar_politico');
const pubsub = require('graphql-subscriptions').PubSub;
const Politico = mongoose.model('politico');
//Funcion
function aceptarSolicitudDeletePolitico({args, req}) {
    const { id_solicitud } = args;
    if (!id_solicitud) {
        throw new Error('Error al hacer fetch con la solicitud');
    }

    SolicitudEliminarPolitico.findById(id_solicitud)
        .then((politico) => {
            console.log("politico bonito: " + politico);
            var {nombre, cargo, estado, partido, estudios, id_politico, _id} = politico;
            console.log("hey mi amor");
            console.log(id_politico);
            Politico.findByIdAndRemove(id_politico, (err,resp) => {
                if (err) return console.error(err);
                console.log(_id);
            SolicitudEliminarPolitico.findByIdAndRemove(_id, (err)=>{
                if (err) return console.error(err);
            });
            console.log(resp._id);
            return Politico.findById(resp._id);
            });

        });



}

function denegarSolicitudDeletePolitico({args, req}) {
    const { id_solicitud} = args;

    
    SolicitudEliminarPolitico.findByIdAndRemove(id_solicitud, (err) => {
        if (err) return console.error(err);
    });
}
module.exports = {
    aceptarSolicitudDeletePolitico,
    denegarSolicitudDeletePolitico
};