const _ = require('lodash');
const graphql = require('graphql');
const { GraphQLSchema } = graphql;

const RootQuery = require('./schemas');
const RootMutation = require('./mutations');
const RootSubscription = require('./subscriptions');

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
  subscription: RootSubscription
});