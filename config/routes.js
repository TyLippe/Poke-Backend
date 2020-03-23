const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = server => {
    server.get('/', testing)
}

function testing(req, res) {
    res.send(`
        If you can see this then I am working!
    `);
};
