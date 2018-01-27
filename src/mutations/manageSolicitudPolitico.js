//Importar models
const mongoose = require('mongoose');
const SolicitudPolitico = mongoose.model('solicitud_politico');
const Politico = mongoose.model('politico');

function aceptarSolicitudPolitico({args, req}) {

}

function denegarSolicitudPolitico({args, req}) {
    const solicitud = new SolicitudPolitico({
        
    });
}

module.exports = { 
    aceptarSolicitudPolitico, 
    denegarSolicitudPolitico 
};