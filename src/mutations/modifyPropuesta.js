//Importar models
const mongoose = require('mongoose');
const SolicitudModificarPropuesta = mongoose.model('solicitud_modificar_propuesta');


//Funcion
function modifyPropuesta({ args, req }) {

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

//Se exporta la funcion
module.exports = { modifyPropuesta };