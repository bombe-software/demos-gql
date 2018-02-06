//Configuracion de GraphQL
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;

//Tipos de chemas
const UsuarioType = require('./../schemas/usuario');
const PoliticoType = require('./../schemas/politico');
const PartidoType = require('../schemas/partido');
const VotacionType = require('../schemas/votacion');
const EventoType = require('../schemas/evento');
const PropuestaType = require('../schemas/propuesta');

//Funciones de la mutacion
const { voto_estado } = require('./voto_estado');
const { addEvento } = require('./addEvento');
const { login } = require('./login');
const { signup } = require('./signup');
const { addPolitico } = require('./addPolitico');
const { addPropuesta } = require('./addPropuesta');
const { updateUsuario } = require('./updateUsuario');

const {
  aceptarSolicitudPolitico,
  denegarSolicitudPolitico
} = require('./manageSolicitudPolitico');

const {
  aceptarSolicitudPropuesta,
  denegarSolicitudPropuesta
} = require('./manageSolicitudPropuesta');

const {
  aceptarSolicitudEvento,
  denegarSolicitudEvento
} = require('./manageSolicitudEvento');

const {  likePropuesta } = require('./like');
const { dislikePropuesta } = require('./dislike');


const RootMutation = new GraphQLObjectType({
  name: 'Mutaciones',
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
        partido: { type: GraphQLID },
        estado: { type: GraphQLID },
        lugar_estudio: { type: GraphQLID },
        grado_academico: { type: GraphQLID },
        titulo: { type: GraphQLString },
        usuario: { type: GraphQLID },
        referencia: { type: GraphQLString }
      },
      subscribe: some => console.log(some),
      resolve(parentValue, args, req) {
        return addPolitico({ args, req });
      }
    },
    addEvento: {
      type: EventoType,
      args: {
        fecha: { type: GraphQLString },
        titulo: { type: GraphQLString },
        descripcion: { type: GraphQLString },
        referencia: { type: GraphQLString },
        usuario: { type: GraphQLID },
        politico: { type: GraphQLID }
      },
      subscribe: some => console.log(some),
      resolve(parentValue, args, req) {
        return addEvento({ args, req });
      }
    },
    addPropuesta: {
      type: PropuestaType,
      args: {
        fecha: { type: GraphQLString },
        titulo: { type: GraphQLString },
        descripcion: { type: GraphQLString },
        tipo_propuesta: { type: GraphQLID },
        referencia: { type: GraphQLString },
        usuario: { type: GraphQLID },
        politico: { type: GraphQLID }
      },
      subscribe: some => console.log(some),
      resolve(parentValue, args, req) {
        return addPropuesta({ args, req });
      }
    },
    voto_estado: {
      type: VotacionType,
      args: {
        id_usuario: { type: GraphQLID },
        id_politico: { type: GraphQLID }
      },
      resolve(parentValue, args, req) {
        return voto_estado({ args, req });
      }
    },
    like_propuesta: {
      type: PropuestaType,
      args: {
        id_propuesta: { type: GraphQLID },
        id_usuario: { type: GraphQLID }
      },
      resolve(parentValue, args, req) {
        return likePropuesta({ args, req });
      }
    },
    dislike_propuesta: {
      type: PropuestaType,
      args: {
        id_propuesta: { type: GraphQLID },
        id_usuario: { type: GraphQLID }
      },
      resolve(parentValue, args, req) {
        return dislikePropuesta({ args, req });
      }
    },
    denegarSolicitudPolitico: {
      type: PoliticoType,
      args: {
        id_politico: { type: GraphQLID }/*,
          id_usuario: { type: GraphQLID }*/
      },
      resolve(parentValue, args, req) {
        return denegarSolicitudPolitico({ args, req });
      }
    },
    aceptarSolicitudPolitico: {
      type: PoliticoType,
      args: {
        id_politico: { type: GraphQLID }/*,
          id_usuario: { type: GraphQLID }*/
      },
      resolve(parentValue, args, req) {
        return aceptarSolicitudPolitico({ args, req });
      }
    },
    updateUsuario: {
      type: UsuarioType,
      args: {
        id: { type: GraphQLID },
        nombre: { type: GraphQLString },
        password: { type: GraphQLString },
        avatar: { type: GraphQLString }
      },
      resolve(parentValue, args, req) {
        return updateUsuario({ args, req });
      }
    },
    denegarSolicitudPropuesta: {
      type: PropuestaType,
      args: {
        id_propuesta: { type: GraphQLID }
      },
      resolve(parentValue, args, req) {
        return denegarSolicitudPropuesta({ args, req });
      }
    },
    aceptarSolicitudPropuesta: {
      type: PropuestaType,
      args: {
        id_propuesta: { type: GraphQLID }
      },
      resolve(parentValue, args, req) {
        return aceptarSolicitudPropuesta({ args, req });
      }
    },
    denegarSolicitudEvento: {
      type: EventoType,
      args: {
        id_evento: { type: GraphQLID }
      },
      resolve(parentValue, args, req) {
        return denegarSolicitudEvento({ args, req });
      }
    },
    aceptarSolicitudEvento: {
      type: EventoType,
      args: {
        id_evento: { type: GraphQLID }
      },resolve(parentValue, args, req) {
          return aceptarSolicitudEvento({ args, req });
        }
    },

      voto_estado: {
        type: VotacionType,
        args: {
          id_votacion: { type: GraphQLID },
          id_usuario: { type: GraphQLID },
          id_politico: { type: GraphQLID }
        },
        resolve(parentValue, args, req) {
          return voto_estado({ args, req });
        }
      }
  }
});

module.exports = RootMutation;
