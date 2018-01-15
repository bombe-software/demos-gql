const graphql = require('graphql');
const { GraphQLObjectType,  GraphQLString,  GraphQLID } = graphql;

const EstadoType = new GraphQLObjectType({
  name:  'EstadoType',
  fields: () => ({
    id: { type: GraphQLID },
    estado: { type: GraphQLString }
  })
});

module.exports = EstadoType;