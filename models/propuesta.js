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
    fuente: String
});

mongoose.model('propuesta', propuesta);