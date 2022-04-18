const { userLogin } = require('../models/user');

const login = (req, res) => {
    console.log('login function running...');
    try {
        console.log(req.body);
        const user = req.body;
        res.status(200).json(userLogin(user));
    } catch (err) {
        res.status(err);
    }
}

module.exports = { login }