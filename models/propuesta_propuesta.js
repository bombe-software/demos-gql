const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const propuesta_propuesta = mongoose.Schema({
  usuario: {
    type: mongoose.Types.ObjectId,
    ref: 'usuario'
  },
  politico: {
    type: mongoose.Types.ObjectId,
    ref: 'politico'
  },
  fecha: Date,
  descripcion: String,
  titulo: String,
  tipo_propuesta: {
      type: Schema.Types.ObjectId,
      ref: 'tipo_propuesta'
  },
  referencia: String
});

mongoose.model('propuesta_propuesta', propuesta_propuesta);
