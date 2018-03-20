//Importar models
const mongoose = require('mongoose');
const SolicitudEliminarEvento = mongoose.model('solicitud_eliminar_evento');

//Importar modulos de las suscripciones
//Funcion
function deleteEvento({ args, req }) {
    console.log(args);

    let {
        id_evento, id_usuario
    } = args

    var politico = new SolicitudEliminarEvento({
        id_evento, id_usuario
    });
    politico.save(function (err) {
        if (err) return console.log(err);
    });

    //Area del resolver
    return SolicitudEliminarEvento.findOne({ id_evento });
}

//Se exporta la funcion
module.exports = { deleteEvento };