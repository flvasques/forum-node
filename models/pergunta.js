const { DataTypes } = require('sequelize');
const sequelize = require('../dbService');

const Pergunta = sequelize.define('Pergunta', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    texto: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    criadoEm: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.NOW
    },
    atualizadoEm: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.NOW
    },
}, {
    tableName: 'perguntas'
});

module.exports = Pergunta;