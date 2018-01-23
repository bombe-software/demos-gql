const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const partido = mongoose.Schema({
    nombre: String,
    integrantes: [{ type: ObjectId, ref: 'politico'}],
    funcionarios: [{ type: ObjectId, ref: 'politico' }]
});

mongoose.model('partido', partido);