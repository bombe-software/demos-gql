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
mongoose.connection.once('open', () => console.log('Conectado a la base de datos'))
  .on('error', error => console.log('Error al conectar a la base de datos:', error));

app.use(bodyParser.json());

app.use(function (req, res, next) {

  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8081');

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});


app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}));


//Area de pruebas
app.get('/pruebas', function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  require('./pruebas').pruebas(req, res);
  res.end();
});

const port = 4000;
app.listen(port, () => {
  console.log('Listening on port: ' + port);
});