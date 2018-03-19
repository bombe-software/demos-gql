const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType,  GraphQLID,  GraphQLInt, GraphQLString, GraphQLList } = graphql;
const Estudio = mongoose.model('estudio');
//importar mmodelos
const Gabinete = mongoose.model('gabinete');
const Estado = mongoose.model('estado');

//Importar schemas
const UsuarioType = require('./usuario');


const GabineteType = new GraphQLObjectType({
  name:  'GabineteType',
  fields: () => ({
    id: {  type: GraphQLID },
    politico: {
        type: require('./politico'),
        resolve(parentValue) {
            return Gabinete.findById(parentValue).populate('politico')
                .then(preferencia => preferencia.politico );
        }
    },
    politicos_gabinete: {
        type: new GraphQLList(require('./politico')),
        resolve(parentValue) {
            return Gabinete.findById(parentValue.id)
                .populate('politicos_gabinete')
                .then(preferencia => preferencia.politicos_gabinete);
        }
    }
  })
});

module.exports = GabineteType;