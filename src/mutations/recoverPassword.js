
//Importar models
const mongoose = require('mongoose');
const Usuario = mongoose.model('usuario');
const axios = require('axios');

//Funcion
function recoverPassword({ args, req }) {
    let {
        email
    } = args;
    if(!email){
        throw new Error('Escriba el email');
    }
    Usuario.findOne({email})
        .then((usuario) => {
            console.log(usuario);
            if(usuario!=null){
            const { password} = usuario;
            axios.post("http://localhost:5000/recover_password", {email,password});
            } else {
                throw new Error('Correo no registrado');
            }
        });
    return "Todo Bien";
}

//Se exporta la funcion
module.exports = {recoverPassword };