const router = require('express').Router();
const { sessionName } = require('../config/constants');
const authService = require('../services/authService');

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    const user = await authService.register(req.body);

    if (!user) {
        return res.redirect('404');
    }

    res.redirect('/auth/login');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', async (req, res) => {
    const token = await authService.login(req.body);

    if (!token) {
        return res.redirect('404');
    }

    res.cookie(sessionName, token, { httpOnly: true });

    res.redirect('/');
});

module.exports = router;