const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;
const mongoose = require('mongoose');


const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: null 
});

module.exports = mutation;