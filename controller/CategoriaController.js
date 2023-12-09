const express = require("express");

const categoriaModel = require("../model/Categoria");
const { where } = require("sequelize");

const router = express.Router();

router.post("/categoria/cadastrarCategoria", (req, res)=>{

    let {nome_categoria} = req.body;

    categoriaModel.create({nome_categoria})

    .then(() =>{
        return res.status(201).json({
            errorStatus: false,
            messageStatus: "Categoria inserida com sucesso!"
        });
    })
    .catch((error) =>{
        return res.status(500).json({
            errorStatus: true,
            messageStatus: error
        });
    });
});

router.get("/categoria/listarCategoria", (req, res) =>{

    categoriaModel.findAll()
        .then(
            (categorias) =>{
                return res.status(200).json(categorias)
            }
        )
        .catch((error) =>{
            return res.status(500).json({
                errorStatus: true,
                messageStatus: error
            });
        });

});

router.get("/categoria/listarID/:codigo_categoria", (req, res) =>{
    let {codigo_categoria} = req.params;

    categoriaModel.findByPk (codigo_categoria)
        .then(
            categoria =>{
                return res.status(200).json(categoria);
            }
        )
        .catch((error) =>{
            return res.status(500).json({
                errorStatus: true,
                messageStatus: error
            });
        });
});

router.put("/categoria/alterarCategoria", (req, res) =>{
    let {cod_categoria, nome_categoria} = req.body;

    categoriaModel.update (
        {nome_categoria},
        {where:{cod_categoria}}
    )
    .then(
        () =>{
            return res.status(200).json(
        {
            errorStatus: false,
            messageStatus: "Categoria alterada com sucesso!"
        }
            
            )
        })

    .catch((error) =>{
        return res.status(500).json({
            errorStatus: true,
            messageStatus: error
        });
    });
})

router.delete("/categoria/excluirCategoria/:cod_categoria", (req, res) =>{
    let {cod_categoria} = req.params;

    categoriaModel.destroy(
        {where:{cod_categoria}}
    )
    .then(
        () =>{
            return res.status(200).json(
                {
                    errorStatus: false,
                    messageStatus: "Categoria excluída com sucesso!"
                }
            )
        }
    )
    .catch((error) =>{
        return res.status(500).json({
            errorStatus: true,
            messageStatus: error
        });
    });
})

module.exports = router;