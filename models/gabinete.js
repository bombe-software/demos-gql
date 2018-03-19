const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gabinete = mongoose.Schema({
    politico_nacional: {
        type: Schema.Types.ObjectId,
        ref: 'politico'
    },
    politicos_gabinete: [{
        type: Schema.Types.ObjectId,
        ref: 'politico'
    }]
});

mongoose.model('gabinete', gabinete);