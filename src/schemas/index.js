const mongoose = require('mongoose');
const graphql = require('graphql');
const { 
  GraphQLObjectType, GraphQLList, GraphQLID, 
  GraphQLNonNull, GraphQLString
 } = graphql;


//Importar models
const Estado = mongoose.model('estado');
const Evento = mongoose.model('evento');
const GradoAcademico = mongoose.model('grado_academico');
const LugarEstudio = mongoose.model('lugar_estudio');
const Estudio = mongoose.model('estudio');
const Partido = mongoose.model('partido');
//const TipoPolitico = mongoose.model('tipo_politico');
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
//Solicitud de modificaciones
const SolicitudModificarPolitico = mongoose.model('solicitud_modificar_politico');



//Importar schemas
const EstadoType = require('./estado');
const EventoType = require('./evento');
const GradoAcademicoType = require('./grado_academico');
const LugarEstudioType = require('./lugar_estudio');
const EstudioType = require('./estudio');
const PartidoType = require('./partido');
//const TipoPoliticoType = require('./tipo_politico');
const TipoPropuestaType = require('./tipo_propuesta');
const TipoUsuarioType = require('./tipo_usuario');
const PropuestaType = require('./propuesta');
//const SolicitudPropuestaType = require('./solicitud_propuesta');
//const SolicitudEventoType = require('./solicitud_evento');
const PoliticoType = require('./politico');
const UsuarioType = require('./usuario');
const PreferenciaType = require('./preferencia');
const VotacionType = require('./votacion');
const ZonaType = require('./zona');
//const SolicitudPoliticoType = ('./solicitud_politico');

const RootQuery = new GraphQLObjectType({
  name: 'Consultas',
  fields: () => ({
    estados: {
      type: new GraphQLList(EstadoType),
      resolve() {
        return Estado.find({});
      }
    },
    eventos: {
      type: new GraphQLList(EventoType),
      resolve() {
        return Evento.find({});
      }
    },
    grados_academico: {
      type: new GraphQLList(GradoAcademicoType),
      resolve() {
        return GradoAcademico.find({});
      }
    },
    lugares_estudio: {
      type: new GraphQLList(LugarEstudioType),
      resolve() {
        return LugarEstudio.find({});
      }
    },
    estudios: {
      type: new GraphQLList(EstudioType),
      resolve() {
        return Estudio.find({});
      }
    },
    partidos: {
      type: new GraphQLList(PartidoType),
      resolve() {
        return Partido.find({});
      }
    },
    tipos_propuesta: {
      type: new GraphQLList(TipoPropuestaType),
      resolve() {
        return TipoPropuesta.find({});
      }
    },
    tipos_usuario: {
      type: new GraphQLList(TipoUsuarioType),
      resolve() {
        return TipoUsuario.find({});
      }
    },
    propuestas: {
      type: new GraphQLList(PropuestaType),
      resolve() {
        return Propuesta.find({});
      }
    },
    politicos: {
      type: new GraphQLList(PoliticoType),
      resolve() {
        return Politico.find({});
      }
    },
    usuarios: {
      type: new GraphQLList(UsuarioType),
      resolve() {
        return Usuario.find({});
      }
    },
    preferencias: {
      type: new GraphQLList(PreferenciaType),
      resolve() {
        return Preferencia.find({});
      }
    },
    votaciones: {
      type: new GraphQLList(VotacionType),
      resolve() {
        return Votacion.find({});
      }
    },
    zonas: {
      type: new GraphQLList(ZonaType),
      resolve() {
        return Zona.find({});
      }
    },
    usuario: {
      type: UsuarioType,
      resolve(parentValue, args, req) {
        return req.user;
      }
    },
    politicosPorEstado: {
      type: new GraphQLList(PoliticoType),
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }){
        return Politico.find({'estado': id});
      }
    },
    votacion: {
      args: {
        estado: { type: GraphQLID }
      },
      type: VotacionType,
      resolve(parentValue, args, req) {
        return Votacion.findOne({estado: args.estado});
      }
    },
    estado: {
      args: {
        id: { type: GraphQLID }
      },
      type: EstadoType,
      resolve(parentValue, args, req) {
        return Estado.findById(args.id);
      }
    },
    politicosPorEstado: {
      type: new GraphQLList(PoliticoType),
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Politico.find({ 'estado': id });

      }
    },
    politicosPorId:{
      type: PoliticoType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }){
        return Politico.findById(id);
      }
    },
    solicitudPoliticos: {
      type: new GraphQLList(require('./solicitud_politico')),
      resolve() {
        return SolicitudPolitico.find({});
      }
    },
    solicitudPropuestas: {
      type: new GraphQLList(require('./solicitud_propuesta')),
      resolve() {
        return SolicitudPropuesta.find({});
      }
    },
     solicitudEventos: {
      type: new GraphQLList(require('./solicitud_evento')),
      resolve() {
        return SolicitudEvento.find({});
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
    evento: {
      type: require('./evento'),
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) } 
      },
      resolve(parentValue, { id }) {
        return Evento.findById(id);
      }
    },
    solicitudPolitico: {
      type: require('./solicitud_politico'),
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parentValue, { id }) {
        return SolicitudPolitico.findById(id);
      }
    },
    SolicitudEvento: {
      type: require('./solicitud_evento'),
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parentValue, { id }) {
        return SolicitudEvento.findById(id);
      }
    },
    solicitudPropuesta: {
      type: require('./solicitud_propuesta'),
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parentValue, { id }) {
        return SolicitudPropuesta.findById(id);
      }
    },
    solicitudesModificarPolitico: {
      type: new GraphQLList(require('./modificar_politico')),
      resolve() {
        return SolicitudModificarPolitico.find({});
      }
    },
    solicitudModificarPolitico: {
      type: require('./modificar_politico'),
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parentValue, { id }) {
        return SolicitudModificarPolitico.findById(id);
      }
    },
  })
});

module.exports = RootQuery;