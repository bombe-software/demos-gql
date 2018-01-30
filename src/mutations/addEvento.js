//Importar models
const mongoose = require('mongoose');
const solicitud_evento = mongoose.model('solicitud_evento');

const Politico = mongoose.model('politico');

//Funcion
function addEvento({ args, req }) {

    const {
        usuario, politico,
        fecha, titulo, descripcion, referencia
    } = args;

    console.log(args);

    //Area de registro
    const evento = new solicitud_evento({
      usuario, 
      politico,
      fecha, 
      titulo,
      descripcion, 
      referencia
    });

    //Guardar
    evento.save(function (err) {
        if (err) return console.error(err);
    });

    //Area del resolver
    return solicitud_evento.findOne({titulo});
}

//Se exporta la funcion
module.exports = { addEvento };
