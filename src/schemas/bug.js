const graphql = require('graphql');
const { GraphQLObjectType,  GraphQLString,  GraphQLID } = graphql;

const BugType = new GraphQLObjectType({
  name:  'BugType',
  fields: () => ({
    id: { type: GraphQLID },
    titulo: { type: GraphQLString },
    descripcion: { type: GraphQLString },
    url: { type: GraphQLString }
  })
});

module.exports = BugType;