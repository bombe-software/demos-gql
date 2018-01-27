//Importar models
const mongoose = require('mongoose');
const propuesta_evento = mongoose.model('solicitud_evento');

//Funcion
function addevento({ args, req }) {

    const {
        usuario, politico,
        fecha, titulo, descripcion, referencia
    } = args;

    console.log(args);

    //Area de registro
    const evento = new propuesta_evento({
      usuario, politico,
      fecha, titulo,
      descripcion, referencia
    });

    //Guardar
    evento.save(function (err) {
        if (err) return console.error(err);
    });

    //Area del resolver
    return propuesta_evento.findOne({titulo});
}

//Se exporta la funcion
module.exports = { addevento };
