//Importar models
const mongoose = require('mongoose');
const SolicitudPropuesta = mongoose.model('solicitud_propuesta');
const Propuesta = mongoose.model('propuesta');
const Usuario = mongoose.model('usuario');
const Politico = mongoose.model('politico');

function aceptarSolicitudPropuesta({args, req}) {
    const { id_propuesta } = args;
    if (!id_propuesta) {
        throw new Error('Error al hacer fetch con la Propuesta');
    }
    SolicitudPropuesta.findById(id_propuesta)
        .then((propuesta) => {
            const { fecha, descripcion, titulo, tipo_propuesta, usuario, referencia, politico, _id } = propuesta;

            propuestaAprovada = new Propuesta({
                fecha, descripcion, titulo, tipo_propuesta, usuario, referencia, politico
            });

            propuestaAprovada.save(function (err, resp) {
                if (err) return console.error(err);
                SolicitudPropuesta.findByIdAndRemove(_id, (err) => {
                    if (err) return console.error(err);
                });
                Politico.findById(politico)
                    .then(p => {
                        newPropuestas = p.propuestas;
                        newPropuestas.push(resp._id);
                        p.set({ propuestas: newPropuestas });
                        p.save(function (err) {
                            if (err) return console.error(err);
                        });
                    });
                return Propuesta.findById(resp._id);
            });
        });

}

function denegarSolicitudPropuesta({args, req}) {
    const { id_propuesta } = args;
    console.log(id_propuesta);
    SolicitudPropuesta.findByIdAndRemove(id_propuesta, (err) => {
        if (err) return console.error(err);
    });

}

module.exports = {
    aceptarSolicitudPropuesta,
    denegarSolicitudPropuesta
};