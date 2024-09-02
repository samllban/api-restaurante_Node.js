const { Sequelize } = require("sequelize");
rquire("dotenv").config();

const sequelize =  new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: "mysql",
    }
);

sequelize
    .authenticate()
    .then(() => {
        console.log('Conectando ao mysql com sucesso!');
        return sequelize.sync();
    })
    .catch((err) => {
        console.error('Não foi possível conectar ao mysql:', err);
    });
    

module.exports = sequelize;