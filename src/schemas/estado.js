const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType,  GraphQLString,  GraphQLID, GraphQLList } = graphql;

//Models
const Estado = mongoose.model('estado');

//Schemas
const PoliticoType = require('./politico');

const EstadoType = new GraphQLObjectType({
  name:  'EstadoType',
  fields: () => ({
    id: { type: GraphQLID },
    nombre: { type: GraphQLString },
    funcionarios: {
      type: GraphQLList(PoliticoType),
      resolve(parentValue) {
        return Estado.findById(parentValue).populate('politico')
            .then(estado => estado.funcionarios);
      }
    },
    candidatos: {
      type: GraphQLList(PoliticoType),
      resolve(parentValue) {
        return Estado.findById(parentValue).populate('politico')
            .then(estado => estado.candidatos);
      }
    }
  })
});

module.exports = EstadoType;