const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const politico = mongoose.Schema({
    nombre: String,
    partido: {
        type: Schema.Types.ObjectId,
        ref: 'partido'
    },
    tipo_politico: {
        type: Schema.Types.ObjectId,
        ref: 'tipo_politico'
    },
    estado: {
        type: Schema.Types.ObjectId,
        ref: 'estado'
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
    }]
});
mongoose.model('politico', politico);