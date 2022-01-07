const jwt = require('jsonwebtoken');
require('dotenv').config();

const expiry = 60 * 60 * 24 * 7; // 7 days

const createToken = (id) => {
    return jwt.sign(id, process.env.SECRET, {
        expiresIn: expiry,
    });
};

const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        return decoded;
    } catch (e) {
        return null;
    }
};

module.exports = {
    createToken,
    verifyToken,
};
