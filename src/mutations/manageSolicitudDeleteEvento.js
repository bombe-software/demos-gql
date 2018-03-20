//Importar models
const mongoose = require('mongoose');
const SolicitudEliminarEvento = mongoose.model('solicitud_eliminar_evento');
const pubsub  = require('graphql-subscriptions').PubSub;
const Evento = mongoose.model('evento');
//Funcion
function aceptarSolicitudDeleteEvento({args, req}) {
    const { id_solicitud } = args;
     if (!id_solicitud) {
        throw new Error('Error al hacer fetch con el Evento');
    }
   SolicitudEliminarEvento.findById(id_solicitud)
        .then((evento) => {
            console.log("Evento bonito: " + evento);
           var {id_evento, titulo, descripcion, referencia, usuario, fecha, politico, _id } = evento;
            Evento.findByIdAndRemove(id_evento, (err,resp) => {
                if (err) return console.error(err);
            SolicitudEliminarEvento.findByIdAndRemove(_id, (err)=>{
                if (err) return console.error(err);
            });
            console.log(resp._id);
            return Evento.findById(resp._id);
            });

        });

}

function denegarSolicitudDeleteEvento({args, req}) {
    const { id_solicitud } = args;

    SolicitudEliminarEvento.findByIdAndRemove(id_solicitud, (err)=> {
        if(err) return console.error(err);
    });
}
module.exports = { 
    aceptarSolicitudDeleteEvento, 
    denegarSolicitudDeleteEvento
};