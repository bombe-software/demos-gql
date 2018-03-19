//Importar models
const mongoose = require('mongoose');
const SolicitudModificarPolitico = mongoose.model('solicitud_modificar_politico');
const Politico = mongoose.model('politico');
const Usuario = mongoose.model('usuario');

function aceptarModificarSolicitudPolitico({args, req}) {
    const { 
        id_solicitud
     } = args;
     if (!id_solicitud) {
        throw new Error('Error al hacer fetch con el Politico');
    }

    SolicitudModificarPolitico.findById(id_solicitud)
    .then((politico) => {
         console.log("politico bonito: " + politico);
        var {nombre, cargo, estado, partido, estudios, id_politico, _id} = politico;
        Politico.findById(id_politico)
        .then((poli)=> {
            console.log(poli);
            poli.nombre = nombre;
            poli.cargo = cargo;
            poli.estado = partido;
            poli.estudios = estudios;
            poli.save((err)=>{return console.log(err)});
        })
        
    });

}

function denegarModificarSolicitudPolitico({args, req}) {
    const { id_solicitud, /*id_usuario*/ } = args;

    SolicitudModificarPolitico.findByIdAndRemove(id_solicitud, (err)=> {
        if(err) return console.error(err);
    });

}

module.exports = { 
    aceptarModificarSolicitudPolitico, 
    denegarModificarSolicitudPolitico 
};