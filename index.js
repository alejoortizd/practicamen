const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./router');
const { config } = require('./config/index')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;
const HOST = config.dbHost;

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb+srv://${USER}:${PASSWORD}@${HOST}/${DB_NAME}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Habilitar pug
app.set('view engine', 'pug');

// Carpeta para las vistas
app.set('views', path.join(__dirname, './views'))

// cargar los archivos estaticos en public
app.use(express.static('public'));

app.use('/', routes)

const host = '0.0.0.0';
const port = config.port;
app.listen(port, host, () => {
  console.log('Servidor funcionando!!')
});
