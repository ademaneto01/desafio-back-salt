const knex = require('../conexao');
const cron = require('node-cron');
const Usuario = require('../models/Usuario')
// const api = require('../servicos/api')
const { schemaEnviarMensagem, schemaListarMensagem } = require('../validacoes/schemaCadastroUsuario');

/////////// TESTES COM MONGO //////////////////////////
const listaMongo = async (req, res) => {
    try {
        const users = await Usuario.find({})

        res.json(users);
    } catch (error) {
        console.log(error.message);
    }
}

const criarUsuarioMongo = async (req, res) => {

    const userDb = await Usuario.findOne({ numero: req.body.numero })
    if (userDb) {
        res.send('usuario ja existe')
    } else {
        const novoUsuario = new Usuario(req.body)
        await novoUsuario.save()
        res.send('usuario criado')
    }
}

/////////////////////////////////////////////////////

const enviarMensagem = async (req, res) => {
    const { user } = req;
    const { numero, data_mensagem_enviada, mensagem } = req.body;

    const dia = data_mensagem_enviada.slice(0, 2).trim();
    const mes = data_mensagem_enviada.slice(3, 5).trim();
    const hr = data_mensagem_enviada.slice(11, 13).trim();
    const min = data_mensagem_enviada.slice(14, 17).trim();

    try {
        await schemaEnviarMensagem.validate(req.body);

        const numeroEnvio = await knex('contatos').where({ numero }).first();
        if (!numeroEnvio) {
            return res.status(400).json("telefone não cadastrado!");
        }

        cron.schedule(` 0 ${parseInt(min)} ${parseInt(hr)}  ${parseInt(dia)} ${parseInt(mes)} *`, envio = async (req, res) => {
            try {
                await knex('envio_mensagem').insert({
                    contato_id: user.id,
                    envio_id: numeroEnvio.id,
                    status_mensagem: true,
                    data_mensagem_enviada,
                    mensagem
                });

            } catch (error) {
                return res.status(400).json(error.message);
            }
        }, { scheduled: true })

        ////////////TENTATIVA DE CONEXÃO COM ENDPOINT DA SALT /////////////////////////////////       
        // api.post('', {
        //     "id": user.id,
        //     "msg": mensagem
        // }).then(data => console.log(data)).catch(error => console.log(error))

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
    listarMensagem,
    listaMongo,
    criarUsuarioMongo
}