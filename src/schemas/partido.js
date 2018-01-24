const graphql = require('graphql');
const mongoose = require('mongoose');
const { GraphQLObjectType,  GraphQLString,  GraphQLID, GraphQLList } = graphql;

//Models
const Partido = mongoose.model('partido');

//Schemas
const PoliticoType = require('./politico');

const PartidoType = new GraphQLObjectType({
  name:  'PartidoType',
  fields: () => ({
    id: { type: GraphQLID },
    nombre: { type: GraphQLString },
    integrantes: {
      type: GraphQLList(PoliticoType),
      resolve(parentValue) {
        return Partido.findById(parentValue).populate('integrantes')
            .then(partido => partido.integrantes);
      }
    }
  })
});

module.exports = PartidoType;