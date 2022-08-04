// const mongoose = require('mongoose');

// mongoose.connect('mongodb+srv://ademar:ademar1619@cluster0.i4kko.mongodb.net/db_salt');

// let db = mongoose.connection;

const knex = require('knex')({
    client: 'pg',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    }
});

module.exports = knex;