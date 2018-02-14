const graphql = require('graphql');
const { GraphQLObjectType,  GraphQLString,  GraphQLID } = graphql;

const LugarEstudioType = new GraphQLObjectType({
  name:  'LugarEstudioType',
  fields: () => ({
    id: { type: GraphQLID },
    nombre: { type: GraphQLString }
  })
});

module.exports = LugarEstudioType;