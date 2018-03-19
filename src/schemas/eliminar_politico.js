const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLString, GraphQLList } = graphql;

//importar modelos
const SolicitudEliminarPolitico = mongoose.model('solicitud_eliminar_politico');

const EliminarPoliticoType = new GraphQLObjectType({
    name: 'EliminarPoliticoType',
    fields: () => ({
        id: { type: GraphQLID },
        id_politico: { type: GraphQLID },
        id_usuario: { type: GraphQLID }
    })
});

module.exports = EliminarPoliticoType;