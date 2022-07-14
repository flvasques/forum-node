const { DataTypes } = require('sequelize');
const sequelize = require('../dbService');
const User = require('../models/user');

const Pergunta = sequelize.define('Pergunta', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references : {
            model: User,
            key: 'id'
        }
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    texto: {
        type: DataTypes.TEXT,
        allowNull: false
    },
}, {
    tableName: 'perguntas'
});

module.exports = Pergunta;