//Configuracion de GraphQL
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString } = graphql;

//Tipos de chemas
const SolicitudEventoType = require('./../schemas/solicitud_evento');
const SolicitudPoliticoType = require('./../schemas/solicitud_politico');
const SolicitudPropuestaType = require('./../schemas/solicitud_propuesta');

//Funciones resolvers
const { evento_agregado } = require('./propuesta_agregada');
const { politico_agregado } = require('./propuesta_agregada');
const { propuesta_agregada } = require('./propuesta_agregada');


//Contantes de las suscripciones
const {
  PROPUESTA_AGREGADA,
  POLITICO_AGREGADO,
  EVENTO_AGREGADO
} = require('./../subscriptions/constantes');


const RootSubscription = new GraphQLObjectType({
  name: 'Suscripciones',
  fields: {
    propuestaAgregada: {
      type: SolicitudPropuestaType,
      description: "Notifica al cliente un cambio en la tabla de solicitud_propuesta",
      subscribe: () => new pubsub().asyncIterator(PROPUESTA_AGREGADA),
      args: null,
      resolve: (payload, args, context, info) => {
        propuesta_agregada(payload, args, context, info);
        return payload;
      },
    },
    politicoAgregado: {
      type: SolicitudPoliticoType,
      description: "Notifica al cliente un cambio en la tabla de solicitud_politico",
      subscribe: () => new pubsub().asyncIterator(POLITICO_AGREGADO),
      args: null,
      resolve: (payload, args, context, info) => {
        politico_agregado(payload, args, context, info);
        return payload;
      },
    },
    eventoAgregado: {
      type: SolicitudEventoType,
      description: "Notifica al cliente un cambio en la tabla de solicitud_evento",
      args: null,
      subscribe: () => new pubsub().asyncIterator(EVENTO_AGREGADO),
      resolve: (payload, args, context, info) => {
        evento_agregado(payload, args, context, info);
        return payload;
      },
    }
  }
});

module.exports = RootSubscription;