const { DataTypes } = require('sequelize');
const sequelize = require('../dbService');
const User = require('./user');
const Pergunta = require('./pergunta');

const RespostaPontos = sequelize.define('RespostaPontos', {
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
    respostaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references : {
            model: Pergunta,
            key: 'id'
        }
    },
    ponto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
}, {
    tableName: 'resposta_pontos'
});

module.exports = RespostaPontos;