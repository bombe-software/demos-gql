//Importar models
const mongoose = require('mongoose');
const SolicitudModificarPropuesta = mongoose.model('solicitud_modificar_propuesta');
const Propuesta = mongoose.model('evento');
const Usuario = mongoose.model('usuario');

function aceptarModificarSolicitudPolitico({args, req}) {
    const { 
        id_solicitud
     } = args;
     if (!id_solicitud) {
        throw new Error('Error al hacer fetch con el Politico');
    }

    SolicitudModificarPropuesta.findById(id_solicitud)
    .then((propuesta) => {
        var {id_propuesta, usuario, politico,
            fecha, descripcion, titulo,
            tipo_propuesta, referencia} = propuesta;
        Propuesta.findById(id_propuesta)
        .then((prop)=> {
            prop.usuario = usuario;
            prop.politico = politico;
            prop.fecha = fecha;
            prop.descripcion = descripcion;
            prop.titulo = titulo;
            prop.tipo_propuesta = tipo_propuesta;
            prop.referencia = referencia;
            prop.save((err)=>{return console.log(err)});
        })
        
    });

}

function denegarModificarSolicitudPolitico({args, req}) {
    const { id_solicitud, /*id_usuario*/ } = args;

    SolicitudModificarEvento.findByIdAndRemove(id_solicitud, (err)=> {
        if(err) return console.error(err);
    });

}

module.exports = { 
    aceptarModificarSolicitudPolitico, 
    denegarModificarSolicitudPolitico 
};