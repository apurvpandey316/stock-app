const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { createToken, verifyToken } = require('../utils');
const {
    handleInternalServer,
    handleBadRequest,
    handleUnauthorized,
    handleNotFound,
} = require('../handler/error');
const saltRounds = 10;

const UserSchema = new mongoose.Schema({
    firstName: { type: String, require: true },
    lastName: { type: String, default: '' },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
        select: false,
    },
    amount: { type: Number, require: true, default: 50000 },
});

UserSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
});

UserSchema.statics.login = async function (req, res) {
    try {
        if (!req.body.email || !req.body.password) {
            handleBadRequest(res, 'Invalid details');
            return;
        }
        const user = await User.findOne({ email: req.body.email }).select(
            '+password'
        );
        if (!user) {
            handleBadRequest(res, 'Incorrect username or password');
            return;
        }
        if (!(await bcrypt.compare(req.body.password, user.password))) {
            handleBadRequest(res, 'Incorrect username or password');
            return;
        }
        const token = createToken(user._id.toString());
        res.status(200).json({ token, user });
    } catch (e) {
        handleInternalServer(res);
    }
};

UserSchema.statics.signup = async function (req, res, next) {
    try {
        if (!req.body.email || !req.body.password || !req.body.firstName) {
            handleBadRequest(res, 'Invalid details');
            return;
        }
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            handleBadRequest(res, 'Username already exists');
            return;
        }
        user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
        });
        user = await user.save();
        const token = createToken(user._id.toString());
        req.token = token;
        req.user = user;
        next();
    } catch (e) {
        handleInternalServer(res);
    }
};

UserSchema.statics.verifySession = async function (req, res, next) {
    try {
        if (!req.headers.authorization) {
            handleUnauthorized(res);
            return;
        }
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            handleUnauthorized(res);
            return;
        }
        const userId = verifyToken(token);
        if (!userId) {
            handleUnauthorized(res);
            return;
        }
        const user = await User.findById(userId);
        if (!user) {
            handleNotFound(res, 'User not found!');
            return;
        }
        req.user = user;
        next();
    } catch (e) {
        handleInternalServer(res);
    }
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
