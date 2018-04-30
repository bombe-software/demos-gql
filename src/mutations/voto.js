//Importar models
const _ = require('lodash');
const mongoose = require('mongoose');
const VotacionNacional = mongoose.model('like_nacional');
const Estado = mongoose.model('estado');
const Votacion = mongoose.model('votacion');
const Preferencias = mongoose.model('preferencia');

//Funciones
function nacional_voto({ args, req }) {
    const {
        id_politico,
        id_usuario,
        id_estado
    } = args

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

function estatal_voto({ args, req }) {
  const {
    id_votacion,
    id_usuario,
    id_preferencia,
    id_estado
  } = args

  //Area de registro
  const fun = Votacion.findById(id_votacion).populate("preferencias").then(({preferencias}) =>{
    preferencias.map(preferencia=>{
      const nuevos_usuarios = _.remove(preferencia.usuarios, function(n) {
        return n != id_usuario;
      });
      preferencia.set({usuarios: nuevos_usuarios});
      preferencia.save((err, pref) => {
          if(err) console.log(err);
      });
    })
    Preferencias.findById(id_preferencia).then(preferencia => {
      const usuarios = preferencia.usuarios;
      usuarios.push(id_usuario);
      preferencia.set({ usuarios });
      preferencia.save((err, prop) => {
          if(err) console.log(err);
      });
    })
  });

  return fun.then(()=> { return Votacion.findById(id_votacion) });
}

//Se exporta la funcion
module.exports = {
    nacional_voto,
    estatal_voto
};
