const bcrypt = require('bcrypt');
const User = require('../models/User');
const salt = require('../config/constants').salt;

exports.register = async ({ username, password, repeatPassword }) => {
    if (password !== repeatPassword) {
        return;
    }

    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({username, password: hashedPassword});

    return user;
};