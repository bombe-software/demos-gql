//Importar models
const mongoose = require('mongoose');
const Bug = mongoose.model('bug');
//Funcion
function addBug({ args, req }) {
    const { titulo, descripcion, url } = args;

    //Area de registro
    const bug = new Bug({
        titulo, descripcion, url
    });

    //Guardar
    bug.save(function (err) {
        if (err) return console.error(err);
    });

    return Bug.findOne({titulo});
}
module.exports = {
    addBug
};