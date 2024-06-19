const { DataTypes } = require('sequelize');
const logger = require('../lib/logs');
const {STRING, BOOLEAN, INTEGER} = DataTypes; 
module.exports = (sequelize) => {
  try {
    // Definición del modelo
    sequelize.define('Rol', {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
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
      rol: {
        type: STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            msg: 'The rol field cannot be empty'
          },
          len: {
            args: [3, 50],
            msg: 'The rol field must be between 3 and 50 characters long'
          }
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
