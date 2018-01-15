const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tipo_politico = mongoose.Schema({
    tipo: String
});

mongoose.model('tipo_politico', tipo_politico);