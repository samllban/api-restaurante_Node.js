const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Pedido = sequelize.define('Pedido', {
    cliente: {
        type: DataTypes.STRING,
        allowNull: false
    },
    itens: {
        type: DataTypes.JSON,
        allowNull: false
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'pendente'
    }
}, {
    tableName: 'pedidos'
});

module.exports = Pedido;


/* 
tipos de dados numericos:

INTEGER: INT
BIGINT: numero inteiro maior que INTEGER
FLOAT: flutuante
DOUBLE: numero flutuante
DECIMAL: numero decimal


tipos de dados string

STRING: texto com ate 255car
TEXT: texto tamanho ilimitado
CHAR: string de comprimente fixo
UUID: identificador universal único


tipos de dados booleanos

BOOLEAN: armazena valores true ou false


tipos de dados de data e hora

DATE: data e hora
DATEONLY: apenas a data
TIME: apenas a hora
NOW: valor padão para a hora atual 


tipos de dados Binarios

BLOB: armazena dados binarios(usados para imagens, videos, etc)

tipos de dados JSON

JSON: permite armazenar objetos ou arrays JSON
JSONB: json otimizado(armazenado em formato binário)



Outros Tipos de Dados


ENUM: Valores enumerados.
Exemplo: type: DataTypes.ENUM('pendente', 'concluído', 'cancelado').
ARRAY: Array de qualquer tipo.
Exemplo: type: DataTypes.ARRAY(DataTypes.STRING) (array de strings).
VIRTUAL: Campo virtual (não armazenado no banco).
Exemplo: type: DataTypes.VIRTUAL (usado para cálculos ou dados derivados).



Opções para Colunas

1 - allowNull 
**define se o campo pode ter valores nulos

2 - defaultValue
**define um valor padrão para o campo
ex: defaultValue: 'pedente'

3 - primaryKey
**define se a coluna é chave primária da tabela
ex: primaryKey: true

4 - autoIncrement
**faz com que o valor seja incrementado automaticamente
a cada nova inserção(apenas números)

- unique
**define se os valores do campo devem ser únicos
ex: unique: true

6 - validate
**permite add validações personalizadas
ex: validate: {
    isInt: true,
    min: 18
}

7 - references

**define a relação entre as tabelas
clienteId: {
    type: DataTypes.INTEGER,
    references: {
        model: 'Cliente' - nome da tabela referenciada
        key: 'id' - campo da tabela referenciada
    }
}

8 - comment 
**add comentários para a coluna(para fins de documentação)
comment: "Descrição detalhada do pedido"

*/

