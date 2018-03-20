const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLString, GraphQLList } = graphql;

//importar modelos
const SolicitudEliminarEvento = mongoose.model('solicitud_eliminar_evento');

const EliminarEventoType = new GraphQLObjectType({
    name: 'EliminarEventoType',
    fields: () => ({
        id: { type: GraphQLID },
        id_evento: {
          type: require('./evento'),
          resolve(parentValue) {
            return SolicitudEliminarEvento.findById(parentValue).populate('id_evento')
              .then(evento => evento.id_evento);
          }
        },
       id_usuario: {
          type: require('./usuario'),
          resolve(parentValue) {
            return SolicitudEliminarEvento.findById(parentValue).populate('id_usuario')
              .then(evento => evento.id_usuario );
          }
        },
    })
});

module.exports = EliminarEventoType;