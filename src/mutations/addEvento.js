//Importar models
const mongoose = require('mongoose');
const Evento = mongoose.model('evento');

//Funcion
function addevento({ args, req }) {

    const {
        fecha,titulo ,
        descripcion
    } = args

    console.log(args)

    //Area de registro
    const evento = new Evento({
        fecha,titulo,
        descripcion
    });

    //Guardar
    evento.save(function (err) {
        if (err) return console.error(err);
    });

    //Area del resolver
    return Evento.findOne({titulo});
}

//Se exporta la funcion
module.exports = { addevento};