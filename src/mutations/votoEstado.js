//Importar models
const _ = require('lodash');
const mongoose = require('mongoose');
const Votacion = mongoose.model('votacion');
const Preferencias = mongoose.model('preferencia');

//Funcion
function votoEstado({ args, req }) {
  const {
    id_votacion,
    id_usuario,
    id_preferencia,
    id_estado
  } = args
  if (!id_votacion) {
    throw new Error('Falta idVotacion');
  }
  if (!id_usuario) {
    throw new Error('Falta idUsuario');
  }id_preferencia
  if (!id_preferencia) {
    throw new Error('Falta idPreferencia');
  }
  if (!id_estado) {
    throw new Error('Falta idEstado');
  }

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
module.exports = { votoEstado };
