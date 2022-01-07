const jwt = require('jsonwebtoken');
require('dotenv').config();

const createToken = (user) => {
    return jwt.sign(user, process.env.SECRET, {
        expiresIn: '7d',
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
