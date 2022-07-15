const { DataTypes } = require('sequelize');
const sequelize = require('../dbService');

const Tag = sequelize.define('Tag', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: true
    },
}, {
    tableName: 'tags',
    timestamps: false
});

module.exports = Tag;