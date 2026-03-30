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
            
            CREATE TABLE IF NOT EXISTS categoria(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            slug TEXT NOT NULL UNIQUE
            );
            
            CREATE TABLE IF NOT EXISTS produto(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            categoria_id INTEGER NOT NULL,
            nome TEXT NOT NULL,
            imagem_url TEXT,
            ativo INTEGER DEFAULT 1,
            FOREIGN KEY (categoria_id) REFERENCES categoria(id)
            );
            
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
            
            CREATE TABLE IF NOT EXISTS item_pedido (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            pedido_id INTEGER NOT NULL,
            produto_id INTEGER NOT NULL,
            quantidade INTEGER NOT NULL DEFAULT 1,
            preco_unitario REAL NOT NULL,
            FOREIGN KEY (pedido_id) REFERENCES pedido(id),
            FOREIGN KEY (produto_id) REFERENCES produto(id)
            );
            
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
    console.log("Banco de dados Inicializado!");
    return true;
  } catch (error) {
    console.error("Erro ao inicializar o banco:", error);
    return false;
  }
};

export default db;
