const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secrets = require('./secrets');

const User = require('./user/userModel')
const Team = require('./team/teamModel')

module.exports = server => {
    server.get('/', testing)
    server.post('/api/user/register', userRegister)
    server.post('/api/user/login', userLogin);
    server.get('/api/userlist', getUsers);
}

function testing(req, res) {
    res.send(`
        If you can see this then I am working!
    `);
};

function generateToken(user) {
    const jwtPayload = {
        subject: user.id,
        username: user.username
    };
  
    const jwtOptions = {
        expiresIn: '1d',
    };
    return jwt.sign(jwtPayload, secrets.jwtSecret, jwtOptions);
};

function userRegister(req, res) {
    let user = req.body
    const hash = bcrypt.hashSync(user.password, 8);
    user.password = hash

    User.addUser(user)
        .then(saved => {
            console.log(user.password)
            res.status(201).json(saved)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
}

function userLogin(req, res) {
    let {username, password} = req.body

    User.findUserBy({username})
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user)
                    res.status(200).json({
                        username,
                        token
                    })
            } else {
                res.status(401).json({
                    message: 'Invalid Credentials'
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'Username or Password is Incorrect'
            })
        })
}

function getUsers(req, res) {
    User.getUsers()
        .then(userList => {
            res.status(201).json(userList)
        })
        .catch(err => {
            res.status(500).json(err)
        })
}
