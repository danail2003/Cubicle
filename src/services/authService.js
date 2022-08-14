const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const salt = require('../config/constants').salt;
const secret = require('../config/constants').secret;

exports.register = async ({ username, password, repeatPassword }) => {
    if (password !== repeatPassword) {
        return;
    }

    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ username, password: hashedPassword });

    return user;
};

exports.login = async ({ username, password }) => {
    const user = await User.findOne({ username });

    if (!user) {
        return;
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        return;
    }

    const token = new Promise((resolve, reject) => {
        jwt.sign({ id: user._id, username: user.username }, secret, { expiresIn: '3d' }, (err, token) => {
            if (err) {
                reject(err);
            }

            resolve(token);
        })
    });

    return token;
};