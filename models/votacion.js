const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const votacion = mongoose.Schema({
    lugar: {
        type: Schema.Types.ObjectId,
        ref: 'estado'
    },
    preferencias: [{
        type: Schema.Types.ObjectId,
        ref: 'preferencia'
    }]
});

mongoose.model('votacion', votacion);