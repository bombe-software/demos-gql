//Importar models
const mongoose = require('mongoose');

//Importar modulos de las suscripciones
const pubsub  = require('graphql-subscriptions').PubSub;

//Funcion
function propuesta_agregada(payload, args, context, info) {

    console.log(payload, args, context, info);

    //Area de registro

    //Guardar

    //Area del resolver

}

//Se exporta la funcion
module.exports = { propuesta_agregada };