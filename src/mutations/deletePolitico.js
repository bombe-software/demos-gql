//Importar models
const mongoose = require('mongoose');
const SolicitudEliminarPolitico = mongoose.model('solicitud_eliminar_politico');
const Politico = mongoose.model('politico');
const Usuario = mongoose.model('usuario');

//Importar modulos de las suscripciones
//Funcion
function deletePolitico({ args, req }) {
    console.log(args);

    let {
        id_politico, id_usuario
    } = args

    var politico = new SolicitudEliminarPolitico({
        id_politico, id_usuario
    });
    politico.save(function (err) {
        if (err) return console.log(err);
    });

    //Area del resolver
    return SolicitudEliminarPolitico.findOne({ id_politico });
}

//Se exporta la funcion
module.exports = { deletePolitico };