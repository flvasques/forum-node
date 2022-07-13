const { DataTypes } = require('sequelize');
const sequelize = require('../dbService');

const Resposta = sequelize.define('Resposta', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    perguntaId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    texto: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    pontoPositivo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    pontoNegativo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    melhorResposta: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0
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
    tableName: 'resposta'
});

module.exports = Resposta;