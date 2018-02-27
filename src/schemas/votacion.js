const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType,  GraphQLID,  GraphQLInt, GraphQLString, GraphQLList } = graphql;
const Estudio = mongoose.model('estudio');
//importar mmodelos
const Votacion = mongoose.model('votacion');

//Importar schemas
const PreferenciaType = require('./preferencia');


const VotacionType = new GraphQLObjectType({
  name:  'VotacionType',
  fields: () => ({
    id: {  type: GraphQLID },
    estado: {
        type: require('./estado'),
        resolve(parentValue) {
            return Votacion.findById(parentValue).populate('estado')
                .then(votacion => votacion.estado );
        }
    },
    preferencias: {
        type: new GraphQLList(PreferenciaType),
        resolve(parentValue) {
            return Votacion.findById(parentValue.id)
                .populate('preferencias')
                .then(votacion => votacion.preferencias);
        }
    }
  })
});

module.exports = VotacionType;