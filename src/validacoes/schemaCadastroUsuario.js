const yup = require('../validacoes/configuracoes')

const schemaRegisterUser = yup.object().shape({
    nome: yup.string().required(),
    numero: yup.string().required(),
    senha: yup.string().required()
})

const schemaLoginUser = yup.object().shape({
    numero: yup.string().required(),
    senha: yup.string().required()
})

const schemaEnviarMensagem = yup.object().shape({
    numero: yup.string().required(),
    data_mensagem_enviada: yup.string().required(),
    mensagem: yup.string().required()
})

const schemaListarMensagem = yup.object().shape({
    data_mensagem_enviada: yup.string().required(),
})

const schemaCadastroContato = yup.object().shape({
    nome: yup.string().required(),
    numero: yup.string().required()
})

module.exports = { schemaRegisterUser, schemaLoginUser, schemaEnviarMensagem, schemaListarMensagem, schemaCadastroContato };