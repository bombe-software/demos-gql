//Importar models
const mongoose = require('mongoose');
const Votacion = mongoose.model('evento');

//Funcion
function voto_estado({ args, req }) {
    const {
        id_usuario,
        id_politico,
        id_estado
    } = args

    var usuarios = [];

    console.log(id_usuario, id_politico, id_estado);

    //Area de registro
    Votacion.findOne({politico: id_politico, estado: id_estado}).then((registro) => {
      if (registro === null){
        usuarios.push(id_usuario);
        var nuevaVotacion = new Votacion({politico: id_politico, estado: id_estado, preferencias: usuarios});

        nuevaVotacion.save().then((error) => {
          if (error){
            console.log(error);
          }
        });
      } else {
        usuarios = registro.preferencias;
        usuarios.push(id_usuario);
        registro.set({politico: id_politico, estado: id_estado, preferencias: usuarios});

        registro.save().then((error) => {
          if (error){
            console.log(error);
          }
        });
      }
    });


    //Area del resolve
    Votacion.findOne({});
}

//Se exporta la funcion
module.exports = { voto_estado};
