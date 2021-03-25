const express = require('express');
const User = require('../../models/user');
const router = express.Router();
const bcrypt = require('bcryptjs');

// Register user
router.post('/register', async (req, res) => {

  const user = req.body.user


  if (user == undefined || (!user.hasOwnProperty('username') || !user.hasOwnProperty('password')))
    return res.json({ status: 'error', error: 'Invalid user parameters' })

  const { username, password: plainTextPassword } = user;

  // TODO Regex for password and username
  const password = await bcrypt.hash(plainTextPassword, 10);

  try {
    const response = await User.create({
      username,
      password
    })
    console.log('User created succesfully', response);
  } catch (error) {
    if (error.code === 11000) {
      // duplicate key
      return res.json({ status: 'error', error: 'Username already exist' })
    }
    throw error
  }
  res.json({ status: 'ok' })
})

// Login user
router.post('/login', async (req, res) => {
  const user = req.body.user

  if (user == undefined || (!user.hasOwnProperty('username') || !user.hasOwnProperty('password')))
    return res.json({ status: 'error', error: 'Invalid user parameters' })

  const { username, password } = user;

  const user = await User.findOne({ username }).lean()

  if (!user) {
    return res.json({ statu: 'error', error: 'Invalid username/password' })
  }

  if (await bcrypt.compare(password, user.password)) {
  
    return res.json({ statu: 'ok', data: '' })
  
  }
  return res.json({ statu: 'error', error: 'Invalid username/password' })
})


module.exports = router