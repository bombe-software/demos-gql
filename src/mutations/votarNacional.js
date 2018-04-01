//Importar models
const _ = require('lodash');
const mongoose = require('mongoose');
const VotacionNacional = mongoose.model('like_nacional');
const Estado = mongoose.model('estado');

//Funcion
function votarNacional({ args, req }) {
    const {
        id_politico,
        id_usuario,
        id_estado
    } = args

    if (!id_politico) {
        throw new Error('Falta idPolitico');
    }
    if (!id_usuario) {
        throw new Error('Falta idUsuario');
    }
    if (!id_estado) {
        throw new Error('Falta idEstado');
    }

    return VotacionNacional.find({ estado: id_estado }).then(votacionesNacional => {
        votacionesNacional.map(votacionNacional => {
            const nuevos_usuarios =_.filter(votacionNacional.usuarios, function (o) {
                return o != id_usuario;
            });
            votacionNacional.set({ usuarios: nuevos_usuarios });
            votacionNacional.save((err, pref) => {
                if (err) console.log(err);
            });
        });
        VotacionNacional.findOne({ politico: id_politico, estado: id_estado }).then(preferencia => {
            if (preferencia.usuarios.length == 0) {
                usuarios = preferencia.usuarios;
                usuarios.push(id_usuario);
                preferencia.set({ usuarios });
                preferencia.save(function (err) {
                    if (err) return console.error(err);
                });
            } else {
                let validacionAsincrono = _.filter(preferencia.usuarios, function (o) {
                    return o == id_usuario;
                });
                if (validacionAsincrono.length == 0) {
                    usuarios = preferencia.usuarios;
                    usuarios.push(id_usuario);
                    preferencia.set({ usuarios });
                    preferencia.save(function (err) {
                        if (err) return console.error(err);
                    });
                }
            }

        })
        return VotacionNacional.findOne({ politico: id_politico, estado: id_estado });
    });
}

//Se exporta la funcion
module.exports = { votarNacional };
