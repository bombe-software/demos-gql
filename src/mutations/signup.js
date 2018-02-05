//Librerias y configuraciones requeridas
/**
 * Mongoose
 */
const mongoose = require('mongoose');
const User = mongoose.model('usuario');

//Funcion
function signup({ args, req }) {
    const {
        nombre, email,
        password, curp, avatar,
        localidad
    } = args


    // Area de validaciones
    if (!nombre) throw new Error('Falta nombre en args');
    if (!email) throw new Error('Falta email en args');
    if (!password) throw new Error('Falta password en args');
    if (!curp) throw new Error('Falta curp en args');
    if (!avatar) throw new Error('Falta curp en args');
    if (!localidad) throw new Error('Falta localidad en args');


    //Area de registro
    const user = new User({
        nombre, email,  tipo_usuario: "5a68bca9e9bfc6a2fee8cb06",
        password, curp, avatar,
        puntos: 0, localidad
    });

    //Area del resolver
    return User.findOne({ email })
        .then(existingUser => {
            if (existingUser) {
                throw new Error('Email en uso');
            }
            return user.save();
        })
        .then(user => {
            console.log(user);
            return new Promise((resolve, reject) => {
                req.logIn(user, (err) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(user);
                });
            });
        });
}

//Se exporta la funcion
module.exports = { signup };