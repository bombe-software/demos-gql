//Importar models
const mongoose = require('mongoose');
const SolicitudPolitico = mongoose.model('solicitud_politico');
const Politico = mongoose.model('politico');
const Usuario = mongoose.model('usuario');

function aceptarSolicitudPolitico({args, req}) {
    const { id_politico, id_usuario } = args;

    const politico = SolicitudPolitico.findById(id_politico);

    const { nombre, cargo, estado, partido, estudios } = politico;

    politicoAprovado = new Politico({
        nombre, cargo, estado, partido, estudios
    });

    politicoAprovado.save(function (err, resp) {
        if (err) return console.error(err);
        politico.findOneAndRemove(id_politico);
        return Politico.findById(resp.id);
    });

}

function denegarSolicitudPolitico({args, req}) {
    const { id_politico, id_usuario } = args;

    SolicitudPolitico.findByIdAndRemove(id_politico);

}

module.exports = { 
    aceptarSolicitudPolitico, 
    denegarSolicitudPolitico 
};