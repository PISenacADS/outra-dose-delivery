const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const { MercadoPagoConfig, Preference } = require("mercadopago");

const carrinhos = {};

// API que processa o pagamento e salva o JSON
router.post("/", async (req, res) => {
  const userId = req.headers["x-user-id"] || "guest";
  const { itens, usuario } = req.body;

  if (!itens || !itens.length) {
    return res.status(400).json({ success: false, error: "Carrinho vazio." });
  }

  const total = itens.reduce(
    (acc, item) => acc + item.preco * item.quantidade,
    0,
  );

  // Salva o JSON da Compra
  const compraId = `COMPRA-${userId}-${Date.now()}`;
  const compraJson = {
    compraId,
    dataHora: new Date().toISOString(),
    dataHoraFormatada: new Date().toLocaleString("pt-BR"),
    usuario: {
      id: userId,
      email: usuario?.email || "cliente@outra-dose.com",
      nomeCompleto: usuario?.nome || "Cliente",
    },
    produtos: itens.map((item) => ({
      produtoId: item.produtoId,
      nomeProduto: item.nome,
      precoUnitario: item.preco,
      precoUnitarioFormatado: `R$ ${item.preco.toFixed(2)}`,
      quantidade: item.quantidade,
      subtotal: parseFloat((item.preco * item.quantidade).toFixed(2)),
      subtotalFormatado: `R$ ${(item.preco * item.quantidade).toFixed(2)}`,
    })),
    resumo: {
      totalItens: itens.length,
      quantidadeTotal: itens.reduce((acc, i) => acc + i.quantidade, 0),
      valorTotal: parseFloat(total.toFixed(2)),
      valorTotalFormatado: `R$ ${total.toFixed(2)}`,
    },
    pagamento: {
      metodo: "Mercado Pago",
      status: "pendente",
      preferenceId: null,
    },
  };

  // Mercado Pago
  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;

  if (accessToken) {
    try {
      const client = new MercadoPagoConfig({ accessToken });
      const preference = new Preference(client);

      const preferenceResponse = await preference.create({
        body: {
          items: itens.map((item) => ({
            id: String(item.produtoId),
            title: item.nome,
            quantity: item.quantidade,
            currency_id: "BRL",
            unit_price: parseFloat(item.preco.toFixed(2)),
          })),
          external_reference: compraId,
        },
      });

      const initPoint =
        preferenceResponse?.init_point ||
        preferenceResponse?.sandbox_init_point;
      compraJson.pagamento.preferenceId = preferenceResponse?.id;

      const filePath = path.join(
        __dirname,
        "../../data/purchases",
        `${compraId}.json`,
      );
      fs.writeFileSync(filePath, JSON.stringify(compraJson, null, 2));

      return res.json({
        success: true,
        init_point: initPoint,
        compraId,
        modo: "live",
      });
    } catch (error) {
      return res.status(502).json({ success: false, error: error.message });
    }
  }

  // Modo Mock
  const mockUrl = `https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=mock_${Date.now()}`;
  compraJson.pagamento.preferenceId = `mock_${Date.now()}`;
  compraJson.pagamento.status = "mock";

  const filePath = path.join(
    __dirname,
    "../../data/purchases",
    `${compraId}.json`,
  );
  fs.writeFileSync(filePath, JSON.stringify(compraJson, null, 2));

  return res.json({
    success: true,
    init_point: mockUrl,
    compraId,
    modo: "mock",
  });
});

module.exports = router;
