const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const estado = mongoose.Schema({
    nombre: String,
    funcionarios: [{ type: Schema.Types.ObjectId, ref:'politico' }],
    candidatos: [{ type: Schema.Types.ObjectId, ref:'politico' }]
});

mongoose.model('estado', estado);