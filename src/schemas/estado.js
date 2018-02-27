const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType,  GraphQLString,  GraphQLID, GraphQLList } = graphql;

//Models
const Estado = mongoose.model('estado');

const EstadoType = new GraphQLObjectType({
  name:  'EstadoType',
  fields: () => ({
    id: { type: GraphQLID },
    nombre: { type: GraphQLString },
    funcionarios: {
      type: GraphQLList(require('./politico')),
      resolve(parentValue) {
        return Estado.findById(parentValue).populate('funcionarios')
            .then(estado => estado.funcionarios);
      }
    },
    candidatos: {
      type: GraphQLList(require('./politico')),
      resolve(parentValue) {
        return Estado.findById(parentValue).populate('candidatos')
            .then(estado => estado.candidatos);
      }
    }
  })
});

module.exports = EstadoType;