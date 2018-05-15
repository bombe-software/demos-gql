const demos_gql_http = require('./deploy').demos_gql_http;
const demos_gql_ws = require('./deploy').demos_gql_ws;

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
//const apolloUploadExpress = require('apollo-upload-server').apolloUploadExpress;

//Importar schemas
const schema = require('./src');
const MONGO_URI = require('./deploy').MONGO_URI;
mongoose.Promise = require('bluebird');
mongoose.connect(MONGO_URI).catch(err => console.error(err));

const demos_web_http = require('./deploy').demos_web_http;
const corsOptions = {
  origin: demos_web_http,
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


app.use(bodyParser.json(),(req, res, next)=>{
  const Logs = require('mongoose').model('logs');
  if(JSON.stringify(req.body) == undefined){
    const logs = new Logs({
      metodo: req.method, 
      ip: req.ip,
      url: req.originalUrl
    });
    logs.save();
  }else{
    if(req.user){
      const logs = new Logs({
        metodo: req.method, 
        ip: req.ip,
        url: req.originalUrl,
        query: req.body.query,
        usuario: req.user.id
      });
      logs.save();
    }else{
      const logs = new Logs({
        metodo: req.method, 
        ip: req.ip,
        url: req.originalUrl,
        query: req.body.query
      });
      logs.save();
    }

  }
  next();
});

const deploy = require('./deploy').deploy;
//Integracion de graphql
app.use('/graphql', bodyParser.json(),  
//apolloUploadExpress(),
expressGraphQL({
  schema,
  graphiql: !deploy
}));

//Area de pruebas
app.get('/pruebas', function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  require('./pruebas').pruebas(req, res);
  res.end();
});


//Configuracion 
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
  console.log(`${demos_gql_http}`); 
  console.log(`${demos_gql_ws}/subscriptions`); 
});