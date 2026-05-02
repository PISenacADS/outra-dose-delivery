import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("outra_dose.db");

export const initDatabase = async () => {
  try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS usuario (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome_completo TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        telefone TEXT,
        senha_hash TEXT NOT NULL,
        data_nascimento TEXT,
        criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS endereco (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario_id INTEGER NOT NULL,
        label TEXT DEFAULT 'Casa',
        rua TEXT NOT NULL,
        numero TEXT NOT NULL,
        complemento TEXT,
        bairro TEXT NOT NULL,
        cidade TEXT NOT NULL,
        cep TEXT NOT NULL,
        padrao INTEGER DEFAULT 0,
        FOREIGN KEY (usuario_id) REFERENCES usuario(id)
      );
    `);

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS categoria (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE
      );
    `);

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS produto (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        categoria_id INTEGER NOT NULL,
        nome TEXT NOT NULL,
        imagem_url TEXT,
        ativo INTEGER DEFAULT 1,
        FOREIGN KEY (categoria_id) REFERENCES categoria(id)
      );
    `);

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS pedido (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario_id INTEGER NOT NULL,
        endereco_id INTEGER NOT NULL,
        subtotal REAL NOT NULL,
        frete REAL DEFAULT 0,
        total REAL NOT NULL,
        status TEXT DEFAULT 'confirmado',
        tipo_entrega TEXT DEFAULT 'padrao',
        cupom_aplicado TEXT,
        criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (usuario_id) REFERENCES usuario(id),
        FOREIGN KEY (endereco_id) REFERENCES endereco(id)
      );
    `);

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS item_pedido (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        pedido_id INTEGER NOT NULL,
        produto_id INTEGER NOT NULL,
        quantidade INTEGER NOT NULL DEFAULT 1,
        preco_unitario REAL NOT NULL,
        FOREIGN KEY (pedido_id) REFERENCES pedido(id),
        FOREIGN KEY (produto_id) REFERENCES produto(id)
      );
    `);

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS pagamento (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        pedido_id INTEGER NOT NULL UNIQUE,
        metodo TEXT NOT NULL,
        status TEXT DEFAULT 'pendente',
        valor REAL NOT NULL,
        pago_em DATETIME,
        FOREIGN KEY (pedido_id) REFERENCES pedido(id)
      );
    `);

    console.log("✅ Banco de dados Inicializado!");
    return true;
  } catch (error) {
    console.error("❌ Erro ao inicializar o banco:", error);
    return false;
  }
};

export const getEnderecoPadrao = async (userId) => {
  try {
    const result = await db.getFirstAsync(
      "SELECT * FROM endereco WHERE usuario_id = ? AND padrao = 1 LIMIT 1",
      [userId],
    );
    return result;
  } catch (error) {
    console.error("Erro ao buscar endereço padrão:", error);
    throw error;
  }
};

export const getEnderecosByUsuario = async (userId) => {
  try {
    const result = await db.getAllAsync(
      "SELECT * FROM endereco WHERE usuario_id = ? ORDER BY padrao DESC, id DESC",
      [userId],
    );
    return result;
  } catch (error) {
    console.error("Erro ao buscar endereços:", error);
    throw error;
  }
};

export const definirEnderecoPadrao = async (enderecoId, userId) => {
  try {
    await db.runAsync("UPDATE endereco SET padrao = 0 WHERE usuario_id = ?", [
      userId,
    ]);
    await db.runAsync("UPDATE endereco SET padrao = 1 WHERE id = ?", [
      enderecoId,
    ]);
    return true;
  } catch (error) {
    console.error("Erro ao definir endereço padrão:", error);
    throw error;
  }
};

export const createUsuario = async (
  nome_completo,
  email,
  telefone,
  senha_hash,
  data_nascimento,
) => {
  try {
    const result = await db.runAsync(
      "INSERT INTO usuario (nome_completo, email, telefone, senha_hash, data_nascimento) VALUES (?, ?, ?, ?, ?)",
      [nome_completo, email, telefone, senha_hash, data_nascimento],
    );
    return { id: result.lastInsertRowId, nome_completo, email };
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    throw error;
  }
};

export const getUsuarioByEmail = async (email) => {
  try {
    const result = await db.getFirstAsync(
      "SELECT * FROM usuario WHERE email = ?",
      [email],
    );
    return result;
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    throw error;
  }
};

export const salvarEnderecoLocal = async (
  userId,
  label,
  rua,
  numero,
  complemento,
  bairro,
  cidade,
  cep,
) => {
  try {
    const result = await db.runAsync(
      "INSERT INTO endereco (usuario_id, label, rua, numero, complemento, bairro, cidade, cep) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [userId, label, rua, numero, complemento, bairro, cidade, cep],
    );
    return { id: result.lastInsertRowId };
  } catch (error) {
    console.error("Erro ao salvar endereço:", error);
    throw error;
  }
};

export default db;
