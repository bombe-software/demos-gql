//Funcion
//Librerias y configuraciones requeridas
/**
 * Mongoose
 */
const axios = require("axios");
const mongoose = require('mongoose');
const User = mongoose.model('usuario_confirmar');
//const User = mongoose.model('usuario');
const Estado = mongoose.model('estado');
const demos_krb_http = require('./../../deploy').demos_krb_http;

//Funcion
function signup({ args, req }) {
    const {
        nombre, email,
        password, avatar,
        localidad
    } = args

    // Area de validaciones
    if (!nombre) {
        throw new Error('Falta nombre de usuario');
    }
    if (nombre != undefined) {
        var ra = /^[a-z0-9]+$/i;
        if (!ra.test(nombre)) {
            throw new Error('Nombre de usuario invalido');
        }
    }
    if (!email) {
        throw new Error('Falta email');
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
    if (email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        throw new Error('Email inválido');
    }
    if (!avatar) {
        throw new Error('Falta avatar');
    }
    if (!localidad) throw new Error('Falta localidad');

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
                }
                return user.save();
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