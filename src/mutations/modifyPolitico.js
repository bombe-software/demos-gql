//Importar models
const mongoose = require('mongoose');
const SolicitudModificarPolitico = mongoose.model('solicitud_modificar_politico');
const Politico = mongoose.model('politico');
const Partido = mongoose.model('partido');
const Estado = mongoose.model('estado');
const Estudio = mongoose.model('estudio');

//Importar modulos de las suscripciones
const pubsub  = require('graphql-subscriptions').PubSub;

//Funcion
function modifyPolitico({ args, req }) {
    console.log(args);

    let {
        nombre, cargo, lugar_estudio, grado_academico, titulo, estado, estudios, partido, usuario, referencia, id_politico
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

    var estudiosAModificar;
 
    Estudio.findById(estudios, function(err, est){
        var estudioId;
        if(est.grado_academico !== grado_academico || est.lugar_estudio !== lugar_estudio || est.titulo !== titulo){
            var e = new Estudio({
                titulo, grado_academico, lugar_estudio
            });
            //Area de registro
            e.save(function (err, estudio) {
        
                if (err) return console.error(err);
                estudiosAModificar = estudio._id
                console.log(estudiosAModificar);
            });
        } else {
            estudiosAModificar = estudios;
            console.log("Estudios a modificar: "+estudiosAModificar)
        }
        console.log("SAUL AMA A PANY");
        console.log(id_politico);
        var politico = new SolicitudModificarPolitico({
            nombre, cargo, partido, estado, usuario, referencia, id_politico
        });
        //Guardar
        var arregloEstudios;
        politico.save(function (err, poli) {
            if (err) return console.error(err);
            arregloEstudios = [];
            console.log(estudiosAModificar);
            arregloEstudios.push(estudiosAModificar);
            console.log(arregloEstudios);
            poli.set({ estudios: arregloEstudios });
            console.log(poli);
            poli.save(function (err) {
                if (err) return console.error(err);
            });
        });
    });

    console.log(args);

    //Area del resolver
    return SolicitudModificarPolitico.findById( id_politico );
}

//Se exporta la funcion
module.exports = { modifyPolitico };