var express = require("express");
var router = express.Router();

var app = express();
app.use(router);

router.get('/', (req, res) => {
    return res.render('home');
});

module.exports = app;