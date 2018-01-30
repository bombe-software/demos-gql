const graphql = require('graphql');
const { GraphQLObjectType,  GraphQLString,  GraphQLID } = graphql;

const SolicitudEventoType = new GraphQLObjectType({
  name:  'SolicitudEventoType',
  fields: () => ({
    id: { type: GraphQLID },
    fecha: { type: GraphQLString },
    titulo: { type: GraphQLString },
    descripcion: { type: GraphQLString }
  })
});

module.exports = SolicitudEventoType;