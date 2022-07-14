const express = require("express");
const cors = require("cors");
const session = require('express-session');
const sequelize = require('./dbService');
const dbsync = require('./db-sync');

const app = express();
const port = 3000;

app.use(session({
    secret: 'CHAVE DA APLICAÇÃO',
    resave: false,            // FORÇA O SALVAR DA SESSION MESMO QUE NÃO MODIFICADA
    saveUninitialized: true,  // SALVAR UMA SESSION QUE NÃO INICIALIZADA
    cookie: { secure: false } // HTTP / HTTPS
}));

app.use(cors({ origin: "*" }));

app.use(express.static('./public'));
app.use('/css', express.static(__dirname + '/node_modules/materialize-css/dist/'));

app.set('views', './views'); 
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const index = require('./routes/index');
const user = require('./routes/user');
app.use('/', index);
app.use('/usuario', user);

app.use(function (req, res, next) {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        await dbsync();

    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

const server = app.listen(port, () => {
    console.log(`Listen at ${server.address().address}:${port}`);
});
  