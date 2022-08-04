require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const rotas = require('./rotas');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());
app.use(rotas);

app.listen(process.env.PORT);

/////////////////////////CONEXÃO COM MONGO /////////////////////////////////
// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost/ademar').
//     then(() => {
//         app.listen(process.env.PORT, () => console.log('mongo'));
//     })
//     .catch(err => {
//         console.log('Não foi possicel conectar com MongoDB', err);
//     })