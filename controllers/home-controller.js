var dbService = require('../dbService');
const User = require('../models/user');
const Pergunta = require('../models/pergunta');
const Resposta = require('../models/resposta');

class HomeController { 
    async index (req, res) {
        const { user } = req.session;
        try {

            Pergunta.findAndCountAll({
                where: {
                },
                limit: 10,
                offset: 0,
                include: [
                    { model: Resposta, as: 'resposta' },
                    { model: User, as: 'usuarioP' }
                ]
            }).then(function(lista) {
                return res.render('home', {lista: lista, user: user});
            });
        } catch (error) {
            console.log(error);
        }
        
    }
    async perguntar (req, res) {
        const { user } = req.session;
        return res.render('perguntar', {pergunta: null, user: user});
    }

    async criarPergunta (req, res) {
        const { user } = req.session;
        try {
            const { titulo, texto } = req.body;
            Pergunta.create({
                userId: user.id,
                titulo: titulo,
                texto: texto
            }).then( (pergunta) => {
                return res.redirect(`/pergunta/${pergunta.id}`);
            });
        } catch (error) {
            console.log(error);
        }
    }

    async verPergunta (req, res) {
        const { user } = req.session;
        try {
            const id = req.params.id;
            Pergunta.findOne({
              where: {
                id: id
              }
            }).then( (pergunta) => {
                return res.render('single-pergunta', {pergunta: pergunta, user: user});
            });
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = HomeController;