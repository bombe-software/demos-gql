//Importar models
const mongoose = require('mongoose');
const User = mongoose.model('usuario');
//Funcion
function delete_usuario({ args, req }) {
    const { id_usuario } = args;
    
    User.remove({ _id: id_usuario }, (err) => {
        if (err) return JSON.stringify(err);
    });

    return User.findById(id_usuario).then(user=> {return user});
}

//Funcion
function update_usuario({ args, req }) {
    const {
        id, nombre, password, avatar, tipo_usuario, puntos
    } = args;
    
    //Area de registro
    const usuario = Usuario.findById(id).then((registro) => {
        registro.set({ nombre, password, avatar, tipo_usuario, puntos });
        registro.save();
    });

    if (!usuario) {
        throw new Error(`No se encontro usuario con ID  ${id}`);
    }

    return usuario;
}

//Se exporta la funcion
module.exports = {
    delete_usuario,
    update_usuario
};