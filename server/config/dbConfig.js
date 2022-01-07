require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connection.on(
    'error',
    console.error.bind(console, 'Connection Error:')
);

mongoose.connection.on('open', () => {
    console.log('Connected to DB!');
});

const config = () => {
    const db = mongoose.connect(
        process.env.NODE_ENV === 'production'
            ? process.env.DB_PROD
            : process.env.DB_LOCAL,
        { useNewUrlParser: true }
    );
    return db;
};

module.exports = { config };
