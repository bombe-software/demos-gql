const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLString, GraphQLList } = graphql;

//importar modelos
const SolicitudEliminarPolitico = mongoose.model('solicitud_eliminar_politico');

const EliminarPoliticoType = new GraphQLObjectType({
  name: 'EliminarPoliticoType',
  fields: () => ({
    id: { type: GraphQLID },
    politico: {
      type: require('./politico'),
      resolve(parentValue) {
        return SolicitudEliminarPolitico.findById(parentValue).populate('id_politico')
          .then(politico => politico.id_politico);
      }
    },
    usuario: {
      type: require('./usuario'),
      resolve(parentValue) {
        return SolicitudEliminarPolitico.findById(parentValue).populate('id_usuario')
          .then(politico => politico.id_usuario);
      }
    },
  })
});

module.exports = EliminarPoliticoType;