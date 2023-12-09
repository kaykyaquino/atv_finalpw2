//importação do módulo sequelize
const sequelize = require('sequelize');

//importação da conexão com o banco de dados
const connection = require("../database/database");

const Categoria = require('./Categoria');

//mapeamento das tabelas de produto
const Produto = connection.define(
    'tbl_produtos', {
        cod_produto:{
            type: sequelize.INTEGER,
            autoIncrement: true,
            primaryKey:true,
        },
        cod_categoria:{
            type: sequelize.INTEGER,
            allowNull: false,
        },
        nome_produto :{
            type: sequelize.STRING(255),
            allowNull: false,
        },
        valor_produto:{ 
            type: sequelize.DECIMAL(10, 2),
            allowNull: false,
        },
        imagem_produto:{
            type: sequelize.STRING(500),
            allowNull: false,
        },
        descricao_produto:{
            type: sequelize.TEXT,
            allowNull: false,
        },
        imagem_url:{
            type: sequelize.STRING(500),
            allowNull: false
        }
    });

    Categoria.hasMany(Produto, {
        foreignKey: 'cod_categoria',
        sourceKey: 'cod_categoria'
    });
        
    Produto.belongsTo(Categoria, {
        foreignKey: 'cod_categoria',
        sourceKey: 'cod_categoria'
    });

    Produto.sync({force:false})

    module.exports = Produto; 