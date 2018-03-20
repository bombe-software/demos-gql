const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const solicitud_modificar_propuesta = mongoose.Schema({
  id_propuesta: {
    type: Schema.Types.ObjectId,
    ref: 'propuesta'
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'usuario'
  },
  politico: {
    type: Schema.Types.ObjectId,
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

mongoose.model('solicitud_modificar_propuesta', solicitud_modificar_propuesta);