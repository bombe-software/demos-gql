const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const like_nacional = mongoose.Schema({
    politico: {
        type: Schema.Types.ObjectId,
        ref: 'politico'
    },
    estado:{
        type: Schema.Types.ObjectId,
        ref: 'estado'
    },
    usuarios: [{
        type: Schema.Types.ObjectId,
        ref: 'usuario'
    }]
});

mongoose.model('like_nacional', like_nacional);