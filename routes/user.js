const { isAuth, goLogin, notAuth } = require('../helpers/middlewares');
const { Router } = require('express');
const router = Router();

const UserController = require('../controllers/user-controller');
const userController = new UserController();

router.get('/cadastrar', notAuth, userController.cadastrar);
router.post('/cadastrar', notAuth, userController.criarUsuario);
router.get('/login', notAuth, userController.login);
router.post('/login', notAuth, userController.doLogin);
router.get('/perfil', goLogin, userController.index);

module.exports = router;