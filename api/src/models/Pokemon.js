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
      unique: true
    },
    life: {
      type: DataTypes.INTEGER
    },
    attack: {
      type: DataTypes.INTEGER
    },
    defense: {
      type: DataTypes.INTEGER
    },
    speed: {
      type: DataTypes.INTEGER
    },
    height: {
      type: DataTypes.INTEGER
    },
    weight: {
      type: DataTypes.INTEGER
    },
    create: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  });
};
