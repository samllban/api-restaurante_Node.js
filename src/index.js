const express = require('express');
const bodyParser = require("body-parser");
const math = require('../../notacoes/modulos.js');


const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json);

//configurando o ejs
app.set('view engine', 'ejs');

//rota inicial

app.get('/', (req, res) => {
    res.send('bem vindo a apicação de restaurante!');
});

app.listen(port, () => {
    console.log(`Servidor rodando em <http://localhost:${port}`)
});

//console.log(math.add(2, 3)); // 5
//console.log(math.subtract(5, 2));
