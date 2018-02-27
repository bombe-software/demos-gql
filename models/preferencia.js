const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const preferencia = mongoose.Schema({
    politico: {
        type: Schema.Types.ObjectId,
        ref: 'politico'
    },
    usuarios: [{
        type: Schema.Types.ObjectId,
        ref: 'usuario'
    }]
});

mongoose.model('preferencia', preferencia);