const router = require('express').Router();
const cubes = require('../config/database.json');
const fs = require('fs/promises');
const path = require('path');

router.get('/create', (req, res) => {
    res.render('create');
});

router.post('/create', (req, res) => {
    const cube = req.body;
    cubes.push(cube);

    fs.writeFile(path.resolve('src/config', 'database.json'), JSON.stringify(cubes, '', 4), { encoding: 'utf-8' })
        .then(() => {
            res.redirect('/');
        })
        .catch(err => {
            res.status(400).send(err);
        })
});

module.exports = router;