//importação do módulo sequelize para realizar conexão com o banco de dados 
const sequelize = require('sequelize');

//criando a conexão do banco de dados por meio do sequelize
const connection = new sequelize(
    "atv_pw2",
    "root",
    "", 
    {
        host:"localhost",
        port:  "3306",
        dialect: "mysql",
        timezone: "-03:00"    
    }
)

module.exports = connection;