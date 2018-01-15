const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType,  GraphQLID,  GraphQLInt, GraphQLString } = graphql;
const Estudio = mongoose.model('estudio');

const EstudioType = new GraphQLObjectType({
  name:  'EstudioType',
  fields: () => ({
    id: { type: GraphQLID },
    tiulo: { type: GraphQLString },
    grado_academico: {
      type: require('./grado_academico'),
      resolve(parentValue) {
        return Estudio.findById(parentValue).populate('grado_academico')
          .then(estudio => estudio.grado_academico);
      }
    },
    lugar_estudio: {
        type: require('./lugar_estudio'),
        resolve(parentValue) {
          return Estudio.findById(parentValue).populate('lugar_estudio')
            .then(estudio => estudio.lugar_estudio);
        }
      }
  })
});

module.exports = EstudioType;