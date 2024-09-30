const sqlite3 = require('sqlite3').verbose();

// Conectar ao banco de dados SQLite
const db = new sqlite3.Database('src/data/data.db', (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados', err);
  } else {
    console.log('Conectado ao banco de dados SQLite');
    initializeDatabase(); // Inicializa as tabelas
  }
});

// Função para criar tabelas se não existirem
function initializeDatabase() {
  db.serialize(() => {
    // Tabela de propostas
    db.run(`
      CREATE TABLE IF NOT EXISTS propostas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT,
        phone1 TEXT,
        phone2 TEXT,
        operationCode TEXT,
        operationCodeComplement TEXT,
        productionGroup TEXT,
        paymentMethod TEXT,
        installments TEXT,
        contractType TEXT,
        insuranceType TEXT,
        analystId INTEGER,
        creationDate TEXT,
        FOREIGN KEY (analystId) REFERENCES analistas(id)
      )
    `, (err) => {
      if (err) {
        console.error('Erro ao criar tabela de propostas', err);
      } else {
        console.log('Tabela de propostas criada ou já existe');
      }
    });

    // Tabela de analistas
    db.run(`
      CREATE TABLE IF NOT EXISTS analistas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT,
        usuario TEXT UNIQUE,
        senha TEXT
      )
    `, (err) => {
      if (err) {
        console.error('Erro ao criar tabela de analistas', err);
      } else {
        console.log('Tabela de analistas criada ou já existe');
      }
    });

    // Tabela de propostas_efetivadas
    db.run(`
      CREATE TABLE IF NOT EXISTS propostas_efetivadas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        idDoAnalista INTEGER,
        valorPremio REAL,
        data TEXT,
        loja INTEGER,
        FOREIGN KEY (idDoAnalista) REFERENCES analistas(id)
      )
    `, (err) => {
      if (err) {
        console.error('Erro ao criar tabela de propostas_efetivadas', err);
      } else {
        console.log('Tabela de propostas_efetivadas criada ou já existe');
      }
    });

    db.run(`
      CREATE TABLE IF NOT EXISTS meta (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    valor REAL
);
    `, (err) => {
      if (err) {
        console.error('Erro ao criar tabela de meta', err);
      } else {
        console.log('Tabela de meta criada ou já existe');
      }
    });
  });
}

module.exports = db;
