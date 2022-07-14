const { isAuth, goLogin, notAuth } = require('../helpers/middlewares');
const express = require("express");
const router = express.Router();
const app = express();

app.use(router);

const HomeController = require('../controllers/home-controller');
const homeController = new HomeController();

router.get('/', homeController.index);
router.get('/perguntar', goLogin, homeController.perguntar);
router.post('/criar-pergunta', goLogin, homeController.criarPergunta);
router.get('/pergunta/:id', homeController.verPergunta);

module.exports = app;