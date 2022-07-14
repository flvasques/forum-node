const { DataTypes } = require('sequelize');
const sequelize = require('../dbService');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imgUrl: {
        type: DataTypes.STRING,
        field: 'img_url',
        allowNull: true
    }
}, {
    tableName: 'users'
});

module.exports = User;