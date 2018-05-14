//Importar models
const mongoose = require('mongoose');
const SolicitudEvento = mongoose.model('solicitud_evento');
const SolicitudModificarEvento = mongoose.model('solicitud_modificar_evento');
const SolicitudEliminarEvento = mongoose.model('solicitud_eliminar_evento');
const Usuario = mongoose.model('usuario');
const Politico = mongoose.model('politico');
const Evento = mongoose.model('evento');


//Funcion
function add_evento({ args, req }) {
    const {
        usuario, politico,
        fecha, titulo, descripcion, referencia
    } = args;

    //Area de registro
    const evento = new SolicitudEvento({
        usuario,
        politico,
        fecha,
        titulo,
        descripcion,
        referencia
    });

    //Guardar
    evento.save();

    return SolicitudEvento.findOne({ titulo });
}

function update_evento({ args, req }) {
    const {
        id_evento, titulo, descripcion,
        referencia, usuario, fecha, politico
    } = args;

    //Area de registro
    const evento = new SolicitudModificarEvento({
        id_evento, titulo, descripcion,
        referencia, usuario, fecha, politico
    });

    //Guardar
    return evento.save();
}

function delete_evento({ args, req }) {
    const {
        id_evento, id_usuario
    } = args
    //Area de registro
    var politico = new SolicitudEliminarEvento({
        id_evento, id_usuario
    });

    //Guardar
    politico.save();

    //Area del resolver
    return SolicitudEliminarEvento.findOne({ id_evento });
}

function patch_add_evento({ args, req }) {
    const { id_evento } = args;
    SolicitudEvento.findById(id_evento)
        .then((evento) => {
            const { fecha, titulo, descripcion, referencia, politico, usuario, _id } = evento;

            eventoAprovado = new Evento({
                fecha, titulo, descripcion, referencia, politico, usuario
            });

            eventoAprovado.save(function (err, resp) {
                if (err) return console.error(err);
                SolicitudEvento.findByIdAndRemove(_id, (err) => {
                    if (err) return console.error(err);
                });
                Politico.findById(politico)
                    .then(p => {
                        newEventos = p.eventos;
                        newEventos.push(resp._id);;
                        p.set({ eventos: newEventos });
                        p.save(function (err) {
                            if (err) return console.error(err);
                        });
                    });
                return Evento.findById(resp._id);
            });
        });

}

function patchd_add_evento({ args, req }) {
    const { id_evento } = args;

    SolicitudEvento.findByIdAndRemove(id_evento, (err) => {
        if (err) return console.error(err);
    });

}

function patch_update_evento({ args, req }) {
    const {
        id_solicitud
    } = args;
    SolicitudModificarEvento.findById(id_solicitud)
        .then((evento) => {
            var { id_evento, titulo, descripcion,
                referencia, usuario, fecha, politico, _id } = evento;
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
                        return Evento.findById(resp._id);
                    });
                })

        });

}

function patchd_update_evento({ args, req }) {
    const { id_solicitud } = args;
    SolicitudModificarEvento.findByIdAndRemove(id_solicitud, (err) => {
        if (err) return console.error(err);
    });
}
 
function patch_delete_evento({ args, req }) {
    const { id_solicitud } = args;
    console.log(args);
    return SolicitudEliminarEvento.findById(id_solicitud)
        .then((evento) => {
            var { id_evento, titulo, descripcion, referencia, usuario, fecha, politico, _id } = evento;
            return Evento.findByIdAndRemove(id_evento, (err, resp) => {
                SolicitudEliminarEvento.findByIdAndRemove(_id, (err) => {
                    if (err) return console.error(err);
                });
                return Evento.findById(resp._id);
            });

        });

}

function patchd_delete_evento({ args, req }) {
    const { id_solicitud } = args;

    SolicitudEliminarEvento.findByIdAndRemove(id_solicitud, (err) => {
        if (err) return console.error(err);
    });
}

//Se exporta la funcion
module.exports = {
    add_evento,
    update_evento,
    delete_evento,
    patchd_add_evento,
    patch_add_evento,
    patchd_update_evento,
    patch_update_evento,
    patch_delete_evento,
    patchd_delete_evento
};
