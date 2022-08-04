const mongoose = require('mongoose');
const { string } = require('yup');

const MessageSchema = new mongoose.Schema({
    id: Number,
    message: String,
    timestamp: String,
    data_mensagem_enviada: string,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
});

const Message = mongoose.model('Message', MessageSchema);
module.exports = Message;