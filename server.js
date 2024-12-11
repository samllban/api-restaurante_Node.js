const express = require('express');
const app = express();

app.use(express.json());

let users = [
    { id: 1, name: 'Ana', age: 25 },
    { id: 2, name: 'Carolina', age: 30 }
];

// Listar usuários
app.get('/users', (req, res) => {
    res.json(users);
});

// Adicionar um novo usuário
app.post('/users', (req, res) => {
    const newUser = { id: users.length + 1, ...req.body };
    Object.freeze(newUser); // Tornar o objeto imutável
    users.push(newUser);
    res.json(newUser);
});

// Modificar um usuário
app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);

    if (!user) {
        return res.status(404).send('Usuário não encontrado');
    }

    // Configurando propriedades avançadas (exemplo)
    Object.defineProperty(user, 'name', {
        value: req.body.name || user.name,
        writable: false, // Não permite alterações futuras
        enumerable: true,
        configurable: false
    });

    res.json(user);
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
