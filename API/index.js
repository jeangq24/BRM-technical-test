const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const logger = require('./src/lib/logs.js')

// Sincronización de los modelos y arranque del servidor
conn.sync({ force: true })
  .then(() => {
    server.listen(3001, () => {
      logger.info('Server is listening at port 3001');
    });
  })
  .catch(err => {
    logger.error('Error syncing models or starting server:', err);
  });
