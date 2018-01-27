const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const solicitud_evento = mongoose.Schema({
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

mongoose.model('solicitud_evento', solicitud_evento);
