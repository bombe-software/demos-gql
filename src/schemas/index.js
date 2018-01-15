const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;


//Importar models
const Estado = mongoose.model('estado');
const Evento = mongoose.model('evento');
const GradoAcademico = mongoose.model('grado_academico');
const LugarEstudio = mongoose.model('lugar_estudio');
const Estudio = mongoose.model('estudio');
const Partido = mongoose.model('partido');
const TipoPolitico = mongoose.model('tipo_politico');
const TipoPropuesta = mongoose.model('tipo_propuesta');
const TipoUsuario = mongoose.model('tipo_usuario');
const Propuesta = mongoose.model('propuesta');
const Politico = mongoose.model('politico');
const Usuario = mongoose.model('usuario');
const Preferencia = mongoose.model('preferencia');
const Votacion = mongoose.model('votacion');
const Zona = mongoose.model('zona');

//Importar schemas
const EstadoType = require('./estado');
const EventoType = require('./evento');
const GradoAcademicoType = require('./grado_academico');
const LugarEstudioType = require('./lugar_estudio');
const EstudioType = require('./estudio'); 
const PartidoType = require('./partido');
const TipoPoliticoType = require('./tipo_politico');
const TipoPropuestaType = require('./tipo_propuesta');
const TipoUsuarioType = require('./tipo_usuario');
const PropuestaType =  require('./propuesta');
const PoliticoType =  require('./politico');
const UsuarioType = require('./usuario');
const PreferenciaType =  require('./preferencia');
const VotacionType =  require('./votacion');
const ZonaType =  require('./zona');


const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
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
    tipos_politico: {
      type: new GraphQLList(TipoPoliticoType),
      resolve() {
        return TipoPolitico.find({});
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
    }
  })
});

module.exports = RootQuery;