const sequelize = require('./dbService.js');
const User = require('./models/user');
const Pergunta = require('./models/pergunta');
const Resposta = require('./models/resposta');

const dbsync = async () => {
    User.hasMany(Pergunta, {
        foreignKey: 'userId',
        as: 'perguntas'
    });
    User.hasMany(Resposta, {
        foreignKey: 'userId',
        as: 'respostas'
    });

    Pergunta.hasMany(Resposta, {
        foreignKey: 'id',
        as: 'resposta'
    });
    Pergunta.belongsTo(User, {
        foreignKey: 'userId',
        as: 'usuarioP'
    });

    Resposta.belongsTo(User, {
        foreignKey: 'userId',
        as: 'usuarioR'
    });
    Resposta.belongsTo(Pergunta, {
        foreignKey: 'perguntaId',
        as: 'pergunta'
    });

    await sequelize.sync();
    
} 

module.exports = dbsync;