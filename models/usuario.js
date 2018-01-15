const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuario = mongoose.Schema({
    nombre: String,			
    email: String,		
    id_tipo_usuario: {
        type: Schema.Types.ObjectId,
        ref: 'tipo_usuario'
    },
    contrasena: String,			
    curp: String,			
    avatar: String,		
    puntos: Number,		
    localidad: String,			
    fecha_registro: { type: Date, default: Date.now }
});

mongoose.model('usuario', usuario);

