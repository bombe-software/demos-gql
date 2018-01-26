//Importar models
const mongoose = require('mongoose');
const solicitud_propuesta = mongoose.model('solicitud_propuesta');

//Funcion
function addpropuesta({ args, req }) {

    const {
        usuario, politico,
        fecha, titulo, descripcion, referencia, tipo_propuesta
    } = args;

    console.log(args);

    //Area de registro
    const propuesta = new solicitud_propuesta({
      usuario, politico,
      fecha, titulo,
      descripcion, referencia, tipo_usuario
    });

    //Guardar
    propuesta.save(function (err) {
        if (err) return console.error(err);
    });

    //Area del resolver
    return solicitud_propuesta.findOne({titulo});
}

//Se exporta la funcion
module.exports = {addpropuesta};
