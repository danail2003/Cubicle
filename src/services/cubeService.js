const cubes = require('../config/database.json');
const fs = require('fs/promises');
const path = require('path');
const uuid = require('uuid');

exports.getAll = (search = '', from = 0, to = 6) => {
    if (from === '' || to === '') {
        if (from === '') {
            from = 0;
        }

        if (to === '') {
            to = 6;
        }
    }

    const result = cubes
        .filter(x => x.name.toLowerCase().includes(search.toLowerCase()))
        .filter(x => x.difficultyLevel >= Number(from) && x.difficultyLevel <= Number(to));

    return result;
};

exports.save = (cube) => {
    cubes.push({ id: uuid.v1(), ...cube });
    return fs.writeFile(path.resolve('src/config', 'database.json'), JSON.stringify(cubes, '', 4), { encoding: 'utf-8' })
}

exports.getOne = (cubeId) => cubes.find(x => x.id === cubeId);