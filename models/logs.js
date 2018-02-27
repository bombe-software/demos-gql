const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const logs = mongoose.Schema({
    metodo: String, 
    ip: String,
    url: String,
    query: String,
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'usuario'
    }
});

mongoose.model('logs', logs);