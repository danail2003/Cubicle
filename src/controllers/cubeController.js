const router = require('express').Router();
const cubeService = require('../services/cubeService');

router.get('/create', (req, res) => {
    res.render('create');
});

router.get('/details/:id', (req, res) => {
    const cube = cubeService.getOne(req.params.id);

    res.render('details', { cube });
});

router.post('/create', (req, res) => {
    const cube = req.body;

    cubeService.create(cube)
        .then(() => {
            res.redirect('/');
        })
        .catch(err => {
            res.status(400).send(err);
        })
});

module.exports = router;