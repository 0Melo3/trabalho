const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const playerRoutes = require('./routes/playerRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(bodyParser.json());
app.use(session({
    secret: 'segredo-fazendinha-semeando-o-futuro',
    resave: false,
    saveUninitialized: false
}));

app.use(cors({
  origin: 'http://localhost:5500', // ou o domínio onde seu HTML roda
  credentials: true // necessário se estiver usando cookies de sessão
}));

// Rotas
app.use('/players', playerRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

app.get('/', (req, res) => {
  res.send('🚀 API da Fazendinha está online!');
});
