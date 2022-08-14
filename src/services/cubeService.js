const Accessory = require('../models/Accessory');
const Cube = require('../models/Cube');

exports.getAll = async (search = '', from = 0, to = 6) => {
    const fromLevel = Number(from) || 0;
    const toLevel = Number(to) || 6;

    const cubes = Cube.find({ name: { $regex: new RegExp(search, 'i') } }).where('difficultyLevel').lte(toLevel).gte(fromLevel).lean();

    return cubes;
};

exports.create = (cube) => Cube.create(cube);

exports.edit = async (id, data) => {
    const updatedCube = await Cube.findByIdAndUpdate(id, data);

    return updatedCube;
};

exports.delete = (id) => Cube.findByIdAndRemove(id);

exports.getOne = (cubeId) => Cube.findById(cubeId).lean();

exports.attachAccessory = async (cubeId, accessoryId) => {
    const cube = await Cube.findById(cubeId);
    const accessory = await Accessory.findById(accessoryId);

    cube.accessories.push(accessory);
    accessory.cubes.push(cube);

    cube.save();
    accessory.save();

    return cube;
};