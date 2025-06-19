const router = require("express").Router();
const Produto = require("../models/Produto");

router.post("/", async (req, res) => {
  const { nome, descricao, cor, peso, tipo } = req.body;

  if (!nome && !descricao && !cor && !peso && !tipo) {
    return res.status(400).json({
      error: "Informar pelo menos um campo é obrigatório!",
    });
  }

  const produto = { nome, descricao, cor, peso, tipo };

  try {
    await Produto.create(produto);
    res.status(201).json({ message: "Produto cadastrado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/", async (req, res) => {
  const nomeProduto = req.query.nome;

  try {
    const produtos = await Produto.find();
    res.json(produtos);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.get("/name", async (req, res) => {
  const nomeProduto = req.query.nome;
  try {
    if (nomeProduto) {
      const produto = await Produto.find({ nome: nomeProduto });
      if (produto.length === 0) {
        return res.status(404).json({ message: "Produto inexistente" });
      } else {
        res.json(produto);
      }
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.delete("/", async (req, res) => {
  const nomeProduto = req.query.nome;

  if (!nomeProduto) {
    return res.status(400).json({ erro: "Nome do produto não informado" });
  }

  try {
    const result = await Produto.deleteOne({ nome: nomeProduto });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }

    res
      .status(200)
      .json({ message: `Produto ${nomeProduto} deletado com sucesso!` });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.put("/", async (req, res) => {
  const nomeProduto = req.query.nome;
  const { nome, descricao, cor, peso, tipo } = req.body;

  if (!nomeProduto) {
    return res
      .status(400)
      .json({ message: "Não foi informado o produto a ser atualizado" });
  }

  const produto = await Produto.findOne({ nome: nomeProduto });

  if (!produto) {
    return res.status(404).json({ message: "Produto inexistente" });
  }

  if (!nome && !descricao && !cor && !peso && !tipo) {
    return res
      .status(400)
      .json({ message: "Informe pelo menos um campo para atualização" });
  }

  const updateData = {};
  if (nome) updateData.nome = nome;
  if (descricao) updateData.descricao = descricao;
  if (cor) updateData.cor = cor;
  if (peso) updateData.peso = peso;
  if (tipo) updateData.tipo = tipo;

  try {
    await Produto.updateOne({ nome: nomeProduto }, { $set: updateData });
    res
      .status(200)
      .json({ message: `Produto ${nomeProduto} atualizado com sucesso!` });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = router;
