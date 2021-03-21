const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const User = require('./models/user');
const env = require('./config/keys');

const app = express();

const port = process.env.PORT || 5000

// Middleware
app.use(express.json());
app.use(cors())


// Setting routes
const users = require('./routes/api/users')
app.use('/api/users/', users)


// Connecting to db
mongoose.connect(env.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => appListen())
  .catch((err) => console.log(err))

const appListen = () => {
  app.listen(port, () => console.log(`Server running on port ${port}`))
}
