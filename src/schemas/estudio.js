const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType,  GraphQLID,  GraphQLInt, GraphQLString } = graphql;

//Models
const Estudio = mongoose.model('estudio');

//Schemas
const GradoAcademicoType = require('./grado_academico');
const LugarEstudioType = require('./lugar_estudio')

const EstudioType = new GraphQLObjectType({
  name:  'EstudioType',
  fields: () => ({
    id: { type: GraphQLID },
    titulo: { type: GraphQLString },
    grado_academico: {
      type: GradoAcademicoType,
      resolve(parentValue) { 
        return Estudio.findById(parentValue).populate('grado_academico')
          .then(estudio => estudio.grado_academico);
      }
    },
    lugar_estudio: {
        type: LugarEstudioType,
        resolve(parentValue) {
          return Estudio.findById(parentValue).populate('lugar_estudio')
            .then(estudio => estudio.lugar_estudio);
        }
      }
  })
});

module.exports = EstudioType;