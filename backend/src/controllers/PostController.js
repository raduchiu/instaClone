const Post = require('../models/Post');
const sharp = require ('sharp');
const path = require ('path');
const fs = require ('fs');

module.exports = {

    //retorna os posts através do createdat
    async index(req, res){
        const posts = await Post.find().sort('-createdAt');

        return res.json(posts);
    },
    // recebe dados dos arquivos e dos posts
    async store(req, res){
        const {author, place, description, hashtags} = req.body;
        const {filename: image} = req.file;

        const [name] = image.split('.');
        const fileName = `${name}.jpg`;

        //redemensiona a imagem, deleta o arquivo principal, salva no nosso bd, altera a qualidade, envia em tempo real
        await sharp(req.file.path)
        .resize(500)
        .jpeg({quality: 70})
        .toFile(
            path.resolve(req.file.destination, 'resized', fileName)
        )

        fs.unlinkSync(req.file.path);

            //await = ação que pode demorar
            //envia em tempo real
        const post = await Post.create({
            author,
            place,
            description,
            hashtags,
            image: fileName,

        });

        req.io.emit('post', post);

        return res.json(post);
    }
};