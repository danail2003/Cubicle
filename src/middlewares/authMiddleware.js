const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const { secret, sessionName } = require('../config/constants');

const jwtVerify = promisify(jwt.verify);

exports.auth = async (req, res, next) => {
    const token = req.cookies[sessionName];

    if (token) {
        try {
            const decodedToken = await jwtVerify(token, secret);

            req.user = decodedToken;

            res.locals.user = decodedToken;
        } catch (error) {
            return res.redirect('/404');
        }
    }

    next();
};

exports.isAuth = (req, res, next) => {
    if(!req.user) {
        return res.redirect('/404');
    }

    next();
};