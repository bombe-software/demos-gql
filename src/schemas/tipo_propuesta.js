const graphql = require('graphql');
const { GraphQLObjectType,  GraphQLString,  GraphQLID } = graphql;

const TipoPropuestaType = new GraphQLObjectType({
  name:  'TipoPropuestaType',
  fields: () => ({
    id: { type: GraphQLID },
    tipo: { type: GraphQLString }
  })
});

module.exports = TipoPropuestaType;