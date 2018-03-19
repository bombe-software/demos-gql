//Importar models
const mongoose = require('mongoose');
const SolicitudModificarEvento = mongoose.model('solicitud_modificar_evento');
const Evento = mongoose.model('evento');
const Usuario = mongoose.model('usuario');

function aceptarModificarSolicitudEvento({args, req}) {
    const { 
        id_solicitud
     } = args;
     if (!id_solicitud) {
        throw new Error('Error al hacer fetch con el Evento');
    }

    SolicitudModificarEvento.findById(id_solicitud)
    .then((evento) => {
        var {id_evento,  titulo,  descripcion,
            referencia, usuario, fecha, politico } = evento;
        Evento.findById(id_evento)
        .then((eve)=> {
            console.log(poli);
            eve.titulo = titulo;
            eve.descripcion = descripcion;
            eve.referencia = referencia;
            eve.usuario = usuario;
            eve.fecha = fecha;
            eve.politico = politico;
            poli.save((err)=>{return console.log(err)});
        })
        
    });

}

function denegarModificarSolicitudEvento({args, req}) {
    const { id_solicitud } = args;

    SolicitudModificarEvento.findByIdAndRemove(id_solicitud, (err)=> {
        if(err) return console.error(err);
    });

}

module.exports = { 
    aceptarModificarSolicitudEvento, 
    denegarModificarSolicitudEvento 
};