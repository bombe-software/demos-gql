const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLString, GraphQLList } = graphql;

//importar modelos
const SolicitudModificarPolitico = mongoose.model('solicitud_modificar_politico');

const ModificarPoliticoType = new GraphQLObjectType({
    name: 'ModificarPoliticoType',
    fields: () => ({
        id: { type: GraphQLID },
        id_politico: { type: GraphQLID },
        nombre: { type: GraphQLString },
        cargo: { type: GraphQLString },
        usuario: {
            type: require('./usuario'),
            resolve(parentValue) {
                return SolicitudPolitico.findById(parentValue)
                .populate('usuario')
                .then(politico => politico.usuario);
            }
        },
        estado: {
            type: require('./estado'),
            resolve(parentValue) {
                return SolicitudPolitico.findById(parentValue).populate('estado')
                    .then(politico => politico.estado);
            }
        },
        partido: {
            type: require('./partido'),
            resolve(parentValue) {
                return SolicitudPolitico.findById(parentValue).populate('partido')
                    .then(politico => politico.partido);
            }
        },
        estudios: {
            type: new GraphQLList(require('./estudio')),
            resolve(parentValue) {
                return SolicitudPolitico.findById(parentValue.id)
                    .populate('estudios')
                    .then(politico => politico.estudios);
            }
        },
         referencia: { type: GraphQLString },
    })
});

module.exports = ModificarPoliticoType;