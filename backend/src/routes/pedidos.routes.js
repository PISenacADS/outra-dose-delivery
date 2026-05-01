const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

// GET /api/pedidos — lista todos os JSONs de compras do usuário
router.get("/", (req, res) => {
  const userId = req.headers["x-user-id"] || "guest";
  const purchasesDir = path.join(__dirname, "../../data/purchases");

  try {
    const arquivos = fs.readdirSync(purchasesDir);
    const pedidos = arquivos
      .filter((f) => f.includes(`COMPRA-${userId}-`) && f.endsWith(".json"))
      .map((f) => {
        const conteudo = fs.readFileSync(path.join(purchasesDir, f), "utf-8");
        return JSON.parse(conteudo);
      })
      .sort((a, b) => new Date(b.dataHora) - new Date(a.dataHora));

    res.json({ success: true, data: pedidos });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
