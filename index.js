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

//Configuracion de la base de datos
const config = {
  user: 'admin',
  password: 'n0m3l0',
}

//const MONGO_URI = `mongodb://localhost/demos_db`;
const MONGO_URI = `mongodb://${config.user}:${config.password}@ds255767.mlab.com:55767/demos_db`;

mongoose.Promise = require('bluebird');
mongoose.connect(MONGO_URI).catch(err => console.error(err));


const corsOptions = {
  origin: 'http://www.demos-web.com',
  credentials: true,
}
/*
//Configruacion del CORS
const corsOptions = {
    origin: 'http://localhost:9000',  
  //origin: 'https://demos-web.herokuapp.com',
    credentials: true,
}
*/
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

//Integracion de graphql
app.use('/graphql', bodyParser.json(),  
//apolloUploadExpress(),
expressGraphQL({
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