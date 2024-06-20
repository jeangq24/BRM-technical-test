const { DataTypes } = require('sequelize');
const {INTEGER, STRING,DATE, DECIMAL, DOUBLE} = DataTypes
const logger = require('../lib/logs');

module.exports = (sequelize) => {
  try {
    // Definición del modelo
    sequelize.define('Product', {
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
      lot_number: {
        type: STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'The lot number field cannot be empty'
          }
        }
      },
      price: {
        type: INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'The price field cannot be empty'
          },
          min: {
            args: [0],
            msg: 'The price must be greater than or equal to 0'
          }
        }
      },
      stock: {
        type: INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: 'Stock must be an integer'
          },
          min: {
            args: [0],
            msg: 'Stock must be greater than or equal to 0'
          }
        }
      },
      entry_date: {
        type: STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'The entry date field cannot be empty'
          },
          // isDate: {
          //   msg: 'Invalid date format for entry date'
          // },
          // isBefore: {
          //   args: [new Date().toISOString().split('T')[0]],
          //   msg: 'Entry date cannot be in the future'
          // }
        }
      }
    }, {
      timestamps: false,
      hooks: {
        beforeValidate: (product, options) => {
          logger.info('Validating product:', product);
        },
        afterValidate: (product, options) => {
          logger.info('Validation completed for product:', product);
        }
      }
    });

    logger.info('Product model has been defined successfully.');
  } catch (error) {
    logger.error('Error defining Product model:', error);
  }
};
