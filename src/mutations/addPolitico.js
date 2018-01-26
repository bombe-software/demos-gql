//Importar models
const mongoose = require('mongoose');
const solicitud_Politico = mongoose.model('solicitud_politico');
const Politico = mongoose.model('politico');
const Partido = mongoose.model('partido');
const Estado = mongoose.model('estado');

//Funcion
function addPolitico({ args, req }) {

    const {
        usuario, nombre, cargo, estudios, estado, partido
    } = args

    console.log(args);

    //Area de registro
    const politico = new solicitud_Politico({
        usuario, nombre, cargo, estudios, estado, partido
    });

    //Guardar
    politico.save(function (err) {
        if (err) return console.error(err);
    }).then(() => {
      var cargos=[];
      if(cargo==="Candidato"){
          Estado.findById(estado)
          .then(estado => {
              cargos = estado.candidatos;
              cargos.push(politico._id);
              estado.set({candidatos: cargos});
              estado.save(function (err) {
                  if (err) return console.error(err);
              });
          });
      } else if(cargo==="Funcionario"){
          Estado.findById(estado)
          .then(estado => {
              cargos = estado.funcionarios;
              cargos.push(politico._id);
              estado.set({funcionarios: cargos});
              estado.save(function (err) {
                  if (err) return console.error(err);
              });
          });
      }

      var integrantes = [];
      Partido.findById(partido).then(partido => {
          integrantes = partido.integrantes;
          integrantes.push(politico._id);
          partido.set({integrantes: integrantes});
          partido.save(function (err) {
              if (err) return console.error(err);
          });
      });
    });

    //Area del resolver
    return Politico.findOne({nombre});
}

//Se exporta la funcion
module.exports = { addPolitico };
