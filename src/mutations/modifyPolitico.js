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
        var re = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/;
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
            console.log("pasa");
            estudiosAModificar = estudios;
            console.log("Estudios a modificar: "+estudiosAModificar)
        }
        var politico = new SolicitudModificarPolitico({
            nombre, cargo, partido, estado, usuario, referencia, id_politico
        });
        console.log("pasa");
        //Guardar
        var arregloEstudios;
        politico.save(function (err, poli) {
            if (err) return console.error(err);
            console.log("hola" + poli);
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
    return SolicitudModificarPolitico.findOne({ nombre });
}

//Se exporta la funcion
module.exports = { modifyPolitico };