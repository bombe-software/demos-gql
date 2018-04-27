const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bug = mongoose.Schema({
    titulo: String,
    descripcion: String,
    url: String
});

mongoose.model('bug', bug);