const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { createToken } = require('./../utils');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
});

UserSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
});
UserSchema.statics.login = async function (req, res, next) {
    try {
        if (!req.body.username) throw new Error('Please provide a username');
        if (!req.body.password) throw new Error('Please provide a password');
        const user = await User.findOne({ username: req.body.username });
        if (!user) throw new Error('Incorrect username or password');
        if (!(await bcrypt.compare(req.body.password, user.password)))
            throw new Error('Incorrect username or password');
        const token = createToken(user._id.toString());
        req.token = token;
        req.user = user;
        next();
    } catch (e) {
        console.log(e);
    }
};
UserSchema.statics.signup = async function (req, res, next) {
    if (!req.body.username) throw new Error('Please provide a username');
    if (!req.body.password) throw new Error('Please provide a password');
    let user = await User.findOne({ username: req.body.username });
    if (user) throw new Error('Username already exsists');
    try {
        user = new User({
            username: req.body.username,
            password: req.body.password,
        });
        user = await user.save();
        const token = createToken(user._id.toString());
        req.token = token;
        req.user = user;
        next();
    } catch (e) {
        console.log(e);
        res.send(501).json({ error: e });
    }
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
