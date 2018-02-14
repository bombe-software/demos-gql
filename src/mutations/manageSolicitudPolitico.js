//Importar models
const mongoose = require('mongoose');
const SolicitudPolitico = mongoose.model('solicitud_politico');
const Politico = mongoose.model('politico');
const Usuario = mongoose.model('usuario');

function aceptarSolicitudPolitico({args, req}) {
    const { id_politico } = args;
     if (!id_politico) {
        throw new Error('Error al hacer fetch con el Politico');
    }
    SolicitudPolitico.findById(id_politico)
    .then((politico) => {
        const { nombre, cargo, estado, partido, estudios,referencia, _id } = politico;

        politicoAprovado = new Politico({
            nombre, cargo, estado, partido, estudios, referencia
        });

        politicoAprovado.save(function (err, resp) {
            if (err) return console.error(err);
            SolicitudPolitico.findByIdAndRemove(_id, (err)=>{
                if (err) return console.error(err);
            });
            console.log(resp._id);
            return Politico.findById(resp._id);
        });
    });

}

function denegarSolicitudPolitico({args, req}) {
    const { id_politico, /*id_usuario*/ } = args;

    SolicitudPolitico.findByIdAndRemove(id_politico, (err)=> {
        if(err) return console.error(err);
    });

}

module.exports = { 
    aceptarSolicitudPolitico, 
    denegarSolicitudPolitico 
};