const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const solicitud_eliminar_propuesta = mongoose.Schema({
  id_propuesta: {
    type: Schema.Types.ObjectId,
    ref: 'propuesta'
  },
  id_usuario:{
    type: Schema.Types.ObjectId,
    ref: 'usuario'
  }
});

mongoose.model('solicitud_eliminar_propuesta', solicitud_eliminar_propuesta);