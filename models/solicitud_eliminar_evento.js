const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const solicitud_eliminar_evento = mongoose.Schema({
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

mongoose.model('solicitud_eliminar_evento', solicitud_eliminar_evento);