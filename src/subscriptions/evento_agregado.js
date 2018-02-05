//Importar models
const mongoose = require('mongoose');

//Importar modulos de las suscripciones
const pubsub  = require('graphql-subscriptions').PubSub;

//Funcion
function evento_agregado(payload, args, context, info) {

    console.log(payload, args, context, info);

    //Area de registro

    //Guardar

    //Area del resolver

}

//Se exporta la funcion
module.exports = { evento_agregado };