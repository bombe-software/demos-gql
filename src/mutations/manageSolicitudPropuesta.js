//Importar models
const mongoose = require('mongoose');
const SolicitudPropuesta = mongoose.model('solicitud_propuesta');
const Propuesta = mongoose.model('propuesta');
const Usuario = mongoose.model('usuario');

function aceptarSolicitudPropuesta({args, req}) {
    const { id_propuesta } = args;

    SolicitudPropuesta.findById(id_propuesta)
    .then((propuesta) => {
        const { fecha, descripcion, titulo, tipo_propuesta, _id } = propuesta;

        propuestaAprovada = new Propuesta({
            fecha, descripcion, titulo, tipo_propuesta
        });

        propuestaAprovada.save(function (err, resp) {
            if (err) return console.error(err);
            SolicitudPropuesta.findByIdAndRemove(_id, (err)=>{
                if (err) return console.error(err);
            });
            console.log(resp._id);
            return Propuesta.findById(resp._id);
        });
    });

}

function denegarSolicitudPropuesta({args, req}) {
    const { id_propuesta } = args;
    console.log(id_propuesta);
    SolicitudPropuesta.findByIdAndRemove(id_propuesta, (err)=> {
        if(err) return console.error(err);
    });

}

module.exports = { 
    aceptarSolicitudPropuesta, 
    denegarSolicitudPropuesta 
};