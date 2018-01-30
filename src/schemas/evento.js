const graphql = require('graphql');
const { GraphQLObjectType,  GraphQLString,  GraphQLID } = graphql;

const EventoType = new GraphQLObjectType({
  name:  'EventoType',
  fields: () => ({
    id: { type: GraphQLID },
    fecha: { type: GraphQLString },
    titulo: { type: GraphQLString },
    descripcion: { type: GraphQLString },
<<<<<<< HEAD
    fuente: { type: GraphQLString }
=======
    referencia: { type: GraphQLString },
    usuario: {
      type: require('./usuario'),
      resolve(parentValue) {
        return Propuesta.findById(parentValue).populate('usuario')
          .then(evento => evento.usuario );
      }
    },
>>>>>>> origin/MedinaVilla
  })
});

module.exports = EventoType;