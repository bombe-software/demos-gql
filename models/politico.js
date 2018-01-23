const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const politico = mongoose.Schema({
    nombre: String,
    cargo: [String],
    eventos: [{
        type: Schema.Types.ObjectId,
        ref: 'evento'
    }],
    estudios: [{
        type: Schema.Types.ObjectId,
        ref: 'estudio'
    }],//Dr, Ma, L, NA
    propuestas: [{
        type: Schema.Types.ObjectId,
        ref: 'propuesta'
    }]
});
/*
politico.statics.RegistrarPolitico = function(idEstudio, idTipoPolitico, idEstado, idPartido, nombre) {
  const estado = mongoose.model('estado');
  const partido = mongoose.model('partido');
  const tipo_politico = mongoose.model('tipo_politico');
  const estudio = mongoose.model('estudio');

  return this.findById(id)
    .then(song => {
      const lyric = new Lyric({ content, song })
      song.lyrics.push(lyric)
      return Promise.all([lyric.save(), song.save()])
        .then(([lyric, song]) => song);
    });
}
*/
mongoose.model('politico', politico);