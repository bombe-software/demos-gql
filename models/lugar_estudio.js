const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lugar_estudio = mongoose.Schema({
    lugar: String
});

mongoose.model('lugar_estudio', lugar_estudio);