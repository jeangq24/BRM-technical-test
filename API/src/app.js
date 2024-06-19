const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const logger = require('./lib/logs.js');
const routes = require('./routes/index.js');

const server = express();
server.name = 'API';

// Middleware de logging
server.use(morgan('dev', {
  stream: {
    write: message => logger.info(message.trim())
  }
}));

// Configuración de middlewares
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());

// Configuración de CORS
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

// Rutas principales
server.use('/', routes);

// Middleware para manejo de errores
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  logger.error('Error:', err);
  res.status(status).send({
    error: {
      status,
      message,
    },
  });
});

// Manejador de rutas no encontradas
server.use((req, res) => {
  const status = 404;
  const message = 'Not Found';
  logger.warn(`404 - Not Found - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  res.status(status).send({
    error: {
      status,
      message,
    },
  });
});

module.exports = server;
