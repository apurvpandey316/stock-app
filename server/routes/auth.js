const router = require('express').Router();
const { handleInternalServer } = require('../handler/error');
const Portfolio = require('../models/Portfolio');
const User = require('../models/User');

router.post('/login', User.login);

router.post('/signup', User.signup, async (req, res) => {
    try {
        const portfolio = new Portfolio({ user: req.user._id, holdings: [] });
        await portfolio.save();
        res.status(200).json({ token: req.token, user: req.user });
    } catch (e) {
        handleInternalServer(res);
    }
});

router.post('/logout', User.verifySession, async (req, res) => {
    //complete this
    console.log(req);
    res.send('Login');
});
module.exports = router;
