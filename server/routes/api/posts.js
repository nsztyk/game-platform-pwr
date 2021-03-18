const express = require('express');

const router = express.Router();

// Get posts
router.get('/', (req, res) => {
  res.send({name: 'hello'})
})

// Add posts
router.post('', (req,res) => {
  res.send("Get Posts")
})

// Delete Post


module.exports = router