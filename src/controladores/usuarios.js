const knex = require('../conexao');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const segredoJWT = require('../segredoJWT');
const { schemaregisterUser, schemaLoginUser, schemaCadastroContato } = require('../validacoes/schemaCadastroUsuario');

const cadastroUsuario = async (req, res) => {
    const { nome, numero, senha } = req.body;

    try {
        await schemaregisterUser.validate(req.body);

        const validandoNumeroUsuario = await knex('usuarios').where({ numero }).first();

        if (validandoNumeroUsuario) {
            return res.status(400).json("O telefone já existe");
        }
        const hash = await bcrypt.hash(senha, 10);

        const cadastroUsuario = await knex('usuarios').insert({
            nome,
            numero,
            senha: hash
        }).returning('*');

        if (!cadastroUsuario) {
            return res.status(400).json({ "mensagem": "Não foi possivel cadastrar o usuário." });
        }

        delete cadastroUsuario.senha;

        return res.status(201).json('Usuario cadastrado com sucesso!');
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const loginUsuario = async (req, res) => {
    const { numero, senha } = req.body;

    try {

        await schemaLoginUser.validate(req.body);
        const user = await knex('usuarios').where({ numero }).first();

        if (!user) {
            return res.status(404).json({ "mensagem": "Usuário e/ou senha inválido(s)" });
        }

        const verificandoPassword = await bcrypt.compare(senha, user.senha);

        if (!verificandoPassword) {
            return res.status(400).json({ "mensagem": "Usuário e/ou senha inválido(s)" });
        }

        const token = jwt.sign({
            id: user.id,
        }, segredoJWT);

        delete user.senha;

        return res.status(200).json({ "usuário": user, "token": token });
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const cadastroContato = async (req, res) => {
    const { user } = req;
    const { nome, numero } = req.body;

    try {
        await schemaCadastroContato.validate(req.body);

        const cadastro = await knex('contatos').where({ numero: numero }).first();

        if (cadastro) {
            return res.status(400).json("O telefone já existe");
        }

        const cadastroUsuario = await knex('contatos').insert({
            cadastro_id: user.id,
            nome,
            numero
        }).returning('*');

        if (cadastroUsuario.length === 0) {
            return res.status(400).json({ "mensagem": "Não foi possivel cadastrar o usuário." });
        }

        return res.status(201).json('Usuario cadastrado com sucesso!');
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    cadastroUsuario,
    loginUsuario,
    cadastroContato
}