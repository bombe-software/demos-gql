const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const partido = mongoose.Schema({
    partido: String
});

mongoose.model('estado', partido);