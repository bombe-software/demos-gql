//Importar models
const mongoose = require('mongoose');
const SolicitudModificarPropuesta = mongoose.model('solicitud_modificar_propuesta');
const Propuesta = mongoose.model('propuesta');
const Usuario = mongoose.model('usuario');

function aceptarModificarSolicitudPropuesta({args, req}) {
    const {
        id_solicitud
    } = args;
    if (!id_solicitud) {
        throw new Error('Error al hacer fetch con la propuesta');
    }

    SolicitudModificarPropuesta.findById(id_solicitud)
        .then((propuesta) => {
            var {id_propuesta, usuario, politico,
                fecha, descripcion, titulo,
                tipo_propuesta, referencia, _id} = propuesta;
            Propuesta.findById(id_propuesta)
                .then((prop) => {
                    prop.usuario = usuario;
                    prop.politico = politico;
                    prop.fecha = fecha;
                    prop.descripcion = descripcion;
                    prop.titulo = titulo;
                    prop.tipo_propuesta = tipo_propuesta;
                    prop.referencia = referencia;
                    prop.save(function (err, resp) {
                        if (err) return console.error(err);
                        SolicitudModificarPropuesta.findByIdAndRemove(_id, (err) => {
                            if (err) return console.error(err);
                        });
                        console.log(resp._id);
                        return Propuesta.findById(resp._id);
                    });
                })

        });

}

function denegarModificarSolicitudPropuesta({args, req}) {
    const { id_solicitud, /*id_usuario*/ } = args;

    SolicitudModificarPropuesta.findByIdAndRemove(id_solicitud, (err) => {
        if (err) return console.error(err);
    });

}

module.exports = {
    aceptarModificarSolicitudPropuesta,
    denegarModificarSolicitudPropuesta
};