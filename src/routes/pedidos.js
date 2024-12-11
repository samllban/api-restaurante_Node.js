const express = require("express");
const pedidoController = require("../controllers/pedidoController");

const router = express.Router();

router.get('/', (req, res) => pedidoController.getAllPedidos(req, res));

router.post('/', (req, res) => pedidoController.createPedido(req, res));

router.get('/:id', (req, res) => pedidoController.readPedido(req, res));

router.put('/:id', (req, res) => pedidoController.updatePedigo(req, res));

router.delete('/:id', (req, res) => pedidoController.deletePedido(req, res));

module.exports = router;
