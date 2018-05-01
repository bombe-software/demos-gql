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
    if(nombre){
        const usuario = Usuario.findById(id).then((registro) => {
            registro.set({ nombre });
            registro.save();
        });
    }else if(password){
        const usuario = Usuario.findById(id).then((registro) => {
            registro.set({ password });
            registro.save();
        });
    }else if(avatar){
        const usuario = Usuario.findById(id).then((registro) => {
            registro.set({ avatar });
            registro.save();
        });
    }else if(tipo_usuario){
        const usuario = Usuario.findById(id).then((registro) => {
            registro.set({ tipo_usuario });
            registro.save();
        });
    }else if(puntos){
        const usuario = Usuario.findById(id).then((registro) => {
            registro.set({ puntos });
            registro.save();
        });
    }

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