const Accessory = require('../models/Accessory');

exports.create = (accessory) => Accessory.create(accessory);

exports.getAvailable = (ids) => Accessory.find({ _id: { $nin: ids } });