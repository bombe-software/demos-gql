const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const evento = mongoose.Schema({
    fecha: String,
    titulo: String,
    descripcion: String
});

mongoose.model('evento', evento);