//Librerias y configuraciones requeridas
/**
 * Mongoose
 */
const axios = require("axios");
const mongoose = require('mongoose');
const User = mongoose.model('usuario');

const Estado = mongoose.model('estado');

//Funcion
function signup({ args, req }) {
    const {
        nombre, email,
        password, curp, avatar,
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
    if (!curp) {
        throw new Error('Falta CURP');
    }
    if (curp != undefined) {
        var ri = /^([A-Z]{4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[HM](AS|BC|BS|CC|CL|CM|CS|CH|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[A-Z]{3}[0-9A-Z]\d)$/i
        if (!ri.test(curp)) {
            throw new Error('CURP invalido');
        }
    }
    if (email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        throw new Error('Email inválido');
    }
    if (!avatar) {
        throw new Error('Falta avatar');
    }
    if (!localidad) throw new Error('Falta localidad');
    const tipo_usuario ="5a68bca9e9bfc6a2fee8cb06";
  
    //Area de registro
    console.log(localidad);
    let estadoBuscado, user;
    Estado.findOne({ nombre: localidad }).then((est)=>{
        user = new User({
            nombre, email,  tipo_usuario: "5a68bca9e9bfc6a2fee8cb06",
            password, curp, avatar,
            puntos: 0, localidad: est
        });
    });
    console.log(estadoBuscado);

    console.log(user);

    //Area del resolver
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
      
            /*const request = axios.post("http://localhost:5000/send_email", ticket);
            return new Promise((resolve, reject) => {
                req.logIn(user, (err) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(user);
                });
            });*/
            
        });
}

//Se exporta la funcion
module.exports = { signup };