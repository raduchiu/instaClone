const express = require ('express');
const mongoose = require ('mongoose');
const path = require ('path');
const cors = require ('cors');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server); //web socket

mongoose.connect('mongodb+srv://semana:semana@cluster0-3blus.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser: true,

});
//comunicação em tempo real para todos os controllers
app.use((req, res, next) => {
    req.io = io;
    next();
});
//fazer a conexão com o frontEnd
app.use(cors());
//rota pra arquivos estáticos (imagens)
app.use('/files', express.static(path.resolve(__dirname,'..', 'uploads', 'resized')));
//roats do app

app.use(require('./routes'));

server.listen(3333);

