const SHA256 = require("crypto-js/sha256");
const rsa = require('./../../security/rsa/rsa');
const mongoose = require('mongoose');
const UserAnt = mongoose.model('usuario_confirmar');
const User = mongoose.model('usuario');

function confirm_email({ args, req }) {
    const {
        email,
        firma
    } = args;
    console.log(args);
    return UserAnt.findOne({ email }).then(user => {
        if (user != null) {
            let firma_1 = SHA256("Como estas?" + user.email + "Yo jaiba y tu?" + user._id).toString();

            //Checar esta linea
            let descifrado = firma; // rsa.descifrar(firma, 5, 309);
            /*
            for (var index = 0; index < descifrado.length; index++) {
                descifrado = descifrado.replace("*", "8");
                descifrado = descifrado.replace("¨", "9");
                descifrado = descifrado.replace("Û", "b");
            }
            */

            if (firma_1.length != descifrado.length) {
                for (let x = 0; x < (firma_1.length - descifrado.length); x++) {
                    descifrado = "0" + descifrado;
                }
            }
            if (firma_1 == descifrado) {
                const { fecha_registro, nombre, email, tipo_usuario,
                    password, curp, avatar, puntos, localidad, _id } = user;

                const user_1 = new User({
                    fecha_registro, nombre, email, tipo_usuario,
                    password, curp, avatar, puntos, localidad
                });

                return user_1.save(function (err, resp) {
                    if (err) return console.error(err);
                    UserAnt.findByIdAndRemove(_id, (err) => {
                        if (err) return console.error(err);
                    });
                    return User.findById(resp._id);
                });
            } else {
                throw new Error('Codigo incorrecto');
            }
        }else{
            throw new Error('Correo no encontrado');
        }
    }).then(user => {
        return user;
    });
};

//Se exporta la funcion
module.exports = { confirm_email };