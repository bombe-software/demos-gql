const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const solicitud_modificar_politico = mongoose.Schema({
  id_politico: {
    type: Schema.Types.ObjectId,
    ref: 'politico' 
  },
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
  }],
  referencia: {
        type: String
    }
});

mongoose.model('solicitud_modificar_politico', solicitud_modificar_politico);