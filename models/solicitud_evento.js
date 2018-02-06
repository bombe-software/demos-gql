const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const solicitud_evento = mongoose.Schema({
  fecha: Date,
  titulo: String,
  descripcion: String,
  referencia: String,
  usuario: {
      type: Schema.Types.ObjectId,
      ref: 'usuario'
  },
  politico: {
      type: Schema.Types.ObjectId,
      ref: 'politico'
  }
});

mongoose.model('solicitud_evento', solicitud_evento);
