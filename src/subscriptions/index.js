//Configuracion de GraphQL
const graphql = require('graphql');
const { GraphQLObjectType } = graphql;
const pubsub = require('./../../pubsub').pubsub;

//Tipos de chemas
const SolicitudEventoType = require('./../schemas/solicitud_evento');
const SolicitudPoliticoType = require('./../schemas/solicitud_politico');
const SolicitudPropuestaType = require('./../schemas/solicitud_propuesta');

const ModificarEventoType = require('./../schemas/modificar_evento');
const ModificarPoliticoType = require('./../schemas/modificar_politico');
const ModificarPropuestaType = require('./../schemas/modificar_propuesta');

const EliminarEventoType = require('./../schemas/eliminar_evento');
const EliminarPoliticoType = require('./../schemas/eliminar_politico');
const EliminarPropuestaType = require('./../schemas/eliminar_propuesta');

const EventoType = require('./../schemas/evento');
const PoliticoType = require('./../schemas/politico');
const PropuestaType = require('./../schemas/propuesta');


//Contantes de las suscripciones
const {
  EVENTO_ADD,
  PROPUESTA_ADD, 
  POLITICO_ADD,

  EVENTO_UPDATE,
  PROPUESTA_UPDATE, 
  POLITICO_UPDATE,

  EVENTO_DELETE,
  PROPUESTA_DELETE, 
  POLITICO_DELETE,

  PATCH_EVENTO_ADD,
  PATCH_PROPUESTA_ADD, 
  PATCH_POLITICO_ADD,

  PATCH_EVENTO_UPDATE,
  PATCH_PROPUESTA_UPDATE, 
  PATCH_POLITICO_UPDATE,

  PATCH_EVENTO_DELETE,
  PATCH_PROPUESTA_DELETE, 
  PATCH_POLITICO_DELETE,

  PATCHD_EVENTO_ADD,
  PATCHD_PROPUESTA_ADD, 
  PATCHD_POLITICO_ADD,

  PATCHD_EVENTO_UPDATE,
  PATCHD_PROPUESTA_UPDATE, 
  PATCHD_POLITICO_UPDATE,

  PATCHD_EVENTO_DELETE,
  PATCHD_PROPUESTA_DELETE, 
  PATCHD_POLITICO_DELETE
} = require('./../subscriptions/constantes');


const { resolver_generico } = require('./resolver_generico');

const RootSubscription = new GraphQLObjectType({
  name: 'Suscripciones',
  fields: {
    //Funciones add
    suscribe_to_evento_add: {
      type: SolicitudEventoType,
      subscribe: () => pubsub.asyncIterator(EVENTO_ADD),
      resolve: (payload, args, context, info) => {
        return resolver_generico(payload, args, context, info);
      }
    },
    suscribe_to_propuesta_add: {
      type: SolicitudPropuestaType,
      subscribe: () => pubsub.asyncIterator(PROPUESTA_ADD),
      resolve: (payload, args, context, info) => {
        return resolver_generico(payload, args, context, info);
      }
    },
    suscribe_to_politico_add: {
      type: SolicitudPoliticoType,
      subscribe: () => pubsub.asyncIterator(POLITICO_ADD),
      resolve: (payload, args, context, info) => {
        return resolver_generico(payload, args, context, info);
      }
    },

    //Funciones update
    suscribe_to_evento_update: {
      type: ModificarEventoType,
      subscribe: () => pubsub.asyncIterator(EVENTO_UPDATE),
      resolve: (payload, args, context, info) => {
        return resolver_generico(payload, args, context, info);
      }
    },
    suscribe_to_propuesta_update: {
      type: ModificarPropuestaType,
      subscribe: () => pubsub.asyncIterator(PROPUESTA_UPDATE),
      resolve: (payload, args, context, info) => {
        return resolver_generico(payload, args, context, info);
      }
    },
    suscribe_to_politico_update: {
      type: ModificarPoliticoType,
      subscribe: () => pubsub.asyncIterator(POLITICO_UPDATE),
      resolve: (payload, args, context, info) => {
        return resolver_generico(payload, args, context, info);
      }
    },

    //Funciones delete
    suscribe_to_evento_delete: {
      type: EliminarEventoType,
      subscribe: () => pubsub.asyncIterator(EVENTO_DELETE),
      resolve: (payload, args, context, info) => {
        return resolver_generico(payload, args, context, info);
      }
    },
    suscribe_to_propuesta_delete: {
      type: EliminarPropuestaType,
      subscribe: () => pubsub.asyncIterator(PROPUESTA_DELETE),
      resolve: (payload, args, context, info) => {
        return resolver_generico(payload, args, context, info);
      }
    },
    suscribe_to_politico_delete: {
      type: EliminarPoliticoType,
      subscribe: () => pubsub.asyncIterator(POLITICO_DELETE),
      resolve: (payload, args, context, info) => {
        return resolver_generico(payload, args, context, info);
      }
    },
    //Funciones patch_add
    suscribe_to_patch_evento_add: {
      type: EventoType,
      subscribe: () => pubsub.asyncIterator(PATCH_EVENTO_ADD),
      resolve: (payload, args, context, info) => {
        return resolver_generico(payload, args, context, info);
      }
    },
    suscribe_to_patch_propuesta_add: {
      type: PropuestaType,
      subscribe: () => pubsub.asyncIterator(PATCH_PROPUESTA_ADD),
      resolve: (payload, args, context, info) => {
        return resolver_generico(payload, args, context, info);
      }
    },
    suscribe_to_patch_politico_add: {
      type: PoliticoType,
      subscribe: () => pubsub.asyncIterator(PATCH_POLITICO_ADD),
      resolve: (payload, args, context, info) => {
        return resolver_generico(payload, args, context, info);
      }
    },

    //Funciones patch_update
    suscribe_to_patch_evento_update: {
      type: EventoType,
      subscribe: () => pubsub.asyncIterator(PATCH_EVENTO_UPDATE),
      resolve: (payload, args, context, info) => {
        return resolver_generico(payload, args, context, info);
      }
    },
    suscribe_to_patch_propuesta_update: {
      type: PropuestaType,
      subscribe: () => pubsub.asyncIterator(PATCH_PROPUESTA_UPDATE),
      resolve: (payload, args, context, info) => {
        return resolver_generico(payload, args, context, info);
      }
    },
    suscribe_to_patch_politico_update: {
      type: PoliticoType,
      subscribe: () => pubsub.asyncIterator(PATCH_POLITICO_UPDATE),
      resolve: (payload, args, context, info) => {
        return resolver_generico(payload, args, context, info);
      }
    },

    //Funciones patch_delete
    suscribe_to_patch_evento_delete: {
      type: EventoType,
      subscribe: () => pubsub.asyncIterator(PATCH_EVENTO_DELETE),
      resolve: (payload, args, context, info) => {
        return resolver_generico(payload, args, context, info);
      }
    },
    suscribe_to_patch_propuesta_delete: {
      type: PropuestaType,
      subscribe: () => pubsub.asyncIterator(PATCH_PROPUESTA_DELETE),
      resolve: (payload, args, context, info) => {
        return resolver_generico(payload, args, context, info);
      }
    },
    suscribe_to_patch_politico_delete: {
      type: PoliticoType,
      subscribe: () => pubsub.asyncIterator(PATCH_POLITICO_DELETE),
      resolve: (payload, args, context, info) => {
        return resolver_generico(payload, args, context, info);
      }
    },
    //Funciones patchd_add
    suscribe_to_patchd_evento_add: {
      type: SolicitudEventoType,
      subscribe: () => pubsub.asyncIterator(PATCHD_EVENTO_ADD),
      resolve: (payload, args, context, info) => {
        return resolver_generico(payload, args, context, info);
      }
    },
    suscribe_to_patchd_propuesta_add: {
      type: SolicitudPropuestaType,
      subscribe: () => pubsub.asyncIterator(PATCHD_PROPUESTA_ADD),
      resolve: (payload, args, context, info) => {
        return resolver_generico(payload, args, context, info);
      }
    },
    suscribe_to_patchd_politico_add: {
      type: SolicitudPoliticoType,
      subscribe: () => pubsub.asyncIterator(PATCHD_POLITICO_ADD),
      resolve: (payload, args, context, info) => {
        return resolver_generico(payload, args, context, info);
      }
    },

    //Funciones patchd_update
    suscribe_to_patchd_evento_update: {
      type: ModificarEventoType,
      subscribe: () => pubsub.asyncIterator(PATCHD_EVENTO_UPDATE),
      resolve: (payload, args, context, info) => {
        return resolver_generico(payload, args, context, info);
      }
    },
    suscribe_to_patchd_propuesta_update: {
      type: ModificarPropuestaType,
      subscribe: () => pubsub.asyncIterator(PATCHD_PROPUESTA_UPDATE),
      resolve: (payload, args, context, info) => {
        return resolver_generico(payload, args, context, info);
      }
    },
    suscribe_to_patchd_politico_update: {
      type: ModificarPoliticoType,
      subscribe: () => pubsub.asyncIterator(PATCHD_POLITICO_UPDATE),
      resolve: (payload, args, context, info) => {
        return resolver_generico(payload, args, context, info);
      }
    },

    //Funciones patchd_delete
    suscribe_to_patchd_evento_delete: {
      type: EliminarEventoType,
      subscribe: () => pubsub.asyncIterator(PATCHD_EVENTO_DELETE),
      resolve: (payload, args, context, info) => {
        return resolver_generico(payload, args, context, info);
      }
    },
    suscribe_to_patchd_propuesta_delete: {
      type: EliminarPropuestaType,
      subscribe: () => pubsub.asyncIterator(PATCHD_PROPUESTA_DELETE),
      resolve: (payload, args, context, info) => {
        return resolver_generico(payload, args, context, info);
      }
    },
    suscribe_to_patchd_politico_delete: {
      type: EliminarPoliticoType,
      subscribe: () => pubsub.asyncIterator(PATCHD_POLITICO_DELETE),
      resolve: (payload, args, context, info) => {
        return resolver_generico(payload, args, context, info);
      }
    }
  }
});

module.exports = RootSubscription;