const express = require('express');
const mongoose = require('express');

const router = express.Router();

// Get posts
router.get('/', (req, res)=>{
  res.send("hello")
})

// Add posts

// Delete Post


module.exports = router