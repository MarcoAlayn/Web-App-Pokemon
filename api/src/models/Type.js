const axios = require('axios');
const { DataTypes, UUID } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('type', {
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
        }
    })
}
