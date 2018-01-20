//Configuracion de GraphQL
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;

//Tipos de chemas
const UsuarioType = require('./../schemas/usuario');
const PoliticoType = require('./../schemas/politico');
const PartidoType = require('../schemas/partido');
const TipoPoliticoType = require('../schemas/tipo_politico');


//Funciones de la mutacion
const { login } = require('./login');
const { signup } = require('./signup');
const { addpolitico } = require('./addPolitico');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
      signup: {
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
      },
      logout: {
        type: UsuarioType,
        resolve(parentValue, args, req) {
          const { user } = req;
          req.logout();
          return user;
        }
      },
      login: {
        type: UsuarioType,
        args: {
          email: { type: GraphQLString },
          password: { type: GraphQLString }
        },
        resolve(parentValue, { email, password }, req) {
          return login({ email, password, req });
        }
      },
      addPolitico: {
        type: PoliticoType,
        args: {
            nombre: { type: GraphQLString },
            partido: { type: GraphQLID},
            tipo_politico: { type: GraphQLID },
            estado: { type: GraphQLID },
        },
        resolve(parentValue, args, req){
          return addpolitico({ args, req });
        }
      }
  }
});

module.exports = mutation;
