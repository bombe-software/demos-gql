const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const solicitud_eliminar_politico = mongoose.Schema({
    id_politico: {
        type: Schema.Types.ObjectId,
        ref: 'politico'
    },
    id_usuario: {
        type: Schema.Types.ObjectId,
        ref: 'usuario'
    }
});

mongoose.model('solicitud_eliminar_politico', solicitud_eliminar_politico);