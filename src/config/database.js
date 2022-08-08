const mongoose = require('mongoose');

const connUrl = 'mongodb+srv://ddobrev:1597534268d@cubicle.uccp0m2.mongodb.net/?retryWrites=true&w=majority';

exports.initializeDb = () => mongoose.connect(connUrl);