require('dotenv').config();
require('./config/dbConfig').config();
const express = require('express');
const path = require('path');

// Setup
const PORT = process.env.PORT || 5000;
const app = express();

// Middlewares
app.use(express.json());
app.use('/public', express.static(path.resolve(__dirname, 'public')));

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/portfolio', require('./routes/portfolio'));
app.use('/profile', require('./routes/profile'));
app.use('/actions', require('./routes/actions'));

// Listen
app.listen(PORT, () => {
    console.log(`Server is up at ${PORT}`);
});
