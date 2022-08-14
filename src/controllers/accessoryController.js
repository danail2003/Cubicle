const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddleware');
const accessoryService = require('../services/accessoryService');
const cubeService = require('../services/cubeService');

router.get('/create', isAuth, (req, res) => {
    res.render('createAccessory');
});

router.post('/create', isAuth, (req, res) => {
    accessoryService.create(req.body)
        .then(() => {
            res.redirect('/');
        })
        .catch(err => {
            console.log(err.message);
        });
});

router.get('/attach/:id', isAuth, async (req, res) => {
    const cube = await cubeService.getOne(req.params.id).lean();
    const accessories = await accessoryService.getAvailable(cube.accessories).lean();

    res.render('attachAccessory', { cube, accessories });
});

router.post('/attach/:id', isAuth, async (req, res) => {
    await cubeService.attachAccessory(req.params.id, req.body.accessory)
    
    res.redirect(`/cube/details/${req.params.id}`);
});

module.exports = router;