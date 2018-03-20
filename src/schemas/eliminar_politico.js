const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLString, GraphQLList } = graphql;

//importar modelos
const SolicitudEliminarPolitico = mongoose.model('solicitud_eliminar_politico');

const EliminarPoliticoType = new GraphQLObjectType({
    name: 'EliminarPoliticoType',
    fields: () => ({
        id: { type: GraphQLID },
        id_politico: {
          type: require('./politico'),
          resolve(parentValue) {
            return SolicitudEliminarPolitico.findById(parentValue).populate('politico')
              .then(politico => politico.politico);
          }
        },
       id_usuario: {
          type: require('./usuario'),
          resolve(parentValue) {
            return SolicitudEliminarPolitico.findById(parentValue).populate('usuario')
              .then(politico => politico.usuario );
          }
        },
    })
});

module.exports = EliminarPoliticoType;