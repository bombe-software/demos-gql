const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const solicitud_modificar_evento = mongoose.Schema({
    id_evento: {
        type: Schema.Types.ObjectId,
        ref: 'evento'
      },
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

mongoose.model('solicitud_modificar_evento', solicitud_modificar_evento);