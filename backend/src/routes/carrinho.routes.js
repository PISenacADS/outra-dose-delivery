const express = require("express");
const router = express.Router();

// Carrinho em memória (por usuário)
const carrinhos = {};

const buildCarrinho = (itens) => {
  const total = itens.reduce(
    (acc, item) => acc + item.preco * item.quantidade,
    0,
  );
  return {
    itens,
    total: parseFloat(total.toFixed(2)),
    totalItens: itens.length,
  };
};

//Lista carrinho do usuário
router.get("/", (req, res) => {
  const userId = req.headers["x-user-id"] || "guest";
  const itens = carrinhos[userId] || [];
  res.json({ success: true, data: buildCarrinho(itens) });
});

//Adiciona item
router.post("/adicionar", (req, res) => {
  const userId = req.headers["x-user-id"] || "guest";
  const { produtoId, nome, preco, quantidade = 1 } = req.body;

  if (!produtoId || !nome || !preco) {
    return res
      .status(400)
      .json({
        success: false,
        error: "produtoId, nome e preco são obrigatórios",
      });
  }

  if (!carrinhos[userId]) carrinhos[userId] = [];

  const itemExistente = carrinhos[userId].find(
    (i) => i.produtoId === produtoId,
  );
  if (itemExistente) {
    itemExistente.quantidade += quantidade;
  } else {
    carrinhos[userId].push({ produtoId, nome, preco, quantidade });
  }

  res.json({ success: true, data: buildCarrinho(carrinhos[userId]) });
});

//remove item
router.delete("/remover/:produtoId", (req, res) => {
  const userId = req.headers["x-user-id"] || "guest";
  if (!carrinhos[userId])
    return res.json({ success: true, data: buildCarrinho([]) });

  carrinhos[userId] = carrinhos[userId].filter(
    (i) => i.produtoId !== parseInt(req.params.produtoId),
  );
  res.json({ success: true, data: buildCarrinho(carrinhos[userId]) });
});

//limpa carrinho
router.delete("/limpar", (req, res) => {
  const userId = req.headers["x-user-id"] || "guest";
  carrinhos[userId] = [];
  res.json({ success: true, message: "Carrinho limpo" });
});

module.exports = router;
