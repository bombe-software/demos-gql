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
    referencia: String
});

mongoose.model('propuesta', propuesta);
