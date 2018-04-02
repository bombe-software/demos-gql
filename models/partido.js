const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const partido = mongoose.Schema({
    nombre: String,
    integrantes: [{ type: Schema.Types.ObjectId, ref: 'politico'}],
    color: String
});

mongoose.model('partido', partido);