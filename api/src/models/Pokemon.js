const { DataTypes, UUID } = require('sequelize');
const axios = require('axios')

module.exports = (sequelize) => {
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
      allowNule: false
    },
    name: {
      type: DataTypes.STRING,
      allowNule: false,
      unique: true,
      validate: {
        notEmpty: true,
        isAlphanumeric: true
      }
    },
    life: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 120
      }
    },
    attack: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 120
      }
    },
    defense: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 120
      }
    },
    speed: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 120
      }
    },
    height: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 120
      }
    },
    weight: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 120
      }
    },
    image: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true,
      }
    },
    create: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      validate: {
        isBoolean: true,
      }
    }
  });
};
