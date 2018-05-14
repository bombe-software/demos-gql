//Configuracion de GraphQL
const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLNonNull, GraphQLInt } = graphql;

//Funciones add
const { add_bug } = require('./bug');
const { add_evento } = require('./evento');
const { add_politico } = require('./politico');
const { add_propuesta } = require('./propuesta');


//Funciones update
const { update_usuario } = require('./usuario');//Hacerlo poliformico
const { update_evento } = require('./evento');
const { update_politico } = require('./politico');
const { update_propuesta } = require('./propuesta');


//Funciones delete
const { delete_bug } = require('./bug');
const { delete_usuario } = require('./usuario');
const { delete_evento } = require('./evento');
const { delete_politico } = require('./politico');
const { delete_propuesta } = require('./propuesta');

//Funciones moderador de aceptacion (patch) 
const { patch_add_evento } = require('./evento');
const { patch_add_politico } = require('./politico');
const { patch_add_propuesta } = require('./propuesta');
const { patch_update_evento } = require('./evento');
const { patch_update_politico } = require('./politico');
const { patch_update_propuesta } = require('./propuesta');
const { patch_delete_evento } = require('./evento');
const { patch_delete_politico } = require('./politico');
const { patch_delete_propuesta } = require('./propuesta');

//Funciones moderador de negacion (patchd) 
const { patchd_add_evento } = require('./evento');
const { patchd_add_politico } = require('./politico');
const { patchd_add_propuesta } = require('./propuesta');
const { patchd_update_evento } = require('./evento');
const { patchd_update_politico } = require('./politico');
const { patchd_update_propuesta } = require('./propuesta');
const { patchd_delete_evento } = require('./evento');
const { patchd_delete_politico } = require('./politico');
const { patchd_delete_propuesta } = require('./propuesta');


//Funciones especiales
const { login } = require('./login');
const { signup } = require('./signup');
const { recover_password } = require('./recover_password');
const { confirm_email } = require('./confirm_email');
const { estatal_voto } = require('./voto');
const { nacional_voto } = require('./voto');
const { like_propuesta } = require('./propuesta');
const { dislike_propuesta } = require('./propuesta');
const { mensaje } = require('./mensaje');


const RootMutation = new GraphQLObjectType({
  name: 'Mutaciones',
  fields: {
    add_bug: {
      type: require('./../schemas/bug'),
      args: {
        titulo: { type: GraphQLString },
        descripcion: { type: GraphQLString },
        url: { type: GraphQLString }
      },
      resolve(parentValue, args, req) {
        return add_bug({ args, req });
      }
    },
    add_evento: {
      type: require('../schemas/evento'),
      args: {
        fecha: { type: GraphQLString },
        titulo: { type: GraphQLString },
        descripcion: { type: GraphQLString },
        referencia: { type: GraphQLString },
        usuario: { type: GraphQLID },
        politico: { type: GraphQLID }
      },
      resolve(parentValue, args, req) {
        return add_evento({ args, req });
      }
    },
    add_politico: {
      type: require('./../schemas/politico'),
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
      resolve(parentValue, args, req) {
        return add_politico({ args, req });
      }
    },
    add_propuesta: {
      type: require('../schemas/propuesta'),
      args: {
        fecha: { type: GraphQLString },
        titulo: { type: GraphQLString },
        descripcion: { type: GraphQLString },
        tipo_propuesta: { type: GraphQLID },
        referencia: { type: GraphQLString },
        usuario: { type: GraphQLID },
        politico: { type: GraphQLID }
      },
      resolve(parentValue, args, req) {
        return add_propuesta({ args, req });
      }
    },
    update_usuario: {
      type: require('./../schemas/usuario'),
      args: {
        nombre: { type: GraphQLString },
        password: { type: GraphQLString },
        avatar: { type: GraphQLString },
        tipo_usuario: { type: GraphQLInt },
        puntos: { type: GraphQLInt }
      },
      resolve(parentValue, args, req) {
        return update_usuario({ args, req });
      }
    },
    update_evento: {
      type: require('../schemas/evento'),
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
        return update_evento({ args, req });
      }
    },
    update_politico: {
      type: require('./../schemas/politico'),
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
        return update_politico({ args, req });
      }
    },
    update_propuesta: {
      type: require('../schemas/propuesta'),
      args: {
        id_propuesta: { type: GraphQLID },
        usuario: { type: GraphQLID },
        politico: { type: GraphQLID },
        fecha: { type: GraphQLString },
        descripcion: { type: GraphQLString },
        titulo: { type: GraphQLString },
        tipo_propuesta: { type: GraphQLID },
        referencia: { type: GraphQLString },
      },
      resolve(parentValue, args, req) {
        return update_propuesta({ args, req });
      }
    },
    delete_bug: {
      type: require('./../schemas/bug'),
      args: {
        id_bug: { type: GraphQLID }
      },
      resolve(parentValue, args, req) {
        return delete_bug({ args, req });
      }
    },
    delete_usuario: {
      type: require('./../schemas/usuario'),
      args: {
        id_usuario: { type: GraphQLID }
      },
      resolve(parentValue, args, req) {
        return delete_usuario({ args, req });
      }
    },
    delete_politico: {
      type: require('./../schemas/politico'),
      args: {
        id_politico: { type: GraphQLID },
        id_usuario: { type: GraphQLID }
      },
      resolve(parentValue, args, req) {
        return delete_politico({ args, req });
      }
    },
    delete_evento: {
      type: require('../schemas/evento'),
      args: {
        id_evento: { type: GraphQLID },
        id_usuario: { type: GraphQLID }
      },
      resolve(parentValue, args, req) {
        return delete_evento({ args, req });
      }
    },
    delete_propuesta: {
      type: require('../schemas/propuesta'),
      args: {
        id_propuesta: { type: GraphQLID },
        id_usuario: { type: GraphQLID }
      },
      resolve(parentValue, args, req) {
        return delete_propuesta({ args, req });
      }
    },
    patch_add_evento: {
      type: require('../schemas/evento'),
      args: {
        id_evento: { type: GraphQLID }
      }, resolve(parentValue, args, req) {
        return patch_add_evento({ args, req });
      }
    },
    patch_add_politico: {
      type: require('./../schemas/politico'),
      args: {
        id_politico: { type: GraphQLID }
      },
      resolve(parentValue, args, req) {
        return patch_add_politico({ args, req });
      }
    },
    patch_add_propuesta: {
      type: require('../schemas/propuesta'),
      args: {
        id_propuesta: { type: GraphQLID }
      },
      resolve(parentValue, args, req) {
        return patch_add_propuesta({ args, req });
      }
    },
    patch_update_evento: {
      type: require('../schemas/evento'),
      args: {
        id_solicitud: { type: GraphQLID }
      },
      resolve(parentValue, args, req) {
        return patch_update_evento({ args, req });
      }
    },
    patch_update_politico: {
      type: require('./../schemas/politico'),
      args: {
        id_solicitud: { type: GraphQLID }
      },
      resolve(parentValue, args, req) {
        return patch_update_politico({ args, req });
      }
    },
    patch_update_propuesta: {
      type: require('../schemas/propuesta'),
      args: {
        id_solicitud: { type: GraphQLID }
      },
      resolve(parentValue, args, req) {
        return patch_update_propuesta({ args, req });
      }
    },
    patch_delete_evento: {
      type: require('../schemas/evento'),
      args: {
        id_solicitud: { type: GraphQLID }
      }, resolve(parentValue, args, req) {
        return patch_delete_evento({ args, req });
      }
    },
    patch_delete_politico: {
      type: require('./../schemas/politico'),
      args: {
        id_solicitud: { type: GraphQLID }
      }, resolve(parentValue, args, req) {
        return patch_delete_politico({ args, req });
      }
    },
    patch_delete_propuesta: {
      type: require('../schemas/propuesta'),
      args: {
        id_solicitud: { type: GraphQLID }
      }, resolve(parentValue, args, req) {
        return patch_delete_propuesta({ args, req });
      }
    },
    patchd_add_evento: {
      type: require('../schemas/evento'),
      args: {
        id_evento: { type: GraphQLID }
      },
      resolve(parentValue, args, req) {
        return patchd_add_evento({ args, req });
      }
    },
    patchd_add_politico: {
      type: require('./../schemas/politico'),
      args: {
        id_politico: { type: GraphQLID }
      },
      resolve(parentValue, args, req) {
        return patchd_add_politico({ args, req });
      }
    },
    patchd_add_propuesta: {
      type: require('./../schemas/propuesta'),
      args: {
        id_propuesta: { type: GraphQLID }
      },
      resolve(parentValue, args, req) {
        return patchd_add_propuesta({ args, req });
      }
    },
    patchd_update_politico: {
      type: require('./../schemas/politico'),
      args: {
        id_solicitud: { type: GraphQLID }
      },
      resolve(parentValue, args, req) {
        return patchd_update_politico({ args, req });
      }
    },
    patchd_update_evento: {
      type: require('../schemas/evento'),
      args: {
        id_solicitud: { type: GraphQLID }
      },
      resolve(parentValue, args, req) {
        return patchd_update_evento({ args, req });
      }
    },
    patchd_update_propuesta: {
      type: require('../schemas/propuesta'),
      args: {
        id_solicitud: { type: GraphQLID }
      },
      resolve(parentValue, args, req) {
        return patchd_update_propuesta({ args, req });
      }
    },
    patchd_delete_politico: {
      type: require('./../schemas/politico'),
      args: {
        id_solicitud: { type: GraphQLID }
      },
      resolve(parentValue, args, req) {
        return patchd_delete_politico({ args, req });
      }
    },
    patchd_delete_evento: {
      type: require('../schemas/evento'),
      args: {
        id_solicitud: { type: GraphQLID }
      },
      resolve(parentValue, args, req) {
        return patchd_delete_evento({ args, req });
      }
    },

    patchd_delete_propuesta: {
      type: require('../schemas/propuesta'),
      args: {
        id_solicitud: { type: GraphQLID }
      },
      resolve(parentValue, args, req) {
        return patchd_delete_propuesta({ args, req });
      }
    },
    login: {
      type: require('./../schemas/usuario'),
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parentValue, { email, password }, req) {
        return login({ email, password, req });
      }
    },
    logout: {
      type: require('./../schemas/usuario'),
      resolve(parentValue, args, req) {
        const { user } = req;
        req.logout();
        return user;
      }
    },
    signup: {
      type: require('./../schemas/usuario'),
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
    confirm_email: {
      type: require('./../schemas/usuario'),
      args: {
        email: { type: GraphQLString },
        firma: { type: GraphQLString }
      }, resolve(parentValue, args, req) {
        return confirm_email({ args, req });
      }
    },
    recover_password:{
      type: GraphQLString,
      args: {
        email: { type: GraphQLString}
      },
      resolve(parentValue, args, req) {
        return recover_password({ args, req });
      }
    },
    estatal_voto: {
      type: require('../schemas/votacion'),
      args: {
        id_votacion: { type: GraphQLID },
        id_usuario: { type: GraphQLID },
        id_preferencia: { type: GraphQLID },
        id_estado: { type: GraphQLID }
      },
      resolve(parentValue, args, req) {
        return estatal_voto({ args, req });
      }
    },
    nacional_voto:{
      type: require('./../schemas/like_nacional'),
      args: {
        id_politico: { type: GraphQLID },
        id_usuario: { type: GraphQLID }, 
        id_estado: { type: GraphQLID }
      },
      resolve(parentValue, args, req) {
        return nacional_voto({ args, req });
      }
    },
    like_propuesta: {
      type: require('../schemas/propuesta'),
      args: {
        id_propuesta: { type: GraphQLID },
        id_usuario: { type: GraphQLID }
      },
      resolve(parentValue, args, req) {
        return like_propuesta({ args, req });
      }
    },
    dislike_propuesta: {
      type: require('../schemas/propuesta'),
      args: {
        id_propuesta: { type: GraphQLID },
        id_usuario: { type: GraphQLID }
      },
      resolve(parentValue, args, req) {
        return dislike_propuesta({ args, req });
      }
    },
    mensaje: {
      type: GraphQLString,
      args: {
        mensajeUser: { type: GraphQLString }
      }, resolve(parentValue, args, req) {
        return mensaje({ args, req });
      }
    }
  }
});

module.exports = RootMutation;
