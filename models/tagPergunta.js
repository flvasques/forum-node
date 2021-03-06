const { DataTypes } = require('sequelize');
const sequelize = require('../dbService');
const Pergunta = require('./pergunta');
const Tag = require('./tag');

const TagPergunta = sequelize.define('TagPergunta', {
    perguntaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references : {
            model: Pergunta,
            key: 'id'
        }
    },
    tagId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references : {
            model: Tag,
            key: 'id'
        }
    },
}, {
    tableName: 'tag_perguntas'
});

module.exports = TagPergunta;