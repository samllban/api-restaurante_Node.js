const Pedido = require('../models/pedido');

class PedidoController {
    async getAllPedidos(req, res) {
        try {
            const pedidos = await Pedido.findAll();
            res.render('pedidos/index', { title: 'Pedidos', pedidos });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async createPedido(req, res) {
        const { cliente, itens, total } = req.body;
        try {
            Pedido.create({ cliente, itens, total });
            res.redirect('/pedidos');
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

    async updatePedigo(req, res) {
        const id = req.params.id;
        const { cliente, itens, total } = req.body;
        try {
            const pedido = await Pedido.findByPk(id);
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
