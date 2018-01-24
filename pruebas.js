const db = new require('mongoose');
function estado_registro(){
    //Nombre del modelo
    db.model('estado')({
      //Campos que lleva el modelo 
      estado: 'Michoacan'
    }).save();


    db.model('estado')({
      estado: 'Ciudad de Mexico' 
    }).save();

}

exports.pruebas = function (req, res) {
    estado_registro();
};