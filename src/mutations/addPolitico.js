
//Importar models
const mongoose = require('mongoose');
const Solicitud_Politico = mongoose.model('solicitud_politico');
const Politico = mongoose.model('politico');
const Partido = mongoose.model('partido');
const Estado = mongoose.model('estado');
const Estudio = mongoose.model('estudio');

//Importar modulos de las suscripciones
const pubsub  = require('graphql-subscriptions').PubSub;
const { POLITICO_AGREGADO } = require('./../subscriptions/constantes');

//Funcion
function addPolitico({ args, req }) {

    const {
        nombre, cargo, lugar_estudio, grado_academico, titulo, estado, partido, usuario, referencia
    } = args

    if (!usuario) {
        throw new Error('Falta id del Usuario');
    }
    if (!nombre) {
        throw new Error('Falta nombre');
    }
    if (/^\s+|\s+$/.test(nombre)) {
        throw new Error('Nombre inválido');
    }
    if (!partido) {
        throw new Error('Falta partido');
    }
    if (!estado) {
        throw new Error('Falta estado');
    }
    if (!cargo) {
        throw new Error('Falta cargo');
    }
    if (!grado_academico) {
        throw new Error('Falta grado academico');
    }
    if (!lugar_estudio) {
        throw new Error('Falta lugar de estudio');
    }
    if (!titulo) {
        throw new Error('Falta titulo de estudio');
    }
    if (!referencia) {
        throw new Error('Falta link de referencia');

    } else if (referencia != undefined) {
        var re = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/
        //var re = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/;
        if (/^\s+|\s+$/.test(referencia)) {
            throw new Error('Link invalido');
        } else
            if (!re.test(referencia)) {
                throw new Error('Link invalido');
            }
    }

    const estudios = new Estudio({
        titulo, grado_academico, lugar_estudio
    });
    //Area de registro
    var estudioId;
    estudios.save(function (err, estudio) {

        if (err) return console.error(err);
        estudioId = estudio.id

    });

    const politico = new Solicitud_Politico({
        nombre, cargo, partido, estado, usuario, referencia
    });

    //Guardar
    var arregloEstudios;
    politico.save(function (err, poli) {
        if (err) return console.error(err);
        arregloEstudios = poli.estudios;
        arregloEstudios.push(estudioId);
        poli.set({ estudios: arregloEstudios });
        poli.save(function (err) {
            if (err) return console.error(err);
        });

    });

    //Area del resolver
    new pubsub().publish(POLITICO_AGREGADO, { politicoAdded: Solicitud_Politico.findOne({ nombre }) });
    return Solicitud_Politico.findOne({ nombre });
}

//Se exporta la funcion
module.exports = { addPolitico };