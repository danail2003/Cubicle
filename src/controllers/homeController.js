const router = require('express').Router();
const cubeService = require('../services/cubeService');

router.get('/', async (req, res) => {
    const { search, to, from } = req.query;

    const cubes = await cubeService.getAll(search, from, to);

    res.render('index', { cubes, search, from, to });
});

router.get('/about', (req, res) => {
    res.render('about');
});

module.exports = router;