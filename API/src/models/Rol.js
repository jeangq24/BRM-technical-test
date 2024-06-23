const { DataTypes } = require('sequelize');
const logger = require('../lib/logs');
const {STRING, BOOLEAN, INTEGER} = DataTypes; 
module.exports = (sequelize) => {
  try {
    // Definición del modelo
    sequelize.define('Rol', {
      status: {
        type: BOOLEAN,
        allowNull: false,
        defaultValue: true,
        validate: {
          notNull: {
            msg: 'The status field cannot be null'
          }
        }
      },
      id: {
        type: STRING,
        allowNull: false,
        primaryKey: true,
        unique: true,
        validate: {
          notEmpty: {
            msg: 'The rol field cannot be empty'
          },
        }
      }
    }, {
      timestamps: false,
      hooks: {
        beforeValidate: (rol, options) => {
          logger.info('Validating rol:', rol);
        },
        afterValidate: (rol, options) => {
          logger.info('Validation completed for rol:', rol);
        }
      }
    });

    logger.info('Rol model has been defined successfully.');
  } catch (error) {
    logger.error('Error defining Rol model:', error);
  }
};
