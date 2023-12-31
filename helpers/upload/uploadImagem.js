const multer = require('multer');

const fileFilter = (req, file, cb)=>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
        cb(null, true)
    }else{
        cb(null, false)
    }
}

const upload = multer ({
    storage:multer.memoryStorage(),
    limits:{ 
        fileSize: 5 * 1024 * 1024
    }, 
    fileFilter: fileFilter,
});

module.exports = upload;

