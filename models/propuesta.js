const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const propuesta = mongoose.Schema({
    fecha: Date,
    descripcion: String,
    titulo: String,
    tipo_propuesta: {
        type: Schema.Types.ObjectId,
        ref: 'tipo_propuesta'
    },
    referencia: String,
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'usuario'
    },
    politico: {
        type: Schema.Types.ObjectId,
        ref: 'politico'
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'usuario'
    }]
});

mongoose.model('propuesta', propuesta);
