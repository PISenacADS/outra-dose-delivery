const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const produtosRoutes = require("./routes/produtos.routes");
const pagamentoRoutes = require("./routes/pagamento.routes");
const carrinhoRoutes = require("./routes/carrinho.routes");
const pedidosRoutes = require("./routes/pedidos.routes");
const enderecoRoutes = require("./routes/endereco.routes");

app.use("/api/pedidos", pedidosRoutes);
app.use("/api/produtos", produtosRoutes);
app.use("/api/pagamento", pagamentoRoutes);
app.use("/api/carrinho", carrinhoRoutes);
app.use("/api/endereco", enderecoRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Outra Dose Api rodando!" });
});

module.exports = app;
