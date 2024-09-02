const express = require('express');
const bodyParser = require("body-parser");

const sequelize = require('./config/database');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json);

//configurando o ejs
app.set('view engine', 'ejs');
app.set("views", "src/views");

//rota inicial

sequelize.sync()
    .then(() => {
        console.log('Banco de dados sincronizado');
        app.listen(port, () => {
            console.log(`Servidor rodando na porta ${port}`);
        });
    })
    .catch((err) => console.error('erro ao sincronizar com o banco de dados:', err));
    
