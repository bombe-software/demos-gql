//Importar models
const mongoose = require('mongoose');
const Votacion = mongoose.model('evento');

//Funcion
function voto_estado({ args, req }) {
    const {
        id_usuario,
        id_politico
    } = args

    console.log(id_usuario, id_politico);

    //Area de registro


    //Guardar

    
    //Area del resolve
    Votacion.findOne({});
}

//Se exporta la funcion
module.exports = { voto_estado};