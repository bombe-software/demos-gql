const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType,  GraphQLID,  GraphQLInt, GraphQLString } = graphql;
const Propuesta = mongoose.model('propuesta');

const PropuestaType = new GraphQLObjectType({
  name:  'PropuestaType',
  fields: () => ({
    id: { type: GraphQLID },
    fecha: { type: GraphQLString },
    descripcion: { type: GraphQLString },
    tipo_propuesta: {
      type: require('./tipo_propuesta'),
      resolve(parentValue) {
        return Propuesta.findById(parentValue).populate('tipo_propuesta')
          .then(propuesta => propuesta.tipo_propuesta );
      }
    }
  })
});

module.exports = PropuestaType;