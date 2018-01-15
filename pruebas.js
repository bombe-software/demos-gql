function estado_registro(){
    var Estado = require('mongoose').model('estado');
    var michoacan = new Estado({ estado: 'michoacan' });
    michoacan.save(function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log('Estado registrado');
      }
    });
}


exports.pruebas = function (req, res) {
    estado_registro();
};