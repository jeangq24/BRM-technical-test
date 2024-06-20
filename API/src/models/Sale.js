const { DataTypes } = require('sequelize');
const {INTEGER, DECIMAL, DATE} = DataTypes;
const logger = require('../lib/logs');

module.exports = (sequelize) => {
  try {
    // Definición del modelo
    sequelize.define('Sale', {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      date: {
        type: DATE,
        allowNull: false,
        validate: {
          isDate: {
            msg: 'Invalid date format for fecha'
          },
          isBefore: {
            args: [new Date().toISOString().split('T')[0]],
            msg: 'Sale date cannot be in the future'
          }
        }
      },
      total: {
        type: INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'The total field cannot be empty'
          },
          min: {
            args: [0],
            msg: 'Total must be greater than or equal to 0'
          }
        }
      }
    }, {
      timestamps: false,
      hooks: {
        beforeValidate: (sale, options) => {
          logger.info('Validating sale:', sale);
        },
        afterValidate: (sale, options) => {
          logger.info('Validation completed for sale:', sale);
        }
      }
    });

    logger.info('Sale model has been defined successfully.');
  } catch (error) {
    logger.error('Error defining Sale model:', error);
  }
};
