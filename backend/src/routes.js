const express = require('express');
const multer = require('multer'); //rota de upload de posts, comunição do imsominia com o express
const uploadConfig = require('./config/upload');

const PostController = require('./controllers/PostController');
const LikeController = require('./controllers/LikeController');

const routes = new express.Router();
const upload = multer(uploadConfig);
//retorna os posts
routes.get('/posts', PostController.index);//retorna todos os posts nos feeds
routes.post('/posts', upload.single('image'), PostController.store);
    
routes.post('/posts/:id/like', LikeController.store); //retornar likes
module.exports = routes;