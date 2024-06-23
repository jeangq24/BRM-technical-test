require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const logger = require('./lib/logs');

const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_NAME,
} = process.env;

let sequelize;

try {
  sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
    logging: msg => logger.debug(msg),
    native: false,
  });
  logger.info('Connection to the database has been established successfully.');
} catch (error) {
  logger.error('Unable to connect to the database:', error);
}

const modelsDir = path.join(__dirname, 'models');
const modelDefiners = [];

try {
  fs.readdirSync(modelsDir)
    .filter(file => (file.indexOf('.') !== 0) && (file.slice(-3) === '.js'))
    .forEach(file => {
      modelDefiners.push(require(path.join(modelsDir, file)));
    });
  logger.info('Models have been loaded successfully.');
} catch (error) {
  logger.error('Error loading models:', error);
}

try {
  modelDefiners.forEach(model => model(sequelize));
  sequelize.models = Object.entries(sequelize.models).reduce((acc, [name, model]) => {
    const capitalizedModelName = name.charAt(0).toUpperCase() + name.slice(1);
    acc[capitalizedModelName] = model;
    return acc;
  }, {});
  logger.info('Models have been defined and capitalized successfully.');
} catch (error) {
  logger.error('Error defining models:', error);
}

const { Person, User, Rol, Sale, Product } = sequelize.models;

Person.hasOne(User);
User.belongsTo(Person);

User.belongsTo(Rol);
Rol.hasMany(User);   

User.hasOne(Sale, { foreignKey: 'userId' });
Sale.belongsTo(User, { foreignKey: 'userId' });

Sale.belongsToMany(Product, { through: 'SaleProduct' });
Product.belongsToMany(Sale, { through: 'SaleProduct' });

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
