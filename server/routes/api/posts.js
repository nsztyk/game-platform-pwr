const express = require('express');
const mongoose = require('express');

const router = express.Router();

// Get posts
router.get('/', (req, res) => {
  res.send({name: 'hello'})
})

// Add posts

// Delete Post


module.exports = router