const { DataTypes } = require('sequelize');
const sequelize = require('../dbService');
const Pergunta = require('./pergunta');

const PerguntaArquivos = sequelize.define('PerguntaArquivos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    perguntaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references : {
            model: Pergunta,
            key: 'id'
        }
    },
    arquivo: {
        type: DataTypes.BLOB,
        allowNull: false
    },
}, {
    tableName: 'pergunta_arquivos',
    timestamps: false
});

module.exports = PerguntaArquivos;