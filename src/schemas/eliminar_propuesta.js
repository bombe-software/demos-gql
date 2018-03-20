const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLString, GraphQLList } = graphql;

//importar modelos
const SolicitudEliminarPropuesta = mongoose.model('solicitud_eliminar_politico');

const EliminarPropuestaType = new GraphQLObjectType({
    name: 'EliminarPropuestaType',
    fields: () => ({
        id: { type: GraphQLID },
        id_politico: {
          type: require('./politico'),
          resolve(parentValue) {
            return SolicitudEliminarPropuesta.findById(parentValue).populate('id_politico')
              .then(politico => politico.id_politico);
          }
        },
       id_usuario: {
          type: require('./usuario'),
          resolve(parentValue) {
            return SolicitudEliminarPropuesta.findById(parentValue).populate('id_usuario')
              .then(politico => politico.id_usuario );
          }
        },
    })
});

module.exports = EliminarPropuestaType;