const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const solicitud_eliminar_evento = mongoose.Schema({
    id_evento: {
        type: Schema.Types.ObjectId,
        ref: 'evento'
    },
    id_usuario: {
        type: Schema.Types.ObjectId,
        ref: 'usuario'
    }
});

mongoose.model('solicitud_eliminar_evento', solicitud_eliminar_evento);