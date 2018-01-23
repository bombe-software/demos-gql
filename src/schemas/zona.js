const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType,  GraphQLID,  GraphQLInt, GraphQLString, GraphQLList } = graphql;
const Estudio = mongoose.model('estudio');
//importar mmodelos
const Zona = mongoose.model('zona');

//Importar schemas
const EstadoType = require('./estado');


const ZonaType = new GraphQLObjectType({
  name:  'ZonaType',
  fields: () => ({
    zona: { type: GraphQLString },
    estados: {
        type: new GraphQLList(EstadoType),
        resolve(parentValue) {
          console.log(parentValue);
            return Zona.findById(parentValue)
                .populate('estados')
                .then(zona => zona.estados);
        }
    }
  })
});

module.exports = ZonaType;