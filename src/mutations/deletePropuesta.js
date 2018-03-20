//Importar models
const mongoose = require('mongoose');
const SolicitudEliminarPropuesta = mongoose.model('solicitud_eliminar_propuesta');

//Importar modulos de las suscripciones
//Funcion
function deletePropuesta({ args, req }) {
    console.log(args);

    let {
        id_propuesta, id_usuario
    } = args

    var politico = new SolicitudEliminarPropuesta({
        id_propuesta, id_usuario
    });
    politico.save(function (err) {
        if (err) return console.log(err);
    });

    //Area del resolver
    return SolicitudEliminarPropuesta.findOne({ id_propuesta });
}

//Se exporta la funcion
module.exports = { deletePropuesta };