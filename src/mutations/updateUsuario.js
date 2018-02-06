//Importar models
const mongoose = require('mongoose');
const Usuario = mongoose.model('usuario');

//Funcion
function updateUsuario({ args, req }) {

    const {
        id, nombre, password, avatar
    } = args;
    if (!id) {
        throw new Error('Falta id del Usuario');
    }
    if (!nombre) {
        throw new Error('Falta nombre de usuario');
    }
    if (nombre != undefined) {
        var ra = /^[a-z0-9]+$/i;
        if (!ra.test(nombre)) {
            throw new Error('Solo puede contener alfa numericos y sin espacios');
        }
    }
    if (!password) {
        throw new Error('Falta contraseña');
    }
    if (password != undefined) {
        var re = /^(?=(?:.*\d){1})(?=(?:.*[A-Z]){1})(?=(?:.*[a-z]){1})\S{6,}$/;
        if (!re.test(password)) {
            throw new Error('Password invalido');
        }
    }
    if (!avatar) {
        throw new Error('Falta avatar');
    }
    //Area de registro
    const usuario = Usuario.findById(id).then((registro) => {
        registro.set({ nombre, password, avatar });
        registro.save((error) => {
            if (error) {
                console.log(error);
            }

        });

    });

    if (!usuario) {
        throw new Error(`No se encontro usuario con ID  ${id}`);
    }

    return usuario;
}

//Se exporta la funcion
module.exports = { updateUsuario };