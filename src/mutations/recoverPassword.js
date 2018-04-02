
//Importar models
const mongoose = require('mongoose');
const Usuario = mongoose.model('usuario');
const axios = require('axios');

//Funcion
function recoverPassword({ args, req }) {

    let {
        email
    } = args;
    console.log(email);
    Usuario.findOne({email})
        .then((usuario) => {
            console.log(usuario);
            const { password} = usuario;
            axios.post("http://localhost:5000/recover_password", {email,password});
        });
    return "Todo Bien";
}

//Se exporta la funcion
module.exports = {recoverPassword };