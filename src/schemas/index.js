const mongoose = require('mongoose');
const graphql = require('graphql');
const { 
  GraphQLObjectType, GraphQLList, GraphQLID, 
  GraphQLNonNull, GraphQLString 
} = graphql;

//Importar models
const Bug = mongoose.model('bug');
const Log = mongoose.model('logs');
const Estado = mongoose.model('estado');
const Evento = mongoose.model('evento');
const GradoAcademico = mongoose.model('grado_academico');
const Gabinete = mongoose.model('gabinete');
const LugarEstudio = mongoose.model('lugar_estudio');
const LikeNacional = mongoose.model('like_nacional');
const Estudio = mongoose.model('estudio');
const Partido = mongoose.model('partido');
const TipoPropuesta = mongoose.model('tipo_propuesta');
const TipoUsuario = mongoose.model('tipo_usuario');
const Propuesta = mongoose.model('propuesta');
const Politico = mongoose.model('politico');
const Usuario = mongoose.model('usuario');
const Preferencia = mongoose.model('preferencia');
const Votacion = mongoose.model('votacion');
const Zona = mongoose.model('zona');
const SolicitudPolitico = mongoose.model('solicitud_politico');
const SolicitudPropuesta = mongoose.model('solicitud_propuesta');
const SolicitudEvento = mongoose.model('solicitud_evento');
const SolicitudModificarPolitico = mongoose.model('solicitud_modificar_politico');
const SolicitudModificarEvento = mongoose.model('solicitud_modificar_evento');
const SolicitudModificarPropuesta = mongoose.model('solicitud_modificar_propuesta');
const SolicitudEliminarPolitico = mongoose.model('solicitud_eliminar_politico');
const SolicitudEliminarPropuesta = mongoose.model('solicitud_eliminar_propuesta');
const SolicitudEliminarEvento = mongoose.model('solicitud_eliminar_evento');

const RootQuery = new GraphQLObjectType({
  name: 'Consultas',
  fields: () => ({
    bug: {
      type: new GraphQLList(require('./bug')),
      resolve() {
        return Bug.find({});
      }
    },
    eliminar_evento: {
      type: new GraphQLList(require('./eliminar_evento')),
      resolve() {
        return SolicitudEliminarEvento.find({});
      }
    },
    eliminar_evento: {
      type: require('./eliminar_evento'),
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parentValue, { id }) {
        return SolicitudEliminarEvento.findById(id);
      }
    },
    eliminar_politico: {
      type: require('./eliminar_politico'),
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parentValue, { id }) {
        return SolicitudEliminarPolitico.findById(id);
      }
    },
    eliminar_politico: {
      type: new GraphQLList(require('./eliminar_politico')),
      resolve() {
        return SolicitudEliminarPolitico.find({});
      }
    },
    eliminar_propuesta: {
      type: new GraphQLList(require('./eliminar_propuesta')),
      resolve() {
        return SolicitudEliminarPropuesta.find({});
      }
    },
    eliminar_propuesta: {
      type: require('./eliminar_propuesta'),
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parentValue, { id }) {
        return SolicitudEliminarPropuesta.findById(id);
      }
    },
    estado: {
      type: new GraphQLList(require('./estado')),
      resolve() {
        return Estado.find({});
      }
    },
    estado: {
      type: require('./estado'),
      args: {
        id: { type: GraphQLID }
      },
      resolve(parentValue, args, req) {
        return Estado.findById(args.id);
      }
    },
    evento: {
      type: new GraphQLList(require('./evento')),
      resolve() {
        return Evento.find({});
      }
    },
    evento: {
      type: require('./evento'),
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parentValue, { id }) {
        return Evento.findById(id);
      }
    },
    grado_academico: {
      type: new GraphQLList(require('./grado_academico')),
      resolve() {
        return GradoAcademico.find({});
      }
    },
    gabinete: {
      type: new GraphQLList(require('./gabinete')),
      resolve() {
        return Gabinete.find({});
      }
    },
    lugar_estudio: {
      type: new GraphQLList(require('./lugar_estudio')),
      resolve() {
        return LugarEstudio.find({});
      }
    },
    like_nacional: {
      type: new GraphQLList(require('./like_nacional')),
      resolve() {
        return LikeNacional.find({});
      }
    },
    like_nacional: {
      type: new GraphQLList(require('./like_nacional')),
      args: {
        id_estado: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parentValue, { id_estado }) {
        return LikeNacional.find({ estado: id_estado });
      }
    },
    log: {
      type: new GraphQLList(require('./log')),
      resolve() {
        return Log.find({});
      }
    },
    estudio: {
      type: new GraphQLList(require('./estudio')),
      resolve() {
        return Estudio.find({});
      }
    },
    modificar_evento: {
      type: new GraphQLList(require('./modificar_evento')),
      resolve() {
        return SolicitudModificarEvento.find({});
      }
    },
    modificar_evento: {
      type: require('./modificar_evento'),
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parentValue, { id }) {
        return SolicitudModificarEvento.findById(id);
      }
    },
    modificar_politico: {
      type: new GraphQLList(require('./modificar_politico')),
      resolve() {
        return SolicitudModificarPolitico.find({});
      }
    },
    modificar_politico: {
      type: require('./modificar_politico'),
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parentValue, { id }) {
        return SolicitudModificarPolitico.findById(id);
      }
    },
    modificar_propuesta: {
      type: new GraphQLList(require('./modificar_propuesta')),
      resolve() {
        return SolicitudModificarPropuesta.find({});
      }
    },
    modificar_propuesta: {
      type: require('./modificar_propuesta'),
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parentValue, { id }) {
        return SolicitudModificarPropuesta.findById(id);
      }
    },
    partido: {
      type: new GraphQLList(require('./partido')),
      resolve() {
        return Partido.find({});
      }
    },
    preferencia: {
      type: new GraphQLList(require('./preferencia')),
      resolve() {
        return Preferencia.find({});
      }
    },
    propuesta: {
      type: new GraphQLList(require('./propuesta')),
      resolve() {
        return Propuesta.find({});
      }
    },
    propuesta: {
      type: require('./propuesta'),
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parentValue, { id }) {
        return Propuesta.findById(id);
      }
    },
    politico: {
      type: new GraphQLList(require('./politico')),
      resolve() {
        return Politico.find({});
      }
    },
    politico: {
      type: new GraphQLList(require('./politico')),
      args: {
        id_estado: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parentValue, { id }) {
        return Politico.find({ 'estado': id });
      }
    },
    politico: {
      type: require('./politico'),
      args: { 
        id: { type: new GraphQLNonNull(GraphQLID) } 
      },
      resolve(parentValue, { id }) {
        return Politico.findById(id);
      }
    },
    solicitud_evento: {
      type: require('./solicitud_evento'),
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parentValue, { id }) {
        return SolicitudEvento.findById(id);
      }
    },
    solicitud_evento: {
      type: new GraphQLList(require('./solicitud_evento')),
      resolve() {
        return SolicitudEvento.find({});
      }
    },
    solicitud_politico: {
      type: new GraphQLList(require('./solicitud_politico')),
      resolve() {
        return SolicitudPolitico.find({});
      }
    },
    solicitud_politico: {
      type: require('./solicitud_politico'),
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parentValue, { id }) {
        return SolicitudPolitico.findById(id);
      }
    },
    solicitud_propuesta: {
      type: new GraphQLList(require('./solicitud_propuesta')),
      resolve() {
        return SolicitudPropuesta.find({});
      }
    },
    solicitud_propuesta: {
      type: require('./solicitud_propuesta'),
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parentValue, { id }) {
        return SolicitudPropuesta.findById(id);
      }
    },
    tipo_propuesta: {
      type: new GraphQLList(require('./tipo_propuesta')),
      resolve() {
        return TipoPropuesta.find({});
      }
    },
    tipo_usuario: {
      type: new GraphQLList(require('./tipo_usuario')),
      resolve() {
        return TipoUsuario.find({});
      }
    },
    usuario: {
      type: new GraphQLList(require('./usuario')),
      resolve() {
        return Usuario.find({});
      }
    },
    usuario_in: {
      type: require('./usuario'),
      resolve(parentValue, args, req) {
        return req.user;
      }
    },
    votacion: {
      type: new GraphQLList(require('./votacion')),
      resolve() {
        return Votacion.find({});
      }
    },
    votacion: {
      type: require('./votacion'),
      args: {
        id_estado: { type: GraphQLID }
      },
      resolve(parentValue, args, req) {
        return Votacion.findOne({ estado: args.estado });
      }
    },
    zona: {
      type: new GraphQLList(require('./zona')),
      resolve() {
        return Zona.find({});
      }
    }
  })
});

module.exports = RootQuery;