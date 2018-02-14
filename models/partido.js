const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const partido = mongoose.Schema({
    nombre: String,
    integrantes: [{ type: Schema.Types.ObjectId, ref: 'politico'}]
});

mongoose.model('partido', partido);