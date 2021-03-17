const mongoose = require('mongoose');
const express = require('express');
const User = require('./models/user');
const env = require('./config/keys');

const app = express();


mongoose.connect(env.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => appListen())
  .catch((err) => console.log(err))


app.get('/api/add-user', (req, res) => {

  const user = new User({
    username: "username",
    password: 'StrongPassword1'
  })

  console.log('NEW USER' + user);
  user.save()
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err);
    });
})

const appListen = () => {
  app.listen(8000)
  console.log('Listening on port 8000, connected to DB');
}