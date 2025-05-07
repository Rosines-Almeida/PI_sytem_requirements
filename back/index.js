const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const { environment } = require('./enviroment');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Conexão com o MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: environment.DB_PASSWORD, // coloque sua senha
  database: 'requisitos_db'
});

// Testa conexão
db.connect(err => {
  if (err) throw err;
  console.log('Conectado ao MySQL');
});

// Rota: criar requisito
app.post('/requisitos', (req, res) => {
  const { titulo, projeto, tipo, descricao, dataEntrega } = req.body;
  const sql = 'INSERT INTO requisitos (titulo, projeto, tipo, descricao, dataEntrega) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [titulo, projeto, tipo, descricao, dataEntrega], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ id: result.insertId, ...req.body });
  });
});

// Rota: listar todos
app.get('/requisitos', (req, res) => {
  db.query('SELECT * FROM requisitos', (err, results) => {
    if (err) {
      console.error('Erro ao buscar requisitos:', err);
      res.status(500).send('Erro no servidor');
    } else {
      res.json(results);
    }
  });
});
// Rota: detalhe por id
app.get('/requisitos/:id', (req, res) => {
  db.query('SELECT * FROM requisitos WHERE id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results[0]);
  });
});

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});
