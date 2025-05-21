const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Umy159'  ,  
  database: 'requisitos_db'
});


db.connect(err => {
  if (err) throw err;
  console.log('Conectado ao MySQL');
});

/*
Método para criar requisitos
*/
app.post('/requisitos', (req, res) => {
  const { titulo, projeto, tipo, descricao, dataEntrega } = req.body;
  const sql = 'INSERT INTO requisitos (titulo, projeto, tipo, descricao, dataEntrega) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [titulo, projeto, tipo, descricao, dataEntrega], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ id: result.insertId, ...req.body });
  });
});

/*
Método para buscar requisitos
*/
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

/*
Método para buscar detalhes requisitos
*/
app.get('/requisitos/:id', (req, res) => {
  db.query('SELECT * FROM requisitos WHERE id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results[0]);
  });
});

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});
