const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const solicitud_eliminar_politico = mongoose.Schema({
    nombre: String,
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'usuario'
    },
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
    eventos: [{
        type: Schema.Types.ObjectId,
        ref: 'evento'
    }],
    estudios: [{
        type: Schema.Types.ObjectId,
        ref: 'estudio'
    }],
    propuestas: [{
        type: Schema.Types.ObjectId,
        ref: 'propuesta'
    }],
    referencia: String
});

mongoose.model('solicitud_eliminar_politico', solicitud_eliminar_politico);