const express = require('express');

const {initializeApp} = require('firebase/app');
const {getStorage, ref, getDownloadURL, uploadBytes, listAll, deleteObject} = require('firebase/storage');

const app = express();
const router = express.Router();

const Produto = require('../model/Produto');
const upload = require('../helpers/upload/uploadImagem');
const deleteImage = require('../helpers/upload/deleteImagem');


const firebaseConfig = {
     /*DADOS DE ACESSO DO STORAGE*/
};

    const firebaseApp = initializeApp(firebaseConfig);

    const store = getStorage(firebaseApp);

    router.post('/produto/CadastrarProduto', upload.single('file', 1), (req, res) => {

        const { nome_produto, valor_produto, descricao_produto, cod_produto, cod_categoria } = req.body;
        const file = req.file;

        let imagem_produto;
        let imagem_url;

        if (!file) {
            return res.status(400).json({
                errorStatus: true,
                errorMessage: 'Erro no envio da imagem.'
            });
        }
     
        const fileName = Date.now().toString() + '-' + file.originalname;
        const fileRef = ref(store, fileName);
     
        uploadBytes(fileRef, file.buffer)
            .then((snapshot) => {
                const imageRef = ref(store, snapshot.metadata.name);
     
                getDownloadURL(imageRef)
                    .then(
                        (urlFinal) => {
                            imagem_produto = fileName;
                            imagem_url = urlFinal;

                        Produto.create({
                            cod_produto,
                            nome_produto,
                            valor_produto,
                            imagem_produto,
                            descricao_produto,
                            cod_categoria,
                            imagem_url
                        })
                        .then(() => {
                            return res.status(201).json({
                                errorStatus: false,
                                messageStatus: 'Produto inserido com sucesso.'
                            });
                        }).catch((error) => {
                            return res.status(500).json({
                                errorStatus: true,
                                messageStatus: 'Erro ao cadastrar o produto no banco de dados.',
                                error: error
                            });
                        });
                    })
                    .catch((error) => {
                        return res.status(500).json({
                            errorStatus: true,
                            messageStatus: 'Erro ao obter a URL de download da imagem.',
                            error: error
                        });
                    });
            })
            .catch((error) => {
                return res.status(500).json({
                    errorStatus: true,
                    messageStatus: 'Erro ao realizar o upload da imagem.',
                    error: error
                });
            });
    });

    router.get('/produto/listarProduto', (_req, res) => {

        Produto.findAll()
            .then((Produto) => {
                return res.status(200).json(Produto)
            }).catch((erro) => {
                return res.status(400).json({
                    erroStatus: true,
                    erroMensagem: erro
                });
            });
    });

router.delete('/produto/excluirProduto/:codigo_produto', (req, res) => {

    const { codigo_produto } = req.params;

    Produto.findByPk(codigo_produto)
    .then((Produto)=>{
        deleteImage(Produto.imagem_produto);
        deleteImage(Produto.imagem_url);

        Produto.destroy({
            where: { codigo_produto }
        }).then(
            () => {
                return res.status(200).json({
                    erroStatus: false,
                    mensagemStatus: 'Produto excluído com sucesso.'
                });
    
            }).catch((error) => {
                return res.status(400).json({
                    erroStatus: true,
                    erroMensagem: error
                });
            });
    })

});

module.exports = router;