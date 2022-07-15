const sequelize = require('./dbService.js');
const User = require('./models/user');
const Pergunta = require('./models/pergunta');
const Resposta = require('./models/resposta');
const Tag = require('./models/tag');
const TagPergunta = require('./models/tagPergunta');
const RespostaPontos = require('./models/respostaPontos');
const PerguntaArquivos = require('./models/perguntaArquivos');

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
    Pergunta.hasMany(PerguntaArquivos, {
        foreignKey: 'perguntaId',
        as: 'arquivos'
    })

    Resposta.belongsTo(User, {
        foreignKey: 'userId',
        as: 'usuarioR'
    });
    Resposta.belongsTo(Pergunta, {
        foreignKey: 'perguntaId',
        as: 'pergunta'
    });
    Resposta.hasMany(RespostaPontos, {
        foreignKey: 'respostaId',
        as: 'pontos'
    })


    await sequelize.sync();
    
} 

module.exports = dbsync;