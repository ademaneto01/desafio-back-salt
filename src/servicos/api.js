var axios = require('axios');

const api = axios.create({
    baseURL: 'https://dev.integrador.saltzap.com/webhook/33602533-478f-4c6b-83bc-d65c6f20b285',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});

module.exports = api;