//Importar models
const mongoose = require('mongoose');
const Propuesta = mongoose.model('propuesta');

//Funcion
function addpropuesta({ args, req }) {

    const {
        idPolitico,
        fecha,titulo ,
        descripcion
    } = args

    console.log(args)

    //Area de registro
    const propuesta = new Propuesta({
        ididPolitico, fecha,titulo,
        descripcion
    });

    //Guardar
    propuesta.save(function (err) {
        if (err) return console.error(err);
    });

    //Area del resolver
    return Propuesta.findOne({id});
}

//Se exporta la funcion
module.exports = { addpropuesta};