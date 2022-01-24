const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('./models/Artigo');
const Artigo = mongoose.model('artigo');

const app = express();

app.use(express.json());

mongoose
  .connect('mongodb://localhost/tesla', {
    useNewUrlParser: true,
    useUniFiedTopology: true,
  })
  .then(() => {
    console.log('conexão com MongoDb realizada com sucesso!');
  })
  .catch((erro) => {
    console.log('ERRO: conexão com MongoDb não foi realizada com sucesso!');
  });

app.get('/', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  //Quais são os métodos que a conexão pode realizar na API
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  app.use(cors());

  Artigo.find({})
    .then((artigo) => {
      next();
      return res.json(artigo);
    })
    .catch((erro) => {
      return res.status(400).json({
        error: true,
        message: 'Nenhum artigo encontrado!',
      });
    });
});

app.post('/artigo', (req, res) => {
  const artigo = Artigo.create(req.body, (err) => {
    if (err)
      return res.status(400).json({
        erro: true,
        message: 'error: Artigo não  foi  cadastrado  com  suscesso!',
      });

    return res.status(200).json({
      erro: false,
      message: 'Artigo cadastrado  com  suscesso!',
    });
  });
});

app.listen(8080, () => {
  console.log('Servidor iniciado na porta 8080: http://localhost:8080');
});
