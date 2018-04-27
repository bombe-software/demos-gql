//Importar models
const mongoose = require('mongoose');
const User = mongoose.model('usuario');
//Funcion
function deleteUser({ args, req }) {
    const { id_usuario } = args;
    if (!id_usuario) {
        throw new Error('Error al hacer fetch con el Usuario');
    }
    User.remove({ _id: id_usuario }, (err) => {
        if (err) return JSON.stringify(err);
    });
    return User.findById(id_usuario).then(user=> {return user});
}
module.exports = {
    deleteUser
};