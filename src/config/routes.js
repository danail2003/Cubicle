const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const cubeController = require('../controllers/cubeController');
const accessoryControler = require('../controllers/accessoryController');
const authController = require('../controllers/authController');

router.use('/', homeController);
router.use('/cube', cubeController);
router.use('/accessory', accessoryControler);
router.use('/auth', authController);
router.use('*', (req, res) => {
    res.render('404');
});

module.exports = router;