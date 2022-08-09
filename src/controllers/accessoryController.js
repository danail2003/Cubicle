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
    const accessories = await accessoryService.getAvailable().lean();

    res.render('attachAccessory', { cube, accessories });
});

router.post('/attach/:id', async (req, res) => {
    console.log(req.params);
    await cubeService.attachAccessory(req.params.id, req.body.accessory)
    
    res.redirect(`/cube/details/${req.params.id}`);
});

module.exports = router;