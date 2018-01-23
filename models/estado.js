const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const estado = mongoose.Schema({
    nombre: String,
    funcionarios: [{ type: ObjectId, ref:'politico' }],
    candidatos: [{ type: ObjectId, ref:'politico' }]
});

mongoose.model('estado', estado);