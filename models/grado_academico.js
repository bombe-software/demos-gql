const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const grado_academico = mongoose.Schema({
    grado: String
});

mongoose.model('grado_academico', grado_academico);