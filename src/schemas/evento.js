const graphql = require('graphql');
const { GraphQLObjectType,  GraphQLString,  GraphQLID } = graphql;
const mongoose = require('mongoose');
const Evento = mongoose.model('evento');

const EventoType = new GraphQLObjectType({
  name:  'EventoType',
  fields: () => ({
    id: { type: GraphQLID },
    fecha: { type: GraphQLString },
    titulo: { type: GraphQLString },
    descripcion: { type: GraphQLString },
    referencia: { type: GraphQLString },
    usuario: {
      type: require('./usuario'),
      resolve(parentValue) {
        return Evento.findById(parentValue).populate('usuario')
          .then(evento => evento.usuario );
      }
    },
    politico: {
      type: require('./politico'),
      resolve(parentValue) {
        return Eveneto.findById(parentValue).populate('politico')
          .then(evento => evento.politico );
      }
    }
  })
});

module.exports = EventoType;