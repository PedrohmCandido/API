const mongoose = require('mongoose');

const Produto = mongoose.model('Funcionario', {
        id: Number,
        nome: String,
        descricao: String,
        cor: String,
        peso: String,
        tipo: String
});

module.exports = Produto;