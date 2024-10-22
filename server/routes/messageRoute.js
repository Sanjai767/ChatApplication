const express = require('express');
const router = express.Router();
const Message = require('../models/messageModel');

// Get all messages
router.get('/', async (req, res) => {
  const messages = await Message.find().sort({ timestamp: -1 }).limit(20);
  res.json(messages);
});

// Post a new message
router.post('/', async (req, res) => {
  const newMessage = new Message(req.body);
  await newMessage.save();
  res.status(201).json(newMessage);
});

module.exports = router;
