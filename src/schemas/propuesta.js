const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType,  GraphQLID, GraphQLList,  GraphQLInt, GraphQLString } = graphql;
const Propuesta = mongoose.model('propuesta');


const PropuestaType = new GraphQLObjectType({
  name:  'PropuestaType',
  fields: () => ({
    id: { type: GraphQLID },
    fecha: { type: GraphQLString },
    descripcion: { type: GraphQLString },
    titulo: { type: GraphQLString },
    tipo_propuesta: {
      type: require('./tipo_propuesta'),
      resolve(parentValue) {
        return Propuesta.findById(parentValue).populate('tipo_propuesta')
          .then(propuesta => propuesta.tipo_propuesta );
      }
    },
    usuario: {
      type: require('./usuario'),
      resolve(parentValue) {
        return Propuesta.findById(parentValue).populate('usuario')
          .then(propuesta => propuesta.usuario );
      }
    },
    referencia: { type: GraphQLString },
    politico: {
      type: require('./politico'),
      resolve(parentValue) {
        return Propuesta.findById(parentValue).populate('politico')
          .then(propuesta => propuesta.politico );
      }
    },
    likes: {
      type: new GraphQLList(require('./usuario')),
      resolve(parentValue) {
          return Propuesta.findById(parentValue.id)
          .populate('usuario')
          .then(propuesta => propuesta.likes );
      }
  }
  })
});

module.exports = PropuestaType;