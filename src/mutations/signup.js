//Funcion
//Librerias y configuraciones requeridas
/**
 * Mongoose
 */
const axios = require("axios");
const mongoose = require('mongoose');
const UserConfirm = mongoose.model('usuario_confirmar');
const User = mongoose.model('usuario');
const Estado = mongoose.model('estado');
const demos_krb_http = require('./../../deploy').demos_krb_http;

//Funcion
function signup({ args, req }) {
    const {
        nombre, email,
        password, avatar,
        localidad
    } = args

    //Area del resolver
    return Estado.findOne({ nombre: localidad }).then(est => {
        return new User({
            nombre, email, tipo_usuario: "5a68bca9e9bfc6a2fee8cb06",
            password, avatar,
            puntos: 0, localidad: est.id
        });
    }).then(user => {
        return User.findOne({ email })
            .then(existingUser => {
                if (existingUser) {
                    throw new Error('Email en uso');
                }else{
                    return UserConfirm.then(existingUser => {
                        if (existingUser) {
                            throw new Error('Email en uso');
                        }else{
                            return user.save();
                        }
                    })
                }
            })
            .then(user => {
                const ticket = {
                    email: user.email,
                    id_usuario: user.id
                };

                const request = axios.post(`${demos_krb_http}/send_email`, ticket);
                return new Promise((resolve, reject) => {
                    req.logIn(user, (err) => {
                        if (err) {
                            reject(err);
                        }
                        resolve(user);
                    });
                });

            });
    })
}

//Se exporta la funcion
module.exports = { signup };