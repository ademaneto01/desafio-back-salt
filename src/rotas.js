const { Router } = require('express');
const usuarios = require('./controladores/usuarios');
const transacoes = require('./controladores/transacoes');
const validandoToken = require('./middleware/token');

const rotas = Router();

rotas.post('/usuario', usuarios.cadastroUsuario);
rotas.post('/login', usuarios.loginUsuario);

///////////////////// CRIACAO COM MONGO //////////////////////////

rotas.get('/listaMongo', transacoes.listaMongo);
rotas.post('/cadastroMongo', transacoes.criarUsuarioMongo);

//////////////////////////////////////////////////////////////////

rotas.use(validandoToken);

rotas.post('/cadastro', usuarios.cadastroContato);

rotas.post('/envio', transacoes.enviarMensagem);

rotas.get('/lista', transacoes.listarMensagem);

module.exports = rotas;