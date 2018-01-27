//Importar models
const mongoose = require('mongoose');
const Usuario = mongoose.model('usuario');

//Funcion
function updateUsuario({ args, req }) {

    const {
        id, nombre, password, avatar
    } = args;
    //Area de registro
    const usuario = Usuario.findById(id).then((registro)=>{
        registro.set({nombre,password,avatar});
        registro.save((error) =>{
            if(error){
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