require('dotenv').config();
require('./config/dbConfig').config();
const mongoose = require('mongoose');
const express = require('express');
const homeRoutes = require('./routes/home');
const path = require('path');

// Setup
const PORT = process.env.PORT || 5000;
const app = express();

// Middlewares
app.use(express.json());
app.use('/public', express.static(path.resolve(__dirname, 'public')));

// Routes
app.use('/', homeRoutes);

// Listen
app.listen(PORT, () => {
    console.log(`Server is up at ${PORT}`);
});
