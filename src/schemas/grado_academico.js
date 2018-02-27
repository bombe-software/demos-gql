const graphql = require('graphql');
const { GraphQLObjectType,  GraphQLString,  GraphQLID } = graphql;

const GradoAcademicoType = new GraphQLObjectType({
  name:  'GradoAcademicoType',
  fields: () => ({
    id: { type: GraphQLID },
    grado: { type: GraphQLString }
  })
});

module.exports = GradoAcademicoType;