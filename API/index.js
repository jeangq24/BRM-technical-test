const server = require('./src/app.js');
const { conn, Rol } = require('./src/db.js');
const logger = require('./src/lib/logs.js')

// Sincronización de los modelos y arranque del servidor
conn.sync({ force: false })
  .then(() => {
    server.listen(3001, async() => {
      logger.info('Server is listening at port 3001');
      const existingRoles = await Rol.findAll();
      if (existingRoles.length === 0) {
        const defaultRoles = [
          { id: 'Admin', status: true },
          { id: 'User', status: true },
        ];
        await Rol.bulkCreate(defaultRoles); // Asume que defaultRoles está definido en un archivo de configuración
        logger.info('Default roles have been added successfully.');
      } else {
        logger.info('Roles already exist in the database.');
      }
    });
  })
  .catch(err => {
    logger.error('Error syncing models or starting server:', err);
  });
