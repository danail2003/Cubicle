const router = require('express').Router();
const accessoryService = require('../services/accessoryService');
const cubeService = require('../services/cubeService');

router.get('/create', (req, res) => {
    res.render('createAccessory');
});

router.post('/create', (req, res) => {
    accessoryService.create(req.body)
        .then(() => {
            res.redirect('/');
        })
        .catch(err => {
            console.log(err.message);
        });
});

router.get('/attach/:id', async (req, res) => {
    const cube = await cubeService.getOne(req.params.id).lean();

    res.render('attachAccessory', { cube });
});

module.exports = router;