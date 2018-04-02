const graphql = require('graphql');
const mongoose = require('mongoose');
const { GraphQLObjectType,  GraphQLString,  GraphQLID, GraphQLList } = graphql;

//Models
const Partido = mongoose.model('partido');

const PartidoType = new GraphQLObjectType({
  name:  'PartidoType',
  fields: () => ({
    id: { type: GraphQLID },
    nombre: { type: GraphQLString },
    color: { type: GraphQLString },
    integrantes: {
      type: GraphQLList(require('./politico')),
      resolve(parentValue) {
        return Partido.findById(parentValue).populate('integrantes')
            .then(partido => partido.integrantes);
      }
    }
  })
});

module.exports = PartidoType;