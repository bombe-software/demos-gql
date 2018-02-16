//Importar models
const mongoose = require('mongoose');
const SolicitudModificarPolitico = mongoose.model('solicitud_modificar_politico');
const Politico = mongoose.model('politico');
const Usuario = mongoose.model('usuario');

function aceptarModificarSolicitudPolitico({args, req}) {
    const { 
        id_politico,
        id_solicitud,
        nombre,
        cargo,
        estado,
        partido,
        estudios
     } = args;
     const update = {
         nombre, cargo, estado, partido, estudios
     }
     if (!id_politico) {
        throw new Error('Error al hacer fetch con el Politico');
    }
    SolicitudModificarPolitico.findById(id_solicitud)
    .then((politico) => {
        const { _id } = politico;
        Politico.findByIdAndUpdate(id_politico, update, function (err, resp) {
            if (err) return console.error(err);
            SolicitudModificarPolitico.findByIdAndRemove(_id, (err)=>{
                if (err) return console.error(err);
            });
            console.log(resp._id);
            return Politico.findById(resp._id);
        });
    });

}

function denegarModificarSolicitudPolitico({args, req}) {
    const { id_solicitud, /*id_usuario*/ } = args;

    SolicitudModificarPolitico.findByIdAndRemove(id_politico, (err)=> {
        if(err) return console.error(err);
    });

}

module.exports = { 
    aceptarModificarSolicitudPolitico, 
    denegarModificarSolicitudPolitico 
};