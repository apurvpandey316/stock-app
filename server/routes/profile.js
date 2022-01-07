const router = require('express').Router();
const { handleInternalServer } = require('../handler/error');
const Portfolio = require('../models/Portfolio');
const User = require('../models/User');
const axios = require('axios');

// Update the user's profile information such as firstname and lastname
router.post('/update', User.verifySession, async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.user._id, {
            firstName: req.body.firstName || req.user.firstName,
            lastName: req.body.lastName || req.user.lastName,
        });
        res.status(200).json({ portfolio });
    } catch (e) {
        handleInternalServer(res);
    }
});

module.exports = router;
