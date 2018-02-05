//Importar models
const _ = require('lodash');
const mongoose = require('mongoose');
const Votacion = mongoose.model('votacion');
const Preferencias = mongoose.model('preferencia');

//Funcion
function voto_estado({ args, req }) {
  const {
    id_votacion,
    id_usuario,
    id_politico,
    id_estado
  } = args
  if (!id_votacion) {
    throw new Error('Falta idVotacion');
  }
  if (!id_usuario) {
    throw new Error('Falta idUsuario');
  }
  if (!id_politico) {
    throw new Error('Falta idPolitico');
  }
  if (!id_estado) {
    throw new Error('Falta idEstado');
  }

  var usuarios = [];

  console.log(id_usuario, id_politico, id_estado);

  //Area de registro
  Votacion.findOne({ politico: id_politico, estado: id_estado }).then((registro) => {
    if (registro === null) {
      usuarios.push(id_usuario);
      var nuevaVotacion = new Votacion({ politico: id_politico, estado: id_estado, preferencias: usuarios });

      nuevaVotacion.save().then((error) => {
        if (error) {
          console.log(error);
        }
      });
    } else {
      usuarios = registro.preferencias;
      usuarios.push(id_usuario);
      registro.set({ politico: id_politico, estado: id_estado, preferencias: usuarios });

      registro.save().then((error) => {
        if (error) {
          console.log(error);
        }
      });
    }
  });


  //Area del resolve
  return Votacion.findById(id_votacion);
}

//Se exporta la funcion
module.exports = { voto_estado };
