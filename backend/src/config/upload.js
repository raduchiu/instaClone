const multer = require ('multer');
const path = require('path');

//destino dos arquivos e seus nomes(o nome original)
module.exports = {
    //estratégia para armazenar arquivos
    storage: new multer.diskStorage ({
        //onde to salvando as imagens, com um caminho relativo
        destination: path.resolve(__dirname,'..','..','uploads'),

        //configuração simples (não chaveado)
        filename: function(req, file, callback) {
            callback(null, file.originalname);
        }
    })
};