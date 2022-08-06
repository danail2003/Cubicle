const cubes = require('../config/database.json');
const fs = require('fs/promises');
const path = require('path');
const uuid = require('uuid');

exports.save = (cube) => {
    cubes.push({id: uuid.v1(), ...cube});
    return fs.writeFile(path.resolve('src/config', 'database.json'), JSON.stringify(cubes, '', 4), { encoding: 'utf-8' })
}

exports.getOne = (cubeId) => cubes.find(x => x.id === cubeId);