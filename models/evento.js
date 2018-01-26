const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const evento = mongoose.Schema({
    fecha: Date,
    titulo: String,
    descripcion: String,
    fuente: String
});

mongoose.model('evento', evento);