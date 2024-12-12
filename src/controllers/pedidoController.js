const Pedido = require('../models/pedido');
const Itens = require("../models/itens");


function validarDados(cliente, itens) {
    if (!cliente || !Array.isArray(itens) || itens.length === 0 ) {
        throw new Error('Dados inválidos: Cliente e itens são obrigatórios.');
    }
    const totalCalculado = itens.reduce((acc, item) => {
        if (!item.nome || !item.quantidade || !item.preco) {
            throw new Error("Cada item deve ter nome, quantidade e preço.");
        }
        return acc + item.quantidade * item.preco;
    }, 0);
    if(totalCalculado <= 0) {
        throw new Error('O total deve ser maior que 0.');
    }
    return totalCalculado;
}

class PedidoController {
    async getAllPedidos(req, res) {
        try {
            const pedidos = await Pedido.findAll({
                include: [
                    {
                        model: Itens,
                        as: 'pedidoItens'
                    }
                ]
        });

            res.render('pedidos/index', { title: 'Pedidos', pedidos });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }


    async createPedido(req, res) {
        const { cliente, itens, status } = req.body;
        console.log(req.body);

        try {
            const totalCalculado = validarDados(cliente, itens);

            const statusPedido = status || "pendente";
            console.log('Total Calculado:', totalCalculado);

            const pedidoCriado = await Pedido.create({
                cliente,
                total: totalCalculado,
                status: statusPedido
            });

            for (const item of itens) {
                await Itens.create({
                    nome: item.nome,
                    quantidade: item.quantidade,
                    preco: item.preco,
                    pedidoId: pedidoCriado.id
                })
            }
            res.status(201).json({ message: "Pedido criado com sucesso!", pedido: pedidoCriado });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async readPedido(req, res) {
        const id = req.params.id;
        try {
            const pedido = await Pedido.findByPk(id);
            res.render('pedidos/show', { title: 'Pedido', pedido });
        } catch (err) {
            res.status(404).json({ error: 'Pedido não encontrado' });
        }
    }

    async updatePedido(req, res) {
        const id = req.params.id;
        const { cliente, itens, total } = req.body;

        try {
            validarDados(cliente, itens);
            const pedido = await Pedido.findByPk(id);

            if (!pedido) {
                return res.status(404).json({ error: 'Pedido não encontrado' });
            }

            pedido.cliente = cliente;
            pedido.itens = itens;
            pedido.total = total;
            await pedido.save();

            res.redirect('/pedidos');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async deletePedido(req, res) {
        const id = req.params.id;
        try {
            await Pedido.destroy({ where: { id } });
            res.redirect('/pedidos');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = new PedidoController();
