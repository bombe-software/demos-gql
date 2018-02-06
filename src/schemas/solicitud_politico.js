const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLString, GraphQLList } = graphql;

//importar modelos
const SolicitudPolitico = mongoose.model('solicitud_politico');

const SolicitudPoliticoType = new GraphQLObjectType({
    name: 'SolicitudPoliticoType',
    fields: () => ({
        id: { type: GraphQLID },
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
        eventos: {
            type: new GraphQLList(require('./evento')),
            resolve(parentValue) {
                return SolicitudPolitico.findById(parentValue.id)
                    .populate('eventos')
                    .then(politico => politico.eventos);
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
        propuestas: {
            type: new GraphQLList(require('./propuesta')),
            resolve(parentValue) {
                return SolicitudPolitico.findById(parentValue.id)
                    .populate('propuestas')
                    .then(politico => politico.propuestas);
            }
        },
         referencia: { type: GraphQLString },
    })
});

module.exports = SolicitudPoliticoType;