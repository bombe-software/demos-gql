//Configuracion de GraphQL
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLNonNull } = graphql;

//Tipos de schemas
const BugType = require('./../schemas/bug');
const UsuarioType = require('./../schemas/usuario');
const PoliticoType = require('./../schemas/politico');
const PartidoType = require('../schemas/partido');
const VotacionType = require('../schemas/votacion');
const EventoType = require('../schemas/evento');
const PropuestaType = require('../schemas/propuesta');

//Funciones de la mutacion
const { votoEstado } = require('./votoEstado');
const { deleteUser } = require('./deleteUser');
const { addEvento } = require('./addEvento');
const { addBug } = require('./addBug');
const { login } = require('./login');
const { signup } = require('./signup');
const { addPolitico } = require('./addPolitico');
const { addPropuesta } = require('./addPropuesta');
const { updateUsuario } = require('./updateUsuario');
const { modifyPolitico } = require('./modifyPolitico')
const { modifyEvento } = require('./modifyEvento')
const { modifyPropuesta } = require('./modifyPropuesta')
const { confirmEmail } = require('./confirmEmail');
const { mensaje } = require('./mensaje');
const { deletePolitico } = require('./deletePolitico');
const { deletePropuesta } = require('./deletePropuesta');
const { deleteEvento } = require('./deleteEvento');
const { recoverPassword } = require('./recoverPassword');
const { ascenderModerador } = require('./ascenderModerador');
const {
  aumentarPuntosUsuario,
  restarPuntosUsuario
} = require('./managePuntosUsuario');

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

const {
  aceptarModificarSolicitudPolitico,
  denegarModificarSolicitudPolitico
} = require('./manageSolicitudModificarPolitico')

const {
  aceptarModificarSolicitudEvento,
  denegarModificarSolicitudEvento
} = require('./manageSolicitudModificarEvento')

const {
  aceptarModificarSolicitudPropuesta,
  denegarModificarSolicitudPropuesta
} = require('./manageSolicitudModificarPropuesta')

const {
  aceptarSolicitudDeletePolitico,
  denegarSolicitudDeletePolitico
} = require('./manageSolicitudDeletePolitico')
const {
  aceptarSolicitudDeleteEvento,
  denegarSolicitudDeleteEvento
} = require('./manageSolicitudDeleteEvento')
const {
  aceptarSolicitudDeletePropuesta,
  denegarSolicitudDeletePropuesta
} = require('./manageSolicitudDeletePropuesta')

const { votarNacional } = require('./votarNacional')
const { deleteBug } = require('./deleteBug')

const { likePropuesta } = require('./like');
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
        id_votacion: { type: GraphQLID },
        id_usuario: { type: GraphQLID },
        id_preferencia: { type: GraphQLID },
        id_estado: { type: GraphQLID }
      },
      resolve(parentValue, args, req) {
        return votoEstado({ args, req });
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
      }, resolve(parentValue, args, req) {
        return aceptarSolicitudEvento({ args, req });
      }
    },
    modifyPolitico: {
      type: PoliticoType,
      args: {
        id_politico: { type: GraphQLID },
        nombre: { type: GraphQLString },
        cargo: { type: GraphQLString },
        partido: { type: GraphQLID },
        estado: { type: GraphQLID },
        estudios: { type: GraphQLID },
        lugar_estudio: { type: GraphQLID },
        grado_academico: { type: GraphQLID },
        titulo: { type: GraphQLString },
        usuario: { type: GraphQLID },
        referencia: { type: GraphQLString }
      },
      resolve(parentValue, args, req) {
        return modifyPolitico({ args, req });
      }
    },
    modifyEvento: {
      type: EventoType,
      args: {
        id_evento: { type: GraphQLID },
        titulo: { type: GraphQLString },
        descripcion: { type: GraphQLString },
        referencia: { type: GraphQLString },
        usuario: { type: GraphQLID },
        fecha: { type: GraphQLString },
        politico: { type: GraphQLID }
      },
      resolve(parentValue, args, req) {
        return modifyEvento({ args, req });
      }
    },
    modifyPropuesta: {
      type: EventoType,
      args: {
        id_propuesta: { type: GraphQLID },
        usuario: { type: GraphQLID }, 
        politico: { type: GraphQLID },
        fecha: { type: GraphQLString },
        descripcion: { type: GraphQLString },
        titulo:  { type: GraphQLString },
        tipo_propuesta: { type: GraphQLID },
        referencia:  { type: GraphQLString },
      },
      resolve(parentValue, args, req) {
        return modifyPropuesta({ args, req });
      }
    },
    aceptarModificarSolicitudPolitico: {
      type: PoliticoType,
      args: {
        id_solicitud: { type: GraphQLID }
      },
      resolve(parentValue, args, req) {
        return aceptarModificarSolicitudPolitico({ args, req });
      }
    },
    confirmEmail: {
      type: UsuarioType,
      args: {
        email: { type: GraphQLString },
        firma: { type: GraphQLString }
      }, resolve(parentValue, args, req) {
        return confirmEmail({ args, req });
      }
    },
    mensaje: {
      type: GraphQLString,
      args: {
        mensajeUser: { type: GraphQLString }
      }, resolve(parentValue, args, req) {
        return mensaje({ args, req });
      }
    },
    denegarModificarSolicitudPolitico: {
      type: PoliticoType,
      args: {
        id_solicitud: { type: GraphQLID }
      },
      resolve(parentValue, args, req) {
        return denegarModificarSolicitudPolitico({ args, req });
      }
    },
    aceptarModificarSolicitudEvento: {
      type: EventoType,
      args: {
        id_solicitud: { type: GraphQLID }
      },
      resolve(parentValue, args, req) {
        return aceptarModificarSolicitudEvento({ args, req });
      }
    },
    denegarModificarSolicitudEvento: {
      type: EventoType,
      args: {
        id_solicitud: { type: GraphQLID }
      },
      resolve(parentValue, args, req) {
        return denegarModificarSolicitudEvento({ args, req });
      }
    },
    aceptarModificarSolicitudPropuesta: {
      type: PropuestaType,
      args: {
        id_solicitud: { type: GraphQLID }
      },
      resolve(parentValue, args, req) {
        return aceptarModificarSolicitudPropuesta({ args, req });
      }
    },
    denegarModificarSolicitudPropuesta: {
      type: PropuestaType,
      args: {
        id_solicitud: { type: GraphQLID }
      },
      resolve(parentValue, args, req) {
        return denegarModificarSolicitudPropuesta({ args, req });
      }
    },
    deletePolitico: {
      type: PoliticoType,
      args: {
        id_politico: { type: GraphQLID },
        id_usuario: {type: GraphQLID}
      },
      resolve(parentValue, args, req) {
        return deletePolitico({ args, req });
      }
    },
    deleteEvento: {
      type: EventoType,
      args: {
        id_evento: { type: GraphQLID },
        id_usuario: {type: GraphQLID}
      },
      resolve(parentValue, args, req) {
        return deleteEvento({ args, req });
      }
    },
    deletePropuesta: {
      type: PropuestaType,
      args: {
        id_propuesta: { type: GraphQLID },
        id_usuario: {type: GraphQLID}
      },
      resolve(parentValue, args, req) {
        return deletePropuesta({ args, req });
      }
    },
    aceptarSolicitudDeletePolitico: {
      type: PoliticoType,
      args: {
        id_solicitud: { type: GraphQLID }
      }, resolve(parentValue, args, req) {
        return aceptarSolicitudDeletePolitico({ args, req });
      }
    },
    denegarSolicitudDeletePolitico: {
      type: PoliticoType,
      args: {
        id_solicitud: { type: GraphQLID }
      },
      resolve(parentValue, args, req) {
        return denegarSolicitudDeletePolitico({ args, req });
      }
    },
    aceptarSolicitudDeleteEvento: {
      type: EventoType,
      args: {
        id_solicitud: { type: GraphQLID }
      }, resolve(parentValue, args, req) {
        return aceptarSolicitudDeleteEvento({ args, req });
      }
    },
    denegarSolicitudDeleteEvento: {
      type: EventoType,
      args: {
        id_solicitud: { type: GraphQLID }
      },
      resolve(parentValue, args, req) {
        return denegarSolicitudDeleteEvento({ args, req });
      }
    },
    aceptarSolicitudDeletePropuesta: {
      type: PropuestaType,
       args: {
        id_solicitud: { type: GraphQLID }
      }, resolve(parentValue, args, req) {
        return aceptarSolicitudDeletePropuesta({ args, req });
      }
    },
    denegarSolicitudDeletePropuesta: {
      type: PropuestaType,
      args: {
        id_solicitud: { type: GraphQLID }
      },
      resolve(parentValue, args, req) {
        return denegarSolicitudDeletePropuesta({ args, req });
      }
    },
    addBug: {
      type: BugType,
      args: {
        titulo: { type: GraphQLString}, 
        descripcion: { type: GraphQLString}, 
        url: { type: GraphQLString}
      },
      resolve(parentValue, args, req) {
        return addBug({ args, req });
      } 
    },
    deleteBug: {
      type: BugType,
      args: {
        id_bug: { type: GraphQLID }
      },
      resolve(parentValue, args, req) {
        return deleteBug({ args, req });
      }
    },
    aumentarPuntosUsuario: {
      type: UsuarioType,
      args: {
        id_usuario: { type: GraphQLID }
      },
      resolve(parentValue, args, req) {
        return aumentarPuntosUsuario({ args, req });
      }
    },
    restarPuntosUsuario: {
      type: UsuarioType,
      args: {
        id_usuario: { type: GraphQLID }
      },
      resolve(parentValue, args, req) {
        return restarPuntosUsuario({ args, req });
      }
    },
    votarNacional:{
      type: require('./../schemas/like_nacional'),
      args: {
        id_politico: { type: GraphQLID },
        id_usuario: { type: GraphQLID }, 
        id_estado: { type: GraphQLID }
      },
      resolve(parentValue, args, req) {
        return votarNacional({ args, req });
      }
    },
     recoverPassword:{
      type: GraphQLString,
      args: {
        email: { type: GraphQLString}
      },
      resolve(parentValue, args, req) {
        return recoverPassword({ args, req });
      }
    },
    deleteUser: {
      type: UsuarioType,
      args: {
        id_usuario: { type: GraphQLID}
      },
      resolve(parentValue, args, req) {
        return deleteUser({ args, req });
      }
    },
    ascenderModerador:{
      type: UsuarioType,
      args: {
        id_usuario: { type: GraphQLID}
      },
      resolve(parentValue, args, req) {
        return ascenderModerador({ args, req });
      }
    }
  }
});

module.exports = RootMutation;
