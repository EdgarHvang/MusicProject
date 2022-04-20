
const { getAllUsers } = require('../models/user');

const checkAuth = (req, res, next) => {
    console.log('Checking auth...');
    let auth = req.headers.authorization;
    let users = getAllUsers();

    if (users.findIndex((u) => u.userToken === auth) !== -1) {
        console.log("authenticated", auth);
        // let sAuth = "1650260523734ed"; //hard write auth test
        console.log(req.sAuth);
        // req.auth = sAuth // hard write auth test
        req.auth = auth; //product
        console.log(req.auth);
        next();
    } else {
        // console.log("somgthing is wrong");
        // let err = new Error()
        err.message = 'need login';
        // err.status = 401;
        // res.status(err);

    }
}


module.exports = { checkAuth }