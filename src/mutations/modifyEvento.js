//Importar models
const mongoose = require('mongoose');
const SolicitudModificarPolitico = mongoose.model('solicitud_modificar_politico');
const Politico = mongoose.model('politico');
const Partido = mongoose.model('partido');
const Estado = mongoose.model('estado');
const Estudio = mongoose.model('estudio');

//Importar modulos de las suscripciones
const pubsub = require('graphql-subscriptions').PubSub;

//Funcion
function modifyEvento({ args, req }) {
    console.log(args);

    let {
        id_evento, titulo, descripcion, fecha, referencia, usuario, politico
    } = args

    if (!fecha) {
        throw new Error("Seleccione la fecha");
    }
    if (!titulo) {
        throw new Error("Escriba el título del evento");
    }
    if (titulo != undefined) {
        if (/^\s+|\s+$/.test(values.titulo)) {
            throw new Error("Escriba un titulo válido");
        }
    }
    if (!descripcion) {
        throw new Error("Escriba la descripción del evento");
    } else
        if (/^\s+|\s+$/.test(descripcion)) {
            throw new Error("Escriba una descripción válida");
        }
    if (!referencia) {
        throw new Error("Escriba el link de referencia");

    } else if (referencia != undefined) {
        var re = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/
        //var re = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/;
        if (/^\s+|\s+$/.test(referencia)) {
            throw new Error("Link invalido");
        } else
            if (!re.test(referencia)) {
                throw new Error("Los links deben empezar con http,https. (http(s)://www.demos.com)");
            }
    }

}

//Se exporta la funcion
module.exports = { modifyEvento };