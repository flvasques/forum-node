const User = require('../models/user');
const Pergunta = require('../models/pergunta');
const Resposta = require('../models/resposta');
const moment = require('moment');

const bcrypt = require("bcrypt");
const saltRounds = 5;

class UserController {
    async index(req, res) {
        try {
            const { user } = req.session;
            User.findAndCountAll({
                where: {
                    id: user.id
                },
                include: [
                    { model: Pergunta, as: 'perguntas' },
                    { model: Resposta, as: 'respostas' }
                ]
            }).then( (usuario) => {
                return res.render('perfil', {perguntas: usuario.rows[0].perguntas, respostas: usuario.rows[0].respostas, user: user, moment: moment});
            });
        } catch (error) {
            console.log(error);
        }
    }

    async cadastrar(req, res) {
        res.render('cadastro', {user: null, msg: null, name: null, email: null});
    }

    async criarUsuario(req, res) {
        try {
            const { user } = req.session;
            const { name, email, password } = req.body;
            User.findOne({
                where: {
                    email: email
                }
            }).then( (usuario) => {
                if(usuario == null) {
                    bcrypt.hash(password, saltRounds, (err, hash) => {
                        if (err) {
                          throw err;
                        } else {
                            User.create({
                            nome: name,
                            email: email,
                            password: hash
                            }).then( (novoUsuario) => {
                                req.session.user = {
                                    id: novoUsuario.id,
                                    name: novoUsuario.nome,
                                    email: novoUsuario.email
                                }
                                return res.redirect('/');
                            });
                        }
                    });
                } else {
                    res.render('cadastro', {user: user, msg: 'Email já cadastrado', name: name, email: email});
                }
                console.log(usuario);
            });
            
        } catch (error) {
            console.log(error);
        }
    }

    async login(req, res) {
        res.render('login', {user: null, msg: null, email: null});
    }


    async doLogin(req, res) {
        try {
            const { email, password } = req.body;
            User.findOne({
                where: {
                    email: email
                }
            }).then( (usuario) => {
                if (usuario) {
                    const correto = bcrypt.compareSync(password, usuario.password);
                    if (correto) {
                        req.session.user = usuario;
                        return res.redirect('/');
                    } else {
                        res.render('login', {user: null, msg: 'Email os senha incorretos', email: email});
                    }
                } else {
                    res.render('login', {user: null, msg: 'Email os senha incorretos', email: email});
                }
            })
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = UserController;