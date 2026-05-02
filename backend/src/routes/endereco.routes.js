const express = require("express");
const router = express.Router();

// GET /api/endereco/:cep — busca endereço pelo CEP via ViaCEP
router.get("/:cep", async (req, res) => {
  const cep = req.params.cep.replace(/\D/g, "");

  if (cep.length !== 8) {
    return res
      .status(400)
      .json({ success: false, error: "CEP inválido. Digite 8 números." });
  }

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();

    if (data.erro) {
      return res
        .status(404)
        .json({ success: false, error: "CEP não encontrado." });
    }

    return res.json({
      success: true,
      data: {
        cep: data.cep,
        rua: data.logradouro,
        bairro: data.bairro,
        cidade: data.localidade,
        estado: data.uf,
        complemento: data.complemento || "",
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Erro ao consultar CEP." });
  }
});

module.exports = router;
