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

Person.hasOne(User); // Relación 1:1 entre Person y User
User.belongsTo(Person); // User pertenece a una Person

User.belongsTo(Rol); // User pertenece a un Rol
Rol.hasMany(User); // Un Rol puede tener muchos Users

User.hasOne(Sale); // User tiene una relación 1:1 con Sale
Sale.belongsTo(User); // Sale pertenece a un User

Sale.belongsTo(Product); // Sale pertenece a un Product
Product.hasMany(Sale); // Un Product puede tener muchos Sales



module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
