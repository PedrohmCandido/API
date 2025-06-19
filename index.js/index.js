const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require ('../swagger.json');


const express = require('express');
const mongoose = require('mongoose');
const server = express();



const produtoRoutes = require('../routes/Produto');

server.use(
    express.urlencoded({
        extended: true,
    }),
);

server.use(express.json());

server.use('/produto', produtoRoutes);
server.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

mongoose.connect(
    'mongodb+srv://pedrohenrique:senha@cluster0.mh1k26z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
)
.then(() => {
    console.log("Conectado ao MongoDB!")
})
.catch((err)=>{
    console.log(err);
})


server.listen(3000);