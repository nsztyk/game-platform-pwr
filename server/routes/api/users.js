const express = require('express');
const User = require('../../models/user');
const router = express.Router();

// Register user
router.post('/register', (req, res) => {

  const payloadUser = req.body.user
  const user = new User({
    username: payloadUser.username,
    password: payloadUser.password
  })

  user.save()
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err);
    });
})

// Login user
router.post('/login', (req,res) => {
  res.send(req.body)
})


module.exports = router