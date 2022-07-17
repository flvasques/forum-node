var dbService = require('../dbService');
const User = require('../models/user');
const Pergunta = require('../models/pergunta');
const Resposta = require('../models/resposta');
const Tag = require('../models/tag');
const PerguntaArquivos = require('../models/perguntaArquivos');
const TagPergunta = require('../models/tagPergunta');
const RespostaPontos = require('../models/respostaPontos');
const url = require('url');
const sequelize = require('../dbService');


class HomeController { 
    async index (req, res) {
        const { user } = req.session;
        try {
            const { tag } = req.body;
            const url_parts = url.parse(req.originalUrl, true);
            const query = url_parts.query;
            console.log(query);
            let proxPag = 0;
            let pagAtual = 10;
            if(!query.pag) {
                proxPag = 2;
            } else {
                pagAtual = 10 * query.pag;   
            }
            let includes = [
                { model: Resposta, as: 'resposta' },
                { model: User, as: 'usuarioP' },
                
            ];
            let stringTag = '';
            if (tag || query.tag) {
                if(tag) {
                    pagAtual = 10;
                    if(tag != 0) {
                        includes.push({ model: Tag, as: 'tags', attributes: ['id'],
                        where: {id: parseInt(tag)}
                        })
                    } 
                    stringTag = `&tag=${tag}`;            
                } else {
                    if(query.tag != 0) {
                        includes.push({ model: Tag, as: 'tags', attributes: ['id'],
                        where: {id: parseInt(query.tag)}
                        })
                    }
                    stringTag = `&tag=${query.tag}`;
                }
            }
           const lista = await Pergunta.findAndCountAll({
                include: includes,
                where: {},
                limit: pagAtual,
                offset: 0,
                order: [
                    ['createdAt', 'DESC'],
                ]                
            });
            const tags = await Tag.findAll({
                where: {}
            });
            if(query.pag) {
                proxPag = query.pag + 1;
            }
            proxPag = proxPag + '' + stringTag;
            return res.render('home', {lista: lista, user: user, proxPag: proxPag, tags: tags, tagSelecionada: tag || query.tag});
        } catch (error) {
            console.log(error);
        }
        
    }
    async perguntar (req, res) {
        const { user } = req.session;
        try {
            Tag.findAll().then(
                (tags) => {
                    return res.render('perguntar', {pergunta: null, user: user, tags: tags});
                }
            )
        } catch (error) {
            console.log(error);
        }
    }

    async criarPergunta (req, res) {
        const { user } = req.session;
        try {
            const { titulo, texto, tags } = req.body;

            //return res.redirect(`perguntar`);
          const pergunta = await Pergunta.create({
                userId: user.id,
                titulo: titulo,
                texto: texto
            });

            if (req.files.length > 0) {
                const arquivos = req.files;
                for(const arquivo of arquivos) {
                    await PerguntaArquivos.create({
                        perguntaId: pergunta.id,
                        arquivo: arquivo.buffer.toString('base64')
                    });
                }
            }
            if(tags) {
                if (Array.isArray(tags)) {
                    for (const tag of tags) {
                        await TagPergunta.create({perguntaId: pergunta.id, tagId: tag});
                    }                    
                } else {
                    await TagPergunta.create({perguntaId: pergunta.id, tagId: tags});
                }
            }
            return res.redirect(`/pergunta/${pergunta.id}`);

        } catch (error) {
            console.log(error);
        }
    }

    async verPergunta (req, res) {
        const { user } = req.session;
        try {
            const id = req.params.id;
            const pergunta = await Pergunta.findOne({
              where: {
                id: id
              },
              include: [

                { model: User, as: 'usuarioP' },
                { model: PerguntaArquivos, as: 'arquivos' },
                { model: Tag, as: 'tags' },
                { model: User, as: 'usuarioP' }
            ],
            });
            const respostas = await Resposta.findAll({
                where: {
                    perguntaId: pergunta.id,
                },
                order:[
                    ['melhorResposta', 'DESC'],
                    ['positivos', 'DESC'],
                    ['negativos', 'ASC'],
                    ['createdAt', 'DESC'],
                ]
            });
            return res.render('single-pergunta', {pergunta: pergunta, user: user, respostas: respostas });
        } catch (error) {
            console.log(error);
        }
    }

    async responder (req, res) {
        const { user } = req.session;
        try {
            const { perguntaId, texto } = req.body;
            await Resposta.create({
                userId: user.id,
                perguntaId: perguntaId,
                texto: texto
            });
            return res.redirect(`/pergunta/${perguntaId}`);
        } catch (error) {
            console.log(error);
        }
    }

    async votar (req, res) {
        const { user } = req.session;
        const { resp, pts } = req.params;
        try {
            let resPts = await RespostaPontos.findOne({
                where: {
                    userId: user.id,
                    respostaId: resp
                }
            });
            const resposta = await Resposta.findByPk(resp);
            if(resposta == null) {
                return res.redirect('/');
            }
            let ptsAtn = 0;
            if(resPts != null) {
                ptsAtn = resPts.ponto;
                await resPts.destroy();
                if (ptsAtn == 1) {
                    await sequelize.query(`UPDATE respostas SET positivos = (positivos - 1) WHERE id = ${resp}`);
                } else {
                    await sequelize.query(`UPDATE respostas SET negativos = (negativos - 1) WHERE id = ${resp}`);
                }
            }
           
            if (ptsAtn != parseInt(pts)) {
                resPts = await RespostaPontos.create({
                    userId: user.id,
                    respostaId: resp,
                    ponto: pts,
                });
                if (parseInt(pts) == 1) {
                    await sequelize.query(`UPDATE respostas SET positivos = (positivos + 1) WHERE id = ${resp}`);
                } else {
                    await sequelize.query(`UPDATE respostas SET negativos = (negativos + 1) WHERE id = ${resp}`);
                }
            }            
            return res.redirect(`/pergunta/${resposta.perguntaId}`);
        } catch (error) {
            console.log(error);
        }
    }

    async toggleResposta (req, res) {
        const { user } = req.session;
        const { resp } = req.params;
        try {
            const resposta = await Resposta.findByPk(resp);
            if(resposta == null) {
                return res.redirect('/');
            }
            const pergunta = await Pergunta.findByPk(resposta.perguntaId);
            if (pergunta.userId == user.id) {
                await sequelize.query(`UPDATE respostas SET melhorResposta = 0 WHERE perguntaId = ${pergunta.id}`);
                await sequelize.query(`UPDATE respostas SET melhorResposta = 1 WHERE id = ${resp}`);              
            }
            return res.redirect(`/pergunta/${resposta.perguntaId}`);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = HomeController;