const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLString, GraphQLList } = graphql;
const Propuesta = mongoose.model('propuesta');

//importar modelos
const SolicitudModificarPropuesta = mongoose.model('solicitud_modificar_propuesta');

const ModificarPropuestaType = new GraphQLObjectType({
    name: 'ModificarPropuestaType',
    fields: () => ({
        id: { type: GraphQLID },
        propuesta: {
          type: require('./propuesta'),
          resolve(parentValue) {
            return SolicitudModificarPropuesta.findById(parentValue).populate('id_propuesta')
              .then(propuesta => propuesta.id_propuesta );
          }
        },
        fecha: { type: GraphQLString },
        descripcion: { type: GraphQLString },
        titulo: { type: GraphQLString },
        tipo_propuesta: {
          type: require('./tipo_propuesta'),
          resolve(parentValue) {
            return SolicitudModificarPropuesta.findById(parentValue).populate('tipo_propuesta')
              .then(propuesta => propuesta.tipo_propuesta );
          }
        },
        usuario: {
          type: require('./usuario'),
          resolve(parentValue) {
            return SolicitudModificarPropuesta.findById(parentValue).populate('usuario')
              .then(propuesta => propuesta.usuario );
          }
        },
        referencia: { type: GraphQLString },
        politico: {
          type: require('./politico'),
          resolve(parentValue) {
            return SolicitudModificarPropuesta.findById(parentValue).populate('politico')
              .then(propuesta => propuesta.politico );
          }
        },
        likes: {
          type: new GraphQLList(require('./usuario')),
          resolve(parentValue) {
              return SolicitudModificarPropuesta.findById(parentValue.id)
              .populate('likes')
              .then(propuesta => propuesta.likes );
          }
      }
      })
});

module.exports = ModificarPropuestaType;