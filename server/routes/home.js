const router = require('express').Router();
const User = require('./../models/UserModel');

router.get('/', (req, res) => {
    res.send('Hi');
});
router.post('/login', User.login, (req, res) => {
    res.status(200).json({
        user: req.user,
        token: req.token,
    });
});
router.post('/signup', User.signup, async (req, res) => {
    res.status(201).json({ user: req.user, token: req.token });
});
router.get('/logout', async (req, res) => {
    //complete this
});
module.exports = router;
