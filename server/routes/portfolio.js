require('dotenv').config();
const router = require('express').Router();
const {
    handleInternalServer,
    handleBadRequest,
    handleNotFound,
} = require('../handler/error');
const Portfolio = require('../models/Portfolio');
const User = require('../models/User');
const axios = require('axios');

// Get holdings
// Use this for portfolio
router.get('/current', User.verifySession, async (req, res) => {
    try {
        const portfolio = await Portfolio.findOne({
            user: req.user._id,
            'holdings.status': 'hold',
        });
        res.status(200).json({ portfolio });
    } catch (e) {
        handleInternalServer(res);
    }
});

// Get the profile with all the past held holdings as well
// Can be used to show a chart that shows the user's progress over time
// and maybe theirs profits too
router.get('/past', User.verifySession, async (req, res) => {
    try {
        const portfolio = await Portfolio.findOne({
            user: req.user._id,
        });
        res.status(200).json({ portfolio });
    } catch (e) {
        handleInternalServer(res);
    }
});

module.exports = router;
