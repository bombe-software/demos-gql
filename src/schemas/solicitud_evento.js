const graphql = require('graphql');
const { GraphQLObjectType,  GraphQLString,  GraphQLID } = graphql;
const mongoose = require('mongoose');
const SolicitudEvento = mongoose.model('solicitud_evento');

const SolicitudEventoType = new GraphQLObjectType({
  name:  'SolicitudEventoType',
  fields: () => ({
    id: { type: GraphQLID },
    fecha: { type: GraphQLString },
    titulo: { type: GraphQLString },
    descripcion: { type: GraphQLString },
    referencia: { type: GraphQLString },
    usuario: {
      type: require('./usuario'),
      resolve(parentValue) {
        return SolicitudEvento.findById(parentValue).populate('usuario')
          .then(evento => evento.usuario );
      }
    },
    politico: {
      type: require('./politico'),
      resolve(parentValue) {
        return SolicitudEvento.findById(parentValue).populate('politico')
          .then(evento => evento.politico );
      }
    }
  })
});

module.exports = SolicitudEventoType;