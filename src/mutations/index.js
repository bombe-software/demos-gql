//Configuracion de GraphQL
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;

//Tipos de chemas
const UsuarioType = require('./../schemas/usuario');

//Funciones de la mutacion
const { login } = require('./login');
const { signup } = require('./signup');

//Mongoose
const mongoose = require('mongoose');

//Importando schemas y modelos necesarios para updates
const Politico = mongoose.model('politico');
const Partido = mongoose.model('partido');
const TipoPolitico = mongoose.model('tipo_politico')

const PoliticoType = require('../schemas/politico');
const PartidoType = require('../schemas/partido');
const TipoPoliticoType = require('../schemas/tipo_politico')

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
          partido: { type: GraphQLString },
          tipo_politico: { type: GraphQLString },
          estado: { type: GraphQLString },
      },
      resolve(parentValue, { nombre }){
          return(new Politico({ nombre })).save()
      }
    },
      addPartido: {
        type: PartidoType,
        args: {
          partido: { type: GraphQLString}
        },
        resolve(parentValue, { partido }){
          return(new Partido({ partido })).save()

      }
    }
  }
});

module.exports = mutation;
