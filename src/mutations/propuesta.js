//Importar models
const _ = require('lodash');
const mongoose = require('mongoose');
const SolicitudPropuesta = mongoose.model('solicitud_propuesta');
const SolicitudEliminarPropuesta = mongoose.model('solicitud_eliminar_propuesta');
const SolicitudModificarPropuesta = mongoose.model('solicitud_modificar_propuesta');
const Politico = mongoose.model('politico');
const Propuesta = mongoose.model('propuesta');
const Usuario = mongoose.model('usuario');

//Funcion
function add_propuesta({ args, req }) {
    const {
        usuario, politico,
        fecha, titulo,
        descripcion, referencia,
        tipo_propuesta
    } = args;

    //Area de registro
    const propuesta = new SolicitudPropuesta({
        usuario,
        politico,
        fecha,
        titulo,
        descripcion,
        referencia,
        tipo_propuesta
    });

    //Guardar
    propuesta.save();

    return SolicitudPropuesta.findOne({ titulo });
}

function delete_propuesta({ args, req }) {

    let {
        id_propuesta, id_usuario
    } = args

    var propuesta = new SolicitudEliminarPropuesta({
        id_propuesta,
        id_usuario
    });
    propuesta.save();

    //Area del resolver
    return SolicitudEliminarPropuesta.findOne({ id_propuesta });
}

function update_propuesta({ args, req }) {

    let {
        id_propuesta, usuario, politico,
        fecha, descripcion, titulo,
        tipo_propuesta, referencia
    } = args;
 
    const propuesta = new SolicitudModificarPropuesta({
        id_propuesta, usuario, politico,
        fecha, descripcion, titulo,
        tipo_propuesta, referencia
    });

    return propuesta.save();
}

function patch_add_propuesta({args, req}) {
    const { id_propuesta } = args;
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
                        p.save();
                    });
                return Propuesta.findById(resp._id);
            });
        });

}

function patchd_add_propuesta({args, req}) {
    const { id_propuesta } = args;
    SolicitudPropuesta.findByIdAndRemove(id_propuesta);
}

function patch_update_propuesta({args, req}) {
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

function patchd_update_propuesta({args, req}) {
    const { id_solicitud } = args;

    SolicitudModificarPropuesta.findByIdAndRemove(id_solicitud, (err) => {
        if (err) return console.error(err);
    });

}

function patch_delete_propuesta({ args, req }) {
    const { id_solicitud } = args;
    SolicitudEliminarPropuesta.findById(id_solicitud)
        .then((propuesta) => {
            var { id_propuesta, usuario, politico, fecha, descripcion, titulo, tipo_propuesta, referencia, _id } = propuesta;
            return Propuesta.findByIdAndRemove(id_propuesta, (err, resp) => {
                if (err) return console.error(err);
                return SolicitudEliminarPropuesta.findByIdAndRemove(_id, (err) => {
                    if (err) return console.error(err);
                    return Propuesta.findById(resp._id);
                });
            });
        });
}


function patchd_delete_propuesta({ args, req }) {
    const { id_solicitud } = args;

    SolicitudEliminarPropuesta.findByIdAndRemove(id_solicitud);
}


function like_propuesta({ args, req }) {
    const {
        id_propuesta,
        id_usuario
    } = args;

    return Propuesta.findById(id_propuesta)
        .then(propuesta => {
            propuesta.likes.push(id_usuario);
            return Promise.resolve(propuesta.save());
        });
}

function dislike_propuesta({ args, req }) {
    const {
        id_propuesta,
        id_usuario
    } = args;

    Propuesta.findById(id_propuesta).then(propuesta => {
        const nuevos_usuarios = _.remove(propuesta.likes, function (n) {
            return n != id_usuario;
        });
        propuesta.set({ likes: nuevos_usuarios });
        propuesta.save((err, prop) => {
            if (err) console.log(err);
        });
    });

    return Propuesta.findById(id_propuesta);
}

//Se exporta la funcion
module.exports = {
    add_propuesta,
    delete_propuesta,
    update_propuesta,
    patch_update_propuesta,
    patchd_update_propuesta,
    patch_delete_propuesta,
    patchd_delete_propuesta,
    like_propuesta,
    dislike_propuesta
};
