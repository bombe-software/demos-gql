const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const propuesta_politico = mongoose.Schema({
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'usuario'
  },
  nombre: String,
  cargo: {
      type: String,
      enum: ['Candidato', 'Funcionario']
  },
  estado: {
      type: Schema.Types.ObjectId,
      ref: 'estado'
  },
  partido: {
      type: Schema.Types.ObjectId,
      ref: 'partido'
  },
  estudios: [{
      type: Schema.Types.ObjectId,
      ref: 'estudio'
  }]
});

mongoose.model('propuesta_politico', propuesta_politico);
