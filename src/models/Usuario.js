const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    id: Number,
    nome: String,
    senha: String,
    numero: String,
    roles: ['admin', 'user']
});

const User = mongoose.model('User', UserSchema);
module.exports = User;