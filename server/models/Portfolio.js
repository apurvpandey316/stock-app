const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const PortfolioSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true },
    hodlings: [
        {
            type: new mongoose.Schema(
                {
                    ticker: { type: String, require: true },
                    quantity: { type: Number, require: true, default: 1 },
                    cp: { type: Number, require: true },
                    sp: { type: Number }, // If sold
                    status: {
                        type: String,
                        default: 'hold',
                        enum: ['sold', 'hold'],
                    },
                },
                {
                    timestamps: true,
                }
            ),
        },
    ],
});

const Portfolio = mongoose.model('Portfolio', PortfolioSchema);

module.exports = Portfolio;
