const graphql = require('graphql');
const { GraphQLObjectType,  GraphQLString,  GraphQLID } = graphql;

const TipoPoliticoType = new GraphQLObjectType({
  name:  'TipoPoliticoType',
  fields: () => ({
    id: { type: GraphQLID },
    tipo: { type: GraphQLString }
  })
});

module.exports = TipoPoliticoType;