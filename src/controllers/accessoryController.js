const router = require('express').Router();
const accessoryService = require('../services/accessoryService');

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

router.get('/attach', (req, res) => {
    
    res.render('attachAccessory');
});

module.exports = router;