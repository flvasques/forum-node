const sequelize = require('./dbService.js');
const User = require('./models/user');
const Pergunta = require('./models/pergunta');
const Resposta = require('./models/resposta');

const dbsync = async () => {
    User.hasMany(Pergunta, {
        foreignKey: 'perguntas',
        as: 'perguntas'
    });
    Pergunta.hasMany(Resposta, {
        foreignKey: 'resposta',
        as: 'resposta'
    });
    Pergunta.belongsTo(User, {
        foreignKey: 'userId'
    });
    Resposta.belongsTo(User, {
        foreignKey: 'userId'
    });
    Resposta.belongsTo(Pergunta, {
        foreignKey: 'perguntaId'
    });

    await sequelize.sync();
    
} 

module.exports = dbsync;