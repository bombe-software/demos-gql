const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lugar_estudio = mongoose.Schema({
    nombre: String
});

mongoose.model('lugar_estudio', lugar_estudio);