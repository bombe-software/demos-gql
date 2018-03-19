const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType,  GraphQLID,  GraphQLInt, GraphQLString, GraphQLList } = graphql;
const Estudio = mongoose.model('estudio');
//importar mmodelos
const LikeNacional = mongoose.model('like_nacional');
const Estado = mongoose.model('estado');

//Importar schemas
const UsuarioType = require('./usuario');


const LikeNacionalType = new GraphQLObjectType({
  name:  'LikeNacionalType',
  fields: () => ({
    id: {  type: GraphQLID },
    politico: {
        type: require('./politico'),
        resolve(parentValue) {
            return LikeNacional.findById(parentValue).populate('politico')
                .then(preferencia => preferencia.politico );
        }
    },
    estado: {
        type: require('./estado'),
        resolve(parentValue) {
            return LikeNacional.findById(parentValue).populate('estado')
                .then(preferencia => preferencia.estado);
        }
    },
    usuarios: {
        type: new GraphQLList(UsuarioType),
        resolve(parentValue) {
            return LikeNacional.findById(parentValue.id)
                .populate('usuarios')
                .then(preferencia => preferencia.usuarios);
        }
    }
  })
});

module.exports = LikeNacionalType;