const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const estudio = mongoose.Schema({
    titulo: String,
    grado_academico: {
        type: Schema.Types.ObjectId,
        ref: 'grado_academico'
    },
    lugar_estudio: {
        type: Schema.Types.ObjectId,
        ref: 'lugar_estudio'
    }
});

mongoose.model('estudio', estudio);