const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const cubeController = require('../controllers/cubeController');
const accessoryControler = require('../controllers/accessoryController');

router.use('/', homeController);
router.use('/cube', cubeController);
router.use('/accessory', accessoryControler);

module.exports = router;