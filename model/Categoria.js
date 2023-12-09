//importação do módulo sequelize
const sequelize = require('sequelize');

//importação da conexão com o banco de dados
const connection = require("../database/database");

//mapeamento das tabelas de categoria
const Categoria = connection.define(
'tbl_categoria',{
    cod_categoria:{
        type: sequelize.INTEGER,
        autoIncrement: true,
        primaryKey:true
    },
    nome_categoria:{
        type: sequelize.STRING(250), 
    },
    obs_categoria:{
        type:sequelize.TEXT
    }
}
);

Categoria.sync({force:false})

module.exports = Categoria;
