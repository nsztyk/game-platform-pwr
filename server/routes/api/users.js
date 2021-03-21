const express = require('express');
const User = require('../../models/user');
const router = express.Router();
const bcrypt = require('bcryptjs');

// Register user
router.post('/register', async (req, res)  => {

  const {username, password: plainTextPassword} = req.body.user

  const password = await bcrypt.hash(plainTextPassword, 10); 

  const user = new User({
    username,
    password
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