const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const record = {
  win: {
    type: Number,
    default: 0
  },
  draw: {
    type: Number,
    default: 0
  },
  lose: {
    type: Number,
    default: 0
  }
}

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  record: {
    tictactoe: record, 
    rpsls: {
      twoPlayers: record,
      threePlayers: record,
      fourPlayers: record,
    }
  }
}, { timestamps: true, collection: 'users' });

const User = mongoose.model('UserSchema', userSchema)
module.exports = User;

