const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const evento = mongoose.Schema({
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

mongoose.model('evento', evento);
