const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLString, GraphQLList } = graphql;

//importar modelos
const Politico = mongoose.model('politico');

//Importar schemas
const EventoType = require('./evento');
const EstudioType = require('./estudio');
const PropuestaType = require('./propuesta');
const PartidoType = require('./partido');
const EstadoType = require('./estado');

const PoliticoType = new GraphQLObjectType({
    name: 'PoliticoType',
    fields: () => ({
        id: { type: GraphQLID },
        nombre: { type: GraphQLString },
        cargo: { type: GraphQLString },
        estado: {
            type: EstadoType,
            resolve(parentValue) {
                return Politico.findById(parentValue.id).populate('estado')
                    .then(politico => politico.estado);
            }
        },
        partido: {
            type: PartidoType,
            resolve(parentValue) {
                return Politico.findById(parentValue.id).populate('partido')
                    .then(politico => politico.partido);
            }
        },
        eventos: {
            type: new GraphQLList(EventoType),
            resolve(parentValue) {
                return Politico.findById(parentValue.id)
                    .populate('eventos')
                    .then(politico => politico.eventos);
            }
        },
        estudios: {
            type: new GraphQLList(EstudioType),
            resolve(parentValue) { 
                return Politico.findById(parentValue.id).populate('estudios')
                    .then(politico => politico.estudios); 
            }
        },
        propuestas: {
            type: new GraphQLList(PropuestaType),
            resolve(parentValue) {
                return Politico.findById(parentValue.id)
                    .populate('propuestas')
                    .then(politico => politico.propuestas);
            }
        }
    })
});

module.exports = PoliticoType;