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
        id_politico
    } = args

    //Area de registro
    Preferencias.findOne({politico: id_politico}).then((preferencia, err)=>{
        let usuarios = preferencia.usuarios;
        _.remove(usuarios, function(usuario) {
            if(usuarios === id_usuario)
                return true;
            else
                return false;
        });
        preferencia.set({usuarios});
        
        preferencia.save();
    }); 

    
    //Area del resolve
    return Votacion.findById(id_votacion);
}

//Se exporta la funcion
module.exports = { voto_estado};