const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType,  GraphQLID,  GraphQLInt, GraphQLString } = graphql;
const Usuario = mongoose.model('usuario');

const UsuarioType = new GraphQLObjectType({
  name:  'UsuarioType',
  fields: () => ({
    id: { type: GraphQLID },
    nombre: { type: GraphQLString },
    email: { type: GraphQLString },
    tipo_usuario: {
      type: require('./tipo_usuario'),
      resolve(parentValue) {
        return Usuario.findById(parentValue.id).populate('tipo_usuario')
          .then(usuario => usuario.tipo_usuario);
      }
    },
    password: { type: GraphQLString },
    curp: { type: GraphQLString },
    avatar: { type: GraphQLString },
    puntos: { type: GraphQLInt },
    localidad: { type: GraphQLString },
    fecha_registro: { type: GraphQLString }
  })
});

module.exports = UsuarioType;
