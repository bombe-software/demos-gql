//Importar models
const mongoose = require('mongoose');
const Politico = mongoose.model('politico');

//Funcion
function addpolitico({ args, req }) {

    const {
        nombre, partido,
        tipo_politico, estado,estudios
    } = args

    console.log(args)

    //Area de registro
    const politico = new Politico({
        nombre, partido,
        tipo_politico, estado,estudios
    });

    //Guardar
    politico.save(function (err) {
        if (err) return console.error(err);
    });

    //Area del resolver
    return Politico.findOne({nombre});
}

//Se exporta la funcion
module.exports = { addpolitico };