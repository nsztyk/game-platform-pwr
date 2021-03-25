const express = require('express');
const User = require('../../models/user');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const env = require('../../config/keys');

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
  const userData = req.body.user

  if (userData == undefined || (!userData.hasOwnProperty('username') || !userData.hasOwnProperty('password')))
    return res.json({ status: 'error', error: 'Invalid user parameters' })

  const { username, password } = userData;

  const user = await User.findOne({ username }).lean()

  if (!user) {
    return res.json({ status: 'error', error: 'Invalid username/password' })
  }

  if (await bcrypt.compare(password, user.password)) {

    const token = jwt.sign({
      id: user._id,
      username: user.username
    }, env.JWT_SECRET)

    return res.json({ status: 'ok', data: token })

  }
  return res.json({ status: 'error', error: 'Invalid username/password' })
})

router.post('/secret', async (req, res) => {
  const { token } = req.body
  try {
    const user = jwt.verify(token, env.JWT_SECRET)
    res.json({ status: "ok" })
  } catch (error) {
    res.json({ status: 'error', error: ';))' })
  }
})


module.exports = router