const mongoose = require('mongoose');
const connString = require('./constants');

exports.initializeDb = () => mongoose.connect(connString.connectionString);