//Importar models
const mongoose = require('mongoose');
const Bug = mongoose.model('bug');

//Funciones
function add_bug({ args, req }) {
    //Obtencion de las variables
    const { titulo, descripcion, url } = args;

    //Area de registro
    const bug = new Bug({
        titulo, descripcion, url
    });

    //Guardar
    bug.save();

    //Retorno
    return Bug.findOne({titulo});
}

function delete_bug({ args, req }) {
    //Obtencion de las variables
    const { id_bug } = args;

    //Remover
    Bug.remove({ _id: id_bug });

    //Retorno
    return Bug.findById(id_bug).then(bug => { return bug });
}

//Se exportan las funciones
module.exports = {
    add_bug,
    delete_bug
};