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
const PoliticoType = require('../schemas/politico');

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
          nombre: { type: GraphQLString }
      },
      resolve(parentValue, { nombre }){
          return(new Politico({ nombre })).save()
      }
    }
  }
});

module.exports = mutation;
