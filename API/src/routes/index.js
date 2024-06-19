const { Router } = require('express');
const fs = require('fs');
const path = require('path');
const logger = require('../lib/logs');

const router = Router();
const routesDir = path.join(__dirname);

fs.readdirSync(routesDir)
  .filter(file => file !== 'index.js' && file.slice(-3) === '.js')
  .forEach(file => {
    try {
      const route = require(path.join(routesDir, file));
      const routeName = file.split('.')[0];
      router.use(`/${routeName}`, route);
      logger.info(`Route /${routeName} has been loaded successfully.`);
    } catch (error) {
      logger.error(`Error loading route /${file}:`, error);
    }
  });

module.exports = router;
