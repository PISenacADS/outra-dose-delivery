const express = require("express");
const router = express.Router();

//Catalogo de bebidas
const produtos = [
  // CERVEJAS
  {
    id: 1,
    nome: "Cerveja Heineken 600ml",
    descricao: "Cerveja lager premium importada",
    preco: 9.79,
    categoria: "Cervejas",
    imagem_url: "https://loremflickr.com/300/300/beer",
  },
  {
    id: 2,
    nome: "Cerveja Original 350ml",
    descricao: "Cerveja premium brasileira",
    preco: 6.5,
    categoria: "Cervejas",
    imagem_url: "https://loremflickr.com/300/300/beer",
  },
  {
    id: 3,
    nome: "Skol Beats Senses 269ml",
    descricao: "Bebida energética alcoólica",
    preco: 7.99,
    categoria: "Cervejas",
    imagem_url: "https://loremflickr.com/300/300/drink",
  },
  {
    id: 4,
    nome: "Budweiser 350ml",
    descricao: "Cerveja americana premium",
    preco: 5.9,
    categoria: "Cervejas",
    imagem_url: "https://loremflickr.com/300/300/beer",
  },
  {
    id: 5,
    nome: "Corona Extra 330ml",
    descricao: "Cerveja mexicana refrescante",
    preco: 11.9,
    categoria: "Cervejas",
    imagem_url: "https://loremflickr.com/300/300/beer",
  },
  {
    id: 6,
    nome: "Eisenbahn Pale Ale 600ml",
    descricao: "Cerveja artesanal brasileira",
    preco: 14.9,
    categoria: "Cervejas",
    imagem_url: "https://loremflickr.com/300/300/beer",
  },

  // VINHOS
  {
    id: 7,
    nome: "Vinho Nacional Dom Bosco",
    descricao: "Vinho tinto suave brasileiro",
    preco: 14.73,
    categoria: "Vinhos",
    imagem_url: "https://loremflickr.com/300/300/wine",
  },
  {
    id: 8,
    nome: "Vinho Concha y Toro",
    descricao: "Vinho tinto chileno premium",
    preco: 39.9,
    categoria: "Vinhos",
    imagem_url: "https://loremflickr.com/300/300/wine",
  },
  {
    id: 9,
    nome: "Vinho Branco Salton",
    descricao: "Vinho branco seco brasileiro",
    preco: 29.9,
    categoria: "Vinhos",
    imagem_url: "https://loremflickr.com/300/300/wine",
  },
  {
    id: 10,
    nome: "Espumante Chandon",
    descricao: "Espumante brut brasileiro",
    preco: 59.9,
    categoria: "Vinhos",
    imagem_url: "https://loremflickr.com/300/300/champagne",
  },

  // WHISKEY
  {
    id: 11,
    nome: "Whiskey Jack Daniels 375ml",
    descricao: "Whiskey americano Tennessee",
    preco: 89.9,
    categoria: "Whiskey",
    imagem_url: "https://loremflickr.com/300/300/whiskey",
  },
  {
    id: 12,
    nome: "Whiskey Jack Daniels Honey 1L",
    descricao: "Whiskey americano com mel",
    preco: 162.49,
    categoria: "Whiskey",
    imagem_url: "https://loremflickr.com/300/300/whiskey",
  },
  {
    id: 13,
    nome: "Whiskey Red Label 1L",
    descricao: "Scotch whisky blend premium",
    preco: 79.9,
    categoria: "Whiskey",
    imagem_url: "https://loremflickr.com/300/300/whiskey",
  },
  {
    id: 14,
    nome: "Gin Bombay Sapphire 750ml",
    descricao: "Gin premium britânico",
    preco: 89.9,
    categoria: "Whiskey",
    imagem_url: "https://loremflickr.com/300/300/gin",
  },

  // COMBOS
  {
    id: 15,
    nome: "Coca-Cola 1L",
    descricao: "Refrigerante gelado",
    preco: 7.49,
    categoria: "Combos",
    imagem_url: "https://loremflickr.com/300/300/cola",
  },
  {
    id: 16,
    nome: "Guaraná Antarctica 2L",
    descricao: "Refrigerante guaraná",
    preco: 8.99,
    categoria: "Combos",
    imagem_url: "https://loremflickr.com/300/300/soda",
  },
  {
    id: 17,
    nome: "Combo Heineken + Amendoim",
    descricao: "6x Heineken 600ml + 2 amendoins",
    preco: 64.9,
    categoria: "Combos",
    imagem_url: "https://loremflickr.com/300/300/beer",
  },
  {
    id: 18,
    nome: "Combo Vinho + Taças",
    descricao: "1 vinho Dom Bosco + 2 taças",
    preco: 39.9,
    categoria: "Combos",
    imagem_url: "https://loremflickr.com/300/300/wine",
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
