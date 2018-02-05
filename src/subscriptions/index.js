//Configuracion de GraphQL
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString } = graphql;

//Tipos de chemas
const UsuarioType = require('./../schemas/usuario');

const { signup } = require('./../mutations/signup');

const RootSubscription = new GraphQLObjectType({
  name: 'Suscripciones',
  fields: {
    lol: {
      type: UsuarioType,
      args: {
        nombre: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        curp: { type: GraphQLString },
        avatar: { type: GraphQLString },
        localidad: { type: GraphQLString }
      },
      resolve(parentValue, args, req) {
        return signup({ args, req });
      }
    }
}
});

module.exports = RootSubscription;