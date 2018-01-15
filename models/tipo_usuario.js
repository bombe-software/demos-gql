const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tipo_usuario = mongoose.Schema({
    tipo: String
});

mongoose.model('tipo_usuario', tipo_usuario);