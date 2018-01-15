const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const estado = mongoose.Schema({
    estado: String
});

mongoose.model('estado', estado);