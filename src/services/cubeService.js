const cubes = require('../config/database.json');
const fs = require('fs/promises');
const path = require('path');

exports.save = (cube) => {
    cubes.push(cube);
    return fs.writeFile(path.resolve('src/config', 'database.json'), JSON.stringify(cubes, '', 4), { encoding: 'utf-8' })
}

exports.getOne = (cubeId) => cubes.find(x => x.id === cubeId);