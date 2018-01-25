const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const propuesta_evento = mongoose.Schema({
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'usuario'
  },
  politico: {
    type: Schema.Types.ObjectId,
    ref: 'politico'
  },
  fecha: Date,
  titulo: String,
  descripcion: String,
  fuente: String
});

mongoose.model('propuesta_evento', propuesta_evento);
