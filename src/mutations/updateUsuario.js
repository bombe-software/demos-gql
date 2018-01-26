//Importar models
const mongoose = require('mongoose');
const Usuario = mongoose.model('usuario');

//Funcion
function updateUsuario({ args, req }) {

    const {
        id, nombre, password, avatar
    } = args;

    console.log(args)

    //Area de registro
    const usuario = Usuario.findById(id);
    //Area del resolver
    if (!usuario) {
        throw new Error(`No se encontro usuario con ID  ${id}`);
    }

    usuario.nombre = nombre;
    usuario.password = password;
    usuario.avatar = avatar
    return usuario;
}

//Se exporta la funcion
module.exports = { updateUsuario };