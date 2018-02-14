const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const zona = mongoose.Schema({
    nombre: String,
    estados: [{
        type: Schema.Types.ObjectId,
        ref: 'estado'
    }]
});

mongoose.model('zona', zona);