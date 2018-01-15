const graphql = require('graphql');
const { GraphQLObjectType,  GraphQLString,  GraphQLID } = graphql;

const EventoType = new GraphQLObjectType({
  name:  'EventoType',
  fields: () => ({
    id: { type: GraphQLID },
    fecha: { type: GraphQLString },
    titulo: { type: GraphQLString },
    descripcion: { type: GraphQLString }
  })
});

module.exports = EventoType;