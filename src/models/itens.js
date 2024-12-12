const { DataTypes} = require('sequelize');
const sequelize = require('../config/database');
const Pedido = require('./pedido.js');

const Itens = sequelize.define('Itens', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    preco: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    pedidoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Pedido,
            key: 'id'
        },
    }
}, {
    tableName: 'itens_pedido'
});

module.exports = Itens;
