const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLString, GraphQLList } = graphql;

//importar modelos
const SolicitudModificarEvento = mongoose.model('solicitud_modificar_evento');

const ModificarEventoType = new GraphQLObjectType({
    name: 'ModificarEventoType',
    fields: () => ({
        id: { type: GraphQLID },
        id_evento: { type: GraphQLID },
        fecha: { type: GraphQLString },
        titulo: { type: GraphQLString },
        descripcion: { type: GraphQLString },
        referencia: { type: GraphQLString },
        usuario: {
          type: require('./usuario'),
          resolve(parentValue) {
            return SolicitudModificarEvento.findById(parentValue).populate('usuario')
              .then(evento => evento.usuario );
          }
        },
        politico: {
          type: require('./politico'),
          resolve(parentValue) {
            return SolicitudModificarEvento.findById(parentValue).populate('politico')
              .then(evento => evento.politico );
          }
        }
    })
});

module.exports = ModificarEventoType;