const { Router } = require('express');
const usuarios = require('./controladores/usuarios');
const transacoes = require('./controladores/transacoes');
const validandoToken = require('./middleware/token');


const rotas = Router();

rotas.post('/usuario', usuarios.cadastroUsuario);
rotas.post('/login', usuarios.loginUsuario);

rotas.use(validandoToken);

rotas.post('/envio', transacoes.enviarMensagem);

rotas.get('/lista', transacoes.listarMensagem);

module.exports = rotas;