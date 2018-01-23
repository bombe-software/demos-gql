const graphql = require('graphql');
const mongoose = require('mongoose');
const { GraphQLObjectType,  GraphQLString,  GraphQLID } = graphql;

//Models
const Partido = mongoose.model('partido');

//Schemas
const PoliticoType = require('./politico');

const PartidoType = new GraphQLObjectType({
  name:  'PartidoType',
  fields: () => ({
    id: { type: GraphQLID },
    nombre: { type: GraphQLString },
    funcionarios: {
      type: GraphQLList(PoliticoType),
      resolve(parentValue) {
        return Partido.findById(parentValue).populate('politico')
            .then(partido => partido.funcionarios);
      }
    },
    integrantes: {
      type: GraphQLList(PoliticoType),
      resolve(parentValue) {
        return Partido.findById(parentValue).populate('politico')
            .then(partido => partido.integrantes);
      }
    }
  })
});

module.exports = PartidoType;