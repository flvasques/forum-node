const { isAuth, goLogin, notAuth } = require('../helpers/middlewares');
const express = require("express");
const router = express.Router();
const app = express();
const multer = require('multer');
const storage = multer.memoryStorage();
const env = require('../env');

app.use(router);
  
const upload = multer({ storage: storage })

const HomeController = require('../controllers/home-controller');
const homeController = new HomeController();

router.get('/', homeController.index);
router.get('/perguntar', goLogin,homeController.perguntar);
router.post('/criar-pergunta', goLogin, upload.any(), homeController.criarPergunta);
router.get('/pergunta/:id', homeController.verPergunta);
router.post('/responder', goLogin, homeController.responder);
router.get('/melhor-resposta/:resp', goLogin, homeController.toggleResposta);
router.get ('/votar/:resp/:pts', goLogin, homeController.votar);

module.exports = app;