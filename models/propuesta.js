const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const propuesta = mongoose.Schema({
    fecha: Date,
    tipo_propuesta: {
        type: Schema.Types.ObjectId,
        ref: 'tipo_propuesta'
    },
    descripcion: String
});

mongoose.model('propuesta', propuesta);