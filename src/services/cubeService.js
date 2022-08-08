const Cube = require('../models/Cube');

exports.getAll = async (search = '', from = 0, to = 6) => {
    const cubes = await Cube.find().lean();

    // if (from === '' || to === '') {
    //     if (from === '') {
    //         from = 0;
    //     }

    //     if (to === '') {
    //         to = 6;
    //     }
    // }

    // const result = cubes
    //     .filter(x => x.name.toLowerCase().includes(search.toLowerCase()))
    //     .filter(x => x.difficultyLevel >= Number(from) && x.difficultyLevel <= Number(to));

    // return result;

    return cubes;
};

exports.create = (cube) => Cube.create(cube);

exports.getOne = (cubeId) => Cube.findById(cubeId).lean();