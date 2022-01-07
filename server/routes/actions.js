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

// Sell
router.post('/sell', User.verifySession, async (req, res) => {
    try {
        // Find current price and set sp to that
        const currentPrice = 0;
        portfolio = await Portfolio.findOneAndUpdate(
            {
                user: req.user._id,
                'holdings._id': req.body.id,
                'holdings.status': 'hold',
            },
            {
                $set: { 'holdings.$.status': 'sold', sp: currentPrice },
            }
        );
        // Add amount to user's amount
        const user = await User.findByIdAndUpdate(req.user._id, {
            amount: user.amount + currentPrice,
        });
        res.status(200).json({ message: 'Sold!' });
    } catch (e) {
        handleInternalServer(res);
    }
});

// Buy
router.post('/buy', User.verifySession, async (req, res) => {
    try {
        // Find the currentPrice and set cp to that
        const currentPrice = 0;
        if (user.amount < currentPrice) {
            handleBadRequest(res, 'Not enough amount!');
            return;
        }
        const portfolio = await Portfolio.findOneAndUpdate(
            { user: req.user._id },
            {
                $push: {
                    holdings: {
                        ticker: req.body.ticker,
                        quantity: req.body.quantity,
                        cp: currentPrice,
                    },
                },
            }
        );
        // Deduct amount from user's amount
        const user = await User.findByIdAndUpdate(req.user._id, {
            amount: user.amount - currentPrice,
        });
        res.status(200).json({ message: 'Bought!' });
    } catch (e) {
        handleInternalServer(res);
    }
});

module.exports = router;
