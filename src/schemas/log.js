const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLString } = graphql;

//Models
const Log = mongoose.model('logs');

const LogType = new GraphQLObjectType({
  name: 'LogType',
  fields: () => ({
    id: { type: GraphQLID },
    metodo: { type: GraphQLString },
    ip: { type: GraphQLString },
    url: { type: GraphQLString },
    query: {
      type: GraphQLString,
    },
    usuario: {
      type: require('./usuario'),
      resolve(parentValue) {
        if (parentValue!= null) {
          return Log.findById(parentValue).populate('usuario')
            .then(Log => Log.usuario);
        } else {
          return null
        }
      }
    }
  })
});

module.exports = LogType;

