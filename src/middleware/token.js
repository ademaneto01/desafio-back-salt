const knex = require('../conexao');
const jwt = require('jsonwebtoken');
const segredoJWT = require('../segredoJWT');

async function validandoToken(req, res, next) {
    const { authorization } = req.headers;

    if (!authorization || authorization === 'Bearer') {
        return res.status(401).json({ "mensagem": "Para acessar este recurso um token de autenticação válido deve ser enviado." });
    }

    try {
        const token = authorization.replace('Bearer', '').trim();

        const { id } = jwt.verify(token, segredoJWT);

        const user = await knex('usuarios').where({ id }).first();

        if (!user) {
            return res.status(400).json({ "mensagem": "Para acessar este recurso um token de autenticação válido deve ser enviado." });
        }

        const userData = user;

        delete userData.senha;

        req.user = userData;

        next();
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = validandoToken