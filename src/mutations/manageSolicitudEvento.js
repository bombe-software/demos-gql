//Importar models
const mongoose = require('mongoose');
const SolicitudEvento = mongoose.model('solicitud_evento');
const Evento = mongoose.model('evento');
const Usuario = mongoose.model('usuario');

function aceptarSolicitudEvento({args, req}) {
    const { id_evento } = args;

    SolicitudEvento.findById(id_evento)
    .then((evento) => {
        const { fecha, titulo, descripcion, _id } = evento;

        eventoAprovado = new Evento({
            fecha, titulo, descripcion
        });

        eventoAprovado.save(function (err, resp) {
            if (err) return console.error(err);
            SolicitudEvento.findByIdAndRemove(_id, (err)=>{
                if (err) return console.error(err);
            });
            console.log(resp._id);
            return Evento.findById(resp._id);
        });
    });

}

function denegarSolicitudEvento({args, req}) {
    const { id_evento, /*id_usuario*/ } = args;

    SolicitudEvento.findByIdAndRemove(id_evento, (err)=> {
        if(err) return console.error(err);
    });

}

module.exports = { 
    aceptarSolicitudEvento, 
    denegarSolicitudEvento 
};