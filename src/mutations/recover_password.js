
//Importar models
const mongoose = require('mongoose');
const Usuario = mongoose.model('usuario');
const axios = require('axios');
const demos_krb_http = require('./../../deploy').demos_krb_http;

//Funcion
function recover_password({ args, req }) {
    let {
        email
    } = args;
    return Usuario.findOne({ email })
        .then((usuario) => {
            if (usuario != null) {
                const { password } = usuario;
                axios.post(`${demos_krb_http}/recover_password`, { email, password });
            } else {
                throw new Error('Correo no registrado');
            }
            return "Todo Bien"
        });
}

//Se exporta la funcion
module.exports = { recover_password };