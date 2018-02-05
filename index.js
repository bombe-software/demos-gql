//Librerias de express
const express = require('express');
const bodyParser = require('body-parser');
const createServer = require('http').createServer;
const app = express();
const port = process.env.PORT || 3000;

//Librerias de la base de datos
const mongoose = require('mongoose');
const models = require('./models');

//Librerias de autenticacion
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const cors = require('cors');
const configPassport = require('./config_passport');

//Librerias de graphql
const expressGraphQL = require('express-graphql');
const SubscriptionServer = require('subscriptions-transport-ws').SubscriptionServer;
const execute = require('graphql').execute;
const subscribe = require('graphql').subscribe;
const PubSub = require('graphql-subscriptions').PubSub;

//Importar schemas
const schema = require('./src');

//Configuracion de la base de datos
const config = {
  user: 'admin',
  password: 'n0m3l0',
}
const MONGO_URI = `mongodb://${config.user}:${config.password}@ds255767.mlab.com:55767/demos_db`;
mongoose.Promise = require('bluebird');
mongoose.connect(MONGO_URI).catch(err => console.error(err));


//Configruacion del CORS
const corsOptions = {
    origin: 'http://localhost:9000',
    credentials: true,
}
app.use(cors(corsOptions));

//Configuracion de las sesiones e integracion con mongodb
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'jaiba',
  store: new MongoStore({
    url: MONGO_URI,
    autoReconnect: true
  })
}));
app.use(passport.initialize());
app.use(passport.session());

//Integracion de graphql
app.use('/graphql', bodyParser.json() ,expressGraphQL({
  schema,
  graphiql: true
}));

//Area de pruebas
app.get('/pruebas', function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  require('./pruebas').pruebas(req, res);
  res.end();
});


//Configuracion 
const pubsub = new PubSub();
const server = createServer(app);
server.listen(port, () => {
  new SubscriptionServer({
    execute,
    subscribe,
    schema: schema,
  }, {
    server: server,
    path: '/subscriptions',
  });
  console.log(`Escuchando por http en : http://localhost:${port}`); 
  console.log(`Escuchando por  ws  en:  ws://localhost:${port}/subscriptions`); 
});
