const router = require('express').Router();
const cubeService = require('../services/cubeService');
const { isAuth } = require('../middlewares/authMiddleware');

router.get('/create', isAuth, (req, res) => {
    res.render('create');
});

router.get('/details/:id', async (req, res) => {
    const cube = await cubeService.getOne(req.params.id).populate('accessories');

    res.render('details', { cube });
});

router.post('/create', isAuth, (req, res) => {
    const cube = req.body;

    cube.owner = req.user.id;

    cubeService.create(cube)
        .then(() => {
            res.redirect('/');
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

router.get('/edit/:id', isAuth, async (req, res) => {
    const cube = await cubeService.getOne(req.params.id).lean();

    if (!cube) {
        return res.redirect('/404');
    }
    
    if (cube.owner != req.user.id) {
        return res.redirect('/404');
    }

    res.render('edit', { cube });
});

router.post('/edit/:id', isAuth, async (req, res) => {
    const cube = await cubeService.getOne(req.params.id).lean();

    if (cube.owner != req.user.id) {
        return res.redirect('/404');
    }

    const updatedCube = await cubeService.edit(req.params.id, req.body);

    res.redirect(`/cube/details/${updatedCube._id}`);
});

module.exports = router;