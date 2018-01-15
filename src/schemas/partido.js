const graphql = require('graphql');
const { GraphQLObjectType,  GraphQLString,  GraphQLID } = graphql;

const PartidoType = new GraphQLObjectType({
  name:  'PartidoType',
  fields: () => ({
    id: { type: GraphQLID },
    partido: { type: GraphQLString }
  })
});

module.exports = PartidoType;