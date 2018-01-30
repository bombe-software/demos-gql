const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType,  GraphQLID,  GraphQLInt, GraphQLString } = graphql;
const SolicitudPropuesta = mongoose.model('solicitud_propuesta');

const SolicitudPropuestaType = new GraphQLObjectType({
  name:  'SolicitudPropuestaType',
  fields: () => ({
    id: { type: GraphQLID },
    fecha: { type: GraphQLString },
    descripcion: { type: GraphQLString },
    titulo: { type: GraphQLString },
    tipo_propuesta: {
      type: require('./tipo_propuesta'),
      resolve(parentValue) {
        return SolicitudPropuesta.findById(parentValue).populate('tipo_propuesta')
          .then(propuesta => propuesta.tipo_propuesta );
      }
    },
    referencia: { type: GraphQLString },
    usuario: {
      type: require('./usuario'),
      resolve(parentValue) {
        return SolicitudPropuesta.findById(parentValue).populate('usuario')
          .then(propuesta => propuesta.usuario );
      }
    },
    politico: {
      type: require('./politico'),
      resolve(parentValue) {
        return SolicitudPropuesta.findById(parentValue).populate('politico')
          .then(propuesta => propuesta.politico );
      }
    }
  })
});

module.exports = SolicitudPropuestaType;