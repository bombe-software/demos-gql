//Importar models
const mongoose = require('mongoose');
const solicitud_propuesta = mongoose.model('solicitud_propuesta');

//Modelos
const Politico = mongoose.model('politico');

//Funcion
function addPropuesta({ args, req }) {

    const {
        usuario, politico,
        fecha, titulo, 
        descripcion, referencia, 
        tipo_propuesta
    } = args;

    console.log(args, titulo);

    //Area de registro
    const propuesta = new solicitud_propuesta({
      usuario, 
      politico,
      fecha, 
      titulo,
      descripcion, 
      referencia,
      tipo_propuesta
    });

    //Guardar
    propuesta.save(function (err) {
        if (err) return console.error(err);
    });

    console.log(politico, usuario);

    //Area del resolver
    return solicitud_propuesta.findOne({titulo});
}

//Se exporta la funcion
module.exports = {addPropuesta};
