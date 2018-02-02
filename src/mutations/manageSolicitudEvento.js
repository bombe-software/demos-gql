//Importar models
const mongoose = require('mongoose');
const SolicitudEvento = mongoose.model('solicitud_evento');
const Evento = mongoose.model('evento');
const Usuario = mongoose.model('usuario');
const Politico = mongoose.model('politico');

function aceptarSolicitudEvento({args, req}) {
    const { id_evento } = args;

    SolicitudEvento.findById(id_evento)
    .then((evento) => {
        const { fecha, titulo, descripcion, referencia, politico, usuario, _id } = evento;
        console.log(usuario, politico, titulo, descripcion);

        eventoAprovado = new Evento({
            fecha, titulo, descripcion, referencia, politico, usuario
        });

        eventoAprovado.save(function (err, resp) {
            if (err) return console.error(err);
            SolicitudEvento.findByIdAndRemove(_id, (err)=>{
                if (err) return console.error(err);
            });
            Politico.findById(politico)
            .then(p => {
                newEventos = p.eventos;
                newEventos.push(resp._id);
                console.log(newEventos);
                p.set({ eventos: newEventos });
                p.save(function (err) {
                    if (err) return console.error(err);
                });
            });
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