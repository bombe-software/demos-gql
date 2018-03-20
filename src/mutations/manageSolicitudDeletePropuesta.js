//Importar models
const mongoose = require('mongoose');
const SolicitudEliminarPropuesta = mongoose.model('solicitud_eliminar_propuesta');
const pubsub  = require('graphql-subscriptions').PubSub;
const Propuesta = mongoose.model('propuesta');

//Funcion
function aceptarSolicitudDeletePropuesta({args, req}) {
    const { id_solicitud } = args;
     if (!id_solicitud) {
        throw new Error('Error al hacer fetch con la solicitud');
    }
      SolicitudEliminarPropuesta.findById(id_solicitud)
        .then((propuesta) => {
            console.log("propuesta bonito: " + propuesta);
             var {id_propuesta, usuario, politico, fecha, descripcion, titulo,tipo_propuesta, referencia, _id} = propuesta;
            Propuesta.findByIdAndRemove(id_propuesta, (err,resp) => {
                if (err) return console.error(err);
                console.log(_id);
            SolicitudEliminarPropuesta.findByIdAndRemove(_id, (err)=>{
                if (err) return console.error(err);
            });
            console.log(resp._id);
            return Propuesta.findById(resp._id);
            });
        });
}

function denegarSolicitudDeletePropuesta({args, req}) {
    const { id_solicitud } = args;

    SolicitudEliminarPropuesta.findByIdAndRemove(id_solicitud, (err)=> {
        if(err) return console.error(err);
    });
}
module.exports = { 
    aceptarSolicitudDeletePropuesta, 
    denegarSolicitudDeletePropuesta
};