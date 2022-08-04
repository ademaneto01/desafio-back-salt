require('dotenv').config();
const express = require('express');
// const { db } = require('./conexao');
const rotas = require('./rotas');
const cors = require('cors');

// db.on("error", console.log.bind(console, 'Erro de conexão'))
// db.once('open', () => {
//     console.log('Conexão com banco mongoose feita com sucesso');
// })

const app = express();

app.use(express.json());
app.use(cors());
app.use(rotas);

app.listen(process.env.PORT);