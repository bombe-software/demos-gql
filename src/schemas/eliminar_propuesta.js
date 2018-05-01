const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLString, GraphQLList } = graphql;

//importar modelos
const SolicitudEliminarPropuesta = mongoose.model('solicitud_eliminar_propuesta');

const EliminarPropuestaType = new GraphQLObjectType({
  name: 'EliminarPropuestaType',
  fields: () => ({
    id: { type: GraphQLID },
    propuesta: {
      type: require('./propuesta'),
      resolve(parentValue) {
        return SolicitudEliminarPropuesta.findById(parentValue).populate('id_propuesta')
          .then(propuesta => propuesta.id_propuesta);
      }
    },
    usuario: {
      type: require('./usuario'),
      resolve(parentValue) {
        return SolicitudEliminarPropuesta.findById(parentValue).populate('id_usuario')
          .then(propuesta => propuesta.id_usuario);
      }
    },
  })
});

module.exports = EliminarPropuestaType;