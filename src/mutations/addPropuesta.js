//Importar models
const mongoose = require('mongoose');
const solicitud_propuesta = mongoose.model('solicitud_propuesta');
const Politico = mongoose.model('politico');

//Importar modulos de las suscripciones
const pubsub  = require('graphql-subscriptions').PubSub;
const { PROPUESTA_AGREGADA } = require('./../subscriptions/constantes');

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
    new pubsub().publish(PROPUESTA_AGREGADA, { propuestaAdded: solicitud_propuesta.findOne({titulo})});
    return solicitud_propuesta.findOne({titulo});
}

//Se exporta la funcion
module.exports = {addPropuesta};
