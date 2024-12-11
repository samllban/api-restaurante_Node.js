const Pedido = require('../models/pedido');

class PedidoController {
    async getAllPedidos(req, res) {
        try{
            const pedidos = await Pedido.findAll();
            res.render('pedidos/index', {title: 'Pedidos', pedidos});
        } catch (err) {
            res.status(500).json({error: err.message});
        }
    }

    async createPedido(req, res) {
        const { cliente, itens, total} = req.body;
        try {
            Pedido.create({cliente, itens, total});
            res.redirect('/pedidos');
        } catch (err) {
            res.status(500).json({error: err.message});
        }
    }
}

module.exports = new PedidoController();
