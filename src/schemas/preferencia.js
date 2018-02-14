const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType,  GraphQLID,  GraphQLInt, GraphQLString, GraphQLList } = graphql;
const Estudio = mongoose.model('estudio');
//importar mmodelos
const Preferencia = mongoose.model('preferencia');

//Importar schemas
const UsuarioType = require('./usuario');


const PreferenciaType = new GraphQLObjectType({
  name:  'PreferenciaType',
  fields: () => ({
    id: {  type: GraphQLID },
    politico: {
        type: require('./politico'),
        resolve(parentValue) {
            return Preferencia.findById(parentValue).populate('politico')
                .then(preferencia => preferencia.politico );
        }
    },
    usuarios: {
        type: new GraphQLList(UsuarioType),
        resolve(parentValue) {
            return Preferencia.findById(parentValue.id)
                .populate('usuarios')
                .then(preferencia => preferencia.usuarios);
        }
    }
  })
});

module.exports = PreferenciaType;