const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const messageRoutes = require('./routes/messageRoute');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/messages', messageRoutes);

module.exports = app;
