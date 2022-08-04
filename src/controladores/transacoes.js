const knex = require('../conexao');
const api = require('../servicos/api')
const { schemaEnviarMensagem, schemaListarMensagem } = require('../validacoes/schemaCadastroUsuario');

const enviarMensagem = async (req, res) => {
    const { user } = req;
    const { numero, data_mensagem_enviada, mensagem } = req.body;

    try {
        await schemaEnviarMensagem.validate(req.body);

        const numeroEnvio = await knex('contatos').where({ numero }).first();
        if (!numeroEnvio) {
            return res.status(400).json("telefone não cadastrado!");
        }

        const mensagemEnviada = await knex('envio_mensagem').insert({
            contato_id: user.id,
            envio_id: numeroEnvio.id,
            status_mensagem: false,
            data_mensagem_enviada,
            mensagem
        });

        if (!mensagemEnviada) {
            return res.status(400).json("Mensagem não enviada");
        }

        await knex('envio_mensagem').where({ contato_id: user.id }).update({
            status_mensagem: true
        }).returning('*')

        api.post('', {
            "id": user.id,
            "msg": mensagem
        }).then(data => console.log(data)).catch(error => console.log(error))

        return res.status(200).json("Mensagem enviada com sucesso");
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const listarMensagem = async (req, res) => {
    const { user } = req;
    const { data_mensagem_enviada } = req.body;

    try {
        await schemaListarMensagem.validate(req.body);

        const mensagem = await knex('envio_mensagem').where({ data_mensagem_enviada, contato_id: user.id });

        if (mensagem.length === 0) {
            return res.status(404).json({ "mensagem": "Não existe mensagem para data informada." });
        }

        return res.status(200).json(mensagem);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    enviarMensagem,
    listarMensagem
}