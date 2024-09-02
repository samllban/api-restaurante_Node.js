const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


const Pedido = sequelize.define('Pedido', {
    cliente: {
        type: DataTypes.STRING,
        allowNull: false
    },
    itens : {
        type: DataTypes.JSON,
        allowNull: false
    },
    status : {
        type: DataTypes.STRING,
        defaultValue: 'pendente'
    }
},{
    tableName: 'pedidos'
});

module.exports = Pedido;