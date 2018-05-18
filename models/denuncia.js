const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const denuncia = mongoose.Schema({
    titulo: String,
    descripcion: String,
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'usuario'
      },
    ubicacion: String
});

mongoose.model('denuncia', denuncia);