//importação do módulo express
const express = require ('express');

//criando uma instância executável do módulo express
const app = express();

//configuração para o express trabalhar com .JSON
app.use(express.json());

//configuração para o express trabalhar com dados de formulário
app.use(express.urlencoded({extended:true}));

//importação da conexão com o entry point
const connection = require("./database/database");

//importação dos controllers para o entry point
const CategoriaController = require("./controller/CategoriaController");
app.use("/", CategoriaController);

const ProdutoController = require("./controller/ProdutoController");
app.use("/", ProdutoController);

//importação das models para o entry point

const categoriaModel = require('./model/Categoria');
const produtoModel = require('./model/Produto');

//criação do servidor web de requisição/resposta
app.listen(3000, ()=>{
    console.log ("API Rodando em http://localhost:3000")
});