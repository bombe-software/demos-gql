const express = require('express');
const models = require('./models');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const schema = require('./src');
const app = express();

const config = {
  user: 'admin',
  password: 'n0m3l0',
}
const MONGO_URI = `mongodb://${config.user}:${config.password}@ds255767.mlab.com:55767/demos_db`;
mongoose.Promise = require('bluebird');
mongoose.connect(MONGO_URI, { useMongoClient: true }).catch(err => console.error(err));
mongoose.connection.once('open', () => console.log('Conectado a la base de datos.'))
  .on('error', error => console.log('Error al conectar a la base de datos:', error));



app.use(bodyParser.json());
app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}));

const port = 4000;
app.listen(port, () => {
  console.log('Listening on port: ' + port);
});