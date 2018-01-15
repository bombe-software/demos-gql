const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tipo_propuesta = mongoose.Schema({
    tipo: String
});

mongoose.model('tipo_propuesta', tipo_propuesta);