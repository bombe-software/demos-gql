const graphql = require('graphql');
const { GraphQLObjectType,  GraphQLString,  GraphQLID } = graphql;

const TipoUsuarioType = new GraphQLObjectType({
  name:  'TipoUsuarioType',
  fields: () => ({
    id: { type: GraphQLID },
    tipo: { type: GraphQLString }
  })
});

module.exports = TipoUsuarioType;