
const { getAllUsers } = require('../models/user');

const checkAuth = (req, res, next) => {
    console.log('Checking auth...');
    let auth = req.headers.authorization;
    let users = getAllUsers();

    if (users.findIndex((u) => u.userToken === auth ) !== -1) {
        console.log("authenticated");
        next();
    }else {
        let err = new Error()
        err.message = 'need login';
        err.status = 401;
        res.status(err);
    }
}


module.exports = { checkAuth }