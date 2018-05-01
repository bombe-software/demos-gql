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
        nombre, password, avatar, tipo_usuario, puntos
    } = args;
    const { id } = req.user;

    console.log(args);

    if (!User.findById(id).then(usuario=>usuario)) {
        throw new Error(`No se encontro usuario con ID  ${id}`);
    }
    
    //Area de registro
    if(nombre){
        return User.findById(id).then((registro) => {
            registro.set({ nombre });
            return registro.save();
        });
    }else if(password){
        return User.findById(id).then((registro) => {
            registro.set({ password });
            return registro.save();
        });
    }else if(avatar){
        return User.findById(id).then((registro) => {
            registro.set({ avatar });
            return registro.save();
        });
    }else if(tipo_usuario){
        return User.findById(id).then((registro) => {
            registro.set({ tipo_usuario });
            return registro.save();
        });
    }else if(puntos){
        return User.findById(id).then((registro) => {
            registro.set({ puntos });
            return registro.save();
        });
    }
    
    return User.findById(id).then(usuario=>usuario)
}

//Se exporta la funcion
module.exports = {
    delete_usuario,
    update_usuario
};