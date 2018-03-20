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
    console.log(id_solicitud);



    SolicitudModificarEvento.findById(id_solicitud)
        .then((evento) => {
            var {id_evento, titulo, descripcion,
                referencia, usuario, fecha, politico, _id } = evento;
            console.log(titulo);
            Evento.findById(id_evento)
                .then((eve) => {
                    eve.titulo = titulo;
                    eve.descripcion = descripcion;
                    eve.referencia = referencia;
                    eve.usuario = usuario;
                    eve.fecha = fecha;
                    eve.politico = politico;
                    eve.save(function (err, resp) {
                        if (err) return console.error(err);
                        SolicitudModificarEvento.findByIdAndRemove(_id, (err) => {
                            if (err) return console.error(err);
                        });
                        console.log(resp._id);
                        return Evento.findById(resp._id);
                    });
                })

        });

}

function denegarModificarSolicitudEvento({args, req}) {
    const { id_solicitud } = args;
    SolicitudModificarEvento.findByIdAndRemove(id_solicitud, (err) => {
        if (err) return console.error(err);
    });

}

module.exports = {
    aceptarModificarSolicitudEvento,
    denegarModificarSolicitudEvento
};