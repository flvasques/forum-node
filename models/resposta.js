const { DataTypes } = require('sequelize');
const sequelize = require('../dbService');
const User = require('../models/user');
const Pergunta = require('../models/pergunta');

const Resposta = sequelize.define('Resposta', {
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
    perguntaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references : {
            model: Pergunta,
            key: 'id'
        }
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
}, {
    tableName: 'respostas'
});

module.exports = Resposta;