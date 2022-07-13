const { isAuth, goLogin, notAuth } = require('../helpers/middlewares');
const express = require("express");
const router = express.Router();
const app = express();

app.use(router);

const HomeController = require('../controllers/home-controller');
const homeController = new HomeController();

router.get('/', homeController.index);

module.exports = app;