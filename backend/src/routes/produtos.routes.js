const express = require("express");
const router = express.Router();

//Catalogo de bebidas
const produtos = [
  {
    id: 1,
    nome: "Cerveja Heineken 600ml",
    descricao: "Cerveja lager premium",
    preco: 9.79,
    categoria: "Cervejas",
    imagem_url: "https://loremflickr.com/300/300/beer",
  },
  {
    id: 2,
    nome: "Vinho Nacional Dom Bosco",
    descricao: "Vinho tinto suave",
    preco: 14.73,
    categoria: "Vinhos",
    imagem_url: "https://loremflickr.com/300/300/wine",
  },
  {
    id: 3,
    nome: "Whiskey Jack Daniels 375ml",
    descricao: "Whiskey americano",
    preco: 89.9,
    categoria: "Whiskey",
    imagem_url: "https://loremflickr.com/300/300/whiskey",
  },
  {
    id: 4,
    nome: "Coca-Cola 1l",
    descricao: "Refrigerante gelado",
    preco: 8.0,
    categoria: "Combos",
    imagem_url: "https://loremflickr.com/300/300/cola",
  },
  {
    id: 5,
    nome: "Cerveja Original 350ml",
    descricao: "Cerveja premium brasileira",
    preco: 6.5,
    categoria: "Cervejas",
    imagem_url: "https://loremflickr.com/300/300/beer",
  },
  {
    id: 6,
    nome: "Skol Beats Senses 269ml",
    descricao: "Bebida energética alcoólica",
    preco: 7.99,
    categoria: "Cervejas",
    imagem_url: "https://loremflickr.com/300/300/drink",
  },
];

//lista todos os produtos
router.get("/", (req, res) => {
  res.json({ success: true, data: produtos });
});

//busca produto por id
router.get("/:id", (req, res) => {
  const produto = produtos.find((p) => p.id === parseInt(req.params.id));
  if (!produto) {
    return res
      .status(404)
      .json({ success: false, error: "Produto não encontrad" });
  }
  res.json({ success: true, data: produto });
});

module.exports = router;
