const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./fazendinha.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS players (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT
    )
  `);

  // Verifica se a coluna "nome" existe
  db.all(`PRAGMA table_info(players)`, (err, columns) => {
    const colNames = columns.map(col => col.name);
    if (!colNames.includes('nome')) {
      db.run(`ALTER TABLE players ADD COLUMN nome TEXT`);
      console.log('Coluna "nome" adicionada à tabela players.');
    }
  });
});

module.exports = db;