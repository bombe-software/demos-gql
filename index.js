const express = require('express');
const models = require('./models');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const configPassport = require('./config_passport');
const MongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser');
const schema = require('./src');
const app = express();
const cors = require('cors');
const config = {
  user: 'admin',
  password: 'n0m3l0',
}


const MONGO_URI = `mongodb://localhost/demos_db`;
mongoose.Promise = require('bluebird');


mongoose.connect(MONGO_URI).catch(err => console.error(err));

/*
mongoose
  .connection.once('open', () => console.log('Conectado a la base de datos'))
  .on('error', error => console.log('Error al conectar a la base de datos:', error));
*/

app.use(bodyParser.json());

const corsOptions = {
    origin: 'http://localhost:9000',
    credentials: true,
}
app.use(cors(corsOptions));
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



const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Listening on port: ' + port);
});
