const db = require('../db');

// Listar todos
exports.getAll = (req, res) => {
  db.all(`SELECT id, username, nome FROM players`, (err, rows) => {
    res.json(rows);
  });
};

// Perfil
exports.getProfile = (req, res) => {
  if (!req.session.userId) return res.status(401).json({ error: 'Não autenticado' });

  db.get(`SELECT id, username, nome FROM players WHERE id = ?`, [req.session.userId], (err, row) => {
    if (row) res.json(row);
    else res.status(404).json({ error: 'Usuário não encontrado' });
  });
};

// Registro
exports.register = (req, res) => {
  const { username, nome, password } = req.body;
  db.run(`INSERT INTO players (username, nome, password) VALUES (?, ?, ?)`, [username, nome, password], function(err) {
    if (err) return res.status(400).json({ error: 'Usuário já existe.' });
    req.session.userId = this.lastID;
    res.status(201).json({ message: 'Registrado com sucesso!' });
  });
};

// Login
exports.login = (req, res) => {
  const { username, password } = req.body;
  db.get(`SELECT * FROM players WHERE username = ? AND password = ?`, [username, password], (err, row) => {
    if (row) {
      req.session.userId = row.id;
      res.json({ message: 'Login bem-sucedido! Bem-vindo(a) ' + row.nome });
    } else {
      res.status(401).json({ error: 'Credenciais inválidas' });
    }
  });
};

// Atualizar jogador
exports.updatePlayer = (req, res) => {
  const id = req.params.idDoUsuario;
  const { nome } = req.body;
  
  db.run(`UPDATE players SET nome = ? WHERE id = ?`, [nome, id], function(err) {
    if (this.changes > 0) res.json({ message: 'Jogador atualizado' });
    else res.status(404).json({ error: 'Jogador não encontrado' });
  });
};

// Deletar jogador
exports.deletePlayer = (req, res) => {
  const id = req.params.idDoUsuario;
  db.run(`DELETE FROM players WHERE id = ?`, [id], function(err) {
    if (this.changes > 0) res.json({ message: 'Jogador deletado' });
    else res.status(404).json({ error: 'Jogador não encontrado' });
  });
};