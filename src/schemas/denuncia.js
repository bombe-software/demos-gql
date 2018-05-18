const graphql = require('graphql');
const mongoose = require('mongoose');
const { GraphQLObjectType,  GraphQLString,  GraphQLID } = graphql;
const SolicitudDenuncia = mongoose.model('denuncia');

const DenunciaType = new GraphQLObjectType({
  name:  'DenunciaType',
  fields: () => ({
    id: { type: GraphQLID },
    titulo: { type: GraphQLString },
    descripcion: { type: GraphQLString },
    usuario: {
        type: require('./usuario'),
        resolve(parentValue) {
          return SolicitudDenuncia.findById(parentValue).populate('usuario')
            .then(denuncia => denuncia.usuario );
        }
      },
    ubicacion: { type: GraphQLString }
  })
});

module.exports = DenunciaType;