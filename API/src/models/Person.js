const { DataTypes } = require('sequelize');
const logger = require('../lib/logs');
const {STRING, INTEGER, DATE} = DataTypes; 
module.exports = (sequelize) => {
  try {
    // Definición del modelo
    sequelize.define('Person', {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'The name field cannot be empty'
          }
        }
      },
      last_name: {
        type: STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'The last name field cannot be empty'
          }
        }
      },
      birthdate: {
        type: DATE,
        allowNull: false,
        validate: {
          isDate: {
            msg: 'The birthdate field must be a valid date'
          },
          isBefore: {
            args: [new Date().toISOString().split('T')[0]],
            msg: 'The birthdate cannot be in the future'
          }
        }
      }
    }, {
      timestamps: false,
      hooks: {
        beforeValidate: (person, options) => {
          logger.info('Validating person:', person);
        },
        afterValidate: (person, options) => {
          logger.info('Validation completed for person:', person);
        }
      }
    });

    logger.info('Person model has been defined successfully.');
  } catch (error) {
    logger.error('Error defining Person model:', error);
  }
};
