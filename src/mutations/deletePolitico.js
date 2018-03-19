//Importar models
const mongoose = require('mongoose');
const SolicitudEliminarPolitico = mongoose.model('solicitud_eliminar_politico');
const Politico = mongoose.model('politico');
const Partido = mongoose.model('partido');
const Estado = mongoose.model('estado');
const Estudio = mongoose.model('estudio');

//Importar modulos de las suscripciones
//Funcion
function deletePolitico({ args, req }) {
    console.log(args);

    let {
        idpolitico, usuario
    } = args

    var politico = new SolicitudEliminarPolitico({
        idpolitico, usuario
    });
    politico.save();

    //Area del resolver
    return SolicitudEliminarPolitico.findOne({ idpolitico });
}

//Se exporta la funcion
module.exports = { deletePolitico };