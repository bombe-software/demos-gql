//Configuracion de GraphQL
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;

//Tipos de chemas
const UsuarioType = require('./../schemas/usuario');
const PoliticoType = require('./../schemas/politico');
const PartidoType = require('../schemas/partido');
const VotacionType = require('../schemas/votacion');
const EventoType = require('../schemas/evento');


//Funciones de la mutacion
const { voto_estado } = require('./voto_estado');
const { addevento } = require('./addEvento');
const { login } = require('./login');
const { signup } = require('./signup');
const { addPolitico } = require('./addPolitico');

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
            cargo: { type: GraphQLString },
            partido: { type: GraphQLID},
            estado: { type: GraphQLID },
            estudios: {type: GraphQLID }
        },
        resolve(parentValue, args, req){
          return addPolitico({ args, req });
        }
      },
      addEvento: {
        type: EventoType,
        args: {
            fecha: { type: GraphQLString },
            titulo: { type: GraphQLString},
            descripcion: { type: GraphQLString }
        },
        resolve(parentValue, args, req){
          return addevento({ args, req });
        }
      },
      voto_estado: {
        type: VotacionType,
        args: {
          id_usuario: {type: GraphQLID},
          id_politico: {type: GraphQLID}
        },
        resolve(parentValue, args, req){
          return voto_estado({ args, req });
        }
      }
  }
});

module.exports = mutation;
