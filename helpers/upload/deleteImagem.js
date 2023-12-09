const {initializeApp} = require('firebase/app');
const {getStorage, ref, deleteObject} = require('firebase/storage');

const firebaseConfig = {
    /*DADOS DE ACESSO DO STORAGE*/
};

const firebaseApp = initializeApp(firebaseConfig);

const storage = getStorage(firebaseApp);

const deleteImage = (imagem)=>{
    
    const deleteRef = ref(storage, imagem);

    deleteObject(deleteRef)
    .then(()=>{
        console.log('Imagem excluída com sucesso!')
    })
    .catch(()=>{
        console.log('Houve um erro ao excluir a imagem.')
    });
}

module.exports = deleteImage;