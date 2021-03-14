const mongoose = require('mongoose');
const express = require('express');
const User = require('./models/user');
const env = require('./config/keys');

const app = express();


mongoose.connect(env.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => appListen())
  .catch((err) => console.log(err))

app.get('/add-user', (req, res) => {

  const user = new User({
    username: "TEST",
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

app.get('/', (req, res) => {
  res.send("Siema")
})

const appListen = () => {
  app.listen(3000)
  console.log('Listening on port 3000, connected to DB');
}
