const BASE_URL = "http://10.0.2.2:3000/api";
// const BASE_URL = 'http://localhost:3000/api';

export const getProdutos = async () => {
  const response = await fetch(`${BASE_URL}/produtos`);
  const data = await response.json();
  return data;
};

export const getProdutoById = async (id) => {
  const response = await fetch(`${BASE_URL}/produtos/${id}`);
  const data = await response.json();
  return data;
};

export const getCarrinho = async (userId) => {
  const response = await fetch(`${BASE_URL}/carrinho`, {
    headers: { "x-user-id": String(userId) },
  });
  const data = await response.json();
  return data;
};

export const getPedidos = async (userId) => {
  const response = await fetch(`${BASE_URL}/pedidos`, {
    headers: { "x-user-id": String(userId) },
  });
  const data = await response.json();
  return data;
};

export const adicionarAoCarrinho = async (userId, produto) => {
  const response = await fetch(`${BASE_URL}/carrinho/adicionar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-user-id": String(userId),
    },
    body: JSON.stringify(produto),
  });
  const data = await response.json();
  return data;
};

export const removerDoCarrinho = async (userId, produtoId) => {
  const response = await fetch(`${BASE_URL}/carrinho/remover/${produtoId}`, {
    method: "DELETE",
    headers: { "x-user-id": String(userId) },
  });
  const data = await response.json();
  return data;
};

export const processarPagamento = async (userId, itens, usuario) => {
  const response = await fetch(`${BASE_URL}/pagamento`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-user-id": String(userId),
    },
    body: JSON.stringify({ itens, usuario }),
  });
  const data = await response.json();
  return data;
};

export const buscarEnderecoPorCep = async (cep) => {
  const response = await fetch(`${BASE_URL}/endereco/${cep}`);
  const data = await response.json();
  return data;
};

export const salvarEndereco = async (userId, endereco) => {
  const response = await fetch(`${BASE_URL}/carrinho/endereco`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-user-id": String(userId),
    },
    body: JSON.stringify(endereco),
  });
  const data = await response.json();
  return data;
};
